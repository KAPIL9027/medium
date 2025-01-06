import { Link } from 'react-router-dom';
import Avatar from './Avatar'

type BlogCardProps = {
    id: number,
    title: string,
    description: string,
    name: string
}

function calculateReadingTime(characters: number) {
    const avgWordLength = 5; // average word length
    const wordsPerMinute = 200; // average reading speed
    
    const words = characters / avgWordLength;
    const minutes = words / wordsPerMinute;
    
    return Math.ceil(minutes); // round up to the nearest minute
  }

const BlogCard = ({id,title,description,name}: BlogCardProps) => {
    const splitarray = name?.split(" ");
    const firstname = splitarray[0];
    const lastnameFirstChar = splitarray[1]?.substring(0,1) ?? '';
  return (
    <Link to={`/blog?id=${id}&name=${name}`} className="flex justify-center w-full">
    <div className="flex flex-col gap-3 py-5 border-b-2 cursor-pointer md:w-1/2 border-b-slate-200 ">
      <div className="flex items-center gap-2">
        <Avatar initials={name?.substring(0,2)?.toUpperCase()}/>
        <p className="text-sm font-semibold">{`${firstname} ${lastnameFirstChar}.`}</p>
      </div>
      <h1 className="text-2xl font-bold line-clamp-3">{title}</h1>
      <p className="text-md line-clamp-3">{description}</p>
      <p className="text-sm text-slate-400">{`${calculateReadingTime(description.length)} min read`}</p>
    </div>
    </Link>
    
  )
}

export default BlogCard
