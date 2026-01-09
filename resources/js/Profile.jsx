import React, { Fragment, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import CreateReactScript from './Utils/CreateReactScript';
import 'tippy.js/dist/tippy.css';
import TailwindBase from './Components/Tailwind/Base';
import HtmlContent from './Utils/HtmlContent';
import CoachCard from './Components/Coaches/CoachCard';
import html2string from './Utils/html2string';
import Tippy from '@tippyjs/react';
import Swal from 'sweetalert2';
import RequestsRest from './Actions/RequestsRest';
import Number2Currency from './Utils/Number2Currency';
import YouTube from 'react-youtube';

const requestsRest = new RequestsRest();

const Profile = ({ coach, country, countries, resources, coaches, session, hasRole }) => {

  const [isPlaying, setIsPlaying] = React.useState(false);

  // Fix for YouTube postMessage origin error
  useEffect(() => {
    if (typeof window !== 'undefined' && window.YT) {
      window.YTConfig = {
        host: 'https://www.youtube.com'
      };
    }
  }, []);

  let btnCTA = <Fragment>
    Iniciar sesion para ver opciones
    <i className='ms-1 mdi mdi-arrow-top-right'></i>
  </Fragment>
  let actionCTA = () => location.href = '/login'

  if (session) {
    if (hasRole('Admin')) {
      btnCTA = <Fragment>
        Ver solicitudes de {coach.name.split(' ')[0]}
        <i className='ms-1 mdi mdi-file-document-edit'></i>
      </Fragment>
      actionCTA = () => location.href = '/admin/solicitudes'
    } else if (session.id === coach.id) {
      btnCTA = <Fragment>
        Editar perfil
        <i className='ms-1 mdi mdi-account-edit'></i>
      </Fragment>
      actionCTA = () => location.href = '/coach/profile'
    } else if (hasRole('Coach')) {
      btnCTA = <Fragment>
        Ver recursos de {coach.name.split(' ')[0]}
        <i className='ms-1 mdi mdi-cube'></i>
      </Fragment>
      actionCTA = () => {
        const element = document.getElementById('resources')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    } else if (hasRole('Coachee')) {
      btnCTA = <Fragment>
        Quiero mi coach
        <i className='ms-1 mdi mdi-whatsapp'></i>
      </Fragment>
      actionCTA = async () => {
        const { isConfirmed } = await Swal.fire({
          title: '¡Solicita tu coach!',
          text: '¿Deseas contactarte con este coach a través de WhatsApp?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, quiero contactarlo',
          cancelButtonText: 'No, gracias'
        })
        if (!isConfirmed) return

        const result = await requestsRest.save({
          coach_id: coach.id
        });
        if (!result) return

        if (coach.phone) {
          window.open(`https://wa.me/${coach.phone_prefix || 51}${coach.phone}`, '_blank')
        } else {
          location.href = '/coachee/requests'
        }
      }
    }
  }

  return (
    <>
      <section className='p-[5%] mt-[68px]'>
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8">
          <div className="md:w-2/3">
            {
              coach.video && (
                <div className="relative w-full aspect-[16/9] rounded-lg mb-[5%] overflow-hidden group">
                  <YouTube
                    videoId={coach.video}
                    opts={{
                      width: '100%',
                      height: '100%',
                      playerVars: {
                        autoplay: isPlaying ? 1 : 0,
                        controls: 0,
                        disablekb: 1,
                        modestbranding: 1,
                        showinfo: 0,
                        rel: 0,
                        origin: window.location.origin // Explicitly set origin to prevent postMessage mismatch
                      },
                    }}
                    onPause={() => setIsPlaying(false)}
                    className={`w-full h-full ${!isPlaying ? 'hidden' : ''}`}
                  />
                  {!isPlaying && (
                    <>
                      <img
                        src={`//i.ytimg.com/vi/${coach.video}/maxresdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `/api/profile/${coach.uuid}`;
                          e.target.classList.add('blur-sm');
                        }}
                      />
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                                 bg-black/50 hover:bg-black/70 text-white rounded-full py-2 px-5
                                 transition-all duration-300 group-hover:scale-110"
                      >
                        <i className="mdi mdi-play mdi-48px"></i>
                      </button>
                    </>
                  )}
                </div>
              )
            }
            <div className="flex gap-4 mb-[5%] items-center">
              <img
                className='w-24 h-24 rounded-full object-cover object-center'
                src={`/api/profile/${coach.uuid}`}
                alt="Profile Photo"
              />
              <div>
                <h1 className="text-2xl font-bold">{coach.name} {coach.lastname}</h1>
                <p>{coach.title}</p>
                <div>
                  {
                    coach.specialties.length > 0
                      ? coach.specialties.map((specialty, index) => (<span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
                        {specialty.name}
                      </span>))
                      : <i>- Sin especialidad -</i>
                  }
                </div>
                <div className="flex items-center gap-1 justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`mdi mdi-18px mdi-star${star <= (coach.score || 0) ? '' : '-outline'}`}
                      style={{ color: star <= (coach.score || 0) ? '#ffc107' : '#6c757d', fontSize: '14px' }}
                    ></i>
                  ))}
                </div>
              </div>
            </div>
            <div className="prose ql-editor" style={{ all: 'revert' }}>
              <HtmlContent html={coach.description} />
            </div>

            <div id='resources' className='scroll-mt-16'></div>

            <h3 className='text-lg font-bold mt-[5%] mb-[2.5%]'>Contenidos y temas</h3>


            {
              resources.length > 0 &&
              <div id="accordion-flush" data-accordion="collapse" data-active-classes="text-gray-500 dark:text-gray-400" data-inactive-classes="text-gray-500 dark:text-gray-400">
                {
                  resources.map((resource, i) => {
                    const isOpen = i === 0; // Set the first accordion to be open

                    return (
                      <Fragment key={i}>
                        <h2 id={`accordion-heading-${i}`}>
                          <button
                            type="button"
                            className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:text-gray-400 gap-3"
                            data-accordion-target={`#accordion-${i}`}
                            aria-expanded={isOpen ? "true" : "false"}
                            aria-controls={`accordion-${i}`}
                          >
                            <span className='text-left'>
                              {resource.name}
                              <Tippy content="Ver recurso">
                                <a
                                  href={`/resources/${resource.id}`}
                                  className="py-1 px-3 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                >
                                  <i className="mdi mdi-arrow-top-right"></i>
                                </a>
                              </Tippy>
                            </span>
                            <i
                              data-accordion-icon
                              className={`text-lg ${isOpen ? "rotate-180" : ""} shrink-0 fas fa-angle-down`}
                            ></i>
                          </button>
                        </h2>
                        <div
                          id={`accordion-${i}`}
                          className={`${isOpen ? "" : "hidden"}`}
                          aria-labelledby={`accordion-heading-${i}`}
                        >
                          <div className="py-5 border-b border-gray-200">
                            <p className='line-clamp-4 text-ellipsis'>
                              {html2string(resource.description)}
                            </p>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })
                }
              </div>
            }

          </div>
          <div className="md:w-1/3 block md:sticky top-[15%] h-max">
            {/* <h2 className='text-2xl mb-4 font-bold'>S/. {Number2Currency(coach.price)} {coach.max_price && <>- {Number2Currency(coach.max_price)}</>}</h2> */}
            <h2 className='text-2xl mb-4 font-bold'>{coach.price_string}</h2>
            <p className='mb-2'>
              <i className='fas fa-globe-americas w-6'></i>
              <b>Nacionalidad</b>: {country.name} - {coach.city}
            </p>
            <p className='mb-2'>
              <i className='fas fa-flag w-6'></i>
              <b>Experiencia</b>: {coach.experience > 0 ? <>{coach.experience} años</> : <i>Sin experiencia</i>}
            </p>
            <p className='mb-2'>
              <i className='fas fa-file-alt w-6'></i>
              <b>Resumen</b>: {coach.summary}
            </p>

            <button type="button" className="focus:outline-none text-white bg-[#ff5b5b] hover:bg-[#ff5b5bbb] focus:ring-4 focus:ring-[#ff5b5bdd] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-4 " onClick={actionCTA}>
              {btnCTA}
            </button>
          </div>
        </div>
      </section>
      {
        coaches.length > 0 &&
        <section className='p-[5%]'>
          <h3 className='text-2xl font-bold mb-[2.5%]'>Otros Coaches</h3>
          <p className='mb-[5%]'>Sus enfoques personalizados y estratégicos son la fórmula secreta detrás de innumerables historias de triunfo.</p>
          <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
            {coaches.sort((a, b) => a.price - b.price).map((coach, i) => {
              const country = countries.find((x) => x.id == coach.country)
              return <CoachCard key={i} {...coach} country={country} />;
            })}
          </section>
        </section>
      }
    </>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<TailwindBase {...properties}>
    <Profile {...properties} />
  </TailwindBase>);
})