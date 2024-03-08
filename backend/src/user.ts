import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { Hono } from "hono";
import { signUpInput, signinInput } from "@ruhneb/common1";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsedBody = signUpInput.safeParse(body);
  if (!parsedBody.success) {
    c.status(403);
    return c.text("The input was invalid, please check the types!");
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  if (userExists) {
    c.status(400);
    return c.text("This user already exists!");
  }
  try {
    const createUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: createUser }, c.env.JWT_SECRET);
    console.log("this is something right?");
    return c.json({
      token: token,
      authorId: createUser.id,
      authorName: createUser.name,
    });
  } catch (err) {
    return c.json(err);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const parsedBody = signinInput.safeParse(body);
  if (!parsedBody.success) {
    c.status(403);
    return c.text("The input was invalid, please check the types!");
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });
  console.log("🚀 ~ app.post ~ userExists:", userExists);

  if (!userExists) return c.notFound();
  const token = await sign({ id: userExists.id }, c.env.JWT_SECRET);
  return c.json({
    token: token,
    authorId: userExists.id,
    authorName: userExists.name,
  });
});
