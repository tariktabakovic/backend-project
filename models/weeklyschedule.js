async function games(day_id){
    const games = await db.query('select * from weeklyschedule where day_id=$1')
    return games
};

