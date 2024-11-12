import { useState } from "react";

import { useNavigate } from "react-router-dom";

function SignUp(){

    const [data, setData] = useState({
        name : "",
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

    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:7000/base/signup", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(data),
            });
            const result = await response.json();
            if(result.success){
                localStorage.setItem("userId", result.User._id); 
                navigate('/useraccount');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="name">Name</label>
                <br />
                <input type="text" value={data.name} name="name" placeholder="Enter your Name" onChange={handleChange} required />

                <br />
                <br />

                <label htmlFor="email">Email</label>
                <br />
                <input type="email" value={data.email} name="email" placeholder="Enter your Email" onChange={handleChange} required />

                <br />
                <br />

                <label htmlFor="pass">Password</label>
                <br />
                <input type="text" value={data.pass} name="pass" placeholder="Enter your Password" onChange={handleChange} required />

                <br />
                <br />

                <button type="submit">Sign Up</button>

            </form>
        </>
    )
}


export default SignUp;