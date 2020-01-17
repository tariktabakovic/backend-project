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

async function retrieveFavTeams(user_id){
    try {
        const favTeams = await db.query(`select * from usersfavteams where ${user_id}`);
        console.log(favTeams);
        return favTeams;
    } catch (err){
        console.log(err)
        return [];
    };
}

async function updateFavTeams(team_id, user_id){
    const result = await db.result(`
        update usersfavteams set
            team_id = $1
        where user_id = $2;
    `, [team_id, user_id]);
    if (result.rowCount === 1){
        return user_id;
    } else {
        return null;
    }
};

async function deleteFavTeams (team_id, user_id){
    const result = await db.result(`
        delete from usersfavteams where 
            team_id = $1
            user_id = $2,
    `, [team_id, user_id])
};

module.exports = {
    createFavTeam,
    retrieveFavTeams,
    updateFavTeams,
    deleteFavTeams
};