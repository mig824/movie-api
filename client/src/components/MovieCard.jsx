/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';

const MovieCard = ({ movie: { title, thumbs_up, thumbs_down } }) => (
  <div css={movieCardCSS}>
    <h4>{title}</h4>
    <hr />
    <p>thumbs up: {thumbs_up}</p>
    <p>thumbs down: {thumbs_down}</p>
  </div>
);

const movieCardCSS = css`
  text-align: center;
  padding: 0.3rem;
  width: 32%;
  margin: 0.2rem;
  border: 1px solid #111;
  box-shadow: 0 0 5px #444;
  background-color: #ccc;
  border-radius: 5px;

  hr {
    border-color: #aaa;
  }
`;

export default MovieCard;
