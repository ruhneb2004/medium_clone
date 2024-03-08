import zod from "zod";

export const signUpInput = zod.object({
  name: zod.string().max(50).optional(),
  email: zod.string().email(),
  password: zod.string().max(100),
});

export type SignUpInput = zod.infer<typeof signUpInput>;

export const signinInput = zod.object({
  email: zod.string().email(),
  password: zod.string().max(100),
});

export type SignInInput = zod.infer<typeof signinInput>;

export const createPostInput = zod.object({
  title: zod.string(),
  content: zod.string(),
  authorId: zod.string(),
});

export type CreatePostInput = zod.infer<typeof createPostInput>;

export const updatePostInput = zod.object({
  id: zod.string(),
  title: zod.string(),
  content: zod.string(),
  authorId: zod.string(),
});

export type UpdatePostInput = zod.infer<typeof updatePostInput>;
