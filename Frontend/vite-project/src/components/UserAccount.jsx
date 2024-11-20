import { useEffect, useState } from "react";
import CorrectUser from "./CorrectUser";

function UserAccount(){

    const [data, setData] = useState([]);

    const userId = localStorage.getItem("userId");

    const getData = async () => {                                               // Function for fetching all Users from Database through API
        try{
            const response = await fetch("http://localhost:7000/base/signup", { // Sending a GET request to the server to fetch the Users      
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                }
            });
            const output = await response.json();
            setData(output.User.filter(user => user._id === userId));           // Filtering the user according to the credentials 
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    // console.log(data);

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


export default UserAccount;