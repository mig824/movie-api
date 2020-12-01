/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';

const MovieCard = ({ movie: { title, thumbs_up, thumbs_down } }) => {
  return (
    <div css={movieCardCSS}>
      <h4>{title}</h4>
      <p>thumbs up: {thumbs_up}</p>
      <p>thumbs down: {thumbs_down}</p>
    </div>
  );
};

const movieCardCSS = css`
  text-align: center;
  width: 33%;
`;

export default MovieCard;
