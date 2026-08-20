const districts = [
  {
    key: "东城", tone: "crimson", gdp: "3,950.7", gdpNote: "2025全年 · +4.5%", rank: "市级统一名次待发布", retail: "678.9亿元", retailNote: "2026上半年 · +5.4%", wholesale: "387.6亿元", wholesaleNote: "2025批零业增加值 · +5.7%", trend: "消费规模全市第3，增速高于全市7.6个百分点", leaders: "孙新军 / 陈献森", people: "3月6日发布马媛等2人任免；持续跟踪委办局领导页", stats: "https://www.bjdch.gov.cn/ywdt/xdcb/202607/P020260728617203216051.pdf", gov: "https://www.bjdch.gov.cn/zwgk/ldjs/", personnel: "https://www.bjdch.gov.cn/zwgk/rsxx/rsrm/index.html"
  },
  {
    key: "石景山", tone: "amber", gdp: "1,379.4", gdpNote: "2025全年 · +6.5%", rank: "市级统一名次待发布", retail: "+4.5%", retailNote: "2026上半年 · 区级增速", wholesale: "43.3亿元", wholesaleNote: "2025批零业增加值 · +0.4%", trend: "上半年消费保持增长，首钢园与京西消费场景持续扩容", leaders: "常卫 / 万隆", people: "领导信息按区政府公开页每日比对", stats: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ztzl/2023/sjkfzl/zxsj/", gov: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/ldjs_1946/qw_1947/", personnel: "https://www.bjsjs.gov.cn/gongkai/zwgkpd/"
  },
  {
    key: "房山", tone: "green", gdp: "待摘录", gdpNote: "2025公报已发布 · 不以推算替代", rank: "市级统一名次待发布", retail: "117.8亿元", retailNote: "2026上半年 · -4.1%", wholesale: "待官方发布", wholesaleNote: "2026进度口径", trend: "商品零售承压，餐饮收入降幅较窄（-0.7%）", leaders: "阳波 / 底志欣", people: "7月14日发布区委管理干部任前公示", stats: "https://www.bjfsh.gov.cn/zwgk/qtjj/ywdt_2260/bmdt_2261/tjdc_2280/tjxx_2284/202607/t20260724_40115945.shtml", gov: "https://www.bjfsh.gov.cn/zhxw/fsdt/202608/t20260803_40116115.shtml", personnel: "https://www.bjfsh.gov.cn/zwgk/rqgs/202607/t20260714_40115671.shtml"
  },
  {
    key: "昌平", tone: "blue", gdp: "待发布", gdpNote: "2026最新可比数据待区级公开", rank: "市级统一名次待发布", retail: "待发布", retailNote: "2026上半年官方口径", wholesale: "待发布", wholesaleNote: "批零销售额/增加值分口径跟踪", trend: "重点关注回天商圈、未来科学城与文旅消费", leaders: "以区政府领导页为准", people: "每日比对区政府人事与机构公开栏目", stats: "https://www.bjchp.gov.cn/", gov: "https://www.bjchp.gov.cn/", personnel: "https://www.bjchp.gov.cn/"
  },
  {
    key: "密云", tone: "violet", gdp: "475.0", gdpNote: "2025全年 · +5.5%", rank: "市级统一名次待发布", retail: "已发布", retailNote: "2026上半年 · 点击查看官方原表", wholesale: "待发布", wholesaleNote: "2026进度口径", trend: "生态文旅、住宿餐饮与高成长企业是跟踪重点", leaders: "彭利锋 / 于海波", people: "领导信息按区政府公开页每日比对", stats: "https://www.bjmy.gov.cn/zwgk/ztbd/myqsjkfzl/index.html", gov: "https://www.bjmy.gov.cn/zwgk/qld/", personnel: "https://www.bjmy.gov.cn/zwgk/qld/"
  }
];

const soe = [
  ["东城", "城市更新进入项目化推进阶段", "前门东区、磁器口东街区及老旧电梯更新等项目持续形成建设和运营需求。", "https://www.bjdch.gov.cn/"],
  ["石景山", "区政府与首钢集团深化战略协同", "围绕“两园一河”、未来数字空间及城市更新场景，跟踪区企合作落地。", "https://www.bjsjs.gov.cn/gongkai/zwgkpd/zxgk_ywdt/202606/t20260610_762268_sjs.shtml"],
  ["房山", "保障房与区域投资协同", "关注北京市保障房中心、燕房投资等主体参与的住房与城市更新项目。", "https://www.bjfsh.gov.cn/zhxw/fsdt/202608/t20260803_40116115.shtml"],
  ["昌平", "区属国企动态监测中", "聚焦未来科学城、回天地区和文旅资产运营，新增信息须经官方页面核验。", "https://www.bjchp.gov.cn/"],
  ["密云", "产业与生态价值转化", "跟踪区属平台在生态文旅、乡村振兴和产业园区运营中的公开动态。", "https://www.bjmy.gov.cn/ywdt/rdgz/202603/t20260303_532374.html"]
];

const procurement = [
  ["东城", "区国动办", "郊区干线早期人防工程回填项目勘察设计", "约2,878㎡", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260817_4826027.html"],
  ["石景山", "官方入口", "政府采购与区级通知公告每日监测", "动态更新", "https://www.bjsjs.gov.cn/gongkai/zwgkpd/"],
  ["房山", "官方入口", "采购公告、成交公告及工程招标每日监测", "动态更新", "https://www.bjfsh.gov.cn/zwgk/"],
  ["昌平", "官方入口", "政府采购及公共资源交易信息每日监测", "动态更新", "https://www.bjchp.gov.cn/"],
  ["密云", "官方入口", "政府采购、工程招标与结果公告每日监测", "动态更新", "https://www.bjmy.gov.cn/zwgk/"],
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

      <div className="table-panel">
        <div className="panel-title"><div><h3>五区经济对比</h3><p>GDP采用最新已核验年度值；排名须等待全市统一口径，不以媒体估算替代。</p></div><span>单位：亿元 / %</span></div>
        <div className="compare-table">
          <div className="tr th"><span>区域</span><span>GDP</span><span>全市排名</span><span>2026上半年社零</span><span>批零指标</span><span>官方</span></div>
          {districts.map(d=><div className="tr" key={d.key}><span><i className={d.tone}/><b>{d.key}</b></span><span><b>{d.gdp}</b><small>{d.gdpNote}</small></span><span><em>{d.rank}</em></span><span><b>{d.retail}</b><small>{d.retailNote}</small></span><span><b>{d.wholesale}</b><small>{d.wholesaleNote}</small></span><span><a href={d.stats} target="_blank">原文 ↗</a></span></div>)}
        </div>
      </div>
      <div className="method"><b>口径提示</b><p>“批发零售业增加值”与“批零商品销售额”不是同一指标；表内均保留名称和统计期。GDP全市排名仅在各区同一统计期、同一核算口径齐备后生成。</p></div>
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
      <div className="section-head light"><div><span>04 / SOE WATCH</span><h2>国有企业重要动态</h2></div><p>区属平台、重大合作、投资与资产运营</p></div>
      <div className="soe-grid">{soe.map(item=><a href={item[3]} target="_blank" key={item[0]}><article><span>{item[0]}区</span><h3>{item[1]}</h3><p>{item[2]}</p><em>官方来源 ↗</em></article></a>)}</div>
    </section>

    <section className="section" id="procurement">
      <div className="section-head"><div><span>05 / PROCUREMENT</span><h2>政府采购与招标雷达</h2></div><p>最新公告与各区官方入口</p></div>
      <div className="procurement-list">{procurement.map(item=><a href={item[4]} target="_blank" key={item[0]}><article><span>{item[0]}</span><div><small>{item[1]}</small><h3>{item[2]}</h3></div><b>{item[3]}</b><em>查看原文 ↗</em></article></a>)}</div>
      <div className="official-links"><a href="https://www.ccgp-beijing.gov.cn/" target="_blank">北京市政府采购网 ↗</a><a href="https://ggzyfw.beijing.gov.cn/" target="_blank">北京市公共资源交易服务平台 ↗</a></div>
    </section>

    <footer className="site-footer"><div className="brand"><span className="seal">京</span><span>五区经纬<small>BEIJING DISTRICT INTELLIGENCE</small></span></div><p>来源优先级：北京市统计局、各区人民政府、北京市政府采购网、北京市公共资源交易服务平台及官方国资信息。<br/>每条数据保留统计期、发布日期、来源链接和口径说明；“待发布”表示尚未取得可核验官方值。</p><span>© 2026 · 每日 08:30 核验</span></footer>
  </main>
}
