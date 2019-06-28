const movieService = require('../service/movie');

class Movie {
    async getMovies(ctx, next) {
        const data = await movieService.loadMovie();

        ctx.type = 'json';
        ctx.body = { code: 200, data };
    }
}

module.exports = Movie;