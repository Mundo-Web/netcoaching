import React, { useEffect, useState } from "react"
import Select from 'react-select'
import CoachCard from "./CoachCard"
import CoachesRest from "@Rest/CoachesRest"
import ArrayJoin from "@Utils/ArrayJoin"
import FilterPagination from "../../Reutilizables/Pagination/FilterPagination"

const coachesRest = new CoachesRest()

const Content = ({ countries, filter, setFilter }) => {

  const [coaches, setCoaches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const filter2send = []
    for (const key in filter) {
      if (!filter[key] || key == 'orderBy') continue
      if (key == 'minPrice') {
        filter2send.push(['price', '>=', filter[key]])
      } else if (key == 'maxPrice') {
        filter2send.push(['price', '<=', filter[key]])
      } else if (key == 'search') {
        filter2send.push(ArrayJoin([
          ['users.name', 'contains', filter[key]],
          ['lastname', 'contains', filter[key]]
        ], 'or'))
      } else if (key == 'specialty') {
        filter2send.push(['specialty.id', '=', filter[key]])
      } else {
        filter2send.push([key, '=', filter[key]])
      }
    }

    refreshCoaches(ArrayJoin(filter2send, 'and'), filter.orderBy)
  }, [filter, currentPage])

  const refreshCoaches = async (filter, order) => {
    let sort = [];

    switch (order) {
      case 'price_asc':
        sort = [{ selector: 'price', desc: false }];
        break;
      case 'price_desc':
        sort = [{ selector: 'max_price', desc: true }];
        break;
      case 'name_asc':
        sort = [{ selector: 'users.name', desc: false }];
        break;
      case 'name_desc':
        sort = [{ selector: 'users.name', desc: true }];
        break;
      case 'score_desc':
        sort = [{ selector: 'score', desc: true }];
        break;
      case 'score_asc':
        sort = [{ selector: 'score', desc: false }];
        break;
    }

    setCoaches([])

    const result = await coachesRest.paginate({
      filter,
      take: 12,
      sort,
      skip: 12 * ((currentPage || 1) - 1),
      requireTotalCount: true
    })
    const newCoaches = result?.data ?? []
    setPages(Math.ceil(result.totalCount / 12))
    setCoaches(newCoaches);
  }

  return <>
    <section className='p-[5%] min-h-[75vh] block md:flex items-start gap-5'>
      <form className="flex flex-col w-full md:w-4/12 lg:w-3/12">
        <div className='w-full lg:w-full'>
          <label className="text-lg font-semibold text-gray-800 mb-2">Ordenar por</label>
          <Select
            className='block text-black'
            options={[
              { value: 'price_asc', label: 'Precio: De menor a mayor' },
              { value: 'price_desc', label: 'Precio: De mayor a menor' },
              { value: 'name_asc', label: 'Nombre: A-Z' },
              { value: 'name_desc', label: 'Nombre: Z-A' },
              { value: 'score_desc', label: 'Calificación: Mayor primero' },
              { value: 'score_asc', label: 'Calificación: Menor primero' },
            ]}
            defaultValue={{ value: 'name_asc', label: 'Nombre: A-Z' }}
            styles={{
              control: (base) => ({
                ...base,
                padding: '4px',
                borderRadius: '6px'
              }),
              placeholder: (base) => ({
                ...base,
                color: '#000',
              }),
            }}
            onChange={e => setFilter(old => ({ ...old, orderBy: e.value }))}
          />
        </div>
        <div className="flex flex-col items-start py-4 w-full">
          <label className="text-left text-lg font-semibold text-gray-800 mb-2">Precio</label>
          <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-4 w-full">
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Desde</label>
              <input
                type="number"
                min="0"
                placeholder="8"
                step={0.01}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setFilter(old => ({ ...old, minPrice: Number(e.target.value) || null }))}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Hasta</label>
              <input
                type="number"
                min="0"
                placeholder="70"
                step={0.01}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={e => setFilter(old => ({ ...old, maxPrice: Number(e.target.value) || null }))}
              />
            </div>
          </div>
        </div>
      </form>
      <div className=" w-full md:w-8/12 lg:w-9/12">
        <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 min-h-80'>
          {coaches.map((coach, i) => {
            if (!coach) return <div key={i} className='placeholder h-40 w-full bg-gray-100'></div>
            const country = countries.find((x) => x.id == coach.country)
            return <CoachCard key={i} {...coach} country={country} />;
          })}
        </section>
        <FilterPagination pages={pages} current={currentPage} setCurrent={setCurrentPage} />
      </div>
    </section>
  </>
}

export default Content