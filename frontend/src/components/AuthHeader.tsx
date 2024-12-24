import {Link} from 'react-router-dom'
type AuthTypes = {
    type: string
}

const AuthHeader = ({type}: AuthTypes)=>{
    const toUrl: string = type !== 'signin' ? '/': '/signup';
    return (
        <div className="flex flex-col items-center justify-center w-full gap-1">
            <h1 className="text-2xl font-bold">{type === 'signin' ? 'Sign in':'Create an account'}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <p>{type !== 'signin' ? 'Already have an account?':"Don't have an account?"}</p>
            <Link className="underline" to={toUrl}>{type!=='signin'?'Login':'Signup'}</Link>
            </div>
        </div>
    )
}

export default AuthHeader;