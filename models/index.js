var fs = require('fs');

class ActiveRecord {

  save() {
    return new Promise((resolve, reject) => {
      let data = require(`../data/${this.constructor.table_name}.json`);
      let id = data.length + 1;
      this.id = id;

      data.push({
        id: id,
        ...this
      })

      fs.writeFileSync(`${__dirname}/../data/${this.constructor.table_name}.json`, JSON.stringify(data, null, 2))
    })
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      var data = require(`../data/${this.table_name}.json`);
      data = data.filter(i => i.id == id);

      if (data.length == 0) return reject(`${this.table_name} not found!`);

      resolve(data[0]); 
    })
  }
}

module.exports = ActiveRecord;
