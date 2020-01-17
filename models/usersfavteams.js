async function createFavTeam(nameofteam, user_id){
    const result = await db.result(`
    insert into usersfavteams
    (nameofteam, user_id)
values
    ($1, $2)
    `, [nameofteam, user_id])
    return result;
    // owner_id in fullstack-pets
};