const http = require('http');
const express = require('express');

const PORT = 3007;

// const session = require("express-session");
// const FileStore = require("session-file-store")(session);


const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const app = express();

const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set('views', 'templates');
app.set('view engine', 'html');



const server = http.createServer(app);

const users = require('./models/users');

// app.get('/', async (req, res)=>{
//     res.render('home')
// })

// app.post('/', async (req, res)=>{
    
//     res.redirect('users/auth')
// });


// function requireLogin(req, res, next){
//     if(req.session && req.session.user){
//         console.log('require login says you are good');
//         next();
//     } else {
//         console.log('incorrect username or password');
//         res.redirect('users/auth');
//     }
// };

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
    const result = await users.create(username, password);
    console.log(result);
    res.end();
    res.redirect('users/auth');
});

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
    res.end();
});


// app.get('/games', requireLogin, async (req, res) =>{

// })

// app.post('/games', requireLogin, async (req, res) =>{
//     res.redirect('/chatrooms')
// })

// app.get('/chatrooms', requireLogin, async (req, res) =>{

// })

// app.post('/chatrooms', requireLogin, async (req, res) =>{

// })

// app.get('/logout', requireLogin, async (req, res)=>{
//     req.session.destroy(()=>{
//         res.redirect('/login')
//     });
// });

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
});