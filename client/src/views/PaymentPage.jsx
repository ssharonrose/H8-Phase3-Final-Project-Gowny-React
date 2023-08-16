import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

const PaymentPage = () => {

    const { qrisImage } = useSelector((state) => state?.payment)
    console.log(qrisImage)

    return (
        <>
            <NavLink to={qrisImage} />
        </>
    )
}

export default PaymentPage