create table users (
    id serial primary key,
    username text,
    hash text
);

create table nbateams (
    id serial primary key,
    nameofteam text
);

create table usersfavteams(
    id serial primary key,
    team_id integer references nbateams(id), 
    users_id integer references users(id)
);


create table weeklyschedule (
    id serial primary key,
    away_team integer references nbateams(id),
    home_team integer references nbateams(id),
    tipoff text
);