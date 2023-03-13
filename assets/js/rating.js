class ratingClass {

    constructor(id,userID){

        this.id = id;
        this.form = $(`#rating-${this.id}`);
        this.ajaxFunction();
        this.userID = userID;
        this.prevAverageWrap = $(`#average-${this.id}`);
        this.prevAverageContainer = $(`#span-${this.id}`);
        this.rated = false;
        this.button = $(`#button-${this.id}`);
        this.formWrap = $(`#formWrap-${this.id}`);
        
        this.rateAgainButton = $(`#press-${this.id}`);

        this.prevRatingWrap = $(`#givenRating-${this.id}`)
        
        let altThis = this;

        this.rateAgainButton.on('click',function(){
            altThis .buttonHandler();
            let ratingForm = altThis.addFormAndButtonBack();
            altThis.formWrap.html(ratingForm);
            altThis.rated = true;
            new ratingClass(altThis.id,altThis.userID);
            altThis.rateAgainButton.remove();
            altThis.destruct();
        });


         

    }

    destruct(){
        this.rateAgainButton.off('click');
    }

    ajaxFunction(){

        let self = this;

        this.form.on('submit',function(e){

            let ratingValue = self.form.find(`input[name="stars"]:checked`).val();

            if (!ratingValue){
                ratingValue = 0;
            }

            let idData = self.id;

            let ratingUser = self.userID;

            e.preventDefault();
            
            $.ajax({

                type:'Post',
    
                url:self.form.attr('action'),

                data : {ratingValue,idData,ratingUser},

                success: (data) => {

                    if(self.rated == false){
                        // console.log("here1");
                        let newAverage = self.averageMakerAndFormRemover(data);
                        self.prevAverageWrap.html(newAverage);
                        self.form.remove();
                        self.button.remove();
                        self.prevRatingWrap.remove();
                        self.buttonHandler();
                    } 

                }

            });


        }); 
        
    }

    averageMakerAndFormRemover(data){

        this.prevAverageContainer.remove();


        return(`

            <div id="givenRating-${this.id}">
            
                ${data.rating == 1 ? 
                    `<b>you have rated 1 star for this item</b>` :
                    `<b>you have rated ${data.rating} stars for this item</b>`
                }

            </div>

            <span id="span-${this.id}">
                present rating : ${data.average}
            </span>
        
        `)

    }

    buttonHandler(){

        if(this.rated == false){
            this.rateAgainButton.attr('hidden',false);
        }else{
            this.rateAgainButton.attr('hidden',true);
        }

    }

    addFormAndButtonBack(){

        return(`
        <div id="formWrap-${this.id}"> 

                <form class="rating" id="rating-${this.id}"  method="POST" action="/hotel/addRating/${this.id}">

                        <label>
                        <input type="radio" name="stars" value="1" />
                        <span class="icon">★</span>
                        </label>
                        <label>
                        <input type="radio" name="stars" value="2" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        </label>
                        <label>
                        <input type="radio" name="stars" value="3" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>   
                        </label>
                        <label>
                        <input type="radio" name="stars" value="4" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        </label>
                        <label>
                        <input type="radio" name="stars" value="5" />
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        <span class="icon">★</span>
                        </label>

                </form>

            


                <button form="rating-${this.id}" id="button-${this.id}">
                    <i class="fa-solid fa-paper-plane"></i>
                </button>

                </div>

                <button id="press-${this.id}" hidden>
                  Rate Again
                </button>
        
        
        `)

    }


}




















 