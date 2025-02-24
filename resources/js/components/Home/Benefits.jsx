import React from 'react'
import { SwiperSlide, Swiper } from 'swiper/react';

const Benefits = ({ benefits }) => {
  return (<>
    <section className="flex flex-col md:flex-row gap-10 items-start self-stretch p-[5%] font-bold">
      <div className="w-full md:w-1/2">
        <h1 className="w-full text-4xl leading-10 text-teal-950">
          Descubre cómo Net Coaching puede ser tu aliado en el camino hacia el éxito
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Conectamos coaches profesionales certificados con personas y organizaciones que buscan transformación y crecimiento. 
          A través de nuestra plataforma, facilitamos sesiones personalizadas que te ayudarán a alcanzar tus metas personales 
          y profesionales de manera efectiva.
        </p>
        <a href='/login' className='w-max flex gap-2 justify-center items-center px-6 py-4 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 self-start mt-10'>
          <span className="self-stretch my-auto">Iniciar</span>
          <i className='ms-1 fas fa-sign-in-alt'></i>
        </a>
      </div>
      <div className="w-full md:w-1/2">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            // 640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true} 
          pagination={{ clickable: true }}
          navigation={true}
        >
          {
            benefits.map((benefit, i) => (
              <SwiperSlide key={i}>
                <div className="flex flex-col items-center rounded-lg overflow-hidden bg-zinc-100 shadow-md">
                  <div className="relative w-full aspect-[3/4]">
                    <img
                      loading="lazy"
                      src={`/api/benefits/media/${benefit.image}`}
                      className="absolute inset-0 w-full object-cover object-center aspect-[3/4]"
                      alt='Tecnologia'
                      onError={e => e.target.src = '/api/cover/thumbnail/null'}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 p-2 text-center line-clamp-2 h-[70px] w-full" style={{backgroundColor: 'rgba(255, 255, 255, .50)'}}>
                    <i className={`${benefit.icon} me-2`}></i>
                    <span className="text-lg font-semibold">{benefit.name}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </section>


    <section className="flex flex-wrap md:flex-nowrap gap-6 items-start max-md:mt-10 w-full p-[5%]">
      <div className="flex rounded w-full md:w-1/2">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/20da893746fbe7622378ac476f088724b5008a992870abcd558e5665b5760f75?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
          className="object-contain w-full rounded h-auto"
          alt="Net Coaching benefits illustration"
        />
      </div>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex flex-col w-full">
          <h2 className="text-4xl font-bold leading-10 text-teal-950">
            Desbloquea Tu Potencial: Los Beneficios de Net Coaching
          </h2>
          <p className="mt-6 text-base leading-snug text-cyan-950">
            Descubre cómo Net Coaching puede ser tu aliado en el camino hacia el éxito.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {
            benefits.map((benefit, index) => (
              <div key={index} className={`flex flex-col p-4 leading-tight rounded-lg hover:text-white hover:bg-sky-900 hover:shadow-[0px_4px_8px_rgba(0,0,0,0.08)]`}>
                <div className='flex items-center justify-center w-12 h-12 text-xl text-white bg-red-500 rounded-full'>
                  <i className={benefit.icon}></i>
                </div>
                {/* <img loading="lazy" src={benefit.icon} className="object-contain w-12 h-12" alt="" /> */}
                <div className="mt-4 w-full text-xl font-bold">{benefit.name}</div>
              </div>
            ))
          }
        </div>
        <a href='/coaches' className='flex gap-2 justify-center items-center px-6 py-4 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100 self-start mt-14 max-sm:self-center'>
          <i className='fa fa-search'></i>
          <span>Busca tu coach</span>
        </a>
      </div>
    </section>
  </>);
}

export default Benefits