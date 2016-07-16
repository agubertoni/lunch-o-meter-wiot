Template.home.events({
  "submit form#new-option": function(e) {
    e.preventDefault();
    var input = $("input#option-to-add");
    Options.insert({ name: input.val(), votes: 0 });
    input.val("");
  },

  "click .remove-option": function(e) {
    var id = $(e.target).closest("li").prop("id");
      Options.remove({_id: id});
  },

	"click a#logout" : function(e,t){
		e.preventDefault();
		Meteor.logout();
	}
});

Template.home.rendered = function() {
  var seriesData = [];
  var frames = Frames.find({"doc_type": "high_doc"}, {sort: {hour: -1}});

  frames.forEach(function(frame) {
      var dataPoint = [frame.timestamp, frame.flow];
    seriesData.push(dataPoint);
  });

  chartOptions = {

      chart: {
          type: 'spline',
          renderTo: 'highchart',
          zoomType: 'x'
      },
      title: {
          text: 'Multi-parameter dashboard'
      },
      subtitle: {
          text: 'www.awmingenieria.com'
      },
      xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
          },
          title: {
              text: 'Date'
          }
      },
      yAxis: [{ // Primary yAxis
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[2]
              }
          },
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[2]
              }
          },
          min: 0,
          opposite: true
      }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Brix',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value} °B',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          }

      }, { // Tertiary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Alcohol',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          labels: {
              format: '{value} %',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          opposite: true
      }],
      tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x:%e. %b}: {point.y:.2f} m',
          shared: true
      },

      plotOptions: {
          spline: {
              marker: {
                  enabled: true
              }
          }
      },

      series: [{
          name: 'Temperature',
          yAxis: 1,
          data: seriesData
      }, {
          name: 'Brix',
          yAxis: 2,
          data: [
              [Date.UTC(2016, 6, 15, 17, 1, 0), 0],
              [Date.UTC(2016, 6, 15, 17, 1, 5), 20],
              [Date.UTC(2016, 6, 15, 17, 1, 10), 21],
              [Date.UTC(2016, 6, 15, 17, 1, 15), 22],
              [Date.UTC(2016, 6, 15, 17, 1, 20), 23],
              [Date.UTC(2016, 6, 15, 17, 1, 25), 24],
              [Date.UTC(2016, 6, 15, 17, 1, 35), 25],
              [Date.UTC(2016, 6, 15, 17, 1, 40), 26],
              [Date.UTC(2016, 6, 15, 17, 1, 45), 27],
              [Date.UTC(2016, 6, 15, 17, 1, 55), 31],
              [Date.UTC(2016, 6, 15, 17, 2, 2), 35],
              [Date.UTC(2016, 6, 15, 17, 2, 10), 40],
              [Date.UTC(2016, 6, 15, 17, 2, 15), 42],
              [Date.UTC(2016, 6, 15, 17, 2, 18), 45],
              [Date.UTC(2016, 6, 15, 17, 2, 25), 50],
              [Date.UTC(2016, 6, 15, 17, 2, 32), 52],
              [Date.UTC(2016, 6, 15, 17, 2, 43), 55],
              [Date.UTC(2016, 6, 15, 17, 2, 50), 60]
          ]
      }, {
          name: 'Alcohol',
          data: [
              [Date.UTC(2016, 6, 15, 17, 1, 0), 0],
              [Date.UTC(2016, 6, 15, 17, 1, 5), 10],
              [Date.UTC(2016, 6, 15, 17, 1, 10), 11],
              [Date.UTC(2016, 6, 15, 17, 1, 15), 12],
              [Date.UTC(2016, 6, 15, 17, 1, 20), 13],
              [Date.UTC(2016, 6, 15, 17, 1, 25), 14],
              [Date.UTC(2016, 6, 15, 17, 1, 35), 15],
              [Date.UTC(2016, 6, 15, 17, 1, 40), 16],
              [Date.UTC(2016, 6, 15, 17, 1, 45), 27],
              [Date.UTC(2016, 6, 15, 17, 1, 55), 31],
              [Date.UTC(2016, 6, 15, 17, 2, 2), 45],
              [Date.UTC(2016, 6, 15, 17, 2, 10), 50],
              [Date.UTC(2016, 6, 15, 17, 2, 15), 22],
              [Date.UTC(2016, 6, 15, 17, 2, 18), 35],
              [Date.UTC(2016, 6, 15, 17, 2, 25), 30],
              [Date.UTC(2016, 6, 15, 17, 2, 32), 32],
              [Date.UTC(2016, 6, 15, 17, 2, 43), 25],
              [Date.UTC(2016, 6, 15, 17, 2, 50), 10]
          ]
      }]
  };

  var chart = new Highcharts.Chart(chartOptions);
};

Template.home.helpers({
  gravatar: function() {
      return Gravatar.imageUrl(Meteor.user().emails[0].address);
    },

  yesterday: function() {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toString().substring(0,15);
  },

  today: function() {
    return new Date().toString().substring(0,15);
  },

  tomorrow: function() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toString().substring(0,15);
  }
});
