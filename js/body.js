games = [
    { sport: "nfl", homeTeam: "Denver Broncos", awayTeam: "Seattle Seahawks", time: new Date(2014, 8, 21, 14, 25, 0, 0)},
    { sport: "mlb", homeTeam: "Colorado Rockies", awayTeam: "Arizona Diamondbacks", time: new Date(2014, 8, 21, 14, 10, 0, 0)},
    { sport: "nba", homeTeam: "Denver Nuggets", awayTeam: "Golden State Warriors", time: new Date(2014, 8, 21, 14, 10, 0, 0)},
    { sport: "nhl", homeTeam: "Colorado Avalanche", awayTeam: "Edmonton Oilers", time: new Date(2014, 8, 21, 14, 10, 0, 0)},
    {sport: "mls", homeTeam: "LA Galaxy", awayTeam:"Colorado Rapids", time: new Date(2014, 7, 20, 14, 0, 0, 0)}
];
homeGames = [];
awayGames = [];

setMenuDates();

homeAwayPush(games);

writeBody(homeGames);

function resetBody (array, e) {
    document.getElementById('GameList').innerHTML = '';
    writeBody(array);

    document.getElementsByClassName('selected')[2].setAttribute('class', '');
    e.parentElement.setAttribute('class', 'selected');

    if (e.text == 'Away Games') {
        document.getElementsByClassName('subtitle')[0].textContent = "Today's Away Games:";
    } else if (e.text == 'Home Games') {
        document.getElementsByClassName('subtitle')[0].textContent = "Today's Home Games:";
    } else {
        document.getElementsByClassName('subtitle')[0].textContent = "All Today's Games:";
    }
};

function homeAwayPush(ary){

    for (i=0; i<ary.length; i++) {
        var team = ary[i].homeTeam;
        if (team == "Denver Broncos" || team == "Colorado Rockies" || team == "Denver Nuggets" || team == "Colorado Avalanche" || team == "Colorado Rapids"){
            homeGames.push(ary[i]);
        }else {
            awayGames.push(ary[i]);
        }
    }
}

function setMenuDates () {

    var inFuture = 1;
    var inFutureScroll = 1;

    var menuLIs = document.getElementsByClassName('future');
    var menuLIsArr = Array.prototype.slice.call(menuLIs);

    menuLIsArr.forEach(function setDateText (x){
        inFuture += 1;
        var futureDay = new Date().setDate(new Date().getDate() + inFuture);
        var dateText = new Text(formatDate(new Date(futureDay), "dddd"));
        var linkIt = document.createElement('a');
        linkIt.href = "#";
        linkIt.appendChild(dateText);
        x.appendChild(linkIt);
    });

    var menuLIsScroll = document.getElementsByClassName('futureScroll');
    var menuLIsScrollArr = Array.prototype.slice.call(menuLIsScroll);

    menuLIsScrollArr.forEach(function setScrollDateText (x){
        inFutureScroll += 1;
        var futureScrollDay = new Date().setDate(new Date().getDate() + inFutureScroll);
        var dateScrollText = new Text(formatDate(new Date(futureScrollDay), "dddd"));
        var linkItScroll = document.createElement('a');
        linkItScroll.href = "#";
        linkItScroll.appendChild(dateScrollText);
        x.appendChild(linkItScroll);
    })

}

//takes in array of obj, create's div for each. adds attributes. populates innerHTML.
function writeBody(gameArr) {

    for (i=0; i<gameArr.length; i++) {

        var innerContent = [
            {sportAtt: "sport", sport: new Text(gameArr[i].sport.toUpperCase())},
            {sportAtt: "versus", aTeamText: new Text(gameArr[i].awayTeam), hTeamText: new Text(gameArr[i].homeTeam), vsText: new Text("-Vs-")},
            {sportAtt: "date", date: new Text(formatDate(gameArr[i].time, "dddd, MMMM d")), date2: new Text(formatDate(gameArr[i].time, "h:mm TT")), atText: new Text("-At-")}
        ];
        var gameList = document.createElement('div');

        document.getElementById('GameList').appendChild(gameList);

        var divOrder = document.getElementById('GameList').childNodes;

        if (divOrder[i] == divOrder[0]){
            gameList.setAttribute("class", "GameXfirst");
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
                content.appendChild(lineBreak1);
                content.appendChild(x.atText);
                content.appendChild(lineBreak2);
                content.appendChild(x.date2);
            }

        });
    }
};

//formatting for time:
function formatDate(date, format, utc) {
    var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
        var s = i + "";
        len = len || 2;
        while (s.length < len) s = "0" + s;
        return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
        tz = Math.abs(tz);
        var tzHrs = Math.floor(tz / 60);
        var tzMin = tz % 60;
        K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
};
