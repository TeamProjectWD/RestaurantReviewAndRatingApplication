
module.exports.PostConroller = function(req,res){

    console.log("here");

    console.log(req.body);

    res.render('homePage');
}