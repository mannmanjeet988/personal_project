import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = ()=>{
    const [tokenVal, setTokenVal] = useState("");
    const[Data1,setData1] = useState({})
    const [otherData, setOtherData] = useState([]);
  const navigate =useNavigate();
  const[loading1,setLoading1] = useState(true);
  const[loading2,setLoading2] = useState(true);
  function handleNavigate(){
    navigate("/trial");
  }


        // useEffect(() => {         
        // let storedToken = (localStorage.getItem("token"));  
        // setTokenVal(storedToken); 
        // if(tokenVal)   {
        //    // https://api-test.myliveeye.com/api/cust-portal/customer/user-details')
        //  axios.get("https://api-test.myliveeye.com/api/cust-portal/customer/user-details", {
        //         headers: {
        //             "Authorization":  `Bearer ${storedToken}`
        //         }  
        //       }).then(response => {
        //         console.log(response.data);
        //         setData(response.data);
        //         console.log(data)
        //         // or any other value you want to return
        //       })
        //       .catch(err => console.log(err))
        //     }
        // },[tokenVal])
        useEffect(() => {
            const fetchData = async () => {
              try {
                const storedToken = localStorage.getItem("token");
                setTokenVal(storedToken);
        
                if (storedToken) {
                  // Fetch user data
                  const userResponse = await axios.get(
                    "https://api-test.myliveeye.com/api/cust-portal/evidence-request",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setData1(userResponse.data);
                  setLoading1(false);
                  console.log(userResponse.data);
        
                 
                  const otherResponse = await axios.get(
                    "https://api-test.myliveeye.com/api/cust-portal/custom-query-request",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setOtherData(otherResponse.data);
                  setLoading2(false);
                  console.log(otherResponse.data);
        
                
                 
                }
              } catch (error) {
                if (error.name === "AbortError") {
                  // API call was aborted (component is unmounted)
                  console.log("API call aborted");
                } else {
                  console.error("Error fetching data:", error);
                }
              } 
            };
        
            fetchData();
            
          }, []);
        

        return(
            <div>
            <h1>Welcome to Home page</h1>  
            
             {loading1? <div>Loading...</div> :<p> {Data1[0].evidence_time}</p>}
            <h1>Second Data</h1>
            {loading2? <div>Loading...</div> :
            (<div>
            <p>{otherData[0].created_on}</p>
            </div>)
            }     
            <button onClick={handleNavigate} >Move To Trial Page</button>  
            </div>
        )
  
}

export default HomePage;