const districts = [
  {
    key: "东城", tone: "crimson", gdp: "3,950.7", gdpNote: "2025全年 · +4.5%", rank: "五区已核验顺序第1", retail: "678.9亿元", retailNote: "2026上半年 · +5.4%", wholesale: "387.6亿元", wholesaleNote: "2025批零业增加值 · +5.7%", trend: "消费规模全市第3，增速高于全市7.6个百分点", leaders: "孙新军 / 陈献森", people: "3月6日发布马媛等2人任免；持续跟踪委办局领导页", stats: "https://www.bjdch.gov.cn/ywdt/xdcb/202607/P020260728617203216051.pdf", gov: "https://www.bjdch.gov.cn/zwgk/ldjs/", personnel: "https://www.bjdch.gov.cn/zwgk/rsxx/rsrm/index.html"
  },
  {
    key: "石景山", tone: "amber", gdp: "1,379.4", gdpNote: "2025全年 · +6.5%", rank: "五区已核验顺序第2", retail: "+4.5%", retailNote: "2026上半年 · 区级增速", wholesale: "43.3亿元", wholesaleNote: "2025批零业增加值 · +0.4%", trend: "上半年消费保持增长，首钢园与京西消费场景持续扩容", leaders: "常卫 / 万隆", people: "领导信息按区政府公开页每日比对", stats: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ztzl/2023/sjkfzl/zxsj/", gov: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ldjs_1946/qw_1947/", personnel: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/"
  },
  {
    key: "房山", tone: "green", gdp: "927.7", gdpNote: "2025全年 · +0.1%", rank: "五区已核验顺序第3", retail: "117.8亿元", retailNote: "2026上半年 · -4.1%", wholesale: "待官方发布", wholesaleNote: "2026进度口径", trend: "商品零售承压，餐饮收入降幅较窄（-0.7%）", leaders: "阳波 / 底志欣", people: "7月14日发布区委管理干部任前公示", stats: "https://www.bjfsh.gov.cn/zwgk/qtjj/ywdt_2260/bmdt_2261/tjdc_2280/tjxx_2284/202607/t20260724_40115945.shtml", gov: "https://www.bjfsh.gov.cn/zhxw/fsdt/202608/t20260803_40116115.shtml", personnel: "https://www.bjfsh.gov.cn/zwgk/rqgs/202607/t20260714_40115671.shtml"
  },
  {
    key: "昌平", tone: "blue", gdp: "待发布", gdpNote: "2025官方总量待核验", rank: "五区内部名次待补齐", retail: "待发布", retailNote: "2026上半年官方口径", wholesale: "待发布", wholesaleNote: "批零销售额/增加值分口径跟踪", trend: "重点关注回天商圈、未来科学城与文旅消费", leaders: "以区政府领导页为准", people: "每日比对区政府人事与机构公开栏目", stats: "https://www.bjchp.gov.cn/", gov: "https://www.bjchp.gov.cn/", personnel: "https://www.bjchp.gov.cn/"
  },
  {
    key: "密云", tone: "violet", gdp: "475.0", gdpNote: "2025全年 · +5.5%", rank: "五区已核验顺序第4", retail: "已发布", retailNote: "2026上半年 · 点击查看官方原表", wholesale: "待发布", wholesaleNote: "2026进度口径", trend: "生态文旅、住宿餐饮与高成长企业是跟踪重点", leaders: "彭利锋 / 于海波", people: "领导信息按区政府公开页每日比对", stats: "https://www.bjmy.gov.cn/zwgk/ztbd/myqsjkfzl/index.html", gov: "https://www.bjmy.gov.cn/zwgk/qld/", personnel: "https://www.bjmy.gov.cn/zwgk/qld/"
  }
];

const soe = [
  ["东城", "2026.05.19", "东城文旅集团推进文商旅体展融合", "王府井食品商场升级后客流翻倍、销售额同比增长333%，并持续引入首店和亲子消费场景。", "东城区政府", "官方", "https://www.bjdch.gov.cn/ztzl/tzdc/tzdt/zjdt/202605/t20260519_4656938.html"],
  ["东城", "2026.07", "京诚集团明确年度资产盘活目标", "2026年空置房产盘活率计划提升15%以上，重点导入养老、文创和长租公寓等业态。", "北京日报客户端", "媒体", "https://peking.bjd.com.cn/content/s6a57009ae4b03fa51a817c84.html"],
  ["石景山", "2026.06.10", "首钢集团与石景山区深化区企协同", "推进“两园一河”、国际会展小镇和未来数字空间创新试验区建设。", "首钢集团官网", "国企官网", "https://www.shougang.com.cn/m1/sgyw/20260610/14627.html"],
  ["石景山", "2026.08.10", "首钢园服贸会永久会址全面完工", "国际会展小镇建设进入运营和重大活动承载阶段。", "首钢集团官网", "国企官网", "https://www.shougang.com.cn/m1/index.html"],
  ["房山", "2026.08.03", "房山区与北京保障房中心深化合作", "围绕燕房投资运营、存量资产盘活、保障房和良乡大学城职住平衡推进合作。", "房山区政府", "官方", "https://www.bjfsh.gov.cn/zhxw/fsdt/202608/t20260803_40116115.shtml"],
  ["房山", "2026年度", "区属平台聚焦燕房组团与城市更新", "政府工作报告提出强化产业承载和城市更新，跟踪区属平台项目化落地。", "房山区政府工作报告", "官方", "https://www.bjfsh.gov.cn/zwgk/zfgzbg/202604/P020260409367928917439.pdf"],
  ["昌平", "2026.07.22", "上半年国有资本经营预算接受专题审议", "区人大财经委提出盘活资金、资产、资源并支持区属国企健康发展。", "北京市人大", "官方", "https://www.bjrd.gov.cn/xwzx/gqrd/202607/t20260722_4778118.html"],
  ["昌平", "2026年度", "深化区属国企改革与现代公司治理", "政府工作报告部署完善现代公司治理体系和国企市场化经营机制。", "首都之窗", "官方", "https://www.beijing.gov.cn/zhengce/zhengcefagui/202604/W020260421383231367836.pdf"],
  ["密云", "2026.08.07", "密云与三家央国企签署战略合作协议", "中国广电、中食控股、国机数科将围绕数字农业、数字化和产业项目开展合作。", "首都之窗", "官方", "https://www.beijing.gov.cn/ywdt/gqrd/202608/t20260807_4813113.html"],
  ["密云", "2026.03.04", "密云国资系统强化招商引资", "区属国企参加招商实战培训，密云企服公司分享项目对接和服务保障案例。", "密云区国资委", "官方", "https://www.bjmy.gov.cn/ywdt/gzdt/202603/t20260304_532514.html"]
];

const procurement = [
  ["东城", "2026.08.17", "区国动办", "郊区干线早期人防工程回填项目勘察设计", "约2,878㎡", "东城区政府", "官方", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260817_4826027.html"],
  ["东城", "2026.08.11", "住宅更新", "东城区8部住宅老旧电梯更新项目", "8部电梯", "采招网", "第三方", "https://110101.bidcenter.com.cn/"],
  ["石景山", "2026年", "区教委", "黄城根小学石景山分校三期教学设施设备补充", "公开招标", "石景山公共资源平台", "官方", "https://www.bjsjs.gov.cn/sjsggzy/"],
  ["石景山", "动态", "区级平台", "政府采购及公共资源交易项目持续更新", "官方入口", "石景山公共资源平台", "官方", "https://www.bjsjs.gov.cn/sjsggzy/"],
  ["房山", "2026.07", "良乡医院", "2026年度医疗设备采购项目第1包和第6包", "1,055万元", "采招网", "第三方", "https://110111.bidcenter.com.cn/"],
  ["房山", "2026.07.30", "区园林绿化局", "森林防火基础设施建设工程三期监理", "监理招标", "采招网", "第三方", "https://110111.bidcenter.com.cn/"],
  ["昌平", "2026.07.17", "昌平公路分局", "黄平路健康工程施工", "1,430万元", "北京市交通委", "官方", "https://jtw.beijing.gov.cn/xxgk/ztbxx/202607/t20260717_4769425.html"],
  ["昌平", "2026.07.22", "区教委", "2026年暑期修缮项目九标段", "334.62万元", "中国政府采购网", "官方", "https://www.ccgp.gov.cn/cggg/dfgg/jzxcs/202607/t20260722_26983563.htm"],
  ["密云", "2026.07", "区消防救援支队", "2026年消防装备采购项目意向", "79.6万元", "采招网", "第三方", "https://www.bidcenter.com.cn/zhaobiao/areanew_1110_110228_1/"],
  ["密云", "2026.05.14", "区水务局", "密云区节水诊断与效果评价项目", "公开招标", "密云区政府", "官方", "https://www.bjmy.gov.cn/zwgk/zfxxgk/fdzdgknr/zfcg/"]
];

const cityGdp = [
  [1,"海淀",13691.4],[2,"朝阳",9668.5],[3,"西城",6314.0],[4,"东城",3950.7],
  [5,"丰台",2592.9],[6,"顺义",2451.9],[7,"昌平",1908.5],[8,"通州",1638.8],
  [9,"石景山",1379.4],[10,"大兴",1349.3],[11,"房山",927.7],[12,"平谷",605.2],
  [13,"怀柔",586.5],[14,"密云",475.0],[15,"门头沟",316.3],[16,"延庆",260.9]
];

const sourceDirectory = [
  ["东城","区政府通知公告","https://www.bjdch.gov.cn/zwgk/tzgg/","区国资国企专题","https://www.bjdch.gov.cn/ztzl/tzdc/tzdt/zjdt/"],
  ["石景山","区公共资源交易平台","https://www.bjsjs.gov.cn/sjsggzy/","首钢集团新闻中心","https://www.shougang.com.cn/m1/xwzx.html"],
  ["房山","区政府采购公开","https://www.bjfsh.gov.cn/zwgk/","区政府要闻/国企合作","https://www.bjfsh.gov.cn/zhxw/fsdt/"],
  ["昌平","区政府门户","https://www.bjchp.gov.cn/","北京市公共资源平台","https://ggzyfw.beijing.gov.cn/"],
  ["密云","区政府采购","https://www.bjmy.gov.cn/zwgk/zfxxgk/fdzdgknr/zfcg/","区属国企目录","https://www.bjmy.gov.cn/stmy/tzmy/qsgyqy/"]
];

const comparableGdp = [
  ["1", "东城", "3,950.7亿元", "+4.5%", "2026.04.17", "https://www.bjdch.gov.cn/mldc/dcgk/202304/t20230405_2975706.html"],
  ["2", "石景山", "1,379.4亿元", "+6.5%", "2026.04.14", "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ztzl/2023/sjkfzl/sjtj/gbnj/202604/P020260414533973129333.pdf"],
  ["3", "房山", "927.7亿元", "+0.1%", "2026.04.16", "https://www.bjfsh.gov.cn/zwgk/qtjj/ywdt_2260/bmdt_2261/tjdc_2280/tjgb_2281/202604/P020260416506062786538.pdf"],
  ["—", "昌平", "待官方值", "—", "待发布", "https://www.bjchp.gov.cn/"],
  ["4", "密云", "475.0亿元", "+5.5%", "2026.06.11", "https://www.bjmy.gov.cn/zwgk/zfxxgk/fdzdgknr/ghxx/fzgh/202606/P020260611535263755544.pdf"]
];

const latestGdp = [
  ["东城", "3,950.7亿元", "2025全年", "2026.04.17", "尚未检索到2026上半年区级GDP官方值", "https://www.bjdch.gov.cn/mldc/dcgk/202304/t20230405_2975706.html"],
  ["石景山", "官方表已发布", "2026上半年", "2026.07.23", "等待从区级进度表摘录数值", "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ztzl/2023/sjkfzl/sjtj/jdsj/"],
  ["房山", "927.7亿元", "2025全年", "2026.04.16", "上半年经济运行稿未披露GDP总量", "https://www.bjfsh.gov.cn/zwgk/qtjj/ywdt_2260/bmdt_2261/tjdc_2280/tjgb_2281/202604/P020260416506062786538.pdf"],
  ["昌平", "待官方发布", "—", "—", "未取得可核验的2026季度GDP值", "https://www.bjchp.gov.cn/"],
  ["密云", "官方附件已发布", "2026上半年", "2026.07.28", "附件数值待结构化摘录", "https://www.bjmy.gov.cn/zwgk/zfxxgk/fdzdgknr/tjxx/tjsj/202607/t20260728_549116.html"]
];

export default function Home() {
  return <main>
    <header className="topbar">
      <a className="brand" href="#top"><span className="seal">京</span><span>五区经纬<small>BEIJING DISTRICT INTELLIGENCE</small></span></a>
      <nav><a href="#overview">总览</a><a href="#districts">五区档案</a><a href="#people">领导人事</a><a href="#soe">国企</a><a href="#procurement">招采</a></nav>
      <div className="live"><i />每日核验 · 08:30</div>
    </header>

    <section className="hero" id="top">
      <div className="eyebrow">北京 · 东城 / 石景山 / 房山 / 昌平 / 密云</div>
      <h1>五区经营情报，<em>一页看清。</em></h1>
      <p>面向区域经营与政企研究的每日决策台。经济指标、领导人事、区属国企和政府招采均链接至官方原文。</p>
      <div className="hero-meta"><span>覆盖区域 <b>5区</b></span><span>最近核验 2026.08.20 08:41</span><span>原则 <b>只收录官方口径</b></span></div>
    </section>

    <section className="ticker"><b>今日摘要</b><span>东城上半年社零678.9亿元、同比增长5.4%</span><span>石景山上半年社零同比增长4.5%</span><span>房山上半年社零117.8亿元、同比下降4.1%</span><span>全国7月制造业PMI 49.2%</span></section>

    <section className="section" id="overview">
      <div className="section-head"><div><span>01 / EXECUTIVE BRIEF</span><h2>首页经营摘要</h2></div><p>先看变化，再进入区域与官方原文</p></div>
      <div className="summary-grid">
        <article className="summary primary"><label>五区消费领先信号</label><strong>东城 · 678.9亿元</strong><p>2026上半年社零规模全市第3，同比增长5.4%。</p><a href="https://www.bjdch.gov.cn/ywdt/xdcb/202607/P020260728617203216051.pdf" target="_blank">官方来源 ↗</a></article>
        <article className="summary"><label>景气参照</label><strong>49.2%</strong><p>2026年7月全国制造业PMI。东城等五区均未单独发布官方PMI。</p><a href="https://www.stats.gov.cn/sj/zxfbhjd/202607/t20260731_1964253.html" target="_blank">国家统计局 ↗</a></article>
        <article className="summary"><label>今日判断</label><strong>消费分化</strong><p>东城、石景山保持增长；房山仍处调整期。昌平、密云等待同口径数值补齐。</p></article>
        <article className="summary"><label>信息完整度</label><strong>3 / 5</strong><p>三个区已有可核验的2026上半年消费数据；空缺项不会用估算填充。</p></article>
      </div>

      <article className="city-gdp-board">
        <div className="city-gdp-title"><div><span>北京市16区GDP排名</span><h3>2025全年 · 同一统计期</h3><p>单位：亿元；不含北京经济技术开发区。数据由第三方依据北京市统计局及各区官方发布整理，点击可核验汇总来源。</p></div><a href="https://m.maigoo.com/news/686222.html" target="_blank">来源：买购网整理 ↗</a></div>
        <div className="city-gdp-grid">{cityGdp.map(r=><div className={["东城","石景山","房山","昌平","密云"].includes(String(r[1]))?"city-gdp-item focus":"city-gdp-item"} key={r[1]}><b>{r[0]}</b><span>{r[1]}区</span><strong>{Number(r[2]).toLocaleString("zh-CN")}</strong></div>)}</div>
        <div className="city-gdp-note"><span><i className="comparable"/>同口径可比</span><span><i className="business"/>红色标记为业务五区</span><span>来源类型：权威媒体/数据网站整理，重要决策请继续核验各区公报。</span></div>
      </article>

      <div className="gdp-split">
        <article className="gdp-board">
          <div className="panel-title"><div><h3>业务五区同口径对比</h3><p>只比较业务五区，不代表北京市16区全市排名</p></div><span className="period-chip">可比 · 2025全年</span></div>
          <div className="gdp-head"><span>名次</span><span>区域</span><span>GDP</span><span>同比</span><span>发布日期</span><span>来源</span></div>
          {comparableGdp.map(r=><div className="gdp-row" key={r[1]}><b>{r[0]}</b><strong>{r[1]}</strong><span>{r[2]}</span><em>{r[3]}</em><small>{r[4]}</small><a href={r[5]} target="_blank">原文 ↗</a></div>)}
          <div className="rank-status"><b>五区对比状态：4/5</b><span>昌平官方总量补齐前，只展示已核验区的顺序，不称为完整排名。</span></div>
        </article>
        <article className="gdp-board latest">
          <div className="panel-title"><div><h3>业务五区各自最新值</h3><p>统计期可以不同，只观察更新进度，不参与排名</p></div><span className="period-chip neutral">仅供参考</span></div>
          {latestGdp.map(r=><div className="latest-row" key={r[0]}><div><strong>{r[0]}</strong><span>{r[2]}</span></div><div><b>{r[1]}</b><small>发布：{r[3]}</small></div><p>{r[4]}</p><a href={r[5]} target="_blank">官方 ↗</a></div>)}
        </article>
      </div>

      <div className="table-panel">
        <div className="panel-title"><div><h3>五区经营指标对比</h3><p>GDP列采用同口径年度值；其余指标保留各自统计期。</p></div><span>单位：亿元 / %</span></div>
        <div className="compare-table">
          <div className="tr th"><span>区域</span><span>GDP</span><span>五区对比状态</span><span>2026上半年社零</span><span>批零指标</span><span>官方</span></div>
          {districts.map(d=><div className="tr" key={d.key}><span><i className={d.tone}/><b>{d.key}</b></span><span><b>{d.gdp}</b><small>{d.gdpNote}</small></span><span><em>{d.rank}</em></span><span><b>{d.retail}</b><small>{d.retailNote}</small></span><span><b>{d.wholesale}</b><small>{d.wholesaleNote}</small></span><span><a href={d.stats} target="_blank">原文 ↗</a></span></div>)}
        </div>
      </div>
      <div className="method"><b>口径提示</b><p>“批发零售业增加值”与“批零商品销售额”不是同一指标；表内均保留名称和统计期。北京市16区排名、业务五区对比、各区最新值是三个独立口径，互不混排。</p></div>
    </section>

    <section className="district-section" id="districts">
      <div className="section-head light"><div><span>02 / DISTRICT FILES</span><h2>五区经营档案</h2></div><p>每区一张卡，快速进入官方页面</p></div>
      <div className="district-grid">{districts.map((d, i)=><article className="district-card" key={d.key}><header><span>0{i+1}</span><i className={d.tone}/><h3>{d.key}区</h3></header><div className="card-data"><label>消费趋势</label><p>{d.trend}</p><label>党政主要负责人</label><strong>{d.leaders}</strong><label>人事监测</label><p>{d.people}</p></div><footer><a href={d.stats} target="_blank">统计数据 ↗</a><a href={d.gov} target="_blank">领导信息 ↗</a><a href={d.personnel} target="_blank">人事原文 ↗</a></footer></article>)}</div>
    </section>

    <section className="section" id="people">
      <div className="section-head"><div><span>03 / GOVERNANCE</span><h2>领导班子与委办局变化</h2></div><p>姓名以各区当日官方领导页为准</p></div>
      <div className="people-list">{districts.map(d=><article key={d.key}><div><i className={d.tone}/><b>{d.key}区</b></div><h3>{d.leaders}</h3><p>{d.people}</p><a href={d.personnel} target="_blank">核验官方页面 ↗</a></article>)}</div>
      <div className="method"><b>变化识别</b><p>每日保存领导页和人事任免页的姓名、职务、发布日期与原文链接；只有出现新增、调任、免职或页面更新时才形成变化记录。</p></div>
    </section>

    <section className="dark-section" id="soe">
      <div className="section-head light"><div><span>04 / SOE LEDGER</span><h2>2026国企动态台账</h2></div><p>1月1日至今 · 历史月份持续回溯补录</p></div>
      <div className="ledger-banner dark"><b>收录范围</b><span>区属国企</span><span>央企/市属国企在区合作</span><span>改革重组</span><span>投资建设</span><span>资产运营</span><span>融资与重大经营事项</span><em>状态：持续补录，当前不可视为穷尽性清单</em></div>
      <div className="soe-grid expanded">{soe.map(item=><a href={item[6]} target="_blank" key={item[0]+item[1]+item[2]}><article><header><span>{item[0]}区</span><time>{item[1]}</time></header><h3>{item[2]}</h3><p>{item[3]}</p><footer><em>{item[4]}</em><b>{item[5]}</b><i>查看来源 ↗</i></footer></article></a>)}</div>
      <a className="ledger-more dark" href="/soe">查看近90天全部国企动态 →</a>
    </section>

    <section className="section" id="procurement">
      <div className="section-head"><div><span>05 / PROCUREMENT LEDGER</span><h2>2026招采全流程台账</h2></div><p>1月1日至今 · 按项目生命周期持续补录</p></div>
      <div className="ledger-banner"><b>公告类型</b><span>采购意向</span><span>招标/磋商</span><span>资格预审</span><span>变更/延期</span><span>废标</span><span>中标/成交</span><span>合同公告</span><em>同一项目后续按项目编号串联，避免重复计数</em></div>
      <div className="procurement-list">{procurement.map(item=><a href={item[7]} target="_blank" key={item[0]+item[1]+item[3]}><article><span>{item[0]}</span><div><small>{item[1]} · {item[2]}</small><h3>{item[3]}</h3><i>{item[5]} · {item[6]}</i></div><b>{item[4]}</b><em>查看来源 ↗</em></article></a>)}</div>
      <div className="official-links"><a href="https://www.ccgp-beijing.gov.cn/" target="_blank">北京市政府采购网 ↗</a><a href="https://ggzyfw.beijing.gov.cn/" target="_blank">北京市公共资源交易服务平台 ↗</a></div>
      <div className="source-directory">{sourceDirectory.map(s=><article key={s[0]}><b>{s[0]}区</b><a href={s[2]} target="_blank">{s[1]} ↗</a><a href={s[4]} target="_blank">{s[3]} ↗</a></article>)}</div>
      <a className="ledger-more" href="/procurement">查看近90天全部招采信息 →</a>
    </section>

    <footer className="site-footer"><div className="brand"><span className="seal">京</span><span>五区经纬<small>BEIJING DISTRICT INTELLIGENCE</small></span></div><p>来源优先级：北京市统计局、各区人民政府、北京市政府采购网、北京市公共资源交易服务平台及官方国资信息。<br/>每条数据保留统计期、发布日期、来源链接和口径说明；“待发布”表示尚未取得可核验官方值。</p><span>© 2026 · 每日 08:30 核验</span></footer>
  </main>
}
