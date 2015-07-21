$(document).ready(function(){

  var HighCharts = function(cities){
    this.cities = cities;
    this.allData = [];
  };

  HighCharts.prototype.graphAllCities = function(){
    var city;

    for (var i = 0; i < this.cities.length; i++) {
      city = this.cities[i];
      this.graphOneCity(city.url, city.name);
    };

  };

  HighCharts.prototype.graphOneCity = function(url, name){

    var callbackFunction = function(response){
      var listItem;
      var data = []

      for (var i = 0; i < response.list.length; i++){
        listItem = response.list[i];
        data.push({ x: listItem.dt * 1000, y: listItem.main.temp});
      }

      this.allData.push({ name: name, data: data })

      this.graphChart();
    };

    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      success: callbackFunction,
      error: function(){
        alert("cannot connect");
      }
    });
  }

  HighCharts.prototype.graphChart = function(){
    $('#chart').highcharts({
      title: {
        text: 'Historical Temperatures'
      },
      subtitle: {
        text: 'openweathermap.org'
      },
      xAxis: {
        // Configuration of xAxis
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%H:%M:%S.%L',
          second: '%H:%M:%S',
          minute: '%H:%M',
          hour: '%H:%M',
          day: '%e. %b',
          week: '%e. %b',
          month: '%b \'%y',
          year: '%Y'
        }
      },
      yAxis: {
        // Configuration of yAxis
        min: 250,
        max: 350,
        title: {
            text: 'Temperature (°K)'
        }
      },
      legend: {
        // Configuration of Legends
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: this.allData
    });
  }

  var chart = new HighCharts([
    {
      name: 'Boston',
      url: 'http://api.openweathermap.org/data/2.5/history/city?q=boston&type=day'
    },{
      name: 'NYC',
      url: 'http://api.openweathermap.org/data/2.5/history/city?q=nyc&type=day'
    },{
      name: 'Hong Kong',
      url: 'http://api.openweathermap.org/data/2.5/history/city?q=hongkong&type=day'
    }
  ]);

  chart.graphAllCities();
});