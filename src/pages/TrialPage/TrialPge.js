import React, {useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TrialPage = ()=>{

    const [tokenVal, setTokenVal] = useState("");
    const[userData,setUserData] = useState({})
    const [otherData, setOtherData] = useState([]);
  const [thirdData, setThirdData] = useState([]);
  const[loading1,setLoading1] = useState(true);
  const[loading2,setLoading2] = useState(true);
  const[loading3,setLoading3] = useState(true);
  const navigate = useNavigate();
//   const abortController = new AbortController();
//   const { signal } = abortController;

  function handleNavigate(){
    navigate("/home");
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
                    "https://api-test.myliveeye.com/api/cust-portal/customer/user-details",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setUserData(userResponse.data);
                  setLoading1(false);
        
                 
                  const otherResponse = await axios.get(
                    "https://api-test.myliveeye.com/api/cust-portal/push-button-alerts?first=0&rows=10",
                    {
                      headers: {
                        Authorization: `Bearer ${storedToken}`,
                      },
                    }
                  );
                  setOtherData(otherResponse.data);
                  setLoading2(false);
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
                  setLoading3(false);
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
            <h1>Welcome to Trial page</h1>  
            <p>{tokenVal}</p>
             {loading2? <div>Loading...</div> :<p> {userData.firstName}</p>}
            <h1>Second Data</h1>
            {loading2? <div>Loading...</div> :
            (<div>
            <p>{otherData[0].store_name}</p>
            <video controls width="600" height="400">
                        <source src="https://player.vimeo.com/external/384761655.sd.mp4?s=383ab4dbc773cd0d5ece3af208d8f963368f67e4&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
            {/* <iframe
            width="600"
            height="400"
            src="https://player.vimeo.com/external/496797033.sd.mp4?s=5ed472674c6878067353d85224650f6bc4f4a247&profile_id=164&oauth2_token_id=57447761"
            title="Embedded Video"
            frameBorder="0"
            allowFullScreen
          ></iframe> */}
            </div>)
            }

            <h1>Third Data</h1>
           {loading3 ? <div>Loading...</div> : (<p>{thirdData[0].device_id}</p>)}  

            <img
            src={(userData.profileImage)}
            alt="Profile"
            style={{ width: "100px", height: "auto" }}
             />
             <button onClick={handleNavigate} >Home</button>
            </div>
        )
}

export default TrialPage;