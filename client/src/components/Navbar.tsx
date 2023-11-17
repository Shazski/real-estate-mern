import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaSearch } from "react-icons/fa"
import { useSelector,useDispatch } from "react-redux"
import { logoutUser } from "../redux/user/userSlice"
import { useCookies } from "react-cookie"
export const Navbar: FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state:any) => state.user)
    const [_, setCookies] = useCookies(["access_token"])
    const handleLogout = () => {
        setCookies("access_token", {maxAge : 0})
        dispatch(logoutUser())
        navigate('/sign-in')
    }
    return (
        <>
            <div className="bg-slate-200 shadow-md">
                <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                    <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
                        <span className="text-slate-500">Mern</span>
                        <span className="text-slate-700">Estate</span>
                    </h1>
                    <form className="bg-slate-100 p-3 rounded-lg flex items-center">
                        <input className="focus:outline-none bg-transparent w-24 sm:w-64" type="text" name="" id="" placeholder="Search..." />
                        <FaSearch className="text-slate-600"/>
                    </form>
                    <div className="flex gap-4 ">
                        <Link className="hidden sm:inline hover:underline" to='/'>Home</Link>
                        <Link className="hidden sm:inline hover:underline" to='/about'>About</Link>
                       {currentUser ? (
                           <div className="flex gap-4">
                            <Link to="/profile">
                            <img className="rounded-full h-7 w-7 object-cover" src={currentUser.imgUrl} alt="" />
                        </Link>
                            <button type="button" onClick={handleLogout} className="uppercase font-semibold text-xs w-1/1 bg-red-700 text-white rounded-md p-0.5 ">logout</button>
                        </div>
                           ):<Link className="hover:underline" to='/sign-in'>Sign in</Link>}
                    </div>
                </div>
            </div>
        </>
    )
}