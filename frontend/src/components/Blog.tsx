import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useNavigate, useSearchParams } from "react-router-dom";

type Blog = {
    title: string,
    description: string
}
const Blog = ()=>{
    const [blog,setBlog] = useState<Blog>({
        title: "",
        description: ""
    });
    const [searchParams, setSearchParams] = useSearchParams();
    
    const blogId = searchParams.get("id");
    const authorName = searchParams.get("name");
    const authorInitials = authorName?.substring(0,2).toUpperCase();
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate()
    const getBlog: ()=> void = async ()=>{
        const options = {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
        const response = await fetch(`${backend_url}/blog/${blogId}`,options);
        const responseData = await response.json();
        if(!responseData || responseData.message){
            navigate('/blogs')
        }
        setBlog({
            title: responseData?.blog?.title,
            description: responseData?.blog?.description
        });
    }
    useEffect(()=>{
        if(!localStorage.getItem('userToken')){
            navigate('/')
        }
    })
    useEffect(()=>{
        getBlog()
    },[])
    return (
        <div className="flex w-screen h-screen">
        <div className="flex flex-col gap-4 w-full p-8 xl:p-20 xl:w-3/4">
        <h1 className="font-bold text-4xl xl:text-5xl">{blog?.title}</h1>
        <p className="text-2xl xl:text-3xl">{blog?.description}</p>
        </div>
        <div className="hidden xl:flex xl:flex-col p-8 xl:py-20 xl:px-16 xl:gap-2">
            <p className="font-semibold text-lg">Author</p>
            <div className="flex gap-2 items-center">
                <Avatar initials={authorInitials}/>
                <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-2xl">{authorName}</h2>
                    <p className="text-lg">Mater of mirth, purveyor of puns, and the funniest person in the Kingdom.</p>
                </div>
            </div>
        </div>
        
        </div>
    )
}

export default Blog;