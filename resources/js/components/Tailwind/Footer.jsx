import React, { useState } from "react"
import Global from "../../Utils/Global";
import ReactModal from "react-modal";
import FAQItem from "../Coaches/FAQItem";

const Footer = ({ items, summary, faqs }) => {
  const [modalOpen, setModalOpen] = useState(null);

  const policyItems = [
    {
      title: 'Políticas de uso',
      modalContent: <p>Contenido sobre las políticas de uso...</p>,
    },
    {
      title: 'Políticas de privacidad',
      modalContent: <p>Contenido sobre las políticas de privacidad...</p>,
    },
    {
      title: 'Preguntas frecuentes',
      modalContent: (
        <div>
          <div className="flex flex-col gap-6 mt-4">
            {faqs.map((item, index) => (
              <FAQItem
                key={index}
                question={item.name}
                answer={item.description}
                isOpen={index === 0}
              />
            ))}
          </div>
        </div>
      ),
    },
  ];

  const contactInfo = [
    { type: 'phone', value: '+51 948 681 429' },
    { type: 'email', value: 'info@netcoaching.services' }
  ];

  const socialIcons = [
    { icon: 'fab fa-facebook-f', label: 'Facebook' },
    { icon: 'fab fa-twitter', label: 'Twitter' },
    { icon: 'fab fa-instagram', label: 'Instagram' }
  ];

  const openModal = (index) => setModalOpen(index);
  const closeModal = () => setModalOpen(null);

  return (
    <>
      <footer className="flex flex-col p-[5%] bg-cyan-900 max-md:px-5">
        <div className="flex flex-wrap gap-10 justify-between items-center w-full text-gray-50 max-md:max-w-full">
          <div className="flex flex-col text-sm leading-5 min-w-[240px] w-[326px] max-sm:m-auto">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a57e7c90e6798f74c1c4ffc59e953c34bd50720aa58f80aad6af19bc11334c86?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
              alt="Net Coaching Logo"
              className="object-contain max-w-full aspect-[8.93] w-[214px] max-sm:mx-auto"
            />
            {summary && (
              <p className="mt-4 max-sm:mx-auto text-center md:text-start">
                {summary}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-10 justify-center md:justify-between items-start min-w-[240px] w-[560px] max-md:max-w-full max-sm:mx-auto">
            <nav className="flex flex-col w-40 text-center md:text-start">
              <h2 className="text-base font-bold leading-tight">Menú</h2>
              <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
                {items.map((item, i) => (
                  <li key={`item-${i}`} className={i > 0 ? 'mt-1' : ''}>
                    <a href={item.ref} className="hover:underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <section className="flex flex-col w-40 text-center md:text-start">
              <h2 className="text-base font-bold leading-tight">Políticas</h2>
              <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
                {policyItems.map((item, index) => (
                  <li key={index} className={index > 0 ? 'mt-1' : ''}>
                    <button
                      className="hover:underline"
                      onClick={() => openModal(index)}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex flex-col w-40 text-center md:text-start">
              <h2 className="text-base font-bold leading-tight">Contacto</h2>
              <ul className="flex flex-col mt-4 w-full text-sm leading-snug">
                {contactInfo.map((info, index) => (
                  <li key={index} className={index > 0 ? 'mt-1' : ''}>
                    {info.type === 'phone' ? (
                      <a
                        href={`tel:${info.value.replace(/\s/g, '')}`}
                        className="hover:underline"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <a href={`mailto:${info.value}`} className="hover:underline text-wrap">
                        {info.value}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        <hr className="mt-10 w-full border-gray-50 max-md:max-w-full" />
        <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-md:max-w-full">
          <p className="self-stretch my-auto text-sm font-medium leading-tight text-gray-50 max-sm:mx-auto text-center">
            Copyright © {new Date().getFullYear()} <b>{Global.APP_NAME}</b>. Todos los derechos reservados. Powered by{' '}
            <a href="//mundoweb.pe" className="font-bold cursor-pointer" target="_blank">
              Mundo Web
            </a>
          </p>
          <div className="flex gap-4 items-start self-stretch my-auto max-sm:mx-auto">
            {socialIcons.map((icon, index) => (
              <a
                href="#"
                key={index}
                className="focus:outline-none focus:ring-2 focus:ring-gray-50 rounded-full p-2"
                aria-label={icon.label}
              >
                <i className={`${icon.icon} text-gray-50 w-6 h-6`} />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {policyItems.map((item, index) => (
        <ReactModal
          key={index}
          isOpen={modalOpen === index}
          onRequestClose={closeModal}
          contentLabel={item.title}
          className="absolute left-1/2 -translate-x-1/2 bg-white p-10 rounded shadow-lg w-[95%] max-w-5xl my-8"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
          <button onClick={closeModal} className="float-right text-gray-500 hover:text-gray-900">
            Cerrar
          </button>
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
          <div>{item.modalContent}</div>
        </ReactModal>
      ))}
    </>
  );
};

export default Footer