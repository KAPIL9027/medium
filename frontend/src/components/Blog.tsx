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
        {
            (blog?.title && blog?.description ) ? (
                <div className="flex flex-col w-full gap-4 p-8 xl:p-20 xl:w-3/4">
        <h1 className="text-4xl font-bold xl:text-5xl">{blog?.title}</h1>
        <p className="text-xl">{blog?.description}</p>
        </div>
            )
            :
            (
                <div className="w-full max-w-sm p-4 mx-auto mt-16">
  <div className="flex space-x-4 animate-pulse">
    <div className="flex-1 py-1 space-y-6">
      <div className="h-2 rounded bg-slate-700"></div>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-2 col-span-2 rounded bg-slate-700"></div>
          <div className="h-2 col-span-1 rounded bg-slate-700"></div>
        </div>
        <div className="h-2 rounded bg-slate-700"></div>
      </div>
    </div>
  </div>
</div>
            )
        }
        
        <div className="hidden p-8 xl:flex xl:flex-col xl:py-20 xl:px-16 xl:gap-2">
            <p className="text-lg font-semibold">Author</p>
            <div className="flex items-center gap-2">
                <Avatar initials={authorInitials}/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">{authorName}</h2>
                    <p className="text-lg">Mater of mirth, purveyor of puns, and the funniest person in the Kingdom.</p>
                </div>
            </div>
        </div>
        
        </div>
    )
}

export default Blog;