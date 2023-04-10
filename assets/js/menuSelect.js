 
$('#hotelSelect').on('change', function() {
    
    let hotelID =  $(this).val();

 

    $.ajax({

        type:'Post',

        url: '/hotel/showMenu',

        data : {hotelID},

        success: (data) => {

            $("#itemSelect").remove();


            let selectDOM = menuMaker(data.data);

            $("#addMenuInput").append(selectDOM);

        }

    });

  

});


let menuMaker = (data) => {

    return (`
        <div id="itemSelect"> 
            <div class="col-md-6"><label class="labels">Menu</label></div>
            <select class="form-control" style="width: auto;" name="menuItem"  required>
            
                <option disabled selected>-- Please select an Item --</option>

                    ${data.map((obj) => `<option value = "${obj._id}"> ${obj.name}</li>`).join("")}

            </select>
        </div>
        
    `)

}