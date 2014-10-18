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
            })
            cleanRows.push(JsonObj);
        })

        listEm(cleanRows, today, 'homeAway');
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
        if ($(e.target).hasClass('home-btn')) {
            listEm(cleanRows, currentDateChoice, 'home');
        }
        if ($(e.target).hasClass('away-btn')) {
            listEm(cleanRows, currentDateChoice, 'away');
        }
        if ($(e.target).hasClass('all-btn')) {
            listEm(cleanRows, currentDateChoice, 'homeAway');
        }
    });

    function listEm (unSortedAry, date, homeOrAway) {
        var titleDate = moment(date).format('dddd, MMM Do');
        var gameList = sortGameDay(date, unSortedAry);
        var btnActivate = '.' + homeOrAway + '-btn';
        var homeBadge = gameList['home'].length;
        var awayBadge = gameList['away'].length;
        var allBadge = combineHomeAway(gameList).length;

        $('.home-badge').text(homeBadge);
        $('.away-badge').text(awayBadge);
        $('.all-badge').text(allBadge);

        currentDateChoice = date;
        $('.theJumboh').text(titleDate);
        gameBody.empty();

        if(homeOrAway === 'homeAway') {
            removeActive();
            $('.all-btn').addClass('active');

            if (combineHomeAway(gameList).length > 0) {
                sortGames(combineHomeAway(gameList)).forEach(function(el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                })
            } else {
                noGameMsg(homeOrAway);
            }
        } else {
            removeActive();
            $(btnActivate).addClass('active');

            if (gameList[homeOrAway].length > 0) {
                sortGames(gameList[homeOrAway]).forEach(function(el) {
                    var oneGame = writeBody(el);
                    gameBody.append(oneGame);
                })
            } else {
                noGameMsg(homeOrAway);
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
        });

        console.log(gameSchema.home);
        console.log(gameSchema.away);

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
        var awayTeam = gameListItem.find('h3.away-team');
        var venue = gameListItem.find('span.venue');
        var time = gameListItem.find('span.time');
        var tvChannel = gameListItem.find('span.tv-channel');
        var directions = gameListItem.find('a.directions');
        var homeTeam = gameListItem.find('h3.home-team');

        removeClone.removeClass('clone');
        awayTeam.text(obj.awayteam);
        venue.text(obj.venue + ' |');
        time.text(obj.time + ' |');
        tvChannel.text(obj.tv + ' |');
        directions.attr({
            'href': 'http://maps.google.com/?q=' + encodeURIComponent(obj.venue + ', ' + obj.city + ', ' + obj.state),
            'target': '_blank'});
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

    function noGameMsg (homeOrAway) {
        var homeAwayTxt = (homeOrAway == 'homeAway')? '':homeOrAway;
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

    function removeActive () {
        $('.home-btn').removeClass('active');
        $('.away-btn').removeClass('active');
        $('.all-btn').removeClass('active');
    }

    $('.calendar').datepicker({
        autoclose: true,
        todayHighlight: true
    })
        .on('changeDate', function(e) {
            if (!$('.collapse').hasClass('in') || !$('.collapse').hasClass('collapsing')){
                $('.collapse').collapse();
            }
            preferredDate = e.format([0], 'mm/dd/yyyy');
            listEm(cleanRows, preferredDate, 'homeAway')
        });
});
