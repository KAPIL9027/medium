export const CreateBlog = ()=>{
    return (
        <div className="flex flex-col p-4 md:p-12 w-screen h-screen">
            <div className="flex gap-2">
            <span  className="text-7xl h-16">
                +
            </span>
            <input className="text-4xl w-full h-20" placeholder="Title"/>
            
            </div>
            <textarea className="text-2xl pl-4" placeholder="Tell your story"/>
            
        </div>
    )
}