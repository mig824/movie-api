import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Global as GlobalCSS, css } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';

import client from './graphql/client-config';
import HomePage from './pages/Home';
import SavedMoviesPage from './pages/SavedMovies';

const App = () => (
  <ApolloProvider client={client}>
    <GlobalCSS styles={globalCSS} />
    <BrowserRouter>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/saved-movies' component={SavedMoviesPage} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

const globalCSS = css`
  html,
  body {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    background-color: #dbd3d3;
    font-family: Arial, Helvetica, sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default App;
