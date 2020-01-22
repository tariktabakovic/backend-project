insert into users
    (username, hash)
    values
    ('Tarik', '');

insert into nbateams
    (nameofteam)
    values
('Atlanta Hawks'),
-- , 'http://content.sportslogos.net/logos/6/218/full/7034_philadelphia_76ers-primary-2016.png'),
('Boston Celtics'),
-- , 'http://content.sportslogos.net/logos/6/227/full/6259_toronto_raptors-primary_on_dark-2016.png');
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
    ('1', '1');

insert into weeklyschedule
    (away_team, home_team, tipoff, dayofweek, day_id)
    values
    ('1', '2', '7:00pm', 'wednesday', '1'),
    ('14', '20', '7:30pm', 'wednesday', '1'),
    ('13', '1', '7:30pm', 'wednesday', '1'),
    ('14', '3', '8:00pm', 'thursday', '2'),
    ('7', '25', '10:30pm', 'thursday', '2'),
    ('1', '21', '8:00pm', 'friday', '3'),
    ('13', '16', '8:00pm', 'friday', '3'),
    ('7', '29', '5:00pm', 'saturday', '4'),
    ('21', '18', '8:00pm', 'saturday', '4'),
    ('14', '23', '8:30pm', 'saturday', '4'),
    ('11', '8', '7:30pm', 'sunday', '5'),
    ('30', '1', '6:00pm', 'sunday', '5'),
    ('2', '19', '6:00pm', 'sunday', '5');
    