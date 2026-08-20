"use client";
import { useEffect, useMemo, useState } from "react";

type Row = Record<string, string | number | null>;
export default function LedgerClient({kind}:{kind:"soe"|"procurement"}){
  const [rows,setRows]=useState<Row[]>([]),[district,setDistrict]=useState(""),[q,setQ]=useState(""),[loading,setLoading]=useState(true),[error,setError]=useState("");
  const since=useMemo(()=>{const d=new Date();d.setDate(d.getDate()-90);return d.toISOString().slice(0,10)},[]);
  useEffect(()=>{setLoading(true);const p=new URLSearchParams({since});if(district)p.set("district",district);if(q)p.set("q",q);fetch(`/api/${kind}?${p}`).then(r=>r.ok?r.json():Promise.reject()).then(d=>{setRows(d.rows||[]);setError("")}).catch(()=>setError("数据库正在初始化或历史数据尚未导入")).finally(()=>setLoading(false))},[kind,district,q,since]);
  return <><div className="ledger-filters"><select value={district} onChange={e=>setDistrict(e.target.value)}><option value="">全部区域</option>{["东城","石景山","房山","昌平","密云"].map(x=><option key={x}>{x}</option>)}</select><input value={q} onChange={e=>setQ(e.target.value)} placeholder="搜索项目、企业或采购人"/><span>覆盖起始：{since}</span></div>{loading?<p className="empty-state">正在读取台账…</p>:error?<p className="empty-state">{error}。页面结构已就绪，导入完成后自动显示。</p>:rows.length===0?<p className="empty-state">当前筛选条件下暂无已导入记录。</p>:<div className="ledger-table">{rows.map((r,i)=><a href={String(r.sourceUrl)} target="_blank" key={String(r.id??i)}><article><time>{String(r.publishedAt)}</time><b>{String(r.district)}区</b><div><h3>{String(r.title)}</h3><p>{String(r.summary??r.purchaser??"")}</p></div><span>{String(r.eventType??r.noticeType??"")}</span><em>{String(r.sourceName)} ↗</em></article></a>)}</div>}</>
}
