
import {PrismaClient} from '@prisma/client/edge';
import {signupInput,signinInput,SigninType,SignupType, } from '@kapil0107/common-app';
import {sign} from 'hono/jwt';
import { withAccelerate } from '@prisma/extension-accelerate';
import {Hono} from 'hono';



const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();


userRouter.post('/signup',async (c)=>{
    try {
    const signupData: SignupType = await c.req.json();
    const {success} = signupInput.safeParse(signupData);
    if(!success){
        c.status(411);
        c.json({message: "Invalid Inputs!"});
    }
    const prisma = new PrismaClient(
      {datasourceUrl: c.env.DATABASE_URL}
    ).$extends(withAccelerate());

        const result = await prisma.user.create({
        data: {
            email: signupData.email,
            password: signupData.password,
            name: signupData.name
        }
    });
    const token = await sign({userId: result.id},c.env.JWT_SECRET);
    return c.json({
        token
    });
}
catch(e){
    console.log(e);
    c.status(411);
    return c.json({
        message: "Incorrect data provided!"
    })
}
})

userRouter.post('/signin',async (c)=>{
    const prisma = new PrismaClient(
        {datasourceUrl: c.env.DATABASE_URL}
      ).$extends(withAccelerate());
    const signinData: SigninType = await c.req.json();
    const {success} = signinInput.safeParse(signinData);
    if(!success){
        c.status(411);
        c.json({
            message: "Invalid inputs!"
        })
    }
    const userExists = await prisma.user.findFirst({
        where: {
            email: signinData.email,
            password: signinData.password
        },
        select: {
            id: true
        }
    });
    
    if(userExists && userExists.id){
        let token = await sign({userId: userExists.id},c.env.JWT_SECRET);
        return c.json({token});
    }
    return c.json({message: "Invalid email or password!"});
    
})



export default userRouter;