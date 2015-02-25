var RESPONSIVE_BREAKPOINT = 800;

var collections = {
  Products: Products,
  Jobs: Jobs,
  Interns: Interns
};

Meteor.startup(function() {
  Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    
    // TODO: refactor to not be tracker-ish
    Tracker.autorun(function() {
      var small = Measurement.getWindowSize().width <= RESPONSIVE_BREAKPOINT;
      
      React.render(<Handler params={state.params} 
        collections={collections} small={small}/>, document.body);
    });

    // we need to re-run each time we route as we may have rendered stuff
    // TODO: does this work? How to test?
    Picturefill();
  });
});
