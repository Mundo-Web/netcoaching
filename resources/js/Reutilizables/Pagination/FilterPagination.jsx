import React, { useEffect } from 'react'

const FilterPagination = ({ current, setCurrent, pages }) => {
  const array = new Array(pages || 1)
  array.fill(null)

  const onPrevPageClicked = () => {
    const page = current - 1
    setCurrent(page < 1 ? 1 : page)
  }

  const onNextPageClicked = () => {
    const page = current + 1
    setCurrent(page > pages ? pages : page)
  }

  useEffect(() => {
    if (current > pages) setCurrent(pages);
  }, [pages, current])

  return (<>
    <nav aria-label="Page navigation example w-full">
      <ul className="flex flex-wrap items-center gap-1 -space-x-px text-base justify-center">
        <li>
          <button className="cursor-pointer flex items-center justify-center px-4 h-10 w-10 leading-tight text-gray-500 hover:bg-white rounded-full bg-gray-100 hover:text-gray-700" onClick={onPrevPageClicked} type='button'>
            <span className="sr-only">Previous</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>
        {
          array.map((x, i) => {
            if ((i + 1) == current - 4 || (i + 1) == current + 4) {
              return <li key={`item-${i}`}>
                <button aria-current="page" className='z-10 flex items-center justify-center px-4 h-10 w-10 leading-tight  hover:bg-white rounded-full bg-transparent text-gray-500 hover:text-gray-700' type='button'>···</button>
              </li>
            }
            return <li key={`item-${i}`} className={(i + 1) > current - 4 && (i + 1) < current + 4 ? 'block' : 'hidden'}>
              <button aria-current="page" className={`cursor-pointer z-10 flex items-center justify-center px-4 h-10 w-10 leading-tight  hover:bg-white rounded-full ${current == i + 1 ? 'bg-[#006BF6] text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700'}`} onClick={() => setCurrent(i + 1)} type='button'>{i + 1}</button>
            </li>
          })
        }
        <li>
          <button className="cursor-pointer flex items-center justify-center px-4 h-10 w-10 leading-tight text-gray-500 hover:bg-white rounded-full bg-gray-100 hover:text-gray-700" onClick={onNextPageClicked} type='button'>
            <span className="sr-only">Next</span>
            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </>)
}

export default FilterPagination