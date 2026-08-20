import LedgerClient from "../ledger-client";
import "../ledger-pages.css";
export default function SoePage(){return <main className="ledger-page"><header><a href="/">← 返回首页</a><span>2026 · 滚动近90天</span></header><section><label>SOE LEDGER</label><h1>五区国有企业动态</h1><p>覆盖区属国企，以及央企、市属国企在五区的改革重组、投资建设、资产运营、融资与重大经营事项。</p></section><LedgerClient kind="soe"/></main>}
