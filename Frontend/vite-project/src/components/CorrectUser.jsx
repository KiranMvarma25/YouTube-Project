function CorrectUser(props){

    let user = props.data;

    return(
        <>
            <img src={user.img} alt={`Image of ${user.name}`} height="50px" width="50px" />
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    );
}


export default CorrectUser;