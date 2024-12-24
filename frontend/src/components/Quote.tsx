
type quoteType = {
    quote: string,
    authorName: string,
    designation: string
}
const Quote = ({quote,authorName,designation}: quoteType)=>{
return (
    <div className="flex items-center justify-center w-full h-full p-32 bg-gray-100">
        <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">"{quote}"</h1>
        <h4 className="text-lg font-semibold">{authorName}</h4>
        <p className="text-sm font-light">{designation}</p>
        </div>
        
    </div>
)
}

export default Quote;