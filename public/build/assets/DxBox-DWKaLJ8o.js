import{r as n}from"./index-DFv2mRv-.js";import{c as o}from"./ReactAppend-z4_qtB7b.js";import{r as a}from"./DxBox-DW2A4T63.js";const m=(s,i=!0)=>$("<div>").css({display:"flex",gap:"8px",alignItems:"flex-center",justifyContent:"flex-start"}).dxBox({direction:"row",items:s.filter(Boolean).map(t=>({ratio:0,baseSize:"auto",template:function(d,p,r){if(i)if(n.isValidElement(t)){const e=document.createElement("div");o(e).render(t),r.append(e)}else{const e=document.createElement("div");e.style.width=t.width,e.style.height=t.height,o(e).render(t.children),r.append(e)}else r.append(a(t))}}))});export{m as D};