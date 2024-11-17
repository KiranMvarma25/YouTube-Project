import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

function LogIn(){
    const [data, setData] = useState({
        email : "",
        pass : ""
    })

    function handleChange(e){
        const { name, value } = e.target;
        setData((ps) => ({
            ...ps,
            [name] : value
        }))
    }

    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:7000/base/loginwithauth", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data),
            });
            const result = await response.json();
            if(result.success){
                localStorage.setItem('user', JSON.stringify(result.user));
                localStorage.setItem("userId", result.user._id); 
                navigate('/loginuseraccount');
                console.log("Slice :",result);
                dispatch(login(result.user));
            }
            else{
                window.alert("User not Exist");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <div className="signupForm">
                <form onSubmit={handleSubmit} className="signupFormChild1">

                    <label htmlFor="email" className="signupformLabel">Email</label>
                    <br />
                    <input type="email" value={data.email} name="email" placeholder="Enter your Email" onChange={handleChange} required className="signupformInput" />

                    <br />
                    <br />

                    <label htmlFor="pass" className="signupformLabel">Password</label>
                    <br />
                    <input type="text" value={data.pass} name="pass" placeholder="Enter your Password" onChange={handleChange} required className="signupformInput" />

                    <br />
                    <br />

                    <button type="submit" className="signupformButton">Log In</button>

                </form>
            </div>
        </>
    )
}


export default LogIn;