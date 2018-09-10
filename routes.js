const routes = (module.exports = require("next-routes")());

routes.add("/", "root").add("/:address", "address");
