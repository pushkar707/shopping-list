import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ item: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.shoppingList.create({
        data: {
          item: input.item
        }
      })
    }),

  getItems: publicProcedure
    .query(async ({ ctx }) => {
      const items = await ctx.db.shoppingList.findMany()

      return items
    }),

  checkItem: publicProcedure
    .input(z.object({ id: z.string(), checked: z.boolean() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.shoppingList.update({
        where: { id: input.id },
        data: { checked: input.checked }
      }) 
    })
});
