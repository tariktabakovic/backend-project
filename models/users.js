const db = require('./connection')
const bcrypt = require('bcryptjs');

function createHash(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

// create
async function create(username, password){
    const hash = createHash(password);
    const result = await db.one (`
    insert into users
    (username, hash)
    values
    ($1, $2)
    reutnring id
    `, [username, hash]);
    return result.id
}
// function create(username, password){
//     const hash = createHash(password);
//     const newUser = {
//         username,
//         hash
//     };
//     console.log(newUser);
//     usersDb.push(newUser);
// };


async function login(username, password){
    const theUser= getbyUsername(username);
    // changed from getUser 
    return bcrypt.compareSync(password, theUser.hash);
};

// retrieve
async function getByUsername(username){
    const theUser = await db.one(`
        select * from users where username =$1
    `, [username]);
    return theUser;
    // return userDb.find(user => user.username == username);
};

async function getUserById(id){
    const theUser = await db.one(`
        select * from users where id=$1
    `, [id]);
    return theUser;
}

async function deleteUser(id){
    const result = await db.none(`delete from users where id=$1`, [id]);
    console.log(result);
};


// async function deletefavteam(id){
//     await db.result(`delete from users where id=$1`, [id] )
// }

const users = module.exports = {
    create,
    createHash, 
    login,
    getByUsername,
    getUserById,
    deleteUser,
}