/*
Request URL:http://us.soccerway.com/a/block_competition_matches_summary?block_id=page_competition_1_block_competition_matches_summary_6&callback_params=%7B%22page%22%3A%2215%22%2C%22bookmaker_urls%22%3A%5B%5D%2C%22block_service_id%22%3A%22competition_summary_block_competitionmatchessummary%22%2C%22round_id%22%3A%2225191%22%2C%22outgroup%22%3A%22%22%2C%22view%22%3A%221%22%7D&action=changePage&params=%7B%22page%22%3A16%7D

*/
var obj = {
        block_id: 'page_competition_1_block_competition_matches_summary_6',
        callback_params: {
            "page": 0,
            "bookmaker_urls": {
                "13": [{
                    "link": "http:\/\/www.bet365.com\/home\/?affiliate=365_308136",
                    "name": "Bet 365"
                }]
            },
            "block_service_id": "competition_summary_block_competitionmatchessummary",
            "round_id": 25191,
            "outgroup": false,
            "view": 2
        },
    action: 'changePage',
    params: {
        "page": 16
    }
};


var str = Object.keys(obj).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
}).join('&');

console.log(str);