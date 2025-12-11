
import React from 'react'
import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'


export const userAuthContext = createContext()

function AuthContext({ children }) {
    const [role, setrole] = useState("")
    const [Authoriseduser, setAuthoriseduser] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("userDetails") && sessionStorage.getItem("token")) {
            const user = JSON.parse(sessionStorage.getItem("userDetails"))
            setrole(user.role)
            setAuthoriseduser(true)
        }
    }, [role, Authoriseduser])
    return (
        <>
            <userAuthContext.Provider value={{ role, Authoriseduser, setAuthoriseduser }}>
                {children}
            </userAuthContext.Provider>

        </>
    )
}

export default AuthContext