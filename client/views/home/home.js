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
    var seriesDataTemp = [];
    var seriesDataBrix = [];
    var seriesDataAlco = [];
    var frames = Frames.find({"doc_type": "high_doc"}, {sort: {hour: -1}});

    frames.forEach(function(frame) {
        var dataPointTemp = [frame.timestamp, frame.temp];
        seriesDataTemp.push(dataPointTemp);

        var dataPointBrix = [frame.timestamp, frame.brix];
        seriesDataBrix.push(dataPointBrix);

        var dataPointAlco = [frame.timestamp, frame.alco];
        seriesDataAlco.push(dataPointAlco);
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
              
          },
          labels: {
              format: '{value}°C',
              
          },
          opposite: true
      }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
              text: 'Brix',
              
          },
          labels: {
              format: '{value} °B',
              
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
          pointFormat: '{point.x:%e. %b}: {point.y:.2f}'
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
          data: seriesDataTemp
      }, {
          name: 'Brix',
          yAxis: 2,
          data: seriesDataBrix
      }, {
          name: 'Alcohol',
          data: seriesDataAlco
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
