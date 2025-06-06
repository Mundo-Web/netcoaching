import React, { useEffect, useState } from 'react';
import ArrayJoin from '@Utils/ArrayJoin';
import ResourcesRest from '@Rest/ResourcesRest';

const resourcesRest = new ResourcesRest()

const Sidebar = ({ specialties, archive, setResources }) => {

  const [search, setSearch] = useState(null);
  const [type, setType] = useState(null);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    const filter = []
    if (search) filter.push(ArrayJoin([
      ['name', 'contains', search],
      ['description', 'contains', search]
    ], 'or'))
    if (type) filter.push(['specialty_id', '=', type])
    if (month) {
      const [m, y] = month.split('-').map(Number);
      const firstDay = moment().year(y).month(m - 1).startOf('month').format('YYYY-MM-DD [00:00:00]');
      const lastDay = moment().year(y).month(m - 1).endOf('month').format('YYYY-MM-DD [23:59:59]');

      filter.push(ArrayJoin([
        ['created_at', '>=', firstDay],
        ['created_at', '<=', lastDay],
      ], 'and'))
    }

    refreshResources(ArrayJoin(filter, 'and'))
  }, [search, type, month])

  const refreshResources = async (filter) => {
    const result = await resourcesRest.paginate({
      filter,
      isLoadingAll: true,
      sort: [{ selector: 'created_at', desc: false }],
    })
    const newResources = result?.data ?? []
    setResources(newResources);
  }

  return (
    <aside className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full text-sm leading-snug text-teal-950 max-md:mt-10">
        <div className="flex gap-2 items-center px-2.5 py-3 w-full font-medium text-black whitespace-nowrap rounded-lg bg-neutral-100">
          <i className='fa fa-search shrink-0 self-stretch my-auto'></i>
          <label htmlFor="searchInput" className="sr-only">Buscar</label>
          <input
            id="searchInput"
            type="text"
            placeholder="Buscar"
            className="self-stretch my-auto bg-transparent outline-none"
            onChange={e => setSearch((e.target.value || '').toLowerCase())}
          />
        </div>
        <div className="flex flex-col mt-8 w-full text-center max-w-[200px]">
          <div className="flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap">
            <div className="self-stretch my-auto">Categorías</div>
            <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
          </div>
          {[
            { id: null, name: 'Todos' },
            ...specialties
          ].map((specialty, index) => (
            <div key={index} className={`flex gap-10 justify-between items-center mt-4 w-full ${specialty.id == type ? 'text-red-500' : 'cursor-pointer'}`} onClick={() => setType(specialty.id || null)}>
              <div className="self-stretch my-auto">{specialty.name}</div>
              {
                (type == specialty.id)
                  ? <i className="mdi mdi-chevron-right text-lg text-red-500"></i>
                  : ''
              }
            </div>
          ))}
        </div>
        <hr className='w-1/2 mx-auto my-8' />
        <div className="flex flex-col w-full text-center max-w-[200px]">
          <div className="flex gap-10 justify-between items-center w-full text-base font-bold leading-tight whitespace-nowrap">
            <div className="self-stretch my-auto">Archivo</div>
            <div className="flex shrink-0 self-stretch my-auto w-5 h-5" />
          </div>
          <div className={`flex cursor-pointer gap-10 justify-between items-center mt-4 w-full ${month == null ? 'font-medium leading-tight text-red-500' : ''}`} onClick={() => setMonth(null)}>
            <div className="self-stretch my-auto">Todos</div>
            {
                (month == null)
                  ? <i className="mdi mdi-chevron-right text-lg text-red-500"></i>
                  : ''
              }
          </div>
          {archive.map((item, index) => (
            <div key={index} className={`flex cursor-pointer gap-10 justify-between items-center mt-4 w-full ${month == item.full ? 'font-medium leading-tight text-red-500' : ''}`} onClick={() => setMonth(item.full)}>
              <div className="self-stretch my-auto">{item.month} {item.year}</div>
              {
                (month == item.full)
                  ? <i className="mdi mdi-chevron-right text-lg text-red-500"></i>
                  : ''
              }
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;