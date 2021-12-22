"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.schema = exports.DateTime = void 0;
var permissions_1 = require("./permissions");
var utils_1 = require("./utils");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var graphql_middleware_1 = require("graphql-middleware");
var nexus_1 = require("nexus");
var graphql_scalars_1 = require("graphql-scalars");
exports.DateTime = (0, nexus_1.asNexusMethod)(graphql_scalars_1.DateTimeResolver, 'date');
var Query = (0, nexus_1.objectType)({
    name: 'Query',
    definition: function (t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: function (_parent, _args, context) {
                return context.prisma.user.findMany();
            }
        });
        t.nullable.field('me', {
            type: 'User',
            resolve: function (parent, args, context) {
                var userId = (0, utils_1.getUserId)(context);
                return context.prisma.user.findUnique({
                    where: {
                        id: Number(userId)
                    }
                });
            }
        });
        t.nullable.field('hostById', {
            type: 'Host',
            args: {
                id: (0, nexus_1.intArg)()
            },
            resolve: function (_parent, args, context) {
                return context.prisma.host.findUnique({
                    where: { id: args.id || undefined }
                });
            }
        });
        t.nonNull.list.nonNull.field('listHosts', {
            type: 'Host',
            resolve: function (_parent, args, context) {
                return context.prisma.host.findMany();
            }
        });
    }
});
var Mutation = (0, nexus_1.objectType)({
    name: 'Mutation',
    definition: function (t) {
        var _this = this;
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                name: (0, nexus_1.stringArg)(),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve: function (_parent, args, context) { return __awaiter(_this, void 0, void 0, function () {
                var hashedPassword, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, bcryptjs_1.hash)(args.password, 10)];
                        case 1:
                            hashedPassword = _a.sent();
                            return [4 /*yield*/, context.prisma.user.create({
                                    data: {
                                        name: args.name,
                                        email: args.email,
                                        password: hashedPassword
                                    }
                                })];
                        case 2:
                            user = _a.sent();
                            return [2 /*return*/, {
                                    token: (0, jsonwebtoken_1.sign)({ userId: user.id }, utils_1.APP_SECRET),
                                    user: user
                                }];
                    }
                });
            }); }
        });
        t.field('login', {
            type: 'AuthPayload',
            args: {
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)())
            },
            resolve: function (_parent, _a, context) {
                var email = _a.email, password = _a.password;
                return __awaiter(_this, void 0, void 0, function () {
                    var user, passwordValid;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, context.prisma.user.findUnique({
                                    where: {
                                        email: email
                                    }
                                })];
                            case 1:
                                user = _b.sent();
                                if (!user) {
                                    throw new Error("No user found for email: ".concat(email));
                                }
                                return [4 /*yield*/, (0, bcryptjs_1.compare)(password, user.password)];
                            case 2:
                                passwordValid = _b.sent();
                                if (!passwordValid) {
                                    throw new Error('Invalid password');
                                }
                                return [2 /*return*/, {
                                        token: (0, jsonwebtoken_1.sign)({ userId: user.id }, utils_1.APP_SECRET),
                                        user: user
                                    }];
                        }
                    });
                });
            }
        });
        t.field('deleteHost', {
            type: 'Host',
            args: {
                id: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
            },
            resolve: function (_, args, context) {
                return context.prisma.host["delete"]({
                    where: { id: args.id }
                });
            }
        });
        t.field('createHost', {
            type: 'Host',
            args: {
                data: (0, nexus_1.nonNull)((0, nexus_1.arg)({
                    type: 'HostCreateInput'
                }))
            },
            resolve: function (_, args, context) {
                var userId = (0, utils_1.getUserId)(context);
                return context.prisma.host.create({
                    data: {
                        title: args.data.title
                    }
                });
            }
        });
        t.field("createProfile", {
            type: "Profile",
            args: {
                bio: (0, nexus_1.stringArg)(),
                location: (0, nexus_1.stringArg)(),
                website: (0, nexus_1.stringArg)()
            },
            resolve: function (parent, args, ctx) {
                var userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.profile.create({
                    data: __assign(__assign({}, args), { User: { connect: { id: Number(userId) } } })
                });
            }
        });
        t.field("updateProfile", {
            type: "Profile",
            args: {
                id: (0, nexus_1.intArg)(),
                bio: (0, nexus_1.stringArg)(),
                location: (0, nexus_1.stringArg)(),
                website: (0, nexus_1.stringArg)()
            },
            resolve: function (parent, _a, ctx) {
                var id = _a.id, args = __rest(_a, ["id"]);
                var userId = (0, utils_1.getUserId)(ctx);
                if (!userId)
                    throw new Error("Could not authenticate user.");
                return ctx.prisma.profile.update({
                    data: __assign({}, args),
                    where: {
                        id: Number(id)
                    }
                });
            }
        });
    }
});
var User = (0, nexus_1.objectType)({
    name: 'User',
    definition: function (t) {
        t.nonNull.int('id');
        t.string('name');
        t.nonNull.string('email');
        t.field('Profile', {
            type: Profile,
            resolve: function (parent, _, context) {
                return context.prisma.user
                    .findFirst({
                    where: { id: parent.id || undefined }
                })
                    .Profile();
            }
        });
    }
});
var Host = (0, nexus_1.objectType)({
    name: 'Host',
    definition: function (t) {
        t.nonNull.int('id');
        t.nonNull.string('title');
    }
});
var Profile = (0, nexus_1.objectType)({
    name: 'Profile',
    definition: function (t) {
        t.nonNull.int('id');
        t.string('bio');
        t.string('location');
        t.string('website');
    }
});
var SortOrder = (0, nexus_1.enumType)({
    name: 'SortOrder',
    members: ['asc', 'desc']
});
var UserUniqueInput = (0, nexus_1.inputObjectType)({
    name: 'UserUniqueInput',
    definition: function (t) {
        t.int('id');
        t.string('email');
    }
});
var HostCreateInput = (0, nexus_1.inputObjectType)({
    name: 'HostCreateInput',
    definition: function (t) {
        t.nonNull.string('title');
        t.string('content');
    }
});
var UserCreateInput = (0, nexus_1.inputObjectType)({
    name: 'UserCreateInput',
    definition: function (t) {
        t.nonNull.string('email');
        t.string('name');
        t.list.nonNull.field('posts', { type: 'HostCreateInput' });
    }
});
var AuthPayload = (0, nexus_1.objectType)({
    name: 'AuthPayload',
    definition: function (t) {
        t.string('token');
        t.field('user', { type: 'User' });
    }
});
/*
* SCHEMA
*
*/
var schemaWithoutPermissions = (0, nexus_1.makeSchema)({
    types: [
        Query,
        Mutation,
        Host,
        User,
        Profile,
        AuthPayload,
        UserUniqueInput,
        UserCreateInput,
        HostCreateInput,
        SortOrder,
        exports.DateTime,
    ],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts'
    },
    contextType: {
        module: require.resolve('./context'),
        "export": 'Context'
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma'
            },
        ]
    }
});
exports.schema = (0, graphql_middleware_1.applyMiddleware)(schemaWithoutPermissions, permissions_1.permissions);
