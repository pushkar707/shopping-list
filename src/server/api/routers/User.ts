import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const UserRouter = createTRPCRouter({
    addUser: publicProcedure
    .input(z.object({email: z.string() , password: z.string()}))
    .mutation(async ({input, ctx}) => {
        const {email , password} = input
        
        const existingUser = await ctx.db.user.findUnique({
            where:{
                email
            }
        })

        if(existingUser){
            if(password === existingUser.password)
                return {exisitng: true, valid:true}
            return {existing: true, valid: false}
        }

        await ctx.db.user.create({
            data:{
                email,password
            }
        })

        return {exisitng: false, valid:true}
    })
})