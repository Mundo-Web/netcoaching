import React from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'

const Testimonies = ({ testimonies }) => {

  return <>
    <section className="p-[5%]">
      <div className="flex gap-5  max-md:flex-col-reverse">
        <div className="flex flex-col w-6/12 max-md:w-full">
          <div className="flex flex-col grow text-zinc-950 max-md:mt-6 max-md:max-w-full max-h-[536px] overflow-auto">
            {testimonies.map((testimony, index) => (
              <div key={index} className={index > 0 ? "mt-6" : ""}>
                <article className="flex flex-col p-8 w-full rounded-lg bg-zinc-100 max-md:px-5 max-md:max-w-full">
                  <header className="flex flex-wrap gap-4 items-start w-full max-md:max-w-full">
                    <img src={`/api/testimonies/media/${testimony.image}`} alt={`${testimony.name}'s profile`} className="flex shrink-0 w-12 h-12 rounded-full bg-zinc-200" />
                    <div className="flex flex-col flex-1 shrink basis-0 min-w-[240px] max-md:max-w-full">
                      <h3 className="text-xl font-bold leading-tight max-md:max-w-full">{testimony.name}</h3>
                      <p className="mt-1 text-sm font-medium leading-tight max-md:max-w-full">{testimony.country}</p>
                    </div>
                  </header>
                  <p className="mt-6 w-full text-base leading-6 max-md:max-w-full whitespace-pre-line">{testimony.description}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col justify-center w-full max-md:mt-6 max-md:max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <h2 className="text-4xl font-bold leading-10 text-teal-950 max-md:max-w-full">
                Descubre lo que nuestros clientes piensan de Net Coaching
              </h2>
              <p className="mt-6 text-base leading-snug text-cyan-950 max-md:max-w-full">
                Descubre las Voces de Éxito: Lo que Nuestros Clientes Piensan de Net Coaching.
              </p>
            </div>
            <a href="/about" className="flex gap-2 justify-center items-center self-start px-6 py-4 mt-10 text-base font-bold leading-tight text-white bg-red-500 rounded-lg max-md:px-5">
              <span className="self-stretch my-auto">Sobre Net Coaching</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2814c2909807d9fc74b814e0d51ced2149a348cd10099ce05a36b984062d47e8?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </>
}

export default Testimonies
