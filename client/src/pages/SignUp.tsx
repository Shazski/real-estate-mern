import { FC, FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignUpFormTypes } from "../types/types"
import axios from "axios"
import { useSelector } from "react-redux"
export const SignUp: FC = () => {
    const userState = useSelector((state: any) => state.user)
    const [formData, setFormData] = useState<SignUpFormTypes>({
        username: "",
        email: "",
        password: ""
    })
    const [err, setErr] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        if (userState.currentUser) {
            navigate('/')
        }
    }, [userState.currentUser])
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post('/api/auth/sign-up', formData).then((res) => {
                if (res.data.success === false) {
                    setLoading(false)
                    setFormData({
                        username: "",
                        email: "",
                        password: ""
                    });
                    setErr(res.data.error.message)
                    return
                }
                setLoading(false)
                setErr(null)
                navigate('/sign-in')
            })
        } catch (error: any) {
            setLoading(false)
            setErr(error.message)
        }
    }
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>
                {err && <p className="text-red-700">{err}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input required className="border p-3 rounded-lg" type="text" name="username" value={formData.username} placeholder="Username" id="username" onChange={handleChange} />
                    <input required className="border p-3 rounded-lg" type="email" name="email" value={formData.email} placeholder="Email" id="email" onChange={handleChange} />
                    <input value={formData.password} required className="border p-3 rounded-lg" type="password" name="password" placeholder="Password" id="password" onChange={handleChange} />
                    <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? "loading..." : "Sign Up"}</button>
                </form>
                <div className="flex gap-2 mt-5">
                    <p>Have an Account?</p>
                    <Link className="text-blue-700" to='/sign-in'>Sign in</Link>
                </div>
            </div>
        </>
    )
}