var N=Object.defineProperty;var b=(a,t,l)=>t in a?N(a,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[t]=l;var h=(a,t,l)=>(b(a,typeof t!="symbol"?t+"":t,l),l);import{j as e}from"./StatisticCard-Bdo2C3ON.js";import{r as m}from"./index-DFv2mRv-.js";import{c as y}from"./ReactAppend-CwiwA4iz.js";import{C as v}from"./CreateReactScript-yWJ4gJYl.js";import{B as R}from"./Base-D3aD7w1W.js";import{A as x}from"./ArrayJoin-2k6ba35P.js";import{B as C}from"./Content-DtiuTMAn.js";import{h as D}from"./html2string-CfCixsO3.js";import"./index-DgyC5pTR.js";import"./index.esm-B502ZfUP.js";import"./___vite-browser-external_commonjs-proxy-BQdpDcDf.js";import"./main-BBbUrZUL.js";/* empty css               *//* empty css              */import"./logo-BjQK9OLG.js";import"./Base-L8eziURm.js";import"./index-Cevqm-zP.js";class k extends C{constructor(){super(...arguments);h(this,"path","resources")}}const M=()=>e.jsx(e.Fragment,{children:e.jsx("section",{className:"flex flex-col items-center px-[5%] py-[12.5%] w-full text-center text-white bg-sky-800 max-md:max-w-full",children:e.jsx("div",{className:"flex flex-col justify-center items-center mb-0 max-w-full w-[665px] max-md:mb-2.5",children:e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsx("p",{className:"text-base leading-6 max-md:max-w-full",children:"En la era digital, el crecimiento profesional y personal se fusionan. Descubre cómo prosperar en un mundo en constante cambio y desbloquea tu máximo potencial."}),e.jsx("h1",{className:"self-center mt-6 text-3xl font-bold  max-md:max-w-full md:text-4xl sm:text-3xl sm:leading-9",children:"Desarrollo Humano en la Era Digital: Claves para el Desarrollo humano y Bienestar Integral"})]})})})}),Y=new k,_=({specialties:a,archive:t,setResources:l})=>{var f;const[n,o]=m.useState(null),[c,u]=m.useState(null),[i,p]=m.useState(((f=t[0])==null?void 0:f.full)||null);m.useEffect(()=>{const s=[];if(n&&s.push(x([["name","contains",n],["description","contains",n]],"or")),c&&s.push(["specialty_id","=",c]),i){const[r,d]=i.split("-").map(Number),g=moment().year(d).month(r-1).startOf("month").format("YYYY-MM-DD [00:00:00]"),w=moment().year(d).month(r-1).endOf("month").format("YYYY-MM-DD [23:59:59]");s.push(x([["created_at",">=",g],["created_at","<=",w]],"and"))}j(x(s,"and"))},[n,c,i]);const j=async s=>{const r=await Y.paginate({filter:s,isLoadingAll:!0,sort:[{selector:"created_at",desc:!1}]}),d=(r==null?void 0:r.data)??[];l(d)};return e.jsx("aside",{className:"flex flex-col w-[21%] max-md:ml-0 max-md:w-full",children:e.jsxs("div",{className:"flex flex-col w-full text-sm leading-snug text-teal-950 max-md:mt-10",children:[e.jsxs("div",{className:"flex gap-2 items-center px-2.5 py-3 w-full font-medium text-black whitespace-nowrap rounded-lg bg-neutral-100",children:[e.jsx("i",{className:"fa fa-search shrink-0 self-stretch my-auto"}),e.jsx("label",{htmlFor:"searchInput",className:"sr-only",children:"Buscar"}),e.jsx("input",{id:"searchInput",type:"text",placeholder:"Buscar",className:"self-stretch my-auto bg-transparent outline-none",onChange:s=>o((s.target.value||"").toLowerCase())})]}),e.jsxs("div",{className:"flex flex-col mt-8 w-full text-center max-w-[200px]",children:[e.jsxs("div",{className:"flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap",children:[e.jsx("div",{className:"self-stretch my-auto",children:"Categorías"}),e.jsx("div",{className:"flex shrink-0 self-stretch my-auto w-5 h-5"})]}),[{id:null,name:"Todos"},...a].map((s,r)=>e.jsxs("div",{className:`flex gap-10 justify-between items-center mt-4 w-full ${s.id==c?"text-red-500":"cursor-pointer"}`,onClick:()=>u(s.id||null),children:[e.jsx("div",{className:"self-stretch my-auto",children:s.name}),c==s.id?e.jsx("i",{className:"mdi mdi-chevron-right text-lg text-red-500"}):""]},r))]}),e.jsx("hr",{className:"w-1/2 mx-auto my-8"}),e.jsxs("div",{className:"flex flex-col w-full text-center max-w-[200px]",children:[e.jsxs("div",{className:"flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap",children:[e.jsx("div",{className:"self-stretch my-auto",children:"Archivo"}),e.jsx("div",{className:"flex shrink-0 self-stretch my-auto w-5 h-5"})]}),t.map((s,r)=>e.jsxs("div",{className:`flex gap-10 justify-between items-center mt-4 w-full ${i==s.full?"font-medium leading-tight text-red-500":""}`,onClick:()=>p(s.full),children:[e.jsxs("div",{className:"self-stretch my-auto",children:[s.month," ",s.year]}),i==s.full?e.jsx("i",{className:"mdi mdi-chevron-right text-lg text-red-500"}):""]},r))]})]})})},B=({resources:a})=>e.jsx("section",{className:"w-full flex flex-col lg:grid lg:grid-cols-2 gap-10",children:a.map((t,l)=>{const n=t.social_media==="youtube"?`https://i.ytimg.com/vi/${t.media_id}/hqdefault.jpg`:`/api/cover/thumbnail/${t.media_id}`,o=`/resources/${t.id}`;return e.jsxs("article",{className:"w-full",children:[e.jsx("a",{href:o,children:e.jsx("img",{loading:"lazy",src:n,alt:"Main content image",className:"object-cover w-full rounded aspect-video",onError:c=>c.target.src="/api/cover/thumbnail/null"})}),e.jsx("a",{href:o,children:e.jsx("h1",{className:"mt-8 mb-4 text-2xl md:text-4xl font-bold leading-10 text-teal-950 truncate",children:t.name})}),e.jsxs("div",{className:"flex gap-4 self-start mt-1 text-sm font-medium leading-tight",children:[e.jsx("time",{className:"grow text-teal-950",children:moment(t.created_at).format("LL")}),e.jsx("img",{loading:"lazy",src:"https://cdn.builder.io/api/v1/image/assets/TEMP/4fc77b0354f3494caefca7a8a115adf92b3833f7bc53a642e715ba4ae4e5c13c?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731",alt:"",className:"object-contain shrink-0 self-start w-0"}),e.jsxs("div",{className:"text-red-500 basis-auto",children:["Categoria: ",e.jsx("span",{className:"text-red-500",children:t.specialty.name})]})]}),e.jsx("p",{className:"mt-2 text-base leading-6 text-cyan-950 line-clamp-3 h-[72px]",children:D(t.description)})]},l)})}),E=({specialties:a,archive:t})=>{const[l,n]=m.useState([]);return e.jsx(e.Fragment,{children:e.jsxs("main",{className:"flex flex-col mt-[68px]",children:[e.jsx(M,{}),e.jsxs("div",{className:"flex gap-5 max-md:flex-col p-[5%]",children:[e.jsx(_,{specialties:a,archive:t,setResources:n}),e.jsx(B,{resources:l})]})]})})};v((a,t)=>{y(a).render(e.jsx(R,{...t,children:e.jsx(E,{...t})}))});