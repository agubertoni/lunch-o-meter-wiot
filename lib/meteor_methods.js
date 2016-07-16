Meteor.methods({
  PieChart: function() {
  if(typeof(Highcharts) != "undefined")
    return Highcharts.charts[0];
  },

  UpdateSeriesData: function() {
    var seriesData = [];
    var frames = Frames.find({"doc_type": "high_doc"}, {sort: {hour: -1}});

    frames.forEach(function(frame) {
      var dataPoint = [frame.timestamp, frame.flow];
      seriesData.push(dataPoint);
    });

    if(typeof(Highcharts) != "undefined")
      Meteor.call("PieChart").series[0].setData(seriesData, true);
  }
});
