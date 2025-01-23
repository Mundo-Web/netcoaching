import React from 'react';
import Banner from './Banner.svg';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css'

const Header = ({ sliders = [] }) => {

  return <>
    <Swiper className='w-full relative bg-sky-800 h-screen'
      slidesPerView={1}
      navigation={true}
      autoplay={true}
      loop={true}>
      {sliders.map((slider, i) => {
        return <SwiperSlide key={i}>
          <img className='absolute size-full object-cover object-center z-10 opacity-50' src={`/api/sliders/media/${slider.image}`} alt="" onError={e => e.target.src = Banner} />
          <div className='z-20 relative flex flex-col items-center justify-center px-20 pt-40 pb-40 w-full h-full max-md:px-5 max-md:py-24 max-md:max-w-full'>
            <div className="flex flex-col mb-0 w-full max-w-[1062px] max-md:mb-2.5 max-md:max-w-full">
              <div className="flex flex-col w-full text-center max-md:max-w-full">
                <p className="hidden md:block self-center text-base leading-6 text-white w-[810px] max-md:max-w-full" style={{
                  textShadow: '0 0 20px rgba(0,0,0,.5)'
                }}>
                  {slider.description}
                </p>
                <h1 className="mt-6 text-2xl md:text-5xl font-bold text-white max-md:max-w-full" style={{
                  textShadow: '0 0 20px rgba(0,0,0,.5)'
                }}>
                  {slider.name}
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center self-center mt-10 text-base font-bold leading-tight max-md:max-w-full">
              <a href={slider.primarybtn_url} className='flex gap-2 justify-center items-center px-6 py-4 bg-red-500 rounded-lg text-zinc-100 max-md:px-5'>
                <span className="self-stretch my-auto">{slider.primarybtn_text}</span>
                {/* <i className='fa fa-search'></i> */}
              </a>
              {
                slider.secondarybtn_text &&
                <a href={slider.secondarybtn_url} className='flex gap-2 justify-center items-center px-6 py-4 bg-cyan-700 rounded-lg text-zinc-100 max-md:px-5'>
                  <span className="self-stretch my-auto">{slider.secondarybtn_text}</span>
                  {/* <i className='far fa-play-circle'></i> */}
                </a>
              }
            </div>
          </div>
        </SwiperSlide>
      })}
    </Swiper>
    <section className="-mt-40 flex relative z-10 flex-col items-center self-center px-20 py-10 w-11/12 max-w-[720px] max-md:px-5 ">
      <img loading="lazy" src="/assets/img/home/laptop-cover.png" alt="" className="object-contain inset-0 size-full" />
    </section>
  </>
}

export default Header