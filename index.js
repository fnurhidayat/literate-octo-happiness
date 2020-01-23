var args = process.argv.slice(2);
var method = args[0];

var User = require('./models/user.js');

switch(method) {

  case 'create_user':
    let [ first_name, last_name, email, password, password_confirmation] = args.slice(1);

    let user = new User({
      first_name, last_name, email, password, password_confirmation
    })

    user.save().then(i => console.log(i)).catch(err => console.error(err));
    break;

  case 'read_user_by_id':
    User.find(args.slice(1)[0])
      .then(data => console.log(data))
      .catch(err => console.error(err))
    break;
    
  default:
    console.log('Unknown action!');
}
