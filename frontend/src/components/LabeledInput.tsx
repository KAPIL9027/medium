import { ChangeEvent } from "react";

type LabeledInputType = {
    label: string,
    type: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>)=> void
}
const LabeledInput = ({label,type,placeholder,onChange}: LabeledInputType)=>{
    return (
        <div className="flex flex-col w-full gap-2 xl:w-1/2">
            <label className="text-xl font-bold">{label}</label>
            <input className="p-2 border border-gray-300 rounded-md" type={type} placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}

export default LabeledInput;