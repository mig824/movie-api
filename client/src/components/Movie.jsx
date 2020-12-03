import React from 'react';

const Movie = ({
  movie: { id, title, director, actors, release_year, description, runtime },
  likeMovie,
}) => (
  <div>
    <h3>{title}</h3>
    <small>
      Released: {release_year} -- {runtime}
    </small>
    <p>Directed by: {director}</p>
    <ul>
      {actors.map((actor) => (
        <li key={Math.random() * 55 + actor.charCodeAt(1)}>{actor}</li>
      ))}
    </ul>
    <p>{description}</p>
    <div className='btn-div'>
      <button onClick={() => likeMovie(true, id, title)}>
        I like this movie!
      </button>
      <button onClick={() => likeMovie(false, id, title)}>
        This movie is wack!
      </button>
    </div>
  </div>
);

export default Movie;
