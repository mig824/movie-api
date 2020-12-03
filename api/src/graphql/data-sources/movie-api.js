const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server-express');

class MovieAPI extends RESTDataSource {
  constructor() {
    super();
    /**
     * an API key is required to make these requests
     *
     * if you want, go to the baseURL and submit your email
     * then enter the key in a .env file (refer to .env.example)
     * or hard code it
     *
     * (its free)
     */
    this.baseURL = 'http://www.omdbapi.com/';
  }

  willSendRequest(request) {
    request.params.set('apikey', this.context.apiKey);
  }

  async getMovie(title) {
    try {
      const response = await this.get(`?t=${title}`);
      if (response?.Error?.includes('not found')) {
        throw new UserInputError('MOVIE NOT FOUND');
      }

      return response;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = MovieAPI;

/************ Example response
 *
 * {
 *   Title: 'Interstellar',
 *   Year: '2014',
 *   Rated: 'PG-13',
 *   Released: '07 Nov 2014',
 *   Runtime: '169 min',
 *   Genre: 'Adventure, Drama, Sci-Fi, Thriller',
 *   Director: 'Christopher Nolan',
 *   Writer: 'Jonathan Nolan, Christopher Nolan',
 *   Actors: 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow',
 *   Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
 *   Language: 'English',
 *   Country: 'USA, UK, Canada',
 *   Awards: 'Won 1 Oscar. Another 43 wins & 148 nominations.',
 *   Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
 *   Ratings: [
 *     { Source: 'Internet Movie Database', Value: '8.6/10' },
 *     { Source: 'Rotten Tomatoes', Value: '72%' },
 *     { Source: 'Metacritic', Value: '74/100' }
 *   ],
 *   Metascore: '74',
 *   imdbRating: '8.6',
 *   imdbVotes: '1,473,010',
 *   imdbID: 'tt0816692',
 *   Type: 'movie',
 *   DVD: 'N/A',
 *   BoxOffice: 'N/A',
 *   Production: 'Syncopy, Lynda Obst Productions',
 *   Website: 'N/A',
 *   Response: 'True'
 * }
 *
 */
