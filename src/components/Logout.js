import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { UserContext } from '../App'

function Logout() {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    useEffect(() => {
        localStorage.clear("Logdata")
        dispatch({ type: "USER", payload: false })
        history.push("/", { replace: true });
    }, [])
    return (
        <>
            <h2>Logout Ka Page</h2>
        </>
    )
}

export default Logout
