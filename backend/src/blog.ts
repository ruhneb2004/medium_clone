import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { createPostInput, updatePostInput } from "@ruhneb/common1";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.post("/post", async (c) => {
  const body = await c.req.json();
  if (!body) return c.notFound();
  const parsedBody = createPostInput.safeParse(body);
  if (!parsedBody.success) {
    c.status(403);
    return c.text("The input was invalid, please check the types!");
  }
  const userId = c.get("userId");
  console.log("🚀 ~ blogRouter.post ~ userId:", userId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!userId) return c.notFound();
  const createNote = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  if (!createNote) {
    c.status(403);
    return c.text("Note not created");
  }

  return c.json(createNote);
});

blogRouter.put("/update", async (c) => {
  const body = await c.req.json();

  const parsedBody = updatePostInput.safeParse(body);
  if (!parsedBody.success) {
    c.status(403);
    return c.text("The input was invalid, please check the types!");
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  if (!userId) {
    c.status(404);
    return c.text("User not found");
  }
  const updateNote = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  if (!updateNote) {
    c.status(500);
    return c.text("updating notes has failed!");
  }

  return c.json(updateNote);
});

blogRouter.get("/getBlog/:id", async (c) => {
  console.log("This is something right?");
  const blogId = c.req.param("id");
  console.log("🚀 ~ blogRouter.get ~ blogId:", blogId);
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blog = await prisma.post.findFirst({
    where: {
      id: blogId as string,
    },
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      author: { select: { name: true } },
    },
  });
  console.log("🚀 ~ blogRouter.get ~ blog:", blog);

  return c.json(blog);
});

blogRouter.get("/getAllBlog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const reponse = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,

      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return c.json(reponse);
});
