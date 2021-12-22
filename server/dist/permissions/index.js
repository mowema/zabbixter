"use strict";
exports.__esModule = true;
exports.permissions = void 0;
var graphql_shield_1 = require("graphql-shield");
var utils_1 = require("../utils");
var rules = {
    isAuthenticatedUser: (0, graphql_shield_1.rule)()(function (_parent, _args, context) {
        var userId = (0, utils_1.getUserId)(context);
        return Boolean(userId);
    })
};
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        me: rules.isAuthenticatedUser
    },
    Mutation: {
        createHost: rules.isAuthenticatedUser,
        deleteHost: rules.isAuthenticatedUser
    }
});
