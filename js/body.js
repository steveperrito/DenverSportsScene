games = [{ sport: "nfl", homeTeam: "Denver Broncos", awayTeam: "Seattle Seahawks", time: new Date(2014, 9, 21, 14, 25) },

{ sport: "mlb", homeTeam: "Colorado Rockies", awayTeam: "Arizona Diamondbacks", time: new Date(2014, 9, 21, 14, 10) },

{ sport: "nba", homeTeam: "Denver Nuggets", awayTeam: "Golden State Warriors", time: new Date(2014, 9, 21, 14, 10) }];



function writeBody(gameArr) {

    for (i=0; i<gameArr.length; i++) {

        var gameList = document.createElement('div');
        document.getElementById('GameList').appendChild(gameList);

        var divOrder = document.getElementById('GameList').childNodes;

        if (divOrder[i] == divOrder[0]){
            gameList.setAttribute("id", "GameXfirst");
        } else {
        gameList.setAttribute("id", "GameX");
        }

    }
};


writeBody(games);