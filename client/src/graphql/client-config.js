import { ApolloClient, InMemoryCache } from '@apollo/client';

/**
 * NOTE: Make sure this matches your server port while in development
 */
const GQL_URL = process.env.GQL_URL || 'http://localhost:3333/graphql';

const client = new ApolloClient({
  uri: GQL_URL,
  cache: new InMemoryCache(),
});

export default client;
