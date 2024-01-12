const router = require("express").Router();

const authRouter = require("./auth.routes");
const colRouter = require("./columns.routes");

const defaultRoutes = [
    {
        path: "/auth",
        router: authRouter
    },
    {
        path: "/col",
        router: colRouter
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.router);
});

module.exports = router;