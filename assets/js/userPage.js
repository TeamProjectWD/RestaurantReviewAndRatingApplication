console.log("hai");
// edit or posts
var y = document.getElementById("editOrPosts");
console.log(y);
y.addEventListener('click',()=>{

        var x= document.getElementById('editDiv')
        if( x.style.display == 'none'){
            x.style.display='block'
            document.getElementById('editDiv').style.display='block';
            // document.getElementById('postHeading').style.display='none';
            document.getElementById('postDiv').style.display='none';
            
            
            document.getElementById('editOrPosts').innerHTML="back to posts"
        }
        else{
            x.style.display ='none'
            document.getElementById('editDiv').style.display='none';
            // document.getElementById('postHeading').style.display='block';
            document.getElementById('postDiv').style.display='block';
            
            
            document.getElementById('editOrPosts').innerHTML="edit"
        }
        
})
