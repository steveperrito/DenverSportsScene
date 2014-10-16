$(function () {

    var cleanRows = [];
    var urlToQuery = 'https://spreadsheets.google.com/feeds/list/10LaPZ_gUSp52hv1IhMvxFLt2aFBKlYPlKwASwp_WeWk/1/public/basic?alt=json';
    var tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
    var yesterday = moment().add(-1, 'day').format('MM/DD/YYYY');
    var today = moment().format('MM/DD/YYYY');
    var gameBody = $('.game-body');

    $.get(urlToQuery, function (data) {
        var rows = data.feed.entry;
        rows.forEach(function (el) {
            var JsonObj = {};
            var firstStepAry = el.content.$t.split(', ');
            firstStepAry.forEach(function (el) {
                var microAry = el.split(': ');
                JsonObj[microAry[0]] = microAry[1];
            })
            cleanRows.push(JsonObj);
        })

        listEm(cleanRows, today, 'home');
    });

    $('.container').click(function(e) {
        e.preventDefault;
        if ($(e.target).hasClass('tomorrow')) {
            listEm(cleanRows, tomorrow, 'homeAway');
        }
        if ($(e.target).hasClass('today')) {
            listEm(cleanRows, today, 'homeAway');
        }
        if ($(e.target).hasClass('yesterday')) {
            listEm(cleanRows, yesterday, 'homeAway');
        }

    });

    function listEm (unSortedAry, date, homeOrAway) {

        var gameList = sortGameDay(date, unSortedAry);

        gameBody.empty();

        if(homeOrAway === 'homeAway') {
            if (combineHomeAway(gameList).length > 0) {
                sortGames(combineHomeAway(gameList)).forEach(function(el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                })
            } else {
                noGameMsg();
            }
        } else {
            if (gameList[homeOrAway].length > 0) {
                sortGames(gameList[homeOrAway]).forEach(function(el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                })
            } else {
                noGameMsg();
            }
        }
    }

    function sortGameDay (day, ary) {
        var gameSchema = {
            home : [],
            away : []
        };
        var todaysGames = [];

        ary.forEach(function (el) {
            if(formatIt(el.date) == day) {
                todaysGames.push(el);
            }
        });

        todaysGames.forEach(function(el){
            if(homeGame(el)) {
                gameSchema.home.push(el);
            } else {
                gameSchema.away.push(el);
            }
        })

        return gameSchema;
    }

    function homeGame(obj) {
        if (
            obj.hometeam == 'Denver Broncos' ||
            obj.hometeam == 'Denver Nuggets' ||
            obj.hometeam == 'Colorado Avalanche'
           ) {
            return true;
        } else {
            return false;
        }
    }

    function formatIt(str) {
        return moment(str, 'M/DD/YYYY').format('MM/DD/YYYY');
    }

    function writeBody (obj) {
        var gameListItem = $('.clone:eq(0)').clone();
        var removeClone = gameListItem.closest('div.clone');
        var awayTeam = gameListItem.find('h2.away-team');
        var venue = gameListItem.find('span.venue');
        var time = gameListItem.find('span.time');
        var tvChannel = gameListItem.find('span.tv-channel');
        var directions = gameListItem.find('a.directions');
        var homeTeam = gameListItem.find('h2.home-team');

        removeClone.removeClass('clone');
        awayTeam.text(obj.awayteam);
        venue.text(obj.venue + ' |');
        time.text(obj.time + ' |');
        tvChannel.text(obj.tv + ' |');
        directions.attr('href', 'http://maps.google.com/' + obj.city + obj.state);
        homeTeam.text(obj.hometeam);

        return gameListItem;

    }

    function sortGames (ary) {
        ary.forEach(function(el) {
            switch (el.sport) {
                case 'NFL':
                    el.rank = 1;
                    break;
                case 'NHL':
                    el.rank = 3;
                    break;
                case 'NBA':
                    el.rank = 2;
                    break;
                default:
                    return;
            }
        })
        ary.sort(function (a, b) {
            return a.rank - b.rank;
        })

        return ary;
    }

    function combineHomeAway (obj) {
        var ary = [];
        var merged = [];

        for (key in obj) {
            ary.push(obj[key]);
        }
        merged = merged.concat.apply(merged, ary);

        return merged;
    }

    function noGameMsg () {
        var uHoH = document.createElement('h1');
        var otherOptions = document.createElement('p');
        var lookMore = document.createElement('a');
        $(uHoH).text('Uh Oh...');
        $(otherOptions).text('There are no Home Games today.');
        $(lookMore).text(' Click here to check for tomorrow\'s games');
        $(lookMore).addClass('tomorrow');
        lookMore.href = '#';
        gameBody.append(uHoH);
        gameBody.append(otherOptions);
        $(otherOptions).append(lookMore);
    }
});
