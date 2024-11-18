const commentSchema = require('../model/commentSchema');

exports.addComment = async (req,resp) => {
    try{
        const { comment, commentedUser, commentedVideo } = req.body;

        const addedComment = await commentSchema.create({ comment, commentedUser, commentedVideo });

        resp.status(200).json({
            success : true,
            msg : "Added Commented Successfully",
            Comment : addedComment,
        });
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
}

exports.getComments = async (req,resp) => {
    try{
        const comments = await commentSchema.find();
        if(!comments){
            resp.status(400).json({
                success : false,
                msg : "Be the First to Comment",
                All_Comments : comments 
            });
        }
        resp.status(200).json({
            success : true,
            msg : "Fetched Comments Successfullt",
            All_Comments : comments 
        });
    }
    catch(error){
        resp.status(500).json({
            success : false,
            msg : "Internal Server Error",
        });
    };
}