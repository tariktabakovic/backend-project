insert into users
    (username, hash)
    values
    ('Tarik', '');

insert into nbateams
    (nameofteam)
    values
('Atlanta Hawks'), 
('Boston Celtics'), 
('Brooklyn Nets'),
('Charlotte Hornets'), 
('Chicago Bulls'), 
('Cleveland Cavaliers'), 
('Dallas Mavericks'), 
('Denver Nuggets'), 
('Detroit Pistons'), 
('Golden State Warriors'), 
('Houston Rockets'), 
('Indiana Pacers'),
('LA Clippers'), 
('LA Lakers'), 
('Memphis Grizzlies'),
('Miami Heat'), 
('Milwaukee Bucks'), 
('Minnesota Timberwolves'), 
('New Orleans Pelicans'), 
('New York Knicks'), 
('Oklahoma City Thunder'), 
('Orlando Magic'), 
('Philadelphia Sixers'), 
('Phoenix Suns'), 
('Portland Trail Blazers'), 
('Sacramento Kings'), 
('San Antonio Spurs'), 
('Toronto Raptors'), 
('Utah Jazz'), 
('Washington Wizards');

insert into usersfavteams
    (team_id, users_id)
    values
    ('2', '1');

insert into weeklyschedule
    (away_team, home_team, tipoff)
    values
    ('1', '2', '10:30pm');
    