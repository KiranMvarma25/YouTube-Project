import { useRouteError } from "react-router-dom";

function ErrorPage() {

    const err = useRouteError();            // Fetching Error Details
    console.log(err);

    const status = err.status;                  
    console.log(status);

    return (
        <>
            { 
                status ?    
                        <div className="ErrorPage">
                            <h2>{err.status} {err.statusText}</h2>
                            <br />
                            <h3>{err.data}</h3>
                        </div>
                        :
                        <h2>Please Sign Up or Log In to your account</h2>
            }
        </>
    )
}


export default ErrorPage;