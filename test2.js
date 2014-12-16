var param = require('node-jquery-param');

var x = {
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
var u = param(x);
console.log(u);