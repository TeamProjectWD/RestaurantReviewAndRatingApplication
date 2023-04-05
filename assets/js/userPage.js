console.log("hai");
// edit or posts
var y = document.getElementById("editProfile");
console.log(y);
if(y){
    y.addEventListener('click',()=>{
    
            var x= document.getElementById('editDiv')
            if( x.style.display == 'none'){
                // x.style.display='block'
                // document.getElementById('editDiv').style.display='block';
                // document.getElementById('postHeading').style.display='none';
                document.getElementById('profileMainDiv').innerHTML = x.innerHTML;
                
                
                // document.getElementById('editOrProfile').innerHTML="back to posts"
            }
            // else{
            //     x.style.display ='none'
            //     document.getElementById('editDiv').style.display='none';
            //     // document.getElementById('postHeading').style.display='block';
            //     document.getElementById('postDiv').style.display='block';
                
                
            //     document.getElementById('editOrPosts').innerHTML="edit"
            // }
            
    })
    
    var blackbtn = document.getElementById('blackBtn')
    blackbtn.addEventListener('click',()=>{
        var x= document.getElementById('profileMainDiv');
        if(x.style.display=='none'){
            document.getElementById('profileMainDiv').innerHTML = x.innerHTML;
    
        }
    
    })

}


// for follow 
async function follow(value){
    console.log("clicked");
    await $.get(`/user/follow/${value}`,(data)=>{
        console.log(data);
        document.getElementById('fbutton').innerHTML=data.followBtn;
        // followers and unfollow changes 
        document.getElementById('followers').innerHTML=data.followers;
        document.getElementById('following').innerHTML=data.following;

    })
}