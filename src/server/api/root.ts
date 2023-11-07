import { shoppingListRouter } from "~/server/api/routers/shoppingList";
import { createTRPCRouter } from "~/server/api/trpc";
import { UserRouter } from "./routers/User";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shoppingList: shoppingListRouter,
  user: UserRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
