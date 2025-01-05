
import BlogCard from "./BlogCard"

type User = {
    name: string
}
type Blog = {
    id: number,
    title: string,
    description: string,
    author: User
}
type blogsPropsType = {
    blogs: Blog[]
}
const Blogs = ({blogs}:blogsPropsType) => {
  return (
    <div className="flex flex-col gap-8 md:items-center">
      {
        blogs?.map((blog: Blog)=>{
            return <BlogCard key={blog?.id} id={blog?.id} title={blog?.title} description={blog?.description} name={blog?.author?.name}/>
        })
      }
    </div>
  )
}

export default Blogs
