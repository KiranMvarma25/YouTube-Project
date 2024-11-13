import { useEffect, useState } from "react";
import CorrectUser from "./CorrectUser";

function UserLoginAccount(){

    const [data, setData] = useState([]);

    const email = localStorage.getItem("email");
    

    const getData = async () => {
        try{
            const response = await fetch("http://localhost:7000/base/signup", {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                }
            });
            const output = await response.json();
            const userData = output.User.find(user => user.email === email);
            setData(userData ? [userData] : []);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    console.log(data);

    return(
        <>
            <h1>Hello User Account</h1>
            {
                data.map(user => (
                    <CorrectUser data={user} key={user._id} />
                ))
            }

        </>
    )
}


export default UserLoginAccount;