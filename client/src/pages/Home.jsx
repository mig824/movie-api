/** @jsx jsx */
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { css, jsx } from '@emotion/react';

import Movie from '../components/Movie';

const HomePage = () => {
  const titleInputRef = useRef();
  const [getMovie, { loading, error, data }] = useLazyQuery(GET_MOVIE);
  const [updateThumbs] = useMutation(UPDATE_THUMBS, {
    update(cache, { data: { update_thumbs: update_thumbs } }) {
      cache.modify({
        fields: {
          stored_movies(existingMovies = []) {
            cache.writeFragment({
              data: update_thumbs.modified_doc,
              fragment: gql`
                fragment UpdateMovie on StoredMovies {
                  id
                  title
                  thumbs_up
                  thumbs_down
                }
              `,
            });

            return existingMovies;
          },
        },
      });
    },
  });

  const likeMovie = (is_liked, id, title) => {
    updateThumbs({ variables: { is_liked, id, title } });
  };

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
      <input type='text' placeholder='Enter Movie Title' ref={titleInputRef} />
      <button
        onClick={() => {
          if (titleInputRef.current.value !== '') {
            getMovie({ variables: { title: titleInputRef.current.value } });
          }
          titleInputRef.current.value = '';
        }}
      >
        Search
      </button>
      <br />
      {loading && <p>Fetching movie...</p>}
      {error && <p>Error: {error}</p>}
      {data?.movie && <Movie movie={data.movie} likeMovie={likeMovie} />}
    </div>
  );
};

const GET_MOVIE = gql`
  query GetMovie($title: String!) {
    movie(title: $title) {
      id
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
  mutation UpdateThumbs($is_liked: Boolean!, $id: ID!, $title: String!) {
    update_thumbs(is_liked: $is_liked, id: $id, title: $title) {
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

  ul {
    list-style: none;

    li {
      padding: 0.2rem 0;
    }
  }
`;

export default HomePage;
