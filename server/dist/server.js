"use strict";
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var context_1 = require("./context");
var schema_1 = require("./schema");
var server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: context_1.createContext
});
server.listen().then(function (_a) {
    var url = _a.url;
    return console.log("\uD83D\uDE80 Server ready at: ".concat(url, "\n\u2B50\uFE0F See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api"));
});
