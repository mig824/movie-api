import React from 'react';

const Movie = ({
  movie: {
    title,
    director,
    actors,
    release_year,
    description,
    runtime,
    imdb_id,
  },
  likeMovie,
}) => {
  console.log('Render: Movie');
  return (
    <div>
      <h3>{title}</h3>
      <p>{director}</p>
      <p>{actors}</p>
      <p>{release_year}</p>
      <p>{runtime}</p>
      <p>{description}</p>
      <div className='btn-div'>
        <button onClick={() => likeMovie(true, imdb_id, title)}>
          I like this movie!
        </button>
        <button onClick={() => likeMovie(false, imdb_id, title)}>
          This movie is wack!
        </button>
      </div>
    </div>
  );
};

export default Movie;
