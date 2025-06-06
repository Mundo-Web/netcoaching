import React, { useState } from "react"
import EventCard from "./EventCard"

const Content = ({ events, eventsWP }) => {
  const types = ['Todos', ...new Set(events.map(({ type }) => type))]

  const [search, setSearch] = useState('')
  const [type, setType] = useState('Todos')

  return <>
    <section className='p-[5%] min-h-[75vh] block md:flex items-start gap-5'>
      <form className="flex flex-col w-full md:w-4/12 lg:w-3/12 text-sm">
        <div className="flex gap-2 items-center px-2.5 py-3 w-full font-medium text-black whitespace-nowrap rounded-lg bg-neutral-100">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d96adce6a388257d37066ed969ba8abbe6a1d3828619ce473aef2206db0a589?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731" alt="" className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          <label htmlFor="searchInput" className="sr-only">Buscar</label>
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar"
            className="self-stretch my-auto bg-transparent outline-none"
            onChange={e => setSearch((e.target.value || '').toLowerCase())}
          />
        </div>
        <section className="flex flex-col mt-8 w-full text-center max-w-[200px] text-teal-950">
          <h2 className="flex gap-10 justify-between items-center w-full text-base font-bold">
            <span className="self-stretch my-auto">Tipo de evento</span>
            <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
          </h2>
          {types.map((x, index) => (
            <div className="flex gap-10 justify-between items-center mt-4 w-full leading-snug whitespace-nowrap">
              <div className={`self-stretch my-auto ${type == x ? 'font-medium text-red-500' : 'cursor-pointer'}`} onClick={() => setType(x)}>{x}</div>
              {
                (type == x)
                  ? <i className="mdi mdi-chevron-right text-lg text-red-500"></i>
                  : ''
              }
            </div>
          ))}
        </section>
      </form>
      <div className=" w-full md:w-8/12 lg:w-9/12">
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'>
          {events.filter(({ type: eventType, name, description }) => (type == 'Todos' || type == eventType) && (name.toLowerCase().includes(search) || description.toLowerCase().includes(search))).map((event, i) => {
            return <EventCard key={i} {...event} />;
          })}
          {
            eventsWP.map((event, i) => {
              return <EventCard key={i} {...event} />;
            })
          }
        </section>
      </div>
    </section>
  </>
}

export default Content