import React from 'react';
import { createRoot } from 'react-dom/client';
import Banner from './Components/Home/Banner';
import Benefits from './Components/Home/Benefits';
import Blogs from './Components/Home/Blogs';
import Contact from './Components/Home/Contact';
import Header from './Components/Home/Header';
import Testimonies from './Components/Home/Testimonies';
import Base from './Components/Tailwind/Base';
import CreateReactScript from './Utils/CreateReactScript';

const Home = ({ sliders, benefits, resources, testimonies }) => {
  return (
    <>
      <main className='flex flex-col'>
        <Header sliders={sliders} />
        <Benefits benefits={benefits} />
        <Banner />
        <Testimonies testimonies={testimonies} />
        {/* <Blogs resources={resources} /> */}
        <Contact />
      </main>
    </>
  );
};

CreateReactScript((el, properties) => {
  createRoot(el).render(<Base {...properties}>
    <Home {...properties} />
  </Base>);
})