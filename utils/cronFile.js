var cron = require('node-cron');
var userController=require('../components/users/userController')
cron.schedule('0-59 * * * *', function(){
  let date = new Date();
  
userController.fetchTest("UserName",(err,data)=>{
    console.log('running a task every minute 1',date.getHours(),":", date.getMinutes(),":",date.getSeconds() );
})
});
// cron.schedule('0-59 * * * * *', function(){
//   let date = new Date();
//   console.log('running a task every minute 2',date.getHours(),":", date.getMinutes(),":",date.getSeconds() );
// });
// cron.schedule('0-59 * * * * *', function(){
//   let date = new Date();
//   console.log('running a task every minute 3',date.getHours(),":", date.getMinutes(),":",date.getSeconds() );
// });
// cron.schedule('0-59 * * * * *', function(){
//   let date = new Date();
//   console.log('running a task every minute 4  ',date.getHours(),":", date.getMinutes(),":",date.getSeconds() ,"\n");
// });