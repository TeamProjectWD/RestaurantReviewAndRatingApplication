 

class deleteComment{

    constructor(id){

        this.id = id;
        console.log("commentID",this.id);
        this.deleteForm = $(`#commentDelete-${this.id}`);
        this.deleteComment();
        this.liWrap = $(`#commentArea-${this.id}`);
        console.log(this.liWrap);

    }


    deleteComment(){

        let self = this;


        this.deleteForm.on('submit',function(e){

            e.preventDefault();

            

            let callSelf = this;
            

            $.ajax({

                url:self.deleteForm.attr("action"),

                type:'Post',

                data : $(callSelf).serialize(),

                success: (data) => {

                    self.removeDOM(data.deleted);
                    
                },
                error: (err) => {

                    console.log(err);

                }

            });


        })

         
    }

    removeDOM(data){

        if(data == true){

            console.log("YES",this.liWrap);
            this.liWrap.remove();
        }
        
    }



}