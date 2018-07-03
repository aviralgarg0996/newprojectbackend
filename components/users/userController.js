const utility = require("../../utils/utility");
const userModel=require('./userModel');
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
   
    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDpJx3u7E3XcQdvR-8dlTPepsYzoYH24SI', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
  };
   
  var geocoder = NodeGeocoder(options);
let userController={}

userController.signup=(req,res)=>{
   
    console.log("req",req.body.name)
    let obj={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        userName:req.body.userName,
        
    }
    var user=new userModel(obj)
    user.save((err,data)=>{
        if(err){
            res.send(500,err)
        }
        // res.send(200,{data:'successfully saved'})
        else {res.status(200).send({data:'successfully saved'})}
    })
}
userController.fetchTest=(data,callback)=>{
    // res.status(200).send({msg:'data'});
    console.log('data',data)
    callback(null,data)
}
module.exports=userController;
