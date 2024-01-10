const router = require("express").Router();

const authRouter = require("./auth.routes");

const defaultRoutes = [
    {
        path: "/auth",
        router: authRouter
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;