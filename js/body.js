var nfl = {
    homeTeam: "Denver Broncos",
    awayTeam: "Seattle Seahawks",
    time: new Date(2014, 9, 21, 14, 25)
};

var mlb = {
    homeTeam: "Colorado Rockies",
    awayTeam: "Arizona Diamondbacks",
    time: new Date(2014, 9, 21, 14, 10)
};

var todaysGames = [nfl, mlb];

function writeBody () {
    for (i=0; i<todaysGames.length; i++) {
        var gameList = document.createElement('div');
        document.getElementById('GameList').appendChild(gameList);
        gameList.setAttribute("id", "GameX");
    }
};

writeBody();