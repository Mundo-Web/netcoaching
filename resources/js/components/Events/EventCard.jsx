import React from "react"

const EventCard = ({ image, name, link, date_time, type, description }) => {
  const content = new DOMParser().parseFromString(description, 'text/html').body.textContent
  return (
    <div className={`flex flex-col flex-1 shrink basis-0 h-auto max-md:max-w-full ${link && 'cursor-pointer'}`} onClick={() => {
      window.open(link, '_blank')
    }}>
      <img
        loading="lazy"
        src={image.startsWith('http') ? image : `/api/events/media/${image}`}
        alt={name}
        className="object-cover object-center w-full aspect-video max-md:max-w-full rounded-lg"
        onError={e => e.target.src = '/api/events/media/null'}
      />
      <div className="flex flex-col mt-4 w-full max-md:max-w-full">
        <h3 className="text-lg font-bold leading-tight text-cyan-950 max-md:max-w-full line-clamp-2 h-[45px]">
          {name}
        </h3>
        <p className="mt-2 text-red-500 flex flex-wrap gap-2 justify-between">
          <span className="text-cyan-950">{type}</span>
          <span>{moment(date_time).format('ll')}</span>
        </p>
        <p className="mt-2 text-base leading-relaxed text-cyan-950 max-md:max-w-full line-clamp-4">
          {content}
        </p>
      </div>
    </div>

  );
};

export default EventCard