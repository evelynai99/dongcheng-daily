import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const monitorPath = new URL("../data/source-monitor.json", import.meta.url);
const indexPath = new URL("../local-preview/index.html", import.meta.url);

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
  html = html.replace(
    /<span>原则 <b>只收录官方口径<\/b><\/span>/,
    `<span>原则 <b>只收录官方口径</b></span><span>自动监测 <b>${summary}</b></span>`
  );
  await writeFile(indexPath, html);
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

await updateIndex(changed);

console.log(
  JSON.stringify(
    {
      changed: changed.length,
      failed: failed.length,
      changedSourceIds: changed.map((source) => source.id),
      failedSourceIds: failed.map((source) => source.id)
    },
    null,
    2
  )
);
