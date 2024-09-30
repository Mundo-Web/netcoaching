import Tippy from '@tippyjs/react'
import React from 'react'
import 'tippy.js/dist/tippy.css'
import Logout from '../../Actions/Logout'
import MenuItem from './Menu/MenuItem'
import MenuItemContainer from './Menu/MenuItemContainer'

const Menu = ({ session, hasRole }) => {
  const mainRole = session.roles[0]

  return (<div className="left-side-menu">
    <div className="h-100" data-simplebar>
      <div className="user-box text-center">
        <img src={`/api/profile/thumbnail/${session.uuid}?v=${new Date(session.updated_at).getTime()}`} alt={session.name} title={session.name}
          className="rounded-circle img-thumbnail avatar-md" style={{ backgroundColor: 'unset', borderColor: '#98a6ad', objectFit: 'cover', objectPosition: 'center' }} />
        <div className="dropdown">
          <a href="#" className="user-name dropdown-toggle h5 mt-2 mb-1 d-block" data-bs-toggle="dropdown"
            aria-expanded="false">{session.name.split(' ')[0]} {session.lastname.split(' ')[0]}</a>
          <div className="dropdown-menu user-pro-dropdown">


            <a href="/profile" className="dropdown-item notify-item">
              <i className="fe-user me-1"></i>
              <span>Mi perfil</span>
            </a>

            <a href="/account" className="dropdown-item notify-item">
              <i className="mdi mdi-account-key-outline me-1"></i>
              <span>Mi cuenta</span>
            </a>

            <a href="#" className="dropdown-item notify-item right-bar-toggle dropdown notification-list">
              <i className="fe-settings me-1"></i>
              <span>Configuracion</span>
            </a>

            <a href="#" className="dropdown-item notify-item" onClick={Logout}>
              <i className="fe-log-out me-1"></i>
              <span>Cerrar sesion</span>
            </a>

          </div>
        </div>

        {/* <Tippy content={mainRole.description} arrow={true}> */}
        <p className="text-muted left-user-info" >{mainRole.name}</p>
        {/* </Tippy> */}

        <ul className="list-inline">
          <li className="list-inline-item">
            <Tippy content="Configuracion">
              <a href="#" className="text-muted left-user-info right-bar-toggle dropdown notification-list">
                <i className="mdi mdi-cog"></i>
              </a>
            </Tippy>
          </li>

          <li className="list-inline-item">
            <Tippy content="Cerrar sesion">
              <a href="#" className="text-danger" onClick={Logout}>
                <i className="mdi mdi-power"></i>
              </a>
            </Tippy>
          </li>
        </ul>
      </div>


      <div id="sidebar-menu" className='show'>

        <ul id="side-menu">
          <li className="menu-title">Navigation Panel</li>
          {
            hasRole('Admin') && <>
              <MenuItem href="/admin/home" icon='mdi mdi-home'>Dashboard</MenuItem>
              <MenuItem href="/admin/coaches" icon='mdi mdi-account-group'>Coaches</MenuItem>
              <MenuItem href="/admin/resources" icon='mdi mdi-cube'>Recursos</MenuItem>
              <MenuItem href="/admin/messages" icon='mdi mdi-message-text'>Mensajes</MenuItem>
              <MenuItem href="/admin/subscriptions" icon='mdi mdi-email-multiple'>Suscripciones</MenuItem>
              <li className="menu-title">Landing Page</li>
              <MenuItem href="/admin/about" icon='mdi mdi-briefcase'>Nosotros</MenuItem>
              <MenuItem href="/admin/indicators" icon='mdi mdi-dots-grid'>Indicadores</MenuItem>
              <MenuItem href="/admin/sliders" icon='mdi mdi-page-layout-body'>Sliders</MenuItem>
              <MenuItem href="/admin/benefits" icon='mdi mdi-cube-outline'>Beneficios</MenuItem>
              <MenuItem href="/admin/testimonies" icon='mdi mdi-forum'>Testimonios</MenuItem>
              <MenuItem href="/admin/events" icon='mdi mdi-calendar'>Programas y Eventos</MenuItem>
              <MenuItem href="/admin/faqs" icon='mdi mdi-head-question'>FAQs</MenuItem>
            </>
          }
          {
            hasRole('Coach') && <>
              <MenuItem href="/coach/home" icon='mdi mdi-home'>Dashboard</MenuItem>

              <MenuItemContainer title='Procesos' icon='mdi mdi-file-document'>
                <MenuItem href='/coach/requests' icon='mdi mdi-file-download'>Solicitudes</MenuItem>
                <MenuItem href='/coach/agreements' icon='mdi mdi-handshake-outline'>Acuerdos</MenuItem>
                <MenuItem href='/coach/sessions' icon='mdi mdi-playlist-play'>Sesiones</MenuItem>
              </MenuItemContainer>

              <MenuItem href="/coach/calendar" icon='mdi mdi-calendar'>Calendario</MenuItem>
              <MenuItem href="/coach/resources" icon='mdi mdi-cube'>Recursos</MenuItem>
              <MenuItem href="/coach/payments" icon='mdi mdi-currency-usd'>Pagos</MenuItem>
            </>
          }
          {
            hasRole('Coachee') && <>
              <MenuItem href="/coachee/home" icon='mdi mdi-home'>Dashboard</MenuItem>

              <MenuItemContainer title='Procesos' icon='mdi mdi-file-document'>
                <MenuItem href='/coachee/requests' icon='mdi mdi-file-download'>Solicitudes</MenuItem>
                <MenuItem href='/coachee/agreements' icon='mdi mdi-handshake'>Acuerdos</MenuItem>
                <MenuItem href='/coachee/sessions' icon='mdi mdi-playlist-play'>Sesiones</MenuItem>
              </MenuItemContainer>
              <MenuItem href="/coachee/payments" icon='mdi mdi-currency-usd'>Pagos</MenuItem>
            </>
          }

          <li className="menu-title">Configuraciones</li>
          <MenuItem href="/coach/profile" icon='mdi mdi-account-box'>Mi perfil</MenuItem>
          <MenuItem href="/coach/bank-accounts" icon='mdi mdi-credit-card-settings'>Cuentas bancarias</MenuItem>

        </ul>

      </div>
      <div className="clearfix"></div>

    </div>


  </div>)
}

export default Menu