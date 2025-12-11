import React, { createContext, useState } from 'react'

export const userProfileUpdateContent = createContext()

function ContextShare({ children }) {
    const [userProfileUpdateStatus, setuserProfileUpdateStatus] = useState({})
    return (
        <userProfileUpdateContent.Provider value={{ userProfileUpdateStatus, setuserProfileUpdateStatus }}>
            {children}
        </userProfileUpdateContent.Provider>
    )
}

export default ContextShare