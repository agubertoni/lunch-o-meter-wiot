// * * * * *  command to execute
// ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │
// │ │ │ │ │
// │ │ │ │ └───────────────── min  (0-59)
// │ │ │ └─────────────────── hour (0-23)
// │ │ └───────────────────── day of month  (1-31)
// │ └─────────────────────── month of year (1-12)
// └───────────────────────── day of week   (0-7 is Sun, or use names)

var Archive = function() {
  console.log("cron tasks!");
}

var Cron = new Meteor.Cron({
  events: {
    "0 0 * * *" : Archive
  }
});

