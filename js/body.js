games = [{ sport: "nfl", homeTeam: "Denver Broncos", awayTeam: "Seattle Seahawks", time: new Date(2014, 9, 21, 14, 25) },

{ sport: "mlb", homeTeam: "Colorado Rockies", awayTeam: "Arizona Diamondbacks", time: new Date(2014, 9, 21, 14, 10) },

{ sport: "nba", homeTeam: "Denver Nuggets", awayTeam: "Golden State Warriors", time: new Date(2014, 9, 21, 14, 10) }];




//takes in array of obj, create's div for each. adds attributes. populates innerHTML.
function writeBody(gameArr) {

    for (i=0; i<gameArr.length; i++) {

        var innerContent = [
            {sportAtt: "sport", sport: new Text(games[i].sport.toUpperCase())},
            {sportAtt: "versus", aTeamText: new Text(games[i].awayTeam), hTeamText: new Text(games[i].homeTeam), vsText: new Text("-Vs-")},
            {sportAtt: "date", date: new Text(games[i].time)}
        ];
        var gameList = document.createElement('div');

        document.getElementById('GameList').appendChild(gameList);

        var divOrder = document.getElementById('GameList').childNodes;

        if (divOrder[i] == divOrder[0]){
            gameList.setAttribute("id", "GameXfirst");
        } else {
        gameList.setAttribute("class", "GameX");
        }

        innerContent.forEach(function writeInnerContent(x){

            var lineBreak1 = document.createElement('br');
            var lineBreak2 = document.createElement('br');
            var content = document.createElement('div');
            var newDiv = document.createElement('div');

            gameList.appendChild(newDiv);
            newDiv.setAttribute("class", x.sportAtt);
            newDiv.appendChild(content);
            content.setAttribute("class","content");

            if (x == innerContent[0]) {
                content.appendChild(x.sport);
            } else if (x == innerContent[1]) {
                content.appendChild(x.aTeamText);
                content.appendChild(lineBreak1);
                content.appendChild(x.vsText);
                content.appendChild(lineBreak2);
                content.appendChild(x.hTeamText);
            } else {
                content.appendChild(x.date);
            }

        });


    }
};


writeBody(games);