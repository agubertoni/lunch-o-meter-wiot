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
  var options = Options.find({});

  options.forEach(function(option) {
    var dataPoint = [option.name, option.votes];
    seriesData.push(dataPoint);
  });

  chartOptions = {
      chart: {
          zoomType: 'xy',
          renderTo: "highchart"
      },
      title: {
          text: 'Average Monthly Weather Data for Tokyo'
      },
      subtitle: {
          text: 'Source: WorldClimate.com'
      },
      xAxis: [{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
      }],
      yAxis: [{ // Primary yAxis
          labels: {
              format: '{value}°C',
              style: {
                  color: Highcharts.getOptions().colors[2]
              }
          },
          title: {
              text: 'Temperature',
              style: {
                  color: Highcharts.getOptions().colors[2]
              }
          },
          opposite: true

      }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Rainfall',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          },
          labels: {
              format: '{value} mm',
              style: {
                  color: Highcharts.getOptions().colors[0]
              }
          }

      }, { // Tertiary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Sea-Level Pressure',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          labels: {
              format: '{value} mb',
              style: {
                  color: Highcharts.getOptions().colors[1]
              }
          },
          opposite: true
      }],
      tooltip: {
          shared: true
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 55,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: seriesData,
          tooltip: {
              valueSuffix: ' mm'
          }

      }, {
          name: 'Sea-Level Pressure',
          type: 'spline',
          yAxis: 2,
          data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
          marker: {
              enabled: false
          },
          dashStyle: 'shortdot',
          tooltip: {
              valueSuffix: ' mb'
          }

      }, {
          name: 'Temperature',
          type: 'spline',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          tooltip: {
              valueSuffix: ' °C'
          }
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
