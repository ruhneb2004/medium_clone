import zod from "zod";
export declare const signUpInput: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignUpInput = zod.infer<typeof signUpInput>;
export declare const signinInput: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignInInput = zod.infer<typeof signinInput>;
export declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    authorId: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
}, {
    title: string;
    content: string;
    authorId: string;
}>;
export type CreatePostInput = zod.infer<typeof createPostInput>;
export declare const updatePostInput: zod.ZodObject<{
    id: zod.ZodString;
    title: zod.ZodString;
    content: zod.ZodString;
    authorId: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    content: string;
    authorId: string;
    id: string;
}, {
    title: string;
    content: string;
    authorId: string;
    id: string;
}>;
export type UpdatePostInput = zod.infer<typeof updatePostInput>;
