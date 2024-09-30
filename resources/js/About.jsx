import React from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import Base from './Components/Tailwind/Base';
import VissionMissionSection from './Components/About/VissionMissionSection';
import StatisticsSection from './Components/About/StatisticsSection';
import Global from './Utils/Global';

function About({ aboutus, indicators }) {
  const history = aboutus.find(({ name }) => name == 'Historia')
  const vission = aboutus.find(({ name }) => name == 'Visión')
  const mission = aboutus.find(({ name }) => name == 'Misión')
  return (
    <main className="flex flex-col p-[5%] mt-20">
      {
        (history?.description && history?.visible) ?
          <section className="w-full max-md:max-w-full mb-16 max-md:mb-10">
          <article className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-4/12 max-md:ml-0 max-md:w-full">
              <h1 className="text-4xl font-bold leading-10 text-cyan-950 max-md:mt-3 max-md:max-w-full">
                {Global.APP_NAME}: Un Viaje desde sus Inicios hasta Hoy
              </h1>
            </div>
            <div className="flex flex-col ml-5 w-8/12 max-md:ml-0 max-md:w-full">
              <p className="self-stretch text-base leading-6 text-cyan-950 max-md:mt-3 max-md:max-w-full">
                {history.description}
              </p>
            </div>
          </article>
        </section> : ''
      }
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb7d4e1f35374fe412bb24f1d4b542859fa12dc2cb3967d2deec7e548a818f23?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
        className="object-contain w-full rounded aspect-[3.19] max-md:max-w-full"
      />
      <StatisticsSection indicators={indicators} />
      <section className="flex flex-col md:flex-row gap-6 items-center justify-between mt-24 max-md:mt-10">
        <article className="flex flex-col self-stretch my-auto text-cyan-950 w-7/12 max-md:w-full">
          <div className="flex flex-col max-w-full w-[628px]">
            <header className="flex flex-col w-full max-md:max-w-full">
              <h2 className="w-full text-4xl font-bold leading-10 max-md:max-w-full">
                Mirando hacia el Horizonte: Las Metas y Visiones Futuras de {Global.APP_NAME}
              </h2>
              <p className="mt-6 w-full text-base leading-6 max-md:max-w-full">
                Descubre cómo estamos moldeando el camino hacia un mañana más brillante en el desarrollo humano y
                bienestar profesional.
              </p>
            </header>
          </div>
          <VissionMissionSection vission={vission} mission={mission} />
        </article>
        <aside className="flex flex-col self-stretch my-auto w-5/12 max-md:w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4bb5658ed2e534f1b39eb2f6246a14c438692adfa5ff5adc65854e36277f26e7?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
            alt="Future goals visualization"
            className="object-contain w-full aspect-[1.18] max-md:max-w-full"
          />
        </aside>
      </section>
    </main>
  );
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <About {...properties} />
  </Base>);
})