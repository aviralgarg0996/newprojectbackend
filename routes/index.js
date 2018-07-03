const user = require('../components/users/userRoutes'); 

module.exports = function (app) {
app.use('/user', user); 

}