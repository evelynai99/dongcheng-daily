const ranking = [
  ["海淀区", "约1.30万亿", 100], ["朝阳区", "约9900亿", 76],
  ["西城区", "6314.0亿", 49], ["东城区", "3950.7亿", 31],
  ["大兴区", "约3500亿", 27], ["顺义区", "约2600亿", 20],
];

const changes = [
  { date: "2026.03.06", name: "马媛等2人", detail: "区政府发布新一批任免通知", tag: "任免" },
  { date: "2026.02.27", name: "龚新宇等16人", detail: "涉及街道、东城园管委会、区财政局等单位", tag: "集中调整" },
  { date: "2026.01.04", name: "郝文静等4人", detail: "区政府发布任免职通知", tag: "任免" },
];

const tenders = [
  ["区国动办", "郊区干线早期人防工程回填项目勘察设计", "约2878㎡", "报名中", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260817_4826027.html"],
  ["王府井管委会", "会议室、信访室及公共区域空间改造", "10万元", "已截止", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260814_4823350.html"],
  ["崇外街道", "崇文商圈“多杆合一”整治项目设计", "18.72万元", "已截止", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260814_4822543.html"],
  ["崇外街道", "“多杆合一”整治项目全过程管理", "6.66万元", "已截止", "https://www.bjdch.gov.cn/zwgk/tzgg/202608/t20260814_4822538.html"],
];

export default function Home() {
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="seal">东</span><span>东城经纬<small>DONGCHENG DAILY</small></span></a>
        <nav><a href="#economy">经济</a><a href="#people">人事</a><a href="#soe">国企</a><a href="#tenders">招采</a></nav>
        <div className="live"><i />每日更新 · 08:30</div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">北京市东城区 · 2026 决策情报台</div>
        <h1>读懂东城，<em>每天早一点。</em></h1>
        <p>聚合官方统计、人事任免、区属国企与政府采购信息，为政企研究和市场判断提供一页式晨报。</p>
        <div className="hero-meta"><span>数据状态 <b>已更新</b></span><span>最近核验 2026.08.20 08:41</span><span>官方来源 12 个</span></div>
      </section>

      <section className="ticker" aria-label="今日要点">
        <b>今日速览</b><span>上半年社零额678.9亿元、增长5.4%</span><span>全国7月制造业PMI回落至49.2%</span><span>消费规模居全市第三</span><span>新增人防工程勘察设计比选</span>
      </section>

      <section className="section" id="economy">
        <div className="section-head"><div><span>01 / ECONOMY</span><h2>经济运行温度</h2></div><p>年度总量与最新月度进度结合观察</p></div>
        <div className="metrics">
          <article className="metric featured"><label>2025 地区生产总值</label><strong>3,950.7<small>亿元</small></strong><div className="delta up">↑ 4.5% <span>同比</span></div><p>第三产业占比 98.7%</p></article>
          <article className="metric"><label>2026 上半年社零额</label><strong>678.9<small>亿元</small></strong><div className="delta up">↑ 5.4% <span>同比</span></div><p>占全市10.3%，规模居全市第三</p></article>
          <article className="metric"><label>批发零售业增加值</label><strong>387.6<small>亿元</small></strong><div className="delta up">↑ 5.7% <span>2025全年</span></div><p>不等同于商品销售额</p></article>
          <article className="metric"><label>全国制造业 PMI</label><strong>49.2<small>%</small></strong><div className="delta down">收缩区间</div><p>2026年7月；东城区未单独发布</p></article>
        </div>

        <div className="split">
          <article className="panel ranking"><div className="panel-title"><h3>北京市各区 GDP 排名</h3><span>2025 · 初步核算</span></div>
            <p className="note">东城区暂列第 4 位；非统一核算区数据标注“约”，待市级终核。</p>
            <div className="rank-list">{ranking.map((r,i)=><div className={r[0]==="东城区"?"rank active":"rank"} key={r[0]}><b>{String(i+1).padStart(2,"0")}</b><span>{r[0]}</span><div><i style={{width:`${r[2]}%`}} /></div><em>{r[1]}</em></div>)}</div>
          </article>
          <article className="panel trend"><div className="panel-title"><h3>消费趋势雷达</h3><span>最新：2026年上半年</span></div>
            <div className="trend-chart"><div className="ylabels"><span>15%</span><span>10%</span><span>5%</span><span>0%</span></div><div className="bars"><div><i style={{height:"88%"}}/><b>13.7%</b><span>2025社零</span></div><div><i style={{height:"39%"}}/><b>5.7%</b><span>1—5月</span></div><div><i style={{height:"37%"}}/><b>5.4%</b><span>上半年</span></div><div className="negative"><i style={{height:"15%"}}/><b>-2.2%</b><span>全市上半年</span></div></div></div>
            <div className="insight"><b>研判</b><p>东城区消费继续跑赢全市7.6个百分点，但较2025全年高增速明显回落；首店、文商旅融合和城市更新场景仍是主要支撑。</p></div>
          </article>
        </div>
      </section>

      <section className="dark-section" id="people">
        <div className="section-head light"><div><span>02 / GOVERNANCE</span><h2>领导班子与人事变化</h2></div><p>以区政府任免文件为准，部门页面为辅</p></div>
        <div className="leaders">
          <article><label>区委</label><h3>书记 · 孙新军</h3><p>副书记：陈献森、桑硼飞</p></article>
          <article><label>区政府</label><h3>区长 · 陈献森</h3><p>常务副区长：王华伟</p></article>
          <article><label>区人大</label><h3>主任 · 肖志刚</h3><p>党组书记、主任</p></article>
          <article><label>区政协</label><h3>主席 · 汤钦飞</h3><p>党组书记、主席</p></article>
        </div>
        <div className="timeline">{changes.map(c=><article key={c.date}><time>{c.date}</time><div><span>{c.tag}</span><h3>{c.name}</h3><p>{c.detail}</p></div></article>)}</div>
        <a className="text-link" href="https://www.bjdch.gov.cn/zwgk/rsxx/rsrm/index.html" target="_blank">查看东城区人事任免原文 ↗</a>
      </section>

      <section className="section two-cols" id="soe">
        <div><div className="section-head compact"><div><span>03 / SOE WATCH</span><h2>国企重要动态</h2></div></div>
          <div className="news-list">
            <article><time>规划信号</time><h3>“十五五”推进国有经济布局优化与穿透式监管</h3><p>关注同质业务整合、经营绩效与城市公共服务能力。</p></article>
            <article><time>项目机会</time><h3>城市更新进入项目化推进阶段</h3><p>前门东区、磁器口东街区、老旧电梯更新将形成持续需求。</p></article>
            <article><time>重点企业</time><h3>文旅、资产运营与城市服务板块活跃</h3><p>持续跟踪东城文旅发展集团、崇远集团、京诚集团等区属企业。</p></article>
          </div>
        </div>
        <div id="tenders"><div className="section-head compact"><div><span>04 / PROCUREMENT</span><h2>政府采购与招标</h2></div></div>
          <div className="tender-list">{tenders.map(t=><a href={t[4]} target="_blank" key={t[1]}><article><div><span>{t[0]}</span><h3>{t[1]}</h3></div><b>{t[2]}</b><em>{t[3]} ↗</em></article></a>)}</div>
          <div className="source-links"><a href="https://www.ccgp-beijing.gov.cn/" target="_blank">北京市政府采购网 ↗</a><a href="https://www.bjdch.gov.cn/zwgk/tzgg/" target="_blank">东城区通知公告 ↗</a></div>
        </div>
      </section>

      <footer><div className="brand"><span className="seal">东</span><span>东城经纬<small>DONGCHENG DAILY</small></span></div><p>数据来自北京市统计局、东城区人民政府、北京市政府采购网等官方渠道。<br/><a href="https://www.bjdch.gov.cn/ywdt/xdcb/202607/P020260728617203216051.pdf" target="_blank">东城区上半年数据</a> · <a href="https://www.stats.gov.cn/sj/zxfbhjd/202607/t20260731_1964253.html" target="_blank">国家统计局7月PMI</a> · 重要决策以发布机关原文为准。</p><span>© 2026 · 每日 08:30 更新</span></footer>
    </main>
  );
}
