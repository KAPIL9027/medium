
type badgePropsType = {
    type: 'error' | 'success'
}
export const Badge = ({type}:badgePropsType)=>{
    return (
        <>
        {type === 'error' && <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 rounded-md bg-red-50 ring-1 ring-inset ring-red-600/10">Error</span>}
        {type === 'success' && <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-md bg-green-50 ring-1 ring-inset ring-green-600/20">Created</span>}
        </>
    )
}
