import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

import { useSelector } from "react-redux";

function SignUp(){

    const [data, setData] = useState({                                          // stores users data
        name : "",
        email : "",
        pass : ""
    })

    function handleChange(e){                                                   // stores previous and updated details 
        const { name, value } = e.target;
        setData((ps) => ({
            ...ps,
            [name] : value
        }))
    }

    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function handleSubmit(e){                                             // Function for saving Users data in Database
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:7000/base/signup", { // Sending a GET request to the server to store the user details in database  
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data),
            });
            const result = await response.json();
            if(result.success){
                localStorage.setItem("userId", result.User._id); 
                localStorage.setItem("email", result.User.email);
                dispatch(login(result.User));
                // navigate('/useraccount');
            }
            else{
                window.alert("User Already Exist");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const userStatus = useSelector(state => state.user.userStatus);             // Fetching the User Status from Redux Store
    // console.log("USERSTATUS",userStatus)

    return(
        <>  
            <div className="signupForm">
                <div>
                    <form onSubmit={handleSubmit} className="signupFormChild1">
                        
                        <label htmlFor="name" className="signupformLabel">Name</label>
                        <br />
                        <input type="text" value={data.name} name="name" placeholder="Enter your Name" onChange={handleChange} required className="signupformInput" />

                        <br />
                        <br />

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

                        <button type="submit" className="signupformButton">Sign Up</button>

                    </form>
                </div>

                <div className="signupFormChild1">
                    <h3>{
                        userStatus ? <Link to={'/getstartedwithvideos'}><button className="signupformButton">Get Started</button></Link> : "Sign Up to Get Started"
                    }</h3>
                    <br />
                    <p>Already an User</p>
                    <br />
                    <Link className="Router-Link" to={"/login"}><button className="signupformButton">Log In</button></Link>
                </div>
            </div>
        </>
    )
}


export default SignUp;