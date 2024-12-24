

type ButtonType = {
    text: string,
    onClick: ()=> void;
}

const Button = ({text,onClick}: ButtonType)=>{
    return (
        <button className="w-full p-2 text-white bg-black rounded-sm md:w-1/2" onClick={onClick}>
            {text}
        </button>
    )
}

export default Button;