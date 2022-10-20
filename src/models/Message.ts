import { builder} from "../builder";
import { prisma } from "../db";

builder.prismaObject("Message", {
    fields: (t) => ({
        id: t.exposeID("id"),
        body: t.exposeString("body"),
        createdAt: t.expose("createdAt", {
            type: "Date"
        })
    }),
})

builder.queryField("message",(t) => 
    t.prismaField({
        type: "Message",
        nullable: true,
        args:{
            id: t.arg.id({ required: true})
        },
        resolve: async (query, root, args, ctx, info) => {
            return  prisma.message.findUnique({
                ...query,
                where: {
                    id: Number.parseInt(String(args.id), 10)
                }
            })
        }
    })
)