"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostInput = exports.createPostInput = exports.signinInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpInput = zod_1.default.object({
    name: zod_1.default.string().max(50).optional(),
    email: zod_1.default.string().max(100),
    password: zod_1.default.string().max(100),
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().max(100),
    password: zod_1.default.string().max(100),
});
exports.createPostInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    authorId: zod_1.default.string(),
});
exports.updatePostInput = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    authorId: zod_1.default.string(),
});
