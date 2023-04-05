 
class commentDOMClass {

    constructor(postID){
        
        this.postID = postID;
        this.postCommentForm = $(`#commentForm-${postID}`);
        this.createComment(this.postID);
        this.commentUl = postID;
         

    }
    createComment(postID){

        let self = this;
        $(this.postCommentForm).on("submit",(e)=>{

            e.preventDefault();
    
            let commentForm = $(".commentFormClass").attr('id');
            
            $.ajax({
                type:'Post',
                url: $('.commentFormClass').attr('action'),
                data: $(self.postCommentForm).serialize(),
                success:(data)=>{

                    let freshComment = this.commentDOM(data.data);
                    
                    $(`#commentUL-${this.postID}`).append(freshComment);

                    

                    new deleteComment(data.data.comment._id);

                },
                error: (err)=>{
                    console.log(err.responseText);
                }
                
            })
    
        })

    }
     

    commentDOM(data){

        console.log(data.picturePath,"from commentDOM");
        return(`
                <li id="commentArea-${data.commentID}" class="comments">

                
                <div id="commentsDiv" class="d-flex flex-row mb-2">
                    <img src="${data.picturePath}" width="30" height="30px" class="rounded-circle">

                    <div class="d-flex flex-column ml-2"> 
                        <a href="${data.typeOfCommentor}/profile/${data.userId}"> <b> <span class="name">${data.userName}</span> </b> </a>


                            <b>
                            <form action="/posts/comment/delete/" method="post" id="commentDelete-${data.commentID}">
            
                                <input type="hidden" value="${data.commentID}" name="cID">
            
                                <input type="hidden" value="${this.postID}" name="pID">
            
                                <button>
                                    <i class="fa-solid fa-delete-left"></i>
                                </button>
            
                            </form>
                    
                            </b>
    

                            <small class="comment-text">${data.comment.content}</small>
                    <div class="d-flex flex-row align-items-center status">
                            <form action="/upVote/${data.commentID}/?type=Comment" method="POST" id="commentUpVoteForm-${data.commentID}">
                                            
                            <div id="commentContainer-${data.commentID}">
                                    
                                    <button style="color:white;"><i class="fa-regular fa-circle-up"></i></button>
                            
                                <span>
                                    ${data.commentUpVoteCount}
                                </span>

                            </div>
                            
                            </form>
                    </div>


                 </div>
            </div>


    </li>


                <script>
                    new upVoteClass("comment","${data.commentID}");

                </script>
    
    
    
        `)

    }

}