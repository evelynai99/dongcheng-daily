import LedgerClient from "../ledger-client";
import "../ledger-pages.css";
export default function ProcurementPage(){return <main className="ledger-page"><header><a href="/">← 返回首页</a><span>2026 · 滚动近90天</span></header><section><label>PROCUREMENT LEDGER</label><h1>五区政府采购与招标</h1><p>覆盖采购意向、招标/磋商、资格预审、变更、废标、中标成交和合同公告。同一项目按项目编号串联。</p></section><LedgerClient kind="procurement"/></main>}
