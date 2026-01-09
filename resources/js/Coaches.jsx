import React, { useState } from 'react';
import CreateReactScript from './Utils/CreateReactScript';
import { createRoot } from 'react-dom/client';
import TailwindBase from '@Tailwind/Base';
import Header from './Components/Coaches/Header';
import Content from './Components/Coaches/Content';
import Events from './Components/Coaches/Events';
import FAQSection from './Components/Coaches/FAQSection';

function Coaches({ specialties, countries, events, faqs }) {
  const [filter, setFilter] = useState({
    specialty: null,
    search: null,
    orderBy: 'name_asc',
    minPrice: null,
    maxPrice: null
  })
  console.log(filter)
  return (<>
    <Header specialties={specialties} setFilter={setFilter} />
    <Content countries={countries} filter={filter} setFilter={setFilter} />
    <FAQSection faqs={faqs} />
    <Events events={events} />
  </>);
}

CreateReactScript((el, properties) => {
  createRoot(el).render(<TailwindBase {...properties}>
    <Coaches {...properties} />
  </TailwindBase>);
})