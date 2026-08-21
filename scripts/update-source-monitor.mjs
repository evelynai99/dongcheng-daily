import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const monitorPath = new URL("../data/source-monitor.json", import.meta.url);
const indexPath = new URL("../local-preview/index.html", import.meta.url);
const soePath = new URL("../local-preview/soe/index.html", import.meta.url);
const procurementPath = new URL("../local-preview/procurement/index.html", import.meta.url);
const soeLedgerPath = new URL("../data/soe-ledger.json", import.meta.url);
const procurementLedgerPath = new URL("../data/procurement-ledger.json", import.meta.url);

const districts = ["东城区", "石景山区", "房山区", "昌平区", "密云区"];
const districtAliases = {
  东城: "东城区",
  石景山: "石景山区",
  房山: "房山区",
  昌平: "昌平区",
  密云: "密云区"
};

const procurementWords =
  /采购|招标|投标|中标|成交|磋商|询价|合同|废标|流标|变更|更正|资格预审|采购意向|竞价|遴选|比选/;
const nonProcurementWords =
  /招聘|拟聘|病残津贴|停车费|催缴|缴费|认定名单|自行清理|处置公告|人员公示|初审结论|退役大学生士兵/;
const soeWords =
  /国企|国资|央企|市属|区属|集团|公司|首钢|保障房|文旅|投资|运营|城建|城投|环卫|园区|产业|合作|签约|资产|城市更新|基础设施/;
const soeHarvestSourceIds = new Set(["shougang_news", "fangshan_news", "changping_gov"]);
const fetchedBodies = new Map();

const sourceGroups = [
  {
    district: "全市",
    topic: "统计与PMI",
    sources: [
      {
        id: "beijing_stats_home",
        name: "北京市统计局",
        url: "https://tjj.beijing.gov.cn/",
        scope: "北京市统计与发布入口"
      },
      {
        id: "national_pmi",
        name: "国家统计局PMI发布",
        url: "https://www.stats.gov.cn/sj/zxfbhjd/",
        scope: "全国PMI口径；不得写成北京市或区级PMI"
      }
    ]
  },
  {
    district: "东城",
    topic: "经济、人事、国企、招采",
    sources: [
      {
        id: "dongcheng_stats",
        name: "东城区统计信息",
        url: "https://www.bjdch.gov.cn/zwgk/tjxx/",
        scope: "东城区官方统计信息"
      },
      {
        id: "dongcheng_leaders",
        name: "东城区领导信息",
        url: "https://www.bjdch.gov.cn/zwgk/ldjs/",
        scope: "区领导班子"
      },
      {
        id: "dongcheng_appointments",
        name: "东城区人事任免",
        url: "https://www.bjdch.gov.cn/zwgk/rsxx/rsrm/index.html",
        scope: "委办局及相关干部任免"
      },
      {
        id: "dongcheng_procurement",
        name: "东城区通知公告",
        url: "https://www.bjdch.gov.cn/zwgk/tzgg/",
        scope: "政府采购、招标及公告线索"
      }
    ]
  },
  {
    district: "石景山",
    topic: "经济、人事、国企、招采",
    sources: [
      {
        id: "shijingshan_stats",
        name: "石景山区统计数据",
        url: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ztzl/2023/sjkfzl/sjtj/",
        scope: "石景山区官方统计信息"
      },
      {
        id: "shijingshan_leaders",
        name: "石景山区领导信息",
        url: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ldjs_1946/",
        scope: "区领导班子"
      },
      {
        id: "shougang_news",
        name: "首钢集团新闻",
        url: "https://www.shougang.com.cn/",
        scope: "石景山区重点国企动态线索"
      },
      {
        id: "shijingshan_procurement",
        name: "石景山区公共资源交易",
        url: "https://www.bjsjs.gov.cn/sjsggzy/",
        scope: "招标采购入口"
      }
    ]
  },
  {
    district: "房山",
    topic: "经济、人事、国企、招采",
    sources: [
      {
        id: "fangshan_stats",
        name: "房山区统计信息",
        url: "https://www.bjfsh.gov.cn/zwgk/qtjj/ywdt_2260/bmdt_2261/tjdc_2280/",
        scope: "房山区官方统计信息"
      },
      {
        id: "fangshan_news",
        name: "房山区综合新闻",
        url: "https://www.bjfsh.gov.cn/zhxw/fsdt/",
        scope: "区属国企与政企合作动态线索"
      },
      {
        id: "fangshan_procurement",
        name: "北京市政府采购网",
        url: "https://www.ccgp-beijing.gov.cn/",
        scope: "政府采购公告入口，需按区县筛选房山"
      }
    ]
  },
  {
    district: "昌平",
    topic: "经济、人事、国企、招采",
    sources: [
      {
        id: "changping_gov",
        name: "昌平区人民政府",
        url: "https://www.bjchp.gov.cn/",
        scope: "昌平区官方信息入口"
      },
      {
        id: "changping_procurement",
        name: "北京市公共资源交易服务平台",
        url: "https://ggzyfw.beijing.gov.cn/",
        scope: "工程建设与公共资源交易入口，需按昌平筛选"
      }
    ]
  },
  {
    district: "密云",
    topic: "经济、人事、国企、招采",
    sources: [
      {
        id: "miyun_stats",
        name: "密云区统计数据",
        url: "https://www.bjmy.gov.cn/zwgk/ztbd/myqsjkfzl/index.html",
        scope: "密云区官方统计信息"
      },
      {
        id: "miyun_leaders",
        name: "密云区领导信息",
        url: "https://www.bjmy.gov.cn/zwgk/qld/",
        scope: "区领导班子"
      },
      {
        id: "miyun_procurement",
        name: "北京市政府采购网",
        url: "https://www.ccgp-beijing.gov.cn/",
        scope: "政府采购公告入口，需按区县筛选密云"
      }
    ]
  }
];

const allSources = sourceGroups.flatMap((group) =>
  group.sources.map((source) => ({
    ...source,
    district: group.district,
    topic: group.topic
  }))
);

function beijingTime(date = new Date()) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  })
    .format(date)
    .replaceAll("/", ".");
}

function sha256(input) {
  return createHash("sha256").update(input).digest("hex");
}

function normalizeHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500000);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function decodeEntities(value) {
  return String(value ?? "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function textOnly(value) {
  return decodeEntities(String(value ?? "").replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function absoluteUrl(href, baseUrl) {
  try {
    if (!href || href.startsWith("javascript:") || href.startsWith("#")) return null;
    return new URL(href, baseUrl).href;
  } catch {
    return null;
  }
}

function isoDate(value) {
  const text = String(value ?? "");
  const match =
    text.match(/(20\d{2})[-./年](\d{1,2})[-./月](\d{1,2})日?/) ||
    text.match(/(20\d{2})(\d{2})(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function isRecent(dateText, days = 90) {
  const parsed = new Date(`${dateText}T00:00:00+08:00`);
  if (Number.isNaN(parsed.getTime())) return false;
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return parsed >= cutoff && parsed <= new Date(now.getTime() + 24 * 60 * 60 * 1000);
}

function normalizeDistrict(source, text) {
  const haystack = `${source.district || ""} ${text || ""}`;
  for (const [alias, district] of Object.entries(districtAliases)) {
    if (haystack.includes(alias)) return district;
  }
  return districts.includes(source.district) ? source.district : null;
}

function sourceTypeFor(source) {
  const url = source.url;
  if (/gov\.cn|beijing\.gov\.cn|ccgp|ggzyfw/i.test(url)) return "官方";
  if (/shougang\.com\.cn/i.test(url)) return "国企官网";
  return "第三方";
}

function classifyProcurement(text) {
  if (/采购意向/.test(text)) return "采购意向";
  if (/中标|成交/.test(text)) return "中标成交";
  if (/合同/.test(text)) return "合同公告";
  if (/变更|更正/.test(text)) return "变更更正";
  if (/废标|流标/.test(text)) return "废标流标";
  if (/磋商/.test(text)) return "竞争性磋商";
  if (/询价/.test(text)) return "询价公告";
  if (/资格预审/.test(text)) return "资格预审";
  if (/招标|投标/.test(text)) return "招标公告";
  return "采购招标";
}

function classifySoe(text) {
  if (/签约|战略合作|合作/.test(text)) return "战略合作";
  if (/资产|盘活|运营/.test(text)) return "资产运营";
  if (/城市更新|基础设施|园区/.test(text)) return "项目建设";
  if (/任免|领导|董事|监事/.test(text)) return "人事治理";
  return "国企动态";
}

function extractAround(html, index, radius = 260) {
  return html.slice(Math.max(0, index - radius), Math.min(html.length, index + radius));
}

function extractLedgerCandidates(source, html, kind) {
  if (kind === "soe" && !soeHarvestSourceIds.has(source.id)) return [];
  const candidates = [];
  const normalizedHtml = normalizeHtml(html);
  const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = linkPattern.exec(normalizedHtml))) {
    const url = absoluteUrl(match[1], source.url);
    const anchorText = textOnly(match[2]);
    if (!url || !anchorText || anchorText.length < 4) continue;
    if (/\.(jpg|jpeg|png|gif|css|js|ico|svg)(\?|$)/i.test(url)) continue;

    const context = textOnly(extractAround(normalizedHtml, match.index));
    const searchable = `${anchorText} ${context} ${url}`;
    const titleSearchable = `${anchorText} ${url}`;
    const district = normalizeDistrict(source, searchable);
    if (!district) continue;

    const date = isoDate(searchable);
    if (!date || !isRecent(date)) continue;

    if (kind === "procurement" && (!procurementWords.test(titleSearchable) || nonProcurementWords.test(titleSearchable))) continue;
    if (kind === "soe" && !soeWords.test(titleSearchable)) continue;

    candidates.push({
      id: sha256(`${kind}:${date}:${district}:${url}:${anchorText}`).slice(0, 16),
      date,
      district,
      title: anchorText.slice(0, 96),
      summary: source.scope,
      type: kind === "procurement" ? classifyProcurement(titleSearchable) : classifySoe(titleSearchable),
      sourceName: source.name,
      sourceType: sourceTypeFor(source),
      url,
      confidence: "auto",
      capturedAt: new Date().toISOString()
    });
  }
  return candidates;
}

async function loadLedger(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch {
    return { updatedAt: null, updatedAtBeijing: null, items: [] };
  }
}

function mergeLedgerItems(existingItems, harvestedItems) {
  const byKey = new Map();
  const durableExisting = existingItems.filter((item) => item.confidence !== "auto");
  for (const item of [...durableExisting, ...harvestedItems]) {
    if (!item?.url || !item?.title || !item?.date) continue;
    if (!isRecent(item.date)) continue;
    const key = item.url.replace(/#.*$/, "") || `${item.date}:${item.district}:${item.title}`;
    const previous = byKey.get(key);
    byKey.set(key, {
      ...previous,
      ...item,
      confidence: previous?.confidence === "seed" ? "seed" : item.confidence || previous?.confidence || "auto"
    });
  }
  return [...byKey.values()].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate) return byDate;
    return String(a.district).localeCompare(String(b.district), "zh-CN");
  });
}

async function writeLedger(path, kind, items) {
  await writeFile(
    path,
    `${JSON.stringify(
      {
        updatedAt: new Date().toISOString(),
        updatedAtBeijing: beijingTime(),
        mode: "seed+near-90-day-list-harvest",
        kind,
        districts,
        note: "每日自动从已配置来源抽取近90天可识别公告；政府网站结构不统一，未识别条目不写成官方值。",
        items
      },
      null,
      2
    )}\n`
  );
}

function renderLedgerPage({ title, label, heading, description, items, kind }) {
  const latest = beijingTime();
  const total = items.length;
  const officialCount = items.filter((item) => item.sourceType === "官方" || item.sourceType === "国企官网").length;
  const rows = items
    .map(
      (item) =>
        `<a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><article><time>${escapeHtml(
          item.date
        )}</time><b>${escapeHtml(item.district)}</b><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(
          item.summary || item.sourceName
        )}</p></div><span>${escapeHtml(item.type)}</span><em>${escapeHtml(item.sourceName)} · ${escapeHtml(
          item.sourceType
        )} ↗</em></article></a>`
    )
    .join("");
  const empty = `<article class="ledger-empty"><time>${escapeHtml(
    latest
  )}</time><b>五区</b><div><h3>本次未自动识别到新的近90天条目</h3><p>请查看首页“来源变化”和原始来源链接，必要时补充定制解析规则。</p></div><span>待核验</span><em>自动监测</em></article>`;

  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(
    title
  )}</title><link rel="stylesheet" href="../style.css"><link rel="stylesheet" href="../ledger-pages.css"></head><body><main class="ledger-page"><header><a href="../">← 返回首页</a><span>近90天 · 每日自动补录</span><span>最近核验 ${escapeHtml(
    latest
  )} · 自动台账 ${total} 条 · 官方/国企官网 ${officialCount} 条</span></header><section><label>${escapeHtml(
    label
  )}</label><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(
    description
  )}</p><p class="ledger-note">口径：覆盖东城、石景山、房山、昌平、密云；每日从配置来源抽取近90天可识别条目，保留来源链接。${kind === "procurement" ? "招采包含采购意向、招标/磋商/询价、变更、中标成交、合同、废标流标等。" : "国企动态包含区属国企、央企/市属国企在五区的签约合作、资产运营、项目建设和治理变化等。"} 未能结构化识别的页面不会被当作正式条目。</p></section><div class="ledger-table">${rows || empty}</div></main></body></html>`;
}

async function loadMonitor() {
  try {
    return JSON.parse(await readFile(monitorPath, "utf8"));
  } catch {
    return { updatedAt: null, updatedAtBeijing: null, sources: {} };
  }
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(source.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 government-daily-monitor/1.0 (+https://github.com/evelynai99/dongcheng-daily)"
      }
    });
    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();
    fetchedBodies.set(source.id, { body, finalUrl: response.url });
    const normalized = normalizeHtml(body);
    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      contentType,
      hash: sha256(normalized),
      bytes: body.length,
      checkedAt: new Date().toISOString(),
      checkedAtBeijing: beijingTime()
    };
  } catch (error) {
    return {
      ok: false,
      status: null,
      finalUrl: source.url,
      contentType: null,
      hash: null,
      bytes: 0,
      checkedAt: new Date().toISOString(),
      checkedAtBeijing: beijingTime(),
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function updateIndex(changedSources) {
  let html = await readFile(indexPath, "utf8");
  const latest = beijingTime();
  html = html.replace(/最近核验 \d{4}\.\d{2}\.\d{2} \d{2}:\d{2}/, `最近核验 ${latest}`);

  const changeText = changedSources
    .slice(0, 4)
    .map((item) => `${item.district}：${item.name}`)
    .join("；");
  const summary = changeText || "来源已核验，未发现内容变化";
  html = html.replace(/<span>自动监测 <b>.*?<\/b><\/span>/g, "");
  html = html.replace(
    /<span>原则 <b>只收录官方口径<\/b><\/span>/,
    `<span>原则 <b>只收录官方口径</b></span><span>自动监测 <b>${summary}</b></span>`
  );
  html = html.replace(
    /招采\/国企台账：[^<]+/,
    "招采/国企台账：每日任务按近90天自动补录可识别条目；未能结构化识别的来源仅作为变化线索。"
  );
  await writeFile(indexPath, html);
}

if (process.env.LEDGER_RENDER_ONLY === "1") {
  const procurementLedger = await loadLedger(procurementLedgerPath);
  const soeLedger = await loadLedger(soeLedgerPath);
  await writeFile(
    procurementPath,
    renderLedgerPage({
      title: "招采台账",
      label: "PROCUREMENT LEDGER",
      heading: "五区政府采购与招标",
      description: "采购意向、招标磋商、变更、中标成交、合同公告和废标流标。",
      items: procurementLedger.items || [],
      kind: "procurement"
    })
  );
  await writeFile(
    soePath,
    renderLedgerPage({
      title: "国企动态台账",
      label: "SOE LEDGER",
      heading: "五区国有企业动态",
      description: "区属国企及央企、市属国企在五区的重大事项。",
      items: soeLedger.items || [],
      kind: "soe"
    })
  );
  console.log(
    JSON.stringify(
      {
        mode: "ledger-render-only",
        procurementItems: procurementLedger.items?.length || 0,
        soeItems: soeLedger.items?.length || 0
      },
      null,
      2
    )
  );
  process.exit(0);
}

const monitor = await loadMonitor();
monitor.policy =
  "Only publish changed source snapshots. Do not convert inferred or estimated values into official values.";
monitor.sources ||= {};

const changed = [];
const failed = [];

for (const source of allSources) {
  const result = await fetchSource(source);
  const previous = monitor.sources[source.id];
  const changedHash = result.hash && previous?.hash && previous.hash !== result.hash;
  const firstSeen = result.hash && !previous?.hash;

  monitor.sources[source.id] = {
    id: source.id,
    name: source.name,
    district: source.district,
    topic: source.topic,
    url: source.url,
    scope: source.scope,
    ...result,
    firstSeenAt: previous?.firstSeenAt || result.checkedAt,
    previousHash: changedHash ? previous.hash : previous?.previousHash || null,
    changedAt: changedHash || firstSeen ? result.checkedAt : previous?.changedAt || null,
    changedAtBeijing:
      changedHash || firstSeen ? result.checkedAtBeijing : previous?.changedAtBeijing || null
  };

  if (changedHash || firstSeen) {
    changed.push(monitor.sources[source.id]);
  }
  if (!result.ok) {
    failed.push(monitor.sources[source.id]);
  }
}

monitor.updatedAt = new Date().toISOString();
monitor.updatedAtBeijing = beijingTime();
monitor.summary = {
  totalSources: allSources.length,
  changedSources: changed.length,
  failedSources: failed.length,
  changedSourceIds: changed.map((source) => source.id),
  failedSourceIds: failed.map((source) => source.id)
};

await writeFile(monitorPath, `${JSON.stringify(monitor, null, 2)}\n`);

const procurementLedger = await loadLedger(procurementLedgerPath);
const soeLedger = await loadLedger(soeLedgerPath);
const harvestedProcurement = [];
const harvestedSoe = [];
for (const source of allSources) {
  const fetched = fetchedBodies.get(source.id);
  if (!fetched?.body) continue;
  harvestedProcurement.push(...extractLedgerCandidates(source, fetched.body, "procurement"));
  harvestedSoe.push(...extractLedgerCandidates(source, fetched.body, "soe"));
}

const procurementItems = mergeLedgerItems(procurementLedger.items || [], harvestedProcurement);
const soeItems = mergeLedgerItems(soeLedger.items || [], harvestedSoe);

await writeLedger(procurementLedgerPath, "procurement", procurementItems);
await writeLedger(soeLedgerPath, "soe", soeItems);
await updateIndex(changed);
await writeFile(
  procurementPath,
  renderLedgerPage({
    title: "招采台账",
    label: "PROCUREMENT LEDGER",
    heading: "五区政府采购与招标",
    description: "采购意向、招标磋商、变更、中标成交、合同公告和废标流标。",
    items: procurementItems,
    kind: "procurement"
  })
);
await writeFile(
  soePath,
  renderLedgerPage({
    title: "国企动态台账",
    label: "SOE LEDGER",
    heading: "五区国有企业动态",
    description: "区属国企及央企、市属国企在五区的重大事项。",
    items: soeItems,
    kind: "soe"
  })
);

console.log(
  JSON.stringify(
    {
      changed: changed.length,
      failed: failed.length,
      procurementItems: procurementItems.length,
      soeItems: soeItems.length,
      changedSourceIds: changed.map((source) => source.id),
      failedSourceIds: failed.map((source) => source.id)
    },
    null,
    2
  )
);
