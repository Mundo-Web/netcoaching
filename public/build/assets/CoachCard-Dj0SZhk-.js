import{j as e}from"./StatisticCard-Bdo2C3ON.js";import{i as f}from"./tippy-react.esm-BVvHiWwH.js";import"./index-DFv2mRv-.js";const p=({uuid:a,name:i,lastname:r,country:l,city:t,summary:n,specialties:x,experience:c,trained_hours:d,price:m})=>e.jsx(e.Fragment,{children:e.jsx("a",{href:`/profile/${a}`,children:e.jsxs("article",{className:"flex flex-col w-full",children:[e.jsx("div",{className:"flex flex-col w-full rounded-t-lg",children:e.jsx("img",{loading:"lazy",src:`/api/profile/${a}`,alt:"Profile picture of Cameron Williamson",className:"object-cover object-center w-full rounded-t-lg aspect-square",onError:s=>s.target.src="/api/profile/thumbnail/null"})}),e.jsxs("div",{className:"flex flex-col w-full text-cyan-950 border p-2 rounded-b-lg",children:[e.jsxs("div",{className:"flex flex-col gap-2 items-start w-full text-xs font-medium leading-tight text-cyan-950",children:[e.jsxs("div",{className:"flex flex-row w-full",children:[e.jsx("i",{className:"fas fa-globe-americas me-1"}),e.jsx("span",{className:"self-stretch my-auto truncate",children:l!=null&&l.name||t?`${l==null?void 0:l.name}, ${t}`.trim():"Sin nacionalidad"})]}),e.jsxs("div",{className:"flex flex-row w-full",children:[e.jsx("i",{className:"fa fa-flag me-1"}),e.jsx("span",{className:"self-stretch my-auto truncate",children:c>0?e.jsxs(e.Fragment,{children:[c," años de experiencia"]}):"Sin experiencia"})]}),e.jsxs("div",{className:"flex flex-row w-full",children:[e.jsx("i",{className:"fa fa-hourglass-half me-1"}),e.jsxs("span",{className:"self-stretch my-auto truncate",children:[d,"h entrenadas"]})]})]}),e.jsxs("div",{className:"flex flex-col mt-1 w-full text-sm",children:[e.jsx(f,{content:`${i} ${r}`,children:e.jsxs("h2",{className:"flex-1 shrink gap-2 w-full text-xl font-bold leading-tight truncate",children:[i," ",r]})}),e.jsx("marquee",{className:"mt-1 font-medium leading-tight text-red-500",children:x.map(({name:s})=>s).join(" | ").trim()||e.jsx("i",{children:"- Sin especialidades -"})}),e.jsx("p",{className:"mt-2 leading-5 line-clamp-3 text-ellipsis h-[60px]",children:n||e.jsx("i",{children:"- Sin descripcion -"})})]}),e.jsxs("p",{className:"mt-2 text-lg font-bold leading-snug",children:["S/. ",Number(m).toFixed(2)]})]})]})})});export{p as C};