Meteor.publish("xbees", function () {
    return XBees.find({});
});
