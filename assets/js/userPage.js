 
 
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