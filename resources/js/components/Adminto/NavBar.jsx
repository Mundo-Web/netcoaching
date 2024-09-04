import React, { useEffect } from "react"
import Logout from "../../Actions/Logout"

const NavBar = ({ session = {}, title = 'Pagina' }) => {

  useEffect(() => {
    document.title = `${title} | Net Coaching`
  }, [null])

  return (
    <div className="navbar-custom">
      <ul className="list-unstyled topnav-menu float-end mb-0">
        <li className="dropdown notification-list topbar-dropdown">
          <a className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" data-bs-toggle="dropdown"
            href="#" role="button" aria-haspopup="false" aria-expanded="false">
            <img src={`/api/profile/thumbnail/${session.uuid}?v=${crypto.randomUUID()}`} alt="user-image" className="rounded-circle" style={{ objectFit: 'cover', objectPosition: 'center' }} />
            <span className="pro-user-name ms-1">
              {session.name} {session.lastname}
              <i className="mdi mdi-chevron-down"></i>
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-end profile-dropdown ">

            <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Bienvenido !</h6>
            </div>


            <a href="/profile" className="dropdown-item notify-item">
              <i className="fe-user"></i>
              <span>Mi perfil</span>
            </a>

            <a href="/account" className="dropdown-item notify-item">
              <i className="mdi mdi-account-key-outline"></i>
              <span>Mi cuenta</span>
            </a>
            <a href="#" className="dropdown-item notify-item right-bar-toggle dropdown notification-list">
              <i className="fe-lock"></i>
              <span>Configuracion</span>
            </a>

            <div className="dropdown-divider"></div>


            <a href="#" className="dropdown-item notify-item" onClick={Logout}>
              <i className="fe-log-out"></i>
              <span>Cerrar sesion</span>
            </a>

          </div>
        </li>

        <li className="dropdown notification-list">
          <a href="#" className="nav-link right-bar-toggle waves-effect waves-light">
            <i className="fe-settings noti-icon"></i>
          </a>
        </li>

      </ul>


      <div className="logo-box">
        <a href="/home" className="logo logo-light text-center">
          <span className="logo-sm">
            <img src="/assets/img/icon.svg" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="/assets/img/logo.svg" alt="" height="16" />
          </span>
        </a>
        <a href="/home" className="logo logo-dark text-center">
          <span className="logo-sm">
            <img src="/assets/img/icon-dark.svg" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="/assets/img/logo-dark.svg" alt="" height="16" />
          </span>
        </a>
      </div>

      <ul className="list-unstyled topnav-menu topnav-menu-left mb-0">
        <li>
          <button className="button-menu-mobile disable-btn waves-effect">
            <i className="fe-menu"></i>
          </button>
        </li>

        <li>
          <h4 className="page-title-main">{title}</h4>
        </li>

      </ul>

      <div className="clearfix"></div>

    </div>
  )
}

export default NavBar