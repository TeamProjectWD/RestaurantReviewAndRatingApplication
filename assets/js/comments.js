 
class commentDOMClass {

    constructor(postID){
        
        this.postID = postID;
        this.postCommentForm = $(`#commentForm-${postID}`);
        this.createComment(this.postID);
        this.commentUl = postID;

    }
    createComment(postID){
        $(this.postCommentForm).on("submit",(e)=>{

            e.preventDefault();
    
            let commentForm = $(".commentFormClass").attr('id');
            
            $.ajax({
                type:'Post',
                url: $('.commentFormClass').attr('action'),
                data: $(this.postCommentForm).serialize(),
                success:(data)=>{

                    let freshComment = this.commentDOM(data.data);

                     
                    
                    $(`#commentUL-${this.postID}`).append(freshComment);
                    
                },
                error: (err)=>{
                    console.log(err.responseText);
                }
                
            })
    
        })

    }
     

    commentDOM(data){

        return(`
                <li>
            
                    <div id="commentsDiv">
                
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