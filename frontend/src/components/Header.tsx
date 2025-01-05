import { Link } from "react-router-dom"

export const Header = ()=>{
    return (
        <div className="flex gap-4 border-b-2 border-b-slate-300 items-center">
            <Link to='/create' className="text-slate-400 text-3xl">+</Link>
            <span className="relative top-1 border-b-2 border-b-black h-full text-xl pb-1">For you</span>
        </div>
    )
}