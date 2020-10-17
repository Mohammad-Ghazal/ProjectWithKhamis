const { filter } = require("./posts");

const accounts = [
  // testAccount
  {
    "name": "khamis ",
    "email": "mohammed.skhamis1996@yahoo.com",
    "password": "12345",
    "posts": [
        "no posts shared yet on this account"
    ]
    ,"friends":["no friends added yet on this account"]//have an ids of frinds
} ,
{
    "name": "ghzal",
    "email": "moh.g.ghazal@gmail.com",
    "password": "12345",
    "posts": [
        "p1"
    ]
    ,"friends":["no friends added yet on this account"]
} 
];

module.exports = accounts;
