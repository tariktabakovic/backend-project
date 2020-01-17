const http = require('http');
const express = require('express');
const app = express();
const PORT = 3007;

const es6renderer = require('express-es6-template-engine');
app.engine('html', es6renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});

const server = http.createServer(app);


app.get('/', async (req, res)=>{
    res.render('/home')
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
app.get('/login', async (req,res) => {
    res.render('users/auth');
})

app.post('/login', parseForm, async (req, res) =>{
    console.log(req.body);
    const { name, password }= req.body;
    const didLoginSuccessfully = await users.login(name, password);
    if (didLoginSuccessfully){
        const theUser = await users.getByUsername(name);
        req.session.user = {
            name, 
            id: theUser.id
        };
        req.session.save(()=>{
            res.redirect('/home')
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

app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    });
});

server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`)
});