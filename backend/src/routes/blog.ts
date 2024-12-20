import { describe } from 'vitest';
import { verify } from 'hono/jwt';
import {Hono} from 'hono';
import {PrismaClient} from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate';

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use('/*',async (c,next)=>{
   const auth = c.req.header('Authorization');
   const token = auth?.split(" ")[1];
   if(!auth || !auth.startsWith("Bearer") || !token){
    c.status(401);
    return c.json({
        message: "Not Authorized!"
    })
   }
   const payload = await verify(token,c.env.JWT_SECRET);
   c.set("userId",payload.userId);
   await next();
});

blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient(
          {datasourceUrl: c.env.DATABASE_URL}
        ).$extends(withAccelerate());
    const blogData = await c.req.json();
    if(!blogData){
        c.status(411);
        c.json({
            message: "No data provided!"
        });
    }
    try{
        const blog = await prisma.post.create({
            data: {
                title: blogData.title,
                description: blogData.description,
                authorId: Number(c.get('userId'))
            }
        });
        return c.json({
            message: "blog created succesfully"
        })
    }
    catch(e){
        console.log(e);
        c.status(411);
        c.json({
            message: "Incorrect data provided!"
        })
    }
    

    
})

blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient(
        {datasourceUrl: c.env.DATABASE_URL}
      ).$extends(withAccelerate());
    const blogData = await c.req.json();
    if(!blogData){
        c.status(411);
        c.json({
            message: "No data provided!"
        })
    }
    
    const updatedData = await prisma.post.update({
        where: {
            id: Number(blogData.id),
            authorId: Number(c.get('userId'))
        },
        data: {
            title: blogData.title,
            description: blogData.description
        }
    })
    if(!updatedData){
        c.status(411);
        c.json({
            message: "Incorrect data provided!"
        });
    }
    return c.json({
        message: "Successfully updated the blog!"
    })
})

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient(
        {datasourceUrl: c.env.DATABASE_URL}
      ).$extends(withAccelerate()); 
    const blogs = await prisma.post.findMany({});
    
    return c.json(blogs);
    })


blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient(
        {datasourceUrl: c.env.DATABASE_URL}
      ).$extends(withAccelerate());
    const id = c.req.param('id');
    if(!id){
        c.status(411);
        return c.json({message: "No id provided!"})
    }
    const blog = await prisma.post.findUnique({
        where: {
            id: Number(id)
        }
    })
    if(!blog){
        c.status(411);
        return c.json({
            message: "Blog doesn't exist!"
        })
    }
    return c.json({
        blog
    })
})



export default blogRouter;