import React, {useState, useEffect } from "react";
import axios from "axios";

const TrialPage = ()=>{

    const [tokenVal, setTokenVal] = useState("");
    const[userData,setUserData] = useState({})
    const [otherData, setOtherData] = useState([]);
  const [thirdData, setThirdData] = useState([]);


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
                    "https://api-test.myliveeye.com/api/cust-portal/customer/user-details",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setUserData(userResponse.data);
        
                 
                  const otherResponse = await axios.get(
                    "https://api-test.myliveeye.com/api/cust-portal/push-button-alerts?first=0&rows=10",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setOtherData(otherResponse.data);
                  console.log(otherResponse.data);
        
                
                  const thirdResponse = await axios.get(
                    "https://api-test.myliveeye.com/api/cust-portal/battery-life",
                    
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setThirdData(thirdResponse.data);
                  console.log(thirdResponse.data);
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            };
        
            fetchData();
          }, []);
        

        return(
            <div>
            <h1>Welcome to Trial page</h1>  
            <p>{tokenVal}</p>
            <p>{userData.firstName}</p>
            <h1>Second Data</h1>
<p>{otherData[0].store_name}</p>
<video controls width="600" height="400">
            <source src={otherData[2].video_link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
            <h1>Third Data</h1>
            <p>{thirdData[0].device_id}</p>
<p></p>
            {/* <img
            src={decodeURIComponent(data.profileImage)}
            alt="Profile"
            style={{ width: "100px", height: "auto" }}
             /> */}
            </div>
        )
}

export default TrialPage;