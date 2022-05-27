const jsonServer = require('json-server');
const app = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults({
  static: "./build"
});
const port = process.env.PORT || 3001;
server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);
server.use(router);
server.listen(port, () => {
console.log("Server is running on ${port}");
});