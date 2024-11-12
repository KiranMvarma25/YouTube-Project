function CorrectUser(props){

    let user = props.data;

    return(
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    );
}


export default CorrectUser;