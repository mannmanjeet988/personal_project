import React, {useState, useEffect } from "react";
import axios from "axios";

const TrialPage = ()=>{

    const [tokenVal, setTokenVal] = useState("");
    const[data,setData] = useState({})


        useEffect(() => {         
        let storedToken = (localStorage.getItem("token"));  
        setTokenVal(storedToken); 
        if(tokenVal)   {
           // https://api-test.myliveeye.com/api/cust-portal/customer/user-details')
           axios.get("https://api-test.myliveeye.com/api/cust-portal/customer/user-details", {
                headers: {
                    "Authorization":  `Bearer ${storedToken}`
                }  
              }).then(response => setData(response))
              .catch(err => console.log(err))
              console.log("data", data);

          }
        },[tokenVal])
            
     

        return(
            <div>
            <h1>Welcome to Trial page</h1>  
            <p>{tokenVal}</p>
            </div>
        )
}

export default TrialPage;