const db = require('./connection');

async function createFavTeam(team_id, users_id){
    const result = await db.result(`
    insert into usersfavteams
    (team_id, users_id)
values
    ($1, $2)
    `, [team_id, users_id])
    return result;
    // owner_id in fullstack-pets
};

async function retrieveFavTeams(users_id){
    try {
        const favTeams = await db.query(`select * from usersfavteams where ${users_id}`);
        console.log(favTeams);
        return favTeams;
    } catch (err){
        console.log(err)
        return [];
    };
};

async function updateFavTeams(team_id, users_id){
    const result = await db.result(`
        update usersfavteams set
            team_id = $1
        where users_id = $2
    `, [team_id, users_id]);
    if (result.rowCount === 1){
        return users_id;
    } else {
        return null;
    }
};

async function deleteFavTeams (team_id, users_id){
    const result = await db.result(`
        delete from usersfavteams where 
            team_id = $1
            users_id = $2,
    `, [team_id, users_id])
};

module.exports = {
    createFavTeam,
    retrieveFavTeams,
    updateFavTeams,
    deleteFavTeams
};