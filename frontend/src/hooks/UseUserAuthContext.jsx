import { useContext } from "react"

import { UserAuthContext } from "../../context/UserAuthContext"

export const UseUserAuthContext = () => {
    const context = useContext(UserAuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside ')
    }

    return context
}