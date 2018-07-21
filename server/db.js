const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vue-login');

let db = mongoose.connection;
//防止Mongoose的mpromise错误
mongoose.Promise = global.Promise;

db.on('error', function() {
  console.log('数据库连接错误');
});
db.on('open', function(){
  console.log('数据库连接成功');
});

//声明schema
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  // recheck: String,
  token: String,
  create_time: Date
});
//根据schema生成model
const model = {
  User: mongoose.model('User', userSchema)
};

module.export = model;
