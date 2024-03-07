import React, { useEffect } from "react";

const TrialPage = ()=>{

        useEffect(() => {
           
        const val = localStorage.getItem("token");
        
        }, [])

        return(
            <div>
            <h1>Welcome to Trial page</h1>  
            {<p>val</p>}
            </div>
        )
}

export default TrialPage;