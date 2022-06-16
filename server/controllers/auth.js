const bcrypt = require('bcrypt');

let users = [];

module.exports = {
  login: (req, res) => {
    const { username, password } = req.body;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        bcrypt.compare(password, users[i].passwordHash, (err, result) => {
          if (result) {
            console.log("logged in");
            res.status(200).send(users[i]);
          } else {
            console.log("wrong password");
            res.status(400).send({ success: false });
          }
        });
      } else {
        console.log("User not found.");
        return res.status(400).send({ success: false });
      }
    }
  },
  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body;
    saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, passwordHash) => {
      if (!err) {
        let newUser = {
          username,
          email,
          firstName,
          lastName,
          passwordHash
        }
        console.log("New users entry: ");
        console.log(newUser);
        users.push(newUser);
        res.status(200).send(req.body);
      } else {
        console.log('Error during bycrypt.hash():' + err);
        res.status(400).send({ success: false });
      }
    });
  }
}