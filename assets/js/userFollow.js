async function followHotel(value){
    await $.get(`/user/follow/${value}`,(data)=>{
        document.getElementById('fbutton').innerHTML=data.followBtn;
        document.getElementById('followers').innerHTML=data.followers;
        document.getElementById('following').innerHTML=data.following;
    });
}