/** @jsx jsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { css, jsx } from '@emotion/react';

import Movie from '../components/Movie';

const HomePage = () => {
  const [getMovie, { loading, error, data }] = useLazyQuery(GET_MOVIE);
  const [updateThumbs] = useMutation(UPDATE_THUMBS, {
    update(cache, { data: { update_thumbs: update_thumbs } }) {
      cache.modify({
        fields: {
          stored_movies(existingMovies = []) {
            const newMovieRef = cache.writeFragment({
              data: update_thumbs.modified_doc,
              fragment: gql`
                fragment UpdateMovie on StoredMovies {
                  id
                  imdb_id
                  title
                  thumbs_up
                  thumbs_down
                }
              `,
            });

            console.log({ newMovieRef });

            return [...existingMovies, newMovieRef];
          },
        },
      });
    },
  });

  const likeMovie = (is_liked, imdb_id, title) => {
    updateThumbs({ variables: { is_liked, imdb_id, title } });
  };

  let userInput;
  return (
    <div css={homePageCSS}>
      <h2>Search Movie API</h2>
      <p>
        Check out your saved movies <Link to='/saved-movies'>here.</Link>
      </p>
      <p>
        This query takes in a movie title and only fetches one match. A movie is
        saved when you say if you like it or not
      </p>
      <input
        type='text'
        placeholder='Enter Movie Title'
        ref={(node) => (userInput = node)}
      />
      <button
        onClick={() => {
          getMovie({ variables: { title: userInput.value } });
          userInput.value = '';
        }}
      >
        Search
      </button>
      <br />
      {loading ? <p>Fetching movie...</p> : null}
      {error ? <p>Error: {error}</p> : null}
      {data?.movie && <Movie movie={data.movie} likeMovie={likeMovie} />}
    </div>
  );
};

const GET_MOVIE = gql`
  query GetMovie($title: String!) {
    movie(title: $title) {
      imdb_id
      title
      director
      actors
      release_year
      description
      runtime
    }
  }
`;

const UPDATE_THUMBS = gql`
  mutation UpdateThumbs(
    $is_liked: Boolean!
    $imdb_id: String!
    $title: String!
  ) {
    update_thumbs(is_liked: $is_liked, imdb_id: $imdb_id, title: $title) {
      status
      message
      modified_doc {
        id
        title
        thumbs_up
        thumbs_down
      }
    }
  }
`;

const homePageCSS = css`
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

  .btn-div {
    display: flex;
    justify-content: space-around;
  }
`;

export default HomePage;
