import React, {useState, useEffect } from "react";

const TrialPage = ()=>{

    const [tokenVal, setTokenVal] = useState("");
        useEffect(() => {         
        let storedToken = (localStorage.getItem("token"));  
        setTokenVal(storedToken);    
        }, [])

        return(
            <div>
            <h1>Welcome to Trial page</h1>  
            <p>{tokenVal}</p>
            </div>
        )
}

export default TrialPage;