var c=Object.defineProperty;var l=(t,e,s)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var r=(t,e,s)=>(l(t,typeof e!="symbol"?e+"":e,s),s);import{j as a}from"./StatisticCard-Bdo2C3ON.js";import{r as n}from"./index-DFv2mRv-.js";import{c as o}from"./ReactAppend-CwiwA4iz.js";import{B as m}from"./Base-D2jNg5O4.js";import{C as d}from"./CreateReactScript-yWJ4gJYl.js";import{T as p,R as i}from"./ReactAppend-B_xoNf1Y.js";import{B as h}from"./Content-DtiuTMAn.js";import{i as x}from"./tippy-react.esm-BVvHiWwH.js";import"./index-DgyC5pTR.js";/* empty css              */import"./main-BBbUrZUL.js";import"./___vite-browser-external_commonjs-proxy-BQdpDcDf.js";import"./index.esm-B502ZfUP.js";/* empty css               */class u extends h{constructor(){super(...arguments);r(this,"path","coachee/requests")}}const f=new u,b=()=>{const t=n.useRef();return a.jsx(a.Fragment,{children:a.jsx(p,{gridRef:t,title:a.jsxs(a.Fragment,{children:[a.jsx("div",{className:"float-end",children:a.jsxs("a",{href:"/coaches",className:"btn btn-xs btn-soft-primary",target:"_blank",children:[a.jsx("i",{className:"fa fa-calendar me-1"}),"Contactar Coach"]})}),a.jsx("h4",{className:"header-title mb-0 mt-1",children:"Solicitudes de Coaching/Mentoring"})]}),rest:f,toolBar:e=>{e.unshift({widget:"dxButton",location:"after",options:{icon:"refresh",hint:"Refrescar tabla",onClick:()=>$(t.current).dxDataGrid("instance").refresh()}})},columns:[{dataField:"id",caption:"ID",visible:!1},{dataField:"coach.name",caption:"Coach",cellTemplate:(e,{data:s})=>{i(e,a.jsxs("a",{href:`/profile/${s.coach.uuid}`,className:"d-flex gap-2 align-items-center",target:"_blank",children:[a.jsx("div",{className:"inbox-item-img",children:a.jsx("img",{src:`/api/profile/thumbnail/${s.coach.relative_id}`,className:"rounded-circle avatar-sm",alt:""})}),a.jsxs("div",{children:[a.jsxs("h5",{className:"inbox-item-author mt-0 mb-0",children:[s.coach.name," ",s.coach.lastname]}),a.jsx("p",{className:"inbox-item-text mb-0",children:s.coach.email})]})]}))}},{dataField:"updated_at",caption:"Fecha",dataType:"date",cellTemplate:(e,{data:s})=>{e.text(moment(s.updated_at).format("LL"))}},{dataField:"status",caption:"Estado",dataType:"boolean",cellTemplate:(e,{data:s})=>{switch(s.status){case 1:i(e,a.jsx("span",{className:"badge bg-success rounded-pill",children:"Atendido"}));break;case 0:i(e,a.jsx("span",{className:"badge bg-dark rounded-pill",children:"Pendiente"}));break;default:i(e,a.jsx("span",{className:"badge bg-danger rounded-pill",children:"Rechazado"}));break}s.status==null&&i(e,a.jsx(x,{content:s.status_message,children:a.jsx("p",{className:"mb-0 text-truncate text-muted",children:s.status_message})}))}}]})})};d((t,e)=>{o(t).render(a.jsx(m,{...e,title:"Solicitudes",children:a.jsx(b,{...e})}))});