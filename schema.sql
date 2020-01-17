create table users (
    id serial primary key,
    username text,
    hash text,
    favteams text
);

create table usersfavteams (
    id serial primary key,
    nameofteam text, 
    users_id integer references users(id)
);

create table nbateams (
    id serial primary key,
    nameofteam text
);

create table weeklyscehdule (
    id serial primary key,
    away integer references nbateams(id),
    home integer references nbateams(id),
    tipoff text
);