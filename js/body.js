games = [{ sport: "nfl", homeTeam: "Denver Broncos", awayTeam: "Seattle Seahawks", time: new Date(2014, 9, 21, 14, 25) },

{ sport: "mlb", homeTeam: "Colorado Rockies", awayTeam: "Arizona Diamondbacks", time: new Date(2014, 9, 21, 14, 10) },

{ sport: "nba", homeTeam: "Denver Nuggets", awayTeam: "Golden State Warriors", time: new Date(2014, 9, 21, 14, 10) }];




//takes in array of obj, create's div for each. adds attributes. populates innerHTML.
function writeBody(gameArr) {

    for (i=0; i<gameArr.length; i++) {

        var innerContent = ["sport", "versus", "date"];
        var content = document.createElement('div');

        var gameList = document.createElement('div');
        document.getElementById('GameList').appendChild(gameList);

        var divOrder = document.getElementById('GameList').childNodes;

        if (divOrder[i] == divOrder[0]){
            gameList.setAttribute("id", "GameXfirst");
        } else {
        gameList.setAttribute("class", "GameX");
        }

        innerContent.forEach(function writeInnerContent(x){
            var newDiv = document.createElement('div');
            gameList.appendChild(newDiv);
            newDiv.setAttribute("id", x);
            newDiv.appendChild(content);
            content.setAttribute("class","content");
        });

    }
};


writeBody(games);