games = [
    { sport: "nhl", homeTeam: "Colorado Avalanche", awayTeam: "Edmonton Oilers", time: new Date(2014, 8, 21, 14, 10, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"},
    { sport: "mls", homeTeam: "LA Galaxy", awayTeam:"Colorado Rapids", time: new Date(2014, 7, 20, 14, 0, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"},
    { sport: "nfl", homeTeam: "Denver Broncos", awayTeam: "Seattle Seahawks", time: new Date(2014, 8, 21, 14, 25, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"},
    { sport: "mlb", homeTeam: "Colorado Rockies", awayTeam: "Arizona Diamondbacks", time: new Date(2014, 8, 21, 14, 10, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"},
    { sport: "nba", homeTeam: "Denver Nuggets", awayTeam: "Golden State Warriors", time: new Date(2014, 8, 21, 14, 10, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"},
    { sport: "ncaab", homeTeam: "Colorado Buffs", awayTeam: "USC Tojans", time: new Date(2014, 8, 21, 14, 10, 0, 0), homeImg: "img/DenverBroncosV2.png", awayImg: "img/SeattleSeahawks.png", venue: "FedEx Field", city: "Landover", state: "MD", wthrIMG: "img/partlycloudy.gif", weather: "Partly Cloudy", temp_f: "66.3", winDir: "NNW", windSpeed: "22 mph", gusts: "28 mph", tickets: "#", directions: "http://www.google.com", venueSite: "http://www.redskins.com/fedexfield/", tvChannel: "img/abc.png"}
];

homeGames = [];
awayGames = [];

sortEm(games);

homeAwayPush(games);

writeBodyNew(games);


$(document).scroll(function() {
    $('#navbarScroll').toggle($(this).scrollTop() > 58);
    $('#filterScroll').toggle($(this).scrollTop() > 58);
});

$(document).ready(function(){
    $('.filterListen').click(function(event){
        event.preventDefault();
        selected($(this));
    });
});

$(document).ready(function (){
    var futureInc = 1;
    var futureIncScroll = 1;
    $('.future').each(function (){
        futureInc += 1;
        var futureDay = new Date().setDate(new Date().getDate() + futureInc);
        $futureText = document.createTextNode(formatDate(new Date(futureDay), "dddd"));
        $(this).append($futureText);
    });
    $('.futureScroll').each(function (){
        futureIncScroll += 1;
        var futureDayScroll = new Date().setDate(new Date().getDate() + futureIncScroll);
        $futureTextScroll = document.createTextNode(formatDate(new Date(futureDayScroll), "dddd"));
        $(this).append($futureTextScroll);
    })
});

function sortEm (aryOfGames) {
    aryOfGames.forEach(function rankEm(i) {
        switch (i.sport) {
            case "nfl":
                i.rank = 1;
                i.label = "NFL";
                break;
            case "ncaaf":
                i.rank = 2;
                i.label = "NCAA";
                break;
            case "mlb":
                i.rank = 3;
                i.label = "MLB";
                break;
            case "nba":
                i.rank = 4;
                i.label = "NBA";
                break;
            case "ncaab":
                i.rank = 5;
                i.label = "NCAA";
                break;
            case "nhl":
                i.rank = 6;
                i.label = "NHL";
                break;
            case "mls":
                i.rank = 7;
                i.label = "MLS";
                break;
            case "ncaahockey":
                i.rank = 8;
                i.label = "NCAA";
                break;
            case "mll":
                i.rank = 9;
                i.label = "MLL";
                break;
            case "nll":
                i.rank = 10;
                i.label = "NLL";
                break;
            case "ncaawb":
                i.rank = 11;
                i.label = "NCAA";
                break;
        }
    });
    aryOfGames.sort(function (a,b) {
        return a.rank - b.rank;
    })
}

function selected (e) {
    $text = e.text();
    $('#GameList').empty();
    $('.selected:eq(1)').removeClass('selected');
    $('.selectedScroll:eq(1)').removeClass('selectedScroll');
    if ($text == 'Away Games') {
        $('#filterScroll').find('div:nth-child(2)>div>a').addClass('selectedScroll');
        $('#filter').find('div:nth-child(2)>div>a').addClass('selected');
        $('.subtitle').text('Today\'s Away Games:');
        writeBodyNew(awayGames);
    } else if ($text == 'Home Games') {
        $('#filterScroll').find('div:nth-child(1)>div>a').addClass('selectedScroll');
        $('#filter').find('div:nth-child(1)>div>a').addClass('selected');
        $('.subtitle').text('Today\'s Home Games:');
        writeBodyNew(homeGames);
    } else {
        $('#filterScroll').find('div:nth-child(3)>div>a').addClass('selectedScroll');
        $('#filter').find('div:nth-child(3)>div>a').addClass('selected');
        $('.subtitle').text('All Today\'s Games:');
        writeBodyNew(games);
    }
}

function homeAwayPush(ary){

    for (i=0; i<ary.length; i++) {
        var team = ary[i].homeTeam;
        if (team == "Denver Broncos" || team == "Colorado Rockies" || team == "Denver Nuggets" || team == "Colorado Avalanche" || team == "Colorado Rapids" || team == "DU Pioneers" || team == "Colorado Buffs" || team == "Metro State" || team == "Air Force" || team == "Colorado State" || team == "Colorado Mammoth" || team == "Denver Outlaws"){
            homeGames.push(ary[i]);
        }else {
            awayGames.push(ary[i]);
        }
    }
}

function writeBodyNew (arry) {
    arry.forEach(function listGame(x){

        var mostOuterDiv = $('<div />')
            .addClass('GameXtest');
        var firstInnerDiv = $('<div />')
            .addClass('gamewrap');
        var sportClone = $('.clonemeSport:eq(0)').clone();
        var venueClone = $('.clonemeVenu:eq(0)').clone();
        var versusClone = $('.clonemeVersus:eq(0)').clone();
        var weatherClone = $('.clonemeWeather:eq(0)').clone();

        $('#GameList').append(mostOuterDiv);
        mostOuterDiv.append(firstInnerDiv);
        mostOuterDiv.append(sportClone);
        firstInnerDiv.append(venueClone);
        firstInnerDiv.append(versusClone);
        firstInnerDiv.append(weatherClone);

        venueClone.find('.venue')
            .text(x.venue);
        venueClone.find('.city')
            .text(x.city);
        venueClone.find('.state')
            .text(x.state);
        venueClone.find('.time1')
            .text(formatDate(x.time,"h:mm TT"));
        venueClone.find('.time2')
            .text(formatDate(x.time,"dddd, MMMM d"));
        versusClone.find('.label')
            .text(x.label);
        versusClone.find('.awayImg')
            .attr('src', x.awayImg);
        versusClone.find('.homeImg')
            .attr('src', x.homeImg);
        weatherClone.find('.wthrIMG')
            .attr('src', x.wthrIMG);
        weatherClone.find('.temp_f')
            .text(x.temp_f);
        weatherClone.find('.weather')
            .text(x.weather);
        weatherClone.find('.winDir')
            .text(x.winDir);
        weatherClone.find('.windSpeed')
            .text(x.windSpeed);
        weatherClone.find('.gusts')
            .text(x.gusts);
        weatherClone.find('.tvChannel')
            .attr('src', x.tvChannel);
    })


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
