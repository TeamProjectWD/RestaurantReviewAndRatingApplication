 
$('#hotelSelect').on('change', function() {
    
    let hotelID =  $(this).val();

    console.log(hotelID);

    $.ajax({

        type:'Post',

        url: '/hotel/showMenu',

        data : {hotelID},

        success: (data) => {

            console.log(data);

            $("#itemSelect").remove();

            let selectDOM = menuMaker(data.data);

            $("#postForm").append(selectDOM);

        }

    });

  

});


let menuMaker = (data) => {

    return (`
        
        <select name="menuItem" id="itemSelect" required>
    
        <option disabled selected>-- Please select an Item --</option>

            ${data.map((obj) => `<option value = "${obj._id}"> ${obj.name}</li>`).join("")}

        </select>
        
    `)

}