Meteor.subscribe("xbees", function() {
    XBees.find({}).observe({
        changed: function(id, fields) {
            Meteor.call("UpdateSeriesData");
        },

        removed: function(id) {
            Meteor.call("UpdateSeriesData");
        },

        added: function(id) {
            Meteor.call("UpdateSeriesData");
        }
    });
});
