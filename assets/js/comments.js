window.onload = ()=>{
    // comment form
    $('#commentForm').on('submit',(e)=>{
        e.preventDefault();
        console.log("hai");
        console.log($('#commentForm'));
        var form = $('#commentForm');
        console.log(form.attr('method'),form.attr('action'),form.serialize());
        $.ajax({
                  type: form.attr('method'),
                  url: form.attr('action'),
                  data: form.serialize(),
                  success: (data)=>{
                    console.log("succes");
                  }
                })

    })

    

                
}
