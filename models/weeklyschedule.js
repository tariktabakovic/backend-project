const db = require('./connection');
const pgp = require('./connection')

async function getAllGames(id){
    // try 
    const theGames = await db.query(`select * from weeklyschedule`);
    console.log(theGames);
    //     console.log(theGames);
    //     // const newGame = {}
    //     // for (item of game ){
    //     //     newGame [item]= game[item]
    //     // }
    //     theGames.map(async ())
    //     theGames['away_team_url']= await weeklyschedule.getTeamUrl(game.away_team);
    //     theGames['home_team_url']= await weeklyschedule.getTeamUrl(game.home_team);
    //     return theGames;
    // } catch (err) {
    //     console.log(err)
    //     return [];
};

async function getGameId(id){
    // const where = pgp.as.format(`WHERE id=$1`, [1]); 
    // const gameId = await db.any('SELECT id FROM weeklyschedule $1:raw', where);
    // console.log(gameId)
    const gameId = await db.one(`select weeklyschedule.id from weeklyschedule where id=${id}`, id);
    console.log(gameId)
};

async function getTipOff(id){
    const gameStart = await db.query(`select tipoff from weeklyschedule where id=${id}`);
    const tipoff = [];
    const myJson = JSON.stringify(gameStart);
    console.log(myJson);
    // for (item in gameStart){
    //     console.log(`${gameStart[item]}`)
    // }
    // for (item in gameStart.tipoff){
    //     x+= "<h1>" + gameStart.tipoff[item].value + "</h1>";
    //     for (j in gameStart.gameStart.value){
    //         x+= gameStart.tipoff[i].value[j];
    //     }
    
    // return gameStart;
    console.log(gameStart);
};
// async function getTeamUrl(team_id){
//     const teamUrl = await db.one(`select * from nbateams where id=$1`, team_id)
//     console.log(teamUrl);
//     return teamUrl.logo;
// };

async function getOneGame(id){
    const theGame = await db.query(`select * from weeklyschedule where id=${id}`)
    return theGame;
};

async function getWednesdayGames(){
    const wedGames = await db.query(`select * from weeklyschedule where day_id= '1'`)
    return wedGames
};

async function getThursdayGames(){
    const thurGames = await db.query(`select * from weeklyschedule where day_id= '2'`)
    return thurGames
};

async function getFridayGames(){
    const friGames = await db.query(`select * from weeklyschedule where day_id= '3'`)
    return friGames
};

async function getSaturdayGames(){
    const satGames = await db.query(`select * from weeklyschedule where day_id= '4'`)
    return satGames
};

async function getSundayGames(){
    const sunGames = await db.query(`select * from weeklyschedule where day_id= '5'`)
    return sunGames
};

module.exports = {
    getAllGames,
    getWednesdayGames,
    getThursdayGames,
    getFridayGames,
    getSaturdayGames,
    getSundayGames,
    getOneGame,
    // getTeamUrl
    getTipOff,
    getGameId
};