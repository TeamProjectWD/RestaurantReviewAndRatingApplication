$(document).on('DOMContentLoaded',function(){

    $('#String').on('input', function(){
        search();
    });

    $("#search-form").on('submit',function(e){
        e.preventDefault();
        search();
        $('#String').html("");
    });

    function search() {
        let name = $('#String').val();
        $.ajax({
            url: '/search',
            method: 'Post',
            data: { name: name },
            success: function(results) {

                $('#search-results').empty();
         

                if(name.length == 0){
                    let li = $('<li>').text('Type a User or Restaurant Name');
                    li.addClass('list-group-item');
                    $('#search-results').append(li);
                }
                else if (results && (results.Users.length > 0 || results.Hotels.length)) {
                    
                    results.Users.forEach(function(result){
                        
                        let aTag = $('<a>');
                        aTag.attr("href",`/user/profile/${result._id}/`);
                        aTag.text(`${result.name}`);
                        let li = $('<li>');
                        li.addClass('list-group-item');
                        li.attr('data-id', result._id);
                        li.append(aTag);
                        $('#search-results').append(li);
                    });

                    results.Hotels.forEach(function(result) {
                        
                        let aTag = $('<a>');
                        aTag.attr("href",`/hotel/profile/${result._id}/`);
                        aTag.text(`${result.name}`);
                        let li = $('<li>');
                        li.addClass('list-group-item');
                        li.attr('data-id', result._id);
                        li.append(aTag);
                        $('#search-results').append(li);
                    });

                } else {
                    let li = $('<li>').text('No results found.');
                    li.addClass('list-group-item');
                    $('#search-results').append(li);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
    }



     
});