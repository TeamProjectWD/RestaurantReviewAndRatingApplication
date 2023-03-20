 
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

        return(`
                <li id="commentArea-${data.commentID}">
            
                    <div id="commentsDiv">

                    <b>
                        <form action="/posts/comment/delete/" method="post" id="commentDelete-${data.commentID}">

                            <input type="hidden" value="${data.commentID}" name="cID">

                            <input type="hidden" value="${this.postID}" name="pID">

                            <button>
                                <i class="fa-solid fa-delete-left"></i>
                            </button>

                        </form>
                        
                    </b>
                
                        <span>${data.userName}</span> 
                        <span>${data.comment.content}</span>
                        <form action="/upVote/${data.commentID}/?type=Comment" method="POST" id="commentUpVoteForm-${data.commentID}">
                            
                            <div id="commentContainer-${data.commentID}">
                                
                                    <button style="color:white;"><i class="fa-regular fa-circle-up"></i></button>
                               
                                <span>
                                    ${data.commentUpVoteCount}
                                </span>
                
                            </div>
                            
                        </form>
                
                
                    </div>    
                
                </li>

                <script>
                    new upVoteClass("comment","${data.commentID}");
                </script>
    
    
    
        `)

    }

}