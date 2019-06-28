const Router = require('koa-router');

const Movie = require('./controller/movie');

const router = new Router();
const routeMap = [
    ['get', '/api/getMovies', new Movie(), 'getMovies'],
];

routeMap.forEach(route => {
    const [ method, path, controller, action ] = route;

    // 控制器方法可方便的通过this获取到控制器和ctx
    router[method](
        path,
        async(ctx, next) => controller[action].bind(Object.assign(controller, ctx))(ctx, next)
    );
});

module.exports = router;