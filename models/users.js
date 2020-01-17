const db = require('./connection')
const bcrypt = require('bcryptjs');

function createHash(password){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

// create
function create(username, password){
    const hash = createHash(password);
    const newUser = {
        username,
        hash
    };
    console.log(newUser);
    usersDb.push(newUser);
};

async function login(username, password){
    const theUser= getUser(username);
    return bcrypt.compareSync(password, theUser.hash);
};

// retrieve
async function getUser(username){
    const theUser = await db.one(`
        select * from users where name =$1
    `, [username]);
    return theUser;
    // return userDb.find(user => user.username == username);
};

function getUserById(id){

}

async function deleteUser(id){
    const result = await db.none(`delete from users where id=$1`, [id]);
    console.log(result);
};

async function updateFavTeams(id, nameofteam){
    const result = await db.result(`
        update usersfavteams set
            nameofteam = $1
        where id = $2;
    `, [nameofteam, id]);
    if (result.rowCount === 1){
        return id;
    } else {
        return null;
    }
};

// async function deletefavteam(id){
//     await db.result(`delete from users where id=$1`, [id] )
// }

module.exports = {
    create,
    login,
    getUser,
    getById,
    deleteUser,
    updateFavTeams
}