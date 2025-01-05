
type avatarProps = {
    initials: string | undefined
}
const Avatar = ({initials}: avatarProps) => {
  return (
    <p className="w-8 h-8 bg-slate-400 text-white flex justify-center items-center rounded-3xl p-2 text-md">
      {initials}
    </p>
  )
}

export default Avatar
