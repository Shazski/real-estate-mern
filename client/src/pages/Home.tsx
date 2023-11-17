import { FC } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const Home: FC = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state: any) => state.user)
    useEffect(() => {
        if(currentUser === null) {
            navigate('/sign-in')
        } else {
            navigate('/')
        }
    }, [currentUser])
    return (
        <>
            <div>
                Home
            </div>
        </>
    )
}