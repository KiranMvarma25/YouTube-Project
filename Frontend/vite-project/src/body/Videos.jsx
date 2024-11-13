import { Books } from "./mockdata";

function Videos(){

    return (
        <>
        <div className="videos">
            {
                Books.map(book => (
                    <div className="videosChild">
                        <img src={book.coverImage} alt={`Image of ${book.title}`} width="350px" height="250px" />
                    </div>
                ))
            }
        </div>
        </>
    )
}


export default Videos;