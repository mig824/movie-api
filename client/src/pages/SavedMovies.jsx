/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, gql } from '@apollo/client';
import { jsx, css } from '@emotion/react';

import MovieCard from '../components/MovieCard';

const SavedMoviesPage = () => {
  const [getStoredMovies, { data }] = useLazyQuery(GET_MOVIES);

  return (
    <div css={savedMoviesPageCSS}>
      <h1>Saved Movies</h1>
      <Link to='/'>Go back</Link>
      <button onClick={() => getStoredMovies()}>Fetch</button>
      <div className='saved-movies-container'>
        {data?.stored_movies.map((movie) => (
          <MovieCard movie={movie} key={`stored-movie-${movie.id}`} />
        ))}
      </div>
    </div>
  );
};

const GET_MOVIES = gql`
  query GetStoredMovies {
    stored_movies {
      id
      title
      thumbs_up
      thumbs_down
    }
  }
`;

const savedMoviesPageCSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.3rem;

  button {
    margin-top: 1rem;
    padding: 0.3rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: #666666;
    color: #fff;

    &:hover {
      cursor: pointer;
      background-color: #555;
    }
  }

  .saved-movies-container {
    display: flex;
    flex-wrap: wrap;
  }
`;

export default SavedMoviesPage;
