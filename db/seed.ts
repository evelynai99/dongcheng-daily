import { env } from "cloudflare:workers";

const procurement = [
  ["东城","DC-GDB-20260817","郊区干线早期人防工程回填项目勘察设计","区国动办","招标公告","招标中","约2878㎡","2026-08-17","东城区政府","官方","https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260817_4826027.html"],
  ["东城","DC-DT-20260811","东城区8部住宅老旧电梯更新项目","相关产权单位","招标公告","招标中","8部电梯","2026-08-11","采招网","第三方","https://110101.bidcenter.com.cn/#20260811-elevator"],
  ["石景山","SJS-XX-2026","黄城根小学石景山分校三期教学设施设备补充","石景山区教委","招标公告","公告中","未披露","2026-08-01","石景山公共资源平台","官方","https://www.bjsjs.gov.cn/sjsggzy/"],
  ["石景山","SJS-RF-20260810","2026年公用人防工程维护维修项目","石景山区相关单位","竞争性磋商","磋商中","未披露","2026-08-10","采招网","第三方","https://110107.bidcenter.com.cn/#20260810-rf"],
  ["房山","FS-LXYY-202607","良乡医院2026年度医疗设备采购项目第1包和第6包","房山区良乡医院","招标公告","招标中","1055万元","2026-07-30","采招网","第三方","https://110111.bidcenter.com.cn/#202607-lxyy"],
  ["房山","FS-SL-20260730","房山区森林防火基础设施建设工程三期监理","房山区园林绿化局","招标公告","招标中","未披露","2026-07-30","采招网","第三方","https://110111.bidcenter.com.cn/#20260730-sl"],
  ["昌平","CP-HPL-20260717","2026年昌平区黄平路健康工程施工","昌平公路分局","招标公告","招标中","1430万元","2026-07-17","北京市交通委","官方","https://jtw.beijing.gov.cn/xxgk/ztbxx/202607/t20260717_4769425.html"],
  ["昌平","CP-JW-20260722","2026年昌平区教委暑期修缮项目九标段","昌平区教委","竞争性磋商","已截止","334.62万元","2026-07-22","中国政府采购网","官方","https://www.ccgp.gov.cn/cggg/dfgg/jzxcs/202607/t20260722_26983563.htm"],
  ["密云","MY-XF-202607","2026年消防装备采购项目意向","密云区消防救援支队","采购意向","预计8月采购","79.6万元","2026-07-07","采招网","第三方","https://www.bidcenter.com.cn/zhaobiao/areanew_1110_110228_1/#xf"],
  ["密云","MY-JS-20260514","2026年密云区节水诊断与效果评价项目","密云区水务局","招标公告","已中标","未披露","2026-05-14","密云区政府","官方","https://www.bjmy.gov.cn/zwgk/zfxxgk/fdzdgknr/zfcg/"]
];

const soe = [
  ["东城","东城文旅集团","区属","经营动态","东城文旅集团推进文商旅体展融合","王府井食品商场升级后客流翻倍、销售额同比增长333%。","2026-05-19","东城区政府","官方","https://www.bjdch.gov.cn/ztzl/tzdc/tzdt/zjdt/202605/t20260519_4656938.html"],
  ["东城","京诚集团","区属","资产运营","京诚集团明确年度资产盘活目标","2026年空置房产盘活率计划提升15%以上。","2026-07-01","北京日报客户端","媒体","https://peking.bjd.com.cn/content/s6a57009ae4b03fa51a817c84.html"],
  ["石景山","首钢集团","市属","区企合作","首钢集团与石景山区深化区企协同","推进两园一河、国际会展小镇和未来数字空间。","2026-06-10","首钢集团官网","国企官网","https://www.shougang.com.cn/m1/sgyw/20260610/14627.html"],
  ["石景山","首钢园","市属","项目建设","首钢园服贸会永久会址全面完工","国际会展小镇进入运营和重大活动承载阶段。","2026-08-10","首钢集团官网","国企官网","https://www.shougang.com.cn/m1/index.html#20260810"],
  ["房山","燕房投资","区属/市属合作","战略合作","房山区与北京保障房中心深化合作","围绕燕房投资运营、存量资产盘活和职住平衡推进合作。","2026-08-03","房山区政府","官方","https://www.bjfsh.gov.cn/zhxw/fsdt/202608/t20260803_40116115.shtml"],
  ["房山","区属平台","区属","项目建设","区属平台聚焦燕房组团与城市更新","政府工作报告提出强化产业承载和城市更新。","2026-06-10","房山区政府工作报告","官方","https://www.bjfsh.gov.cn/zwgk/zfgzbg/202604/P020260409367928917439.pdf"],
  ["昌平","区属国企","区属","改革监管","上半年国有资本经营预算接受专题审议","提出盘活资金资产资源并支持区属国企健康发展。","2026-07-22","北京市人大","官方","https://www.bjrd.gov.cn/xwzx/gqrd/202607/t20260722_4778118.html"],
  ["昌平","区属国企","区属","改革重组","深化区属国企改革与现代公司治理","政府工作报告部署完善现代公司治理体系。","2026-04-21","首都之窗","官方","https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/W020260421383231367836.pdf"],
  ["密云","中国广电等","央企合作","战略合作","密云与三家央国企签署战略合作协议","围绕数字农业、数字化和产业项目开展合作。","2026-08-07","首都之窗","官方","https://www.beijing.gov.cn/ywdt/gqrd/202608/t20260807_4813113.html"],
  ["密云","密云企服公司等","区属","招商引资","密云国资系统强化招商引资","区属国企参加招商实战培训。","2026-03-04","密云区国资委","官方","https://www.bjmy.gov.cn/ywdt/gzdt/202603/t20260304_532514.html"]
];

export async function ensureLedgerSeeded(){
  const db=env.DB;if(!db)return;
  const pc=await db.prepare("SELECT COUNT(*) AS n FROM procurement_records").first<{n:number}>();
  if((pc?.n??0)===0) await db.batch(procurement.map(r=>db.prepare("INSERT OR IGNORE INTO procurement_records (district,project_id,title,purchaser,notice_type,status,amount,published_at,source_name,source_type,source_url,collected_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)").bind(...r,"2026-08-20")));
  const sc=await db.prepare("SELECT COUNT(*) AS n FROM soe_records").first<{n:number}>();
  if((sc?.n??0)===0) await db.batch(soe.map(r=>db.prepare("INSERT OR IGNORE INTO soe_records (district,enterprise,ownership_level,event_type,title,summary,published_at,source_name,source_type,source_url,collected_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)").bind(...r,"2026-08-20")));
}
