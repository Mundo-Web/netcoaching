import{j as e}from"./StatisticCard-Bdo2C3ON.js";import{r as f}from"./index-DFv2mRv-.js";import{i as m}from"./tippy-react.esm-3ehftxB_.js";/* empty css              */import{m as t}from"./main-BBbUrZUL.js";import{a as x}from"./index.esm-B502ZfUP.js";const j=()=>{const s=new Date().getFullYear();return e.jsx("footer",{className:"footer",children:e.jsx("div",{className:"container-fluid",children:e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"col-md-6",children:[s," © Atalaya | Propiedad de ",e.jsx("a",{href:"//mundoweb.pe",children:"Mundo Web"})]}),e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"text-md-end footer-links d-none d-sm-block",children:[e.jsx("a",{href:"#",children:"Sobre nosotros"}),e.jsx("a",{href:"#",children:"Manual de usuario"}),e.jsx("a",{href:"#",children:"Contactanos"})]})})]})})})},h=async()=>{try{const{status:s,result:c}=await t.Fetch("/api/logout",{method:"DELETE"});if(!s)throw new Error((c==null?void 0:c.message)||"Ocurrio un error al cerrar sesion");t.Notify.add({icon:"/assets/img/logo-login.svg",title:"Cierre de sesion exitoso",body:"Sera enviado a la pantalla de autenticacion"}),location.reload()}catch(s){t.Notify.add({icon:"/assets/img/logo-login.svg",title:"Error",body:s.message,type:"danger"})}},a=({href:s,icon:c,children:i})=>e.jsx("li",{className:location.pathname.startsWith(s)?"menuitem-active":"",children:e.jsxs(x,{href:s,className:location.pathname.startsWith(s)?"active":"",children:[e.jsx("i",{className:c}),e.jsxs("span",{children:[" ",i," "]})]})}),p=({title:s,icon:c,children:i})=>{var o;const r=[];Array.isArray(i)?i.forEach(l=>{var u;return r.push((u=l==null?void 0:l.props)==null?void 0:u.href)}):r.push((o=i==null?void 0:i.props)==null?void 0:o.href);const d=r.filter(Boolean).some(l=>location.pathname.includes(l)),n=`item-${crypto.randomUUID()}`;return e.jsxs("li",{children:[e.jsxs("a",{href:`#${n}`,"data-bs-toggle":"collapse","aria-expanded":d,children:[e.jsx("i",{className:c}),e.jsxs("span",{children:[" ",s," "]}),e.jsx("span",{className:"menu-arrow"})]}),e.jsx("div",{className:`collapse ${d&&"show"}`,id:n,children:e.jsx("ul",{className:"nav-second-level",children:i})})]})},b=({session:s,can:c,hasRole:i})=>{const r=s.roles[0],d=moment(s.birthdate).format("MM-DD")==moment().format("MM-DD");return e.jsx("div",{className:"left-side-menu",children:e.jsxs("div",{className:"h-100","data-simplebar":!0,children:[e.jsxs("div",{className:"user-box text-center",children:[e.jsx("img",{src:`/api/profile/thumbnail/${s.uuid}?v=${new Date(s.updated_at).getTime()}`,alt:s.name,title:s.name,className:"rounded-circle img-thumbnail avatar-md",style:{backgroundColor:"unset",borderColor:"#98a6ad",objectFit:"cover",objectPosition:"center"}}),e.jsxs("div",{className:"dropdown",children:[e.jsxs("a",{href:"#",className:"user-name dropdown-toggle h5 mt-2 mb-1 d-block","data-bs-toggle":"dropdown","aria-expanded":"false",children:[s.name.split(" ")[0]," ",s.lastname.split(" ")[0]," ",d?e.jsx(m,{content:`Feliz cumpleaños ${s.name}`,arrow:!0,children:e.jsx("i",{className:" fas fa-birthday-cake text-danger"})}):""]}),e.jsxs("div",{className:"dropdown-menu user-pro-dropdown",children:[e.jsxs("a",{href:"/profile",className:"dropdown-item notify-item",children:[e.jsx("i",{className:"fe-user me-1"}),e.jsx("span",{children:"Mi perfil"})]}),e.jsxs("a",{href:"/account",className:"dropdown-item notify-item",children:[e.jsx("i",{className:"mdi mdi-account-key-outline me-1"}),e.jsx("span",{children:"Mi cuenta"})]}),e.jsxs("a",{href:"#",className:"dropdown-item notify-item right-bar-toggle dropdown notification-list",children:[e.jsx("i",{className:"fe-settings me-1"}),e.jsx("span",{children:"Configuracion"})]}),e.jsxs("a",{href:"#",className:"dropdown-item notify-item",onClick:h,children:[e.jsx("i",{className:"fe-log-out me-1"}),e.jsx("span",{children:"Cerrar sesion"})]})]})]}),e.jsx("p",{className:"text-muted left-user-info",children:r.name}),e.jsxs("ul",{className:"list-inline",children:[e.jsx("li",{className:"list-inline-item",children:e.jsx(m,{content:"Configuracion",children:e.jsx("a",{href:"#",className:"text-muted left-user-info right-bar-toggle dropdown notification-list",children:e.jsx("i",{className:"mdi mdi-cog"})})})}),e.jsx("li",{className:"list-inline-item",children:e.jsx(m,{content:"Cerrar sesion",children:e.jsx("a",{href:"#",className:"text-danger",onClick:h,children:e.jsx("i",{className:"mdi mdi-power"})})})})]})]}),e.jsx("div",{id:"sidebar-menu",className:"show",children:e.jsxs("ul",{id:"side-menu",children:[e.jsx("li",{className:"menu-title",children:"Navigation Panel"}),i("Admin")&&e.jsxs(e.Fragment,{children:[e.jsx(a,{href:"/admin/home",icon:"mdi mdi-home",children:"Dashboard"}),e.jsx(a,{href:"/admin/coaches",icon:"mdi mdi-account-group",children:"Coaches"}),e.jsx(a,{href:"/admin/resources",icon:"mdi mdi-cube",children:"Recursos"}),e.jsx("li",{className:"menu-title",children:"Landing Page"}),e.jsx(a,{href:"/admin/about",icon:"mdi mdi-briefcase",children:"Nosotros"}),e.jsx(a,{href:"/admin/indicators",icon:"mdi mdi-dots-grid",children:"Indicadores"}),e.jsx(a,{href:"/admin/sliders",icon:"mdi mdi-page-layout-body",children:"Sliders"}),e.jsx(a,{href:"/admin/benefits",icon:"mdi mdi-cube-outline",children:"Beneficios"}),e.jsx(a,{href:"/admin/testimonies",icon:"mdi mdi-forum",children:"Testimonios"}),e.jsx(a,{href:"/admin/events",icon:"mdi mdi-calendar",children:"Programas y Eventos"})]}),i("Coach")&&e.jsxs(e.Fragment,{children:[e.jsx(a,{href:"/coach/home",icon:"mdi mdi-home",children:"Dashboard"}),e.jsxs(p,{title:"Procesos",icon:"mdi mdi-file-document",children:[e.jsx(a,{href:"/coach/requests",icon:"mdi mdi-file-download",children:"Solicitudes"}),e.jsx(a,{href:"/coach/agreements",icon:"mdi mdi-handshake",children:"Acuerdos realizados"}),e.jsx(a,{href:"/coach/approved-agreements",icon:"mdi mdi-handshake-outline",children:"Acuerdos aprobados"}),e.jsx(a,{href:"/coach/sessions",icon:"mdi mdi-playlist-play",children:"Sesiones"})]}),e.jsx(a,{href:"/coach/calendar",icon:"mdi mdi-calendar",children:"Calendario"}),e.jsx(a,{href:"/coach/resources",icon:"mdi mdi-cube",children:"Recursos"}),e.jsx(a,{href:"/coach/payments",icon:"mdi mdi-currency-usd",children:"Pagos"})]}),e.jsx("li",{className:"menu-title",children:"Configuraciones"}),e.jsx(a,{href:"/coach/profile",icon:"mdi mdi-account-box",children:"Mi perfil"}),e.jsx(a,{href:"/coach/bank-accounts",icon:"mdi mdi-credit-card-settings",children:"Cuentas bancarias"})]})}),e.jsx("div",{className:"clearfix"})]})})},g=({session:s={},title:c="Pagina"})=>(f.useEffect(()=>{document.title=`${c} | Net Coaching`},[null]),e.jsxs("div",{className:"navbar-custom",children:[e.jsxs("ul",{className:"list-unstyled topnav-menu float-end mb-0",children:[e.jsxs("li",{className:"dropdown notification-list topbar-dropdown",children:[e.jsxs("a",{className:"nav-link dropdown-toggle nav-user me-0 waves-effect waves-light","data-bs-toggle":"dropdown",href:"#",role:"button","aria-haspopup":"false","aria-expanded":"false",children:[e.jsx("img",{src:`/api/profile/thumbnail/${s.uuid}?v=${crypto.randomUUID()}`,alt:"user-image",className:"rounded-circle",style:{objectFit:"cover",objectPosition:"center"}}),e.jsxs("span",{className:"pro-user-name ms-1",children:[s.name," ",s.lastname,e.jsx("i",{className:"mdi mdi-chevron-down"})]})]}),e.jsxs("div",{className:"dropdown-menu dropdown-menu-end profile-dropdown ",children:[e.jsx("div",{className:"dropdown-header noti-title",children:e.jsx("h6",{className:"text-overflow m-0",children:"Bienvenido !"})}),e.jsxs("a",{href:"/profile",className:"dropdown-item notify-item",children:[e.jsx("i",{className:"fe-user"}),e.jsx("span",{children:"Mi perfil"})]}),e.jsxs("a",{href:"/account",className:"dropdown-item notify-item",children:[e.jsx("i",{className:"mdi mdi-account-key-outline"}),e.jsx("span",{children:"Mi cuenta"})]}),e.jsxs("a",{href:"#",className:"dropdown-item notify-item right-bar-toggle dropdown notification-list",children:[e.jsx("i",{className:"fe-lock"}),e.jsx("span",{children:"Configuracion"})]}),e.jsx("div",{className:"dropdown-divider"}),e.jsxs("a",{href:"#",className:"dropdown-item notify-item",onClick:h,children:[e.jsx("i",{className:"fe-log-out"}),e.jsx("span",{children:"Cerrar sesion"})]})]})]}),e.jsx("li",{className:"dropdown notification-list",children:e.jsx("a",{href:"#",className:"nav-link right-bar-toggle waves-effect waves-light",children:e.jsx("i",{className:"fe-settings noti-icon"})})})]}),e.jsxs("div",{className:"logo-box",children:[e.jsxs("a",{href:"/home",className:"logo logo-light text-center",children:[e.jsx("span",{className:"logo-sm",children:e.jsx("img",{src:"/assets/img/icon.svg",alt:"",height:"22"})}),e.jsx("span",{className:"logo-lg",children:e.jsx("img",{src:"/assets/img/logo.svg",alt:"",height:"16"})})]}),e.jsxs("a",{href:"/home",className:"logo logo-dark text-center",children:[e.jsx("span",{className:"logo-sm",children:e.jsx("img",{src:"/assets/img/icon-dark.svg",alt:"",height:"22"})}),e.jsx("span",{className:"logo-lg",children:e.jsx("img",{src:"/assets/img/logo-dark.svg",alt:"",height:"16"})})]})]}),e.jsxs("ul",{className:"list-unstyled topnav-menu topnav-menu-left mb-0",children:[e.jsx("li",{children:e.jsx("button",{className:"button-menu-mobile disable-btn waves-effect",children:e.jsx("i",{className:"fe-menu"})})}),e.jsx("li",{children:e.jsx("h4",{className:"page-title-main",children:c})})]}),e.jsx("div",{className:"clearfix"})]})),N=()=>{const s=t.Local.get("adminto_settings")??{},c=document.getElementById("bs-default-stylesheet"),i=document.getElementById("bs-dark-stylesheet"),r=document.getElementById("app-default-stylesheet"),d=document.getElementById("app-dark-stylesheet"),n=document.getElementById("dg-default-stylesheet"),o=document.getElementById("dg-dark-stylesheet");s.theme=="dark"?(i.disabled=!1,d.disabled=!1,o.disabled=!1,c.disabled=!0,r.disabled=!0,n.disabled=!0):(c.disabled=!1,r.disabled=!1,n.disabled=!1,i.disabled=!0,d.disabled=!0,o.disabled=!0);const l=document.body;return l.setAttribute("data-layout-width",s.width??"fluid"),l.setAttribute("data-layout-menu-position",s.menuPosition??"fixed"),l.setAttribute("data-sidebar-color",s.menuColor??"light"),l.setAttribute("data-sidebar-showuser",s.userInfo??!0),l.setAttribute("data-sidebar-size",s.menuSize??"default"),l.setAttribute("data-topbar-color",s.navbarColor??"light"),e.jsx("div",{className:"right-bar",children:e.jsxs("div",{"data-simplebar":!0,className:"h-100",children:[e.jsxs("div",{className:"rightbar-title",children:[e.jsx("a",{href:"#",className:"right-bar-toggle float-end",children:e.jsx("i",{className:"mdi mdi-close"})}),e.jsx("h4",{className:"font-16 m-0 text-white",children:"Configurar tema"})]}),e.jsx("div",{className:"tab-content pt-0",children:e.jsx("div",{className:"tab-pane active",id:"settings-tab",role:"tabpanel",children:e.jsxs("div",{className:"p-3",children:[e.jsxs("div",{className:"alert alert-warning",role:"alert",children:[e.jsx("strong",{children:"Modifica "})," el tema, el menu, la barra superior, etc."]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Tema principal"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"color-scheme-mode",id:"light-mode-check",defaultChecked:s.theme=="dark"}),e.jsx("label",{className:"form-check-label",htmlFor:"light-mode-check",children:s.theme=="dark"?"Modo oscuro":"Modo claro"})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Ancho de la ventana"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"width",id:"fluid-check",defaultChecked:s.width=="boxed"}),e.jsx("label",{className:"form-check-label",htmlFor:"fluid-check",children:s.width=="boxed"?"Encuadrado":"Completo"})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Posicion del menu y el nabvar"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"menus-position",id:"fixed-check",defaultChecked:s.menuPosition=="scrollable"}),e.jsx("label",{className:"form-check-label",htmlFor:"fixed-check",children:s.menuPosition=="scrollable"?"Posision dinamica":"Posicion fija"})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Color del menu"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-color",value:"light",id:"light-check",defaultChecked:!s.menuColor||s.menuColor=="light"}),e.jsx("label",{className:"form-check-label",htmlFor:"light-check",children:"Claro"})]}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-color",value:"dark",id:"dark-check",defaultChecked:s.menuColor=="dark"}),e.jsx("label",{className:"form-check-label",htmlFor:"dark-check",children:"Oscuro"})]}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-color",value:"brand",id:"brand-check",defaultChecked:s.menuColor=="brand"}),e.jsx("label",{className:"form-check-label",htmlFor:"brand-check",children:"Brand"})]}),e.jsxs("div",{className:"form-check form-switch mb-3",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-color",value:"gradient",id:"gradient-check",defaultChecked:s.menuColor=="gradient"}),e.jsx("label",{className:"form-check-label",htmlFor:"gradient-check",children:"Gradiente"})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Medida del menu"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-size",value:"default",id:"default-size-check",defaultChecked:!s.menuSize||s.menuSize=="default"}),e.jsx("label",{className:"form-check-label",htmlFor:"default-size-check",children:"Por defecto"})]}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-size",value:"condensed",id:"condensed-check",defaultChecked:s.menuSize=="condensed"}),e.jsxs("label",{className:"form-check-label",htmlFor:"condensed-check",children:["Condensado ",e.jsx("small",{children:"(Tamaño extra pequeño)"})]})]}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"radio",className:"form-check-input",name:"leftsidebar-size",value:"compact",id:"compact-check",defaultChecked:s.menuSize=="compact"}),e.jsxs("label",{className:"form-check-label",htmlFor:"compact-check",children:["Compacto ",e.jsx("small",{children:"(Tamaño pequeño)"})]})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Informacion del Usuario (Menu)"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"leftsidebar-user",value:"fixed",id:"sidebaruser-check",defaultChecked:s.userInfo!=!1}),e.jsx("label",{className:"form-check-label",htmlFor:"sidebaruser-check",children:s.userInfo=="false"?"Ocultar":"Mostrar"})]}),e.jsx("h6",{className:"fw-medium font-14 mt-4 mb-2 pb-1",children:"Color de la barra superior"}),e.jsxs("div",{className:"form-check form-switch mb-1",children:[e.jsx("input",{type:"checkbox",className:"form-check-input",name:"topbar-color",value:"dark",id:"darktopbar-check",defaultChecked:s.navbarColor=="dark"}),e.jsx("label",{className:"form-check-label",htmlFor:"darktopbar-check",children:s.navbarColor=="dark"?"Oscuro":"Acorde al cuerpo"})]}),e.jsx("div",{className:"d-grid mt-4",children:e.jsx("button",{className:"btn btn-primary",id:"resetBtn",children:"Restablecer"})})]})})})]})})};moment.tz.setDefault("UTC");const M=({children:s,title:c,...i})=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{id:"wrapper",children:[e.jsx(g,{...i,title:c}),e.jsx(b,{...i}),e.jsxs("div",{className:"content-page",children:[e.jsx("div",{className:"content",children:e.jsx("div",{className:"container-fluid",children:s})}),e.jsx(j,{})]})]}),e.jsx(N,{...i}),e.jsx("div",{className:"rightbar-overlay"})]});export{M as B,h as L};