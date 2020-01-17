const http = require('http');
const express = require('express');
const app = express();
const PORT = 3007;

const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(session({
    store: new FileStore({}),
    secret: ""
}));

app.use((req, res, next)=>{
    console.log(req.session);
    next();
});

const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const server = http.createServer(app);

const users = require('./models/users');

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

app.get('/signup', async (req, res)=>{
    res.render('users/signup');
})

app.get('/signup', async (req, res)=>{
    res.redirect('users/auth');
})

app.get('/login', async (req,res) => {
    res.render('users/auth');
})

app.post('/login', parseForm, async (req, res) =>{
    console.log(req.body);
    const { username, password }= req.body;
    const didLoginSuccessfully = await users.login(username, password);
    if (didLoginSuccessfully){
        const theUser = await users.getByUsername(username);
        req.session.user = {
            username, 
            id: theUser.id
        };
        req.session.save(()=>{
            res.redirect('/games')
        });
    }else {
        console.log('Incorrect username or password.')
    } 
});


app.get('/games', requireLogin, async (req, res) =>{

})

app.post('/games', requireLogin, async (req, res) =>{
    res.redirect('/chatrooms')
})

app.get('/chatrooms', requireLogin, async (req, res) =>{

})

app.post('/chatrooms', requireLogin, async (req, res) =>{

})

app.get('/logout', requireLogin, async (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    });
});

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
});