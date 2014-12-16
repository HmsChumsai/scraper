(function() {
  var block = new MatchesBlock('page_competition_1_block_competition_matches_summary_6', 'block_competition_matches_summary', {
    "page": 0,
    "bookmaker_urls": {
      "13": [{
        "link": "http:\/\/www.bet365.com\/home\/?affiliate=365_308139",
        "name": "Bet 365"
      }]
    },
    "block_service_id": "competition_summary_block_competitionmatchessummary",
    "round_id": 25191,
    "outgroup": false,
    "view": 2
  });
  block.registerForCallbacks();
  block.addCallbackObserver('page_competition_1_block_competition_matches_summary_6_1_1', 'changeView', {
    "view": 2
  });
  block.addCallbackObserver('page_competition_1_block_competition_matches_summary_6_1_2', 'changeView', {
    "view": 1
  });



  block.setAttribute('colspan_left', 3);
  block.setAttribute('colspan_right', 3);

  block.setAttribute('has_previous_page', true);
  block.setAttribute('has_next_page', true);


  TimestampFormatter.format('page_competition_1_block_competition_matches_summary_6');
})();
