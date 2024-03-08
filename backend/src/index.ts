import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { userRouter } from "./user";
import { blogRouter } from "./blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SOMETHING: string;
  };
  Variables: {
    userId: string;
    prisma: string;
  };
}>();
app.use(cors());
app.route("api/v1/user", userRouter);

app.use("/api/v1/blog/*", async (c, next) => {
  console.log("This is the auth");
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  console.log("🚀 ~ app.use ~ token:", token);
  const res = await verify(token, c.env.JWT_SECRET);
  console.log("🚀 ~ app.use ~ res:", res);
  if (!res.id) {
    c.status(403);
    return c.text("You dont have enough verification, please login again");
  }
  c.set("userId", res.id);
  const userId = c.get("jwtPayload");
  console.log("🚀 ~ app.use ~ userId:", userId);

  await next();
});

app.route("api/v1/blog", blogRouter);

export default app;
