
exports.adminLogin = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  console.log("username:", username, "password:", password);
  res.send(`Username: ${username}, Password: ${password}`);
};

