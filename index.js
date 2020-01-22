const http = require('http');
const express = require('express');
const app = express();

const PORT = 3007;
const server = http.createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const session = require("express-session");
const FileStore = require("session-file-store")(session);
// app.use('/favgames/:id', express.static(path.join(__dirname, 'users')))

// app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets', express.static('stylesheets'));
app.use(session({
    store: new FileStore({}),

    // We will move this to a secure location, shortly.
    secret: 'lalala1234lalala'
}));

app.use((req, res, next) =>  {
    console.log('***********');
    console.log(req.session);
    console.log('***********');

    next();
});

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const {dateToFormattedString} = require('./date');


const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set('views', 'templates');
app.set('view engine', 'html');


const users = require('./models/users');
const weeklyschedule = require('./models/weeklyschedule');
const usersfavteams = require('./models/usersfavteams');
app.get('/', async (req, res)=>{
    res.render('home')
})

app.post('/', async (req, res)=>{
    
    res.redirect('users/auth')
});


function requireLogin(req, res, next){
    if(req.session && req.session.user){
        console.log('require login says you are good');
        next();
    } else {
        console.log('incorrect username or password');
        res.redirect('users/auth');
    }
};

app.get('/signup', (req, res)=>{
    console.log('yes you are at the sign up');
    res.render('users/signup', {
        locals: {
            username: '',
            password: '',
        }
    });
});

app.post('/signup', parseForm, async (req, res)=>{
    const { username , password } = req.body
    // console.log(result);
    // res.end();
    res.redirect('/login')
});

app.get('/login', (req,res) => {
    res.render('users/auth', {
        locals: {
            username: '',
            password: '',
        }
    });
})

app.post('/login', parseForm, async (req, res) =>{
    console.log(req.body);
    const { username, password}= req.body;
    const result = await users.create(username, password);
    const didLoginSuccessfully = await users.login(username, password);
    if (didLoginSuccessfully){
        const theUser = await users.getByUsername(username);
        req.session.user = {
            username, 
            id: theUser.id
        }
        req.session.save(()=>{
            res.redirect(`/favteams/${req.session.user.id}`)
        });
    }else {
        console.log('Incorrect username or password.')
        res.redirect(`/signup`);
    } 
});

app.get('/favteams/:id', parseForm, async (req, res)=>{
    // const createFavTeam = await usersfavteams.createFavTeam(favoriteteam, req.session.user.id)
    res.render(`users/favteams`,{
        locals: {
            favoriteteam: ''
        }
    });
});

app.post('/favteams/:id', parseForm, async (req, res)=>{
    const user_id = req.session.user.id;
    const team_id = parseInt(req.body.favoriteteam, 10);
    console.log('favoriteteam: ')
    console.log(req.body.favoriteteam)
    const updateFavTeams = await usersfavteams.createFavTeam(team_id, user_id)
    res.redirect(`/games/chatrooms`);
});


app.get('/games', requireLogin, async (req, res) =>{
    // const id = req.session.user.id
    // const gameId1 = await weeklyschedule.getGameId(1)
    // console.log(gameId1)
    // title = 'Lets Chats Basketball';
    // serialize = function(gameId1) {
    //     var str = [];
    //     for (var p in gameId1)
    //       if (gameId1.hasOwnProperty(p)) {
    //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(gameId1[p]));
    //       }
    //     return str.join("&");
    //   }
    // console.log(serialize({
    //     gameId: '1'
    // }));
    // console.log(id)
    // // console.log(newGame);
    // const user_id = req.session.user.id;
    // console.log(id);
    // const wednesdayGames = await weeklyschedule.getAllGames(1);
    // const wednesdayTipOff1 = await weeklyschedule.getTipOff(1);
    res.render(`games`);
});
        
        
app.post('/games', requireLogin, async (req, res) =>{
    res.redirect(`/games/chatrooms`)
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

app.get('/games/chatrooms', requireLogin, async (req, res) =>{
    // const gameId = await weeklyschedule.getOneGame(1);
    // console.log('chat page');
    res.render('chatrooms')
});

app.post('/games/chatrooms', requireLogin, async (req, res) =>{

})

// app.get('/logout', requireLogin, async (req, res)=>{
//     req.session.destroy(()=>{
//         res.redirect('/login')
//     });
// });

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
    io.on('connection', function (socket) {
        console.log("USER CONNECTED...");
    
        // handle new messages
        socket.on('new:message', function (msgObject) {
          io.emit('new:message', msgObject);
        });
    
        // handle new members
        socket.on('new:member', function (name) {
          io.emit('new:member', name);
        });
    });
});