import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CorrectUser from "./CorrectUser";

function UserLoginAccount(){

    const [data, setData] = useState([]);

    const user = useSelector(state => state.user.userData);

    const email = user.email;                                                               // Fetching by email
    
    useEffect(() => {   
        const getData = async () => {                                                       // Function for fetching all Users from Database through API
            try{
                const response = await fetch("http://localhost:7000/base/signup", {         // Sending a GET request to the server to fetch the User   
                    method : "GET",                                                         
                    headers : {
                        "Content-Type" : "application/json",
                    }
                });
                const output = await response.json();
                const userData = output.User.find(user => user.email === email);
                setData(userData ? [userData] : []);                                        // Error Handling if Didn't use [] error will be occured
            }
            catch(error){
                console.log(error);
            }
        };
        if(email){
            getData();  
        }   
    },[email]);                                                                             // Email is Dependency, so that data is rendered only Logged In user's Email Changes

    return(
        <>
            {/* <h1>Hello User Account</h1> */}
            {
                data.map(user => (
                    <CorrectUser data={user} key={user._id} />
                ))
            }

        </>
    )
}


export default UserLoginAccount;