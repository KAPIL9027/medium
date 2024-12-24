import {ChangeEvent, useEffect, useState } from "react";
import AuthHeader from "./AuthHeader";
import LabeledInput from "./LabeledInput";
import Quote from "./Quote";
import Button from "./Button";
import { SignupType } from "@kapil0107/common-app";
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{
    const navigate = useNavigate()
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const backend_url: string = import.meta.env.VITE_BACKEND_URL;
    
    useEffect(()=>{
        const userToken = localStorage.getItem('userToken');
        if(userToken){
            navigate('/blogs');
        }
    },[])

    const onSignUp: ()=> void = async ()=>{
        if(!email || !password){
            return;
        }
        const signupData: SignupType = {
            email,
            password
        };
        if(name)
            signupData["name"] = name;
        
        const options = {
            method: "POST",
            body: JSON.stringify(signupData)
        }
        const response = await fetch(`${backend_url}/user/signup`,options);
        const signupResponse = await response.json();
        const message = signupResponse.message;
        const token = signupResponse.token;
        if(message){
            console.log(message);
            return;
        }
        localStorage.setItem('userToken',token);
    }
    
    return (
        <div className="xl:grid xl:grid-cols-2">
        <div className="flex flex-col items-center h-screen mt-20 xl:mt-0 xl:justify-center">
        <AuthHeader type={'signup'}/>
        <div className="flex flex-col items-center w-full gap-4 px-4 py-8">
        <LabeledInput type='text' placeholder='Enter your username' label='Username' onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            setName(e.target.value)
        }}/>
        <LabeledInput type='email' placeholder='m@email.com' label='Email' onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            setEmail(e.target.value)
        }}/>
        <LabeledInput type='password' placeholder='Enter your password' label='Password' onChange={(e: ChangeEvent<HTMLInputElement>)=>{
            setPassword(e.target.value)
        }}/>
        <div className="flex justify-center w-full">
        <Button text={"Sign Up"} onClick={onSignUp}/>
        </div>
        
        </div>
        
        
        </div>
        
        <div className="hidden xl:block"><Quote quote={"The customer service I received was exceptional. The support team went above and beyond to address my concerns."} authorName={"Kapil Vashisht"} designation={"CEO, Acme"}/></div>
        </div>
    )
}

export default Signup;