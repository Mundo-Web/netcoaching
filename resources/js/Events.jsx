import Base from '@Tailwind/Base';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Components/Events/Content';
import CreateReactScript from './Utils/CreateReactScript';

const Events = ({ events, eventsWP }) => {

  return (<>
    <section className="p-[5%] self-center mt-[68px] w-full max-md:mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <section className="flex flex-col w-full lg:col-span-2">
          <div className="flex flex-col w-full">
            <div className="max-w-full">
              <h1 className="text-2xl md:text-4xl font-bold leading-tight text-teal-950">
                "Net Coaching Academy: Tu Fuente Especializada en Desarrollo Humano y Bienestar Integral"
              </h1>
              <p className="mt-6 text-base leading-6 text-zinc-950">
                Imagina tener acceso directo a la sabiduría y experiencia de expertos de la industria.
                <br />
                Nuestros mentores te guiarán en el camino el desarrollo y bienestar, facilitando el camino para tu ascenso en tu carrera profesional.
              </p>
            </div>
            <button className="flex gap-2 justify-center w-max items-center px-6 py-4 mt-10 text-base font-bold leading-tight bg-red-500 rounded-lg text-zinc-100">
              <span className="my-auto">Academy</span>
            </button>
          </div>
        </section>
        <section className="flex flex-col w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/84aa86b43b2480830419f4426f1863ec52ee981ac2638ad1f2e1c774d84f28d4?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
            className="object-cover w-full aspect-square"
            alt="Net Coaching Academy visual representation"
          />
        </section>
      </div>
    </section>

    <Content events={events}  eventsWP={eventsWP}/>
  </>);
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Events {...properties} />
  </Base>);
})