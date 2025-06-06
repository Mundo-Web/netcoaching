import React from 'react';
import html2string from '../../Utils/html2string';

const MainContent = ({ resources }) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {resources.map((resource, index) => {
        const link = resource.social_media === 'youtube'
          ? `https://i.ytimg.com/vi/${resource.media_id}/hqdefault.jpg`
          : `/api/cover/thumbnail/${resource.media_id}`;
        const ref = `/resources/${resource.id}`
        return (
          <article key={index} className="w-full">
            <a href={ref}>
              <img
                loading="lazy"
                src={link}
                alt="Main content image"
                className="object-cover w-full rounded aspect-video"
                onError={e => e.target.src = '/api/cover/thumbnail/null'}
              />
            </a>
            <a href={ref}>
              <h1 className="mt-8 mb-4 text-xl md:text-2xl lg:text-4xl font-bold leading-tight text-teal-950 truncate">
                {resource.name}
              </h1>
            </a>
            <div className="flex gap-4 self-start mt-1 text-sm font-medium leading-tight">
              <time className="grow text-teal-950">
                {moment(resource.created_at).format('LL')}
              </time>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4fc77b0354f3494caefca7a8a115adf92b3833f7bc53a642e715ba4ae4e5c13c?placeholderIfAbsent=true&apiKey=5cee531c8862493aa6f0e0854aa64731"
                alt=""
                className="object-contain shrink-0 self-start w-0"
              />
              <div className="text-red-500 basis-auto">
                Categoria: <span className="text-red-500">{resource.specialty.name}</span>
              </div>
            </div>
            <p className='mt-2 text-base leading-6 text-cyan-950 line-clamp-3 h-[72px]'>{html2string(resource.description)}</p>
          </article>
        );
      })}
    </section>
  );
};

export default MainContent;