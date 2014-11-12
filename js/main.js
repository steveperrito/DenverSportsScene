//TODO: Team records
//TODO: add weekend link
//TODO: add game preview?

$(function () {

    var cleanRows = [];
    var urlToQuery = 'https://spreadsheets.google.com/feeds/list/10LaPZ_gUSp52hv1IhMvxFLt2aFBKlYPlKwASwp_WeWk/1/public/basic?alt=json';
    var tomorrow = moment().add(1, 'day').format('MM/DD/YYYY');
    var yesterday = moment().add(-1, 'day').format('MM/DD/YYYY');
    var today = moment().format('MM/DD/YYYY');
    var currentDateChoice = moment().format('MM/DD/YYYY');
    var gameBody = $('.game-body');

    $.get(urlToQuery, function (data) {
        var rows = data.feed.entry;
        rows.forEach(function (el) {
            var JsonObj = {};
            var firstStepAry = el.content.$t.split(', ');
            firstStepAry.forEach(function (el) {
                var microAry = el.split(': ');
                JsonObj[microAry[0]] = microAry[1];
            });
            cleanRows.push(JsonObj);
        });

        var endDates = findEndDates(cleanRows);

        $('.calendar').datepicker({
            autoclose: true,
            todayHighlight: true,
            endDate: endDates.newest.date,
            startDate: endDates.oldest.date
        })
            .on('changeDate', function (e) {
                collapseMobileMenu();
                var preferredDate = e.format([0], 'mm/dd/yyyy');
                if (preferredDate == '') preferredDate = currentDateChoice;
                listEm(cleanRows, preferredDate, 'homeAway');
            });

        listEm(cleanRows, today, 'homeAway');
    });

    $('.container').click(function (e) {
        e.preventDefault();
        if ($(e.target).hasClass('tomorrow')) {
            collapseMobileMenu();
            listEm(cleanRows, tomorrow, 'homeAway');
            $('.calendar').datepicker('update', tomorrow);
        }
        if ($(e.target).hasClass('today')) {
            collapseMobileMenu();
            listEm(cleanRows, today, 'homeAway');
            $('.calendar').datepicker('update', today);
        }
        if ($(e.target).hasClass('yesterday')) {
            collapseMobileMenu();
            listEm(cleanRows, yesterday, 'homeAway');
            $('.calendar').datepicker('update', yesterday);
        }
        if ($(e.target).hasClass('home-btn')) {
            listEm(cleanRows, currentDateChoice, 'home');
        }
        if ($(e.target).hasClass('away-btn')) {
            listEm(cleanRows, currentDateChoice, 'away');
        }
        if ($(e.target).hasClass('all-btn')) {
            listEm(cleanRows, currentDateChoice, 'homeAway');
        }
        if ($(e.target).hasClass('venue')) {
            window.open($(e.target).parent().attr('href'), '_blank');
        }
    });

    function listEm(unSortedAry, date, homeOrAway) {
        var titleDate = moment(date).format('dddd, MMM Do');
        var gameList = sortGameDay(date, unSortedAry);
        var btnActivate = '.' + homeOrAway + '-btn';
        var homeBadge = gameList['home'].length;
        var awayBadge = gameList['away'].length;
        var allBadge = combineHomeAway(gameList).length;
        var jumboTron = $('.jumbotron');
        var teamBG;

        //set jumbotron bg
        jumboTron.removeClass('bg-DenverBroncos bg-DUPioneers bg-DenverNuggets bg-CUBuffs bg-ColoradoAvalanche bg-ColoradoRapids')
        if (homeBadge > 0) {
            teamBG = sortGames(gameList.home)[0].hometeam;
        } else if (awayBadge > 0) {
            teamBG = sortGames(gameList.away)[0].awayteam;
        } else {
            teamBG = "Denver Broncos"
        }
        jumboTron.addClass('bg-' + teamBG.replace(/\s/g, ''));

        //set badge numbers on filter btns
        $('.home-badge').text(homeBadge);
        $('.away-badge').text(awayBadge);
        $('.all-badge').text(allBadge);

        //set current date for use by other functions
        currentDateChoice = date;
        //set title text to selected date
        $('.theJumboh').text(titleDate);
        //get rid of stuff
        gameBody.empty();

        //if home, show home games and activate home button. same for away and all games.
        if (homeOrAway === 'homeAway') {
            removeActive();
            $('.all-btn').addClass('active');

            if (combineHomeAway(gameList).length > 0) {
                combineHomeAway(gameList).forEach(function (el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                    addWeather(date, oneGame, el);

                })
            } else {
                noGameMsg(homeOrAway);
            }
        } else {
            removeActive();
            $(btnActivate).addClass('active');

            if (gameList[homeOrAway].length > 0) {
                gameList[homeOrAway].forEach(function (el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                    addWeather(date, oneGame, el);
                })
            } else {
                noGameMsg(homeOrAway);
            }
        }
    }

    //look at whole array of data and grab games for provided date
    function sortGameDay(day, ary) {
        var gameSchema = {
            home: [],
            away: []
        };
        var todaysGames = [];

        ary.forEach(function (el) {
            if (formatIt(el.date) == day) {
                todaysGames.push(el);
            }
        });

        todaysGames.forEach(function (el) {
            if (homeGame(el)) {
                gameSchema.home.push(el);
            } else {
                gameSchema.away.push(el);
            }
        });

        sortGames(gameSchema.home);
        sortGames(gameSchema.away);

        return gameSchema;
    }

    //answer question: if this match-up is a home game or not
    function homeGame(obj) {
        if (
            obj.hometeam == 'Denver Broncos' ||
                obj.hometeam == 'Denver Nuggets' ||
                obj.hometeam == 'Colorado Avalanche' ||
                obj.hometeam == 'Colorado Rapids' ||
                obj.hometeam == 'CU Buffs' ||
                obj.hometeam == 'DU Pioneers'
            ) {
            return true;
        } else {
            return false;
        }
    }

    //use moment.js to get all dates formatted to one type.
    function formatIt(str) {
        return moment(str, 'M/DD/YYYY').format('MM/DD/YYYY');
    }

    //will create a row, given a match-up object.
    function writeBody(obj) {
        var gameListItem = $('.clone:eq(0)').clone();
        var removeClone = gameListItem.closest('div.clone');
        var awayTeam = gameListItem.find('h3.away-team');
        var venue = gameListItem.find('span.venue');
        var time = gameListItem.find('span.time');
        var tvChannel = gameListItem.find('span.tv-channel');
        var directions = gameListItem.find('a.directions');
        var homeTeam = gameListItem.find('h3.home-team');
        var theSport = gameListItem.find('h4.sport');
        var awayTeamImg = gameListItem.find('img.away-team-img');
        var homeTeamImg = gameListItem.find('img.home-team-img');
        var homeCity = gameListItem.find('span.home-city');
        var homeAwayIcon = gameListItem.find('span.home-away-icon');
        var homeAwayIconClass = (homeGame(obj))?'glyphicon glyphicon-home home-icon-color':'glyphicon glyphicon-plane text-muted';
        //stupid png problem
        var awayBuff = (obj.awayteam == 'CU Buffs') ? '.png' : '.svg';
        var homeBuff = (obj.hometeam == 'CU Buffs') ? '.png' : '.svg';

        removeClone.removeClass('clone');
        theSport.text(obj.sport);
        awayTeam.text(obj.awayteam);
        venue.text(obj.venue);
        homeCity.text(' (' + obj.city + ', ' + obj.state + ') ');
        time.text(obj.time + ' |');
        tvChannel.text(obj.tv);
        directions.attr({
            'href': 'http://www.google.com/maps/dir/Current+Location/' + encodeURIComponent(obj.venue + '+' + obj.city + '+' + obj.state),
            'target': '_blank'});
        homeTeam.text(obj.hometeam);
        awayTeamImg.attr({
            'src': 'img/' + obj.awayteam.replace(/ /g, '_') + awayBuff
        });
        homeTeamImg.attr({
            'src': 'img/' + obj.hometeam.replace(/ /g, '_') + homeBuff
        });
        homeAwayIcon.addClass(homeAwayIconClass);

        return gameListItem;

    }

    //will sort an array of games based on their popularity. (popularity is debatable).
    function sortGames(ary) {
        ary.forEach(function (el) {
            switch (el.sport) {
                case 'NFL':
                    el.rank = 1;
                    break;
                case 'NHL':
                    el.rank = 4;
                    break;
                case 'NBA':
                    el.rank = 2;
                    break;
                case 'NCAA Hockey':
                    el.rank = 8;
                    break;
                case 'MLS':
                    el.rank = 7;
                    break;
                case 'NCAA Football':
                    el.rank = 5;
                    break;
                case 'NCAA Hoops':
                    el.rank = 6;
                    break;
                case 'MLB':
                    el.rank = 3;
                    break;
                default:
                    return;
            }
        });
        ary.sort(function (a, b) {
            return a.rank - b.rank;
        });

        return ary;
    }

    function combineHomeAway(obj) {
        var ary = [];
        var merged = [];

        for (key in obj) {
            ary.push(obj[key]);
        }
        merged = merged.concat.apply(merged, ary);

        return merged;
    }

    function noGameMsg(homeOrAway) {
        var homeAwayTxt = (homeOrAway == 'homeAway') ? '' : homeOrAway;
        var homeAwayLinkTxt;
        var homeAwayLinkClass;
        var warningRow = document.createElement('div');
        var warningCol = document.createElement('div');
        var panelWrap = document.createElement('div');
        var panelTitle = document.createElement('div');
        var panelTitleH = document.createElement('h3');
        var panelBody = document.createElement('div');
        var lookMore = document.createElement('a');

        switch (homeAwayTxt) {
            case 'home':
                homeAwayLinkTxt = 'Try the away games';
                homeAwayLinkClass = 'away-btn';
                break;
            case 'away':
                homeAwayLinkTxt = 'Try the home games';
                homeAwayLinkClass = 'home-btn';
                break;
            case '':
                homeAwayLinkTxt = '';
                homeAwayLinkClass = '';
                break;
            default:
                homeAwayLinkTxt = '';
        }

        $(warningRow).addClass('row');
        $(warningRow).css({
            'margin-top': '30px',
            'display': 'none'
        })
        $(warningCol).addClass('col-sm-6 col-sm-offset-3');
        $(panelWrap).addClass('panel panel-danger');
        $(panelTitle).addClass('panel-heading');
        $(panelTitleH).addClass('panel-title');
        $(panelTitleH).text('Uh Oh...');
        $(panelBody).addClass('panel-body');
        $(panelBody).text('Looks like there are no ' + homeAwayTxt + ' games on ' + currentDateChoice + ' ');
        $(lookMore).text(homeAwayLinkTxt);
        $(lookMore).addClass(homeAwayLinkClass);
        lookMore.href = '#';

        gameBody.append(warningRow);
        $(warningRow).append(warningCol);
        $(warningCol).append(panelWrap);
        $(panelWrap).append(panelTitle);
        $(panelWrap).append(panelBody);
        $(panelTitle).append(panelTitleH);
        $(panelBody).append(lookMore);
        $(warningRow).fadeIn();
    }

    function removeActive() {
        $('.home-btn').removeClass('active');
        $('.away-btn').removeClass('active');
        $('.all-btn').removeClass('active');
    }

    function collapseMobileMenu() {
        if ($('.collapse').hasClass('in')) {
            $('.collapse').collapse('hide');
        }
    }

    //after writebody, add weather with new AJAX call.
    function addWeather(date, htmlGameRow, gameObject) {

        var cityData = gameObject.city;
        var stateData = gameObject.state;
        var wthrImgURL = 'http://openweathermap.org/img/w/';
        var wthrDescription = '';
        var cityTemp = '';
        var wthrImgTag = htmlGameRow.find('img.wthr-img');
        var wthrImgParent = htmlGameRow.find('div.wthr-row');
        var cityTempTag = htmlGameRow.find('span.city-temp');

        if (moment(date).zone('-07:00').isBefore(moment().add(3, 'days')) && moment(date + ' ' + gameObject.time).zone('-07:00').isAfter()) {

            var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityData + ',' + stateData;
            var forecast = [];

            $.getJSON(forecastURL, function(data) {
                forecast = data.list;
            })
                .done(function(){
                   var bestWthr = returnClosestTime(forecast, gameObject.time, date);
                   wthrDescription = bestWthr.weather[0].description;
                   wthrImgURL += bestWthr.weather[0].icon + '.png';
                   cityTemp = fahrenheit(bestWthr.main.temp);

                    wthrImgTag.attr({
                        'src': wthrImgURL,
                        'alt': cityData + ' ' + moment(bestWthr.dt, 'X').format('MM/DD/YYYY h:mm A'),
                        'title': wthrDescription
                    });

                    cityTempTag.html(cityTemp + ' &#176;' + 'F');

                    wthrImgParent.fadeIn('slow');

                    wthrImgParent.tooltip({
                        'placement': 'top',
                        'selector': '[rel="popover"]'
                    });
                });
        } else {
            return 0;
        }
    }

    function returnClosestTime (aryOfObjs, time, date) {

        aryOfObjs.forEach(function(el){
            var gameDate = moment(date + ' ' + time).zone('-07:00');
            var wthrDate = moment(el.dt, 'X');
            el.timeDiff = Math.abs(gameDate.diff(wthrDate));
        });

        aryOfObjs.sort(function (a, b) {
            return a.timeDiff - b.timeDiff;
        });

        return aryOfObjs[0];
    }

    //kelvin to Fahrenheit
    function fahrenheit(kelvin) {
        return (((kelvin - 273.15)*1.8) + 32).toFixed(1);
    }

    function findEndDates(aryOfObjs){
        var endDates = {};
        aryOfObjs.forEach(function(el){
            el.endDateScore = moment(el.date).format('X');
        });

        aryOfObjs.sort(function (a, b) {
            return a.endDateScore - b.endDateScore;
        });

        endDates.oldest = aryOfObjs[0];
        endDates.newest = aryOfObjs[aryOfObjs.length - 1];

        return endDates;
    }
});
