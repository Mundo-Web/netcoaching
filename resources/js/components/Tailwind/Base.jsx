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
      <div className="flex justify-end relative">
        <div className="fixed bottom-[80px] z-[20] right-[18px] md:right-[25px] fixedWhastapp">
          <a href={`https://api.whatsapp.com/send?phone=51948681429`}
            target="_blank" className="">
            <img src='/images/img/WhatsApp.png' alt="whatsapp" className="w-20" />
          </a>
        </div>
      </div>
    </main>
    <Footer items={menuItems} summary={summary} faqs={faqs} />
  </>
}

export default Base
