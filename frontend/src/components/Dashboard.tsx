import { useEffect, useState } from "react"
import Blogs from "./Blogs"
import { Header } from "./Header"
import { useNavigate } from "react-router-dom"
import ShimmerCard from "./ShimmerCard"

const Dashboard = () => {
    const [blogs,setBlogs] = useState([]);
    const navigate = useNavigate()
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const getBlogs: ()=> void = async ()=>{
        if(localStorage.getItem('userToken')){
            const options = {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('userToken')}`
                }
            }
            const response = await fetch(`${backend_url}/blog/bulk`,options);
            const responseData = await response.json();
            if(!responseData) navigate('/');
            else{
                setBlogs(responseData)
            } 
        }       
        else
        {
            navigate('/')
        }
    }
    useEffect(()=>{
        getBlogs()
    },[])

  return (

    <div className="p-14 flex flex-col gap-8">
      <Header/>
      {
        blogs.length === 0 && (
        <div className="flex flex-col gap-4">
        <ShimmerCard/>
        <ShimmerCard/>
        <ShimmerCard/>
        <ShimmerCard/>
        </div>)
       }
      {blogs.length > 0 && <Blogs blogs={blogs}/>}
    </div>
  )
}

export default Dashboard
