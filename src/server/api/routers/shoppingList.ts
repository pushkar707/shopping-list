import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const shoppingListRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ item: z.string(), checked:z.boolean().optional(), id: z.string().optional() }))
    .mutation(async ({ input, ctx }) => {
      const data:{item:string, id?:string, checked?:boolean} = {
        item:input.item
      }
      if (input.id !== undefined) {
        data.id = input.id;
      }
    
      if (input.checked !== undefined) {
        data.checked = input.checked;
      }
    
      await ctx.db.shoppingList.create({
        data
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
  }),

  deleteItem: publicProcedure
    .input(z.object({id:z.string()}))
    .mutation(async ({input , ctx}) => {
      await ctx.db.shoppingList.delete({
        where: {id: input.id}
      })
    })
});
