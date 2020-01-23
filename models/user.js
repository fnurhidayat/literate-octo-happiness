var fs = require('fs');
var ActiveRecord = require('./index.js');

class User extends ActiveRecord {
  static table_name = 'users';

  constructor({ first_name, last_name, email, password, password_confirmation }) {
    super();
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.password_confirmation = password_confirmation;
  }

  get fullname() {
    return this.first_name + ' ' + this.last_name; 
  }

  get isPasswordValid() {
    return this.password === this.password_confirmation; 
  }

  set new_password(new_password) {
    this.password = new_password;
    this.password_confirmation = new_password;
    return;
  }

  // Method Override
  save() {
    return new Promise((resolve, reject) => {
      if (!this.isPasswordValid) return reject('Password doesn\'t match!');

      delete this.password_confirmation;
      super.save(); 

      resolve({
        id: this.id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email
      })
    })
  }

}


module.exports = User;
