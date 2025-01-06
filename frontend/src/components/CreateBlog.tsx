import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Badge } from "./Badge";

export const CreateBlog = ()=>{

    const [status,setStatus] = useState<'error' | 'success' | ''>("");
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const onClick: ()=> void = async ()=> {
        const title: string | undefined = titleRef.current?.value;
        const description: string | undefined = descriptionRef.current?.value;
        if(!title || !description){
            setStatus('error');
            return;
        }
        const options = {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('userToken')}`
            },
            body: JSON.stringify({
                title,
                description
            })
        };
        const response = await fetch(`${backendUrl}/blog`,options);
        const responseData = await response.json();
        if(!responseData || !responseData?.message?.startsWith('Blog')){
            setStatus('error')
        }
        setStatus('success');
        setInterval(()=>{
            navigate('/blogs')
        },10000)

    }
    useEffect(()=>{
        if(!localStorage.getItem('userToken')){
            navigate('/')
        }
        titleRef.current?.focus();
    },[])
    return (
        <div className="flex flex-col w-screen h-screen p-4 md:p-12">
            <div className="flex justify-between w-full">
                <div className="flex gap-2">
                <h1 className="ml-1 text-2xl font-bold">Medium</h1>
                {
                    status && <Badge type={status}/>
                }
                
                </div>
                
                <button className="px-2 py-1 text-white transition duration-300 ease-in-out delay-150 bg-green-600 rounded-lg hover:bg-green-800 hover:-translate-y-1 hover:scale-105" onClick={onClick}>Publish</button>
            </div>
            <div className="flex gap-2">
            <span  className="h-16 text-7xl">
                +
            </span>
            <textarea ref={titleRef} className="w-full h-20 p-1 mt-4 text-xl font-bold md:text-4xl focus:outline-none focus:border-none" placeholder="Title"/>
            
            </div>
            <textarea ref={descriptionRef} className="pl-4 text-md md:text-2xl focus:outline-none focus:border-none h-[95%]" placeholder="Tell your story"/>
            
        </div>
    )
}