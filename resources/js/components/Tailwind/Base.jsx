import React from "react"
import Header from "./Header";
import Footer from "./Footer";

const Base = ({ children, summary, session, faqs }) => {
  const menuItems = [
    {
      label: 'Inicio',
      ref: '/'
    },
    {
      label: 'Nosotros',
      ref: '/about'
    },
    {
      label: 'Coaches',
      ref: '/coaches'
    },
    {
      label: 'Recursos',
      ref: '/resources'
    },
    {
      label: 'Eventos',
      ref: '/events'
    },
  ];
  return <>
    <Header items={menuItems} session={session} />
    <main>
      {children}
      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <div style={{ position: 'fixed', bottom: '80px', zIndex: 20, right: '18px' }}>
          <a href={`https://api.whatsapp.com/send?phone=51948681429&text=Hola,+quiero+conocer+más+sobre+Net+Coaching`} target="_blank">
            <img src='/images/img/WhatsApp.png' alt="whatsapp" style={{ width: '80px' }} />
          </a>
        </div>
      </div>
    </main>
    <Footer items={menuItems} summary={summary} faqs={faqs} />
  </>
}

export default Base
