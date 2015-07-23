$(document).ready(function(){
  var Chart = function(title, cities){
    this.seriesData = [];
    this.title = title;
    this.cities = cities;
  };

  // Defining an instance method
  Chart.prototype.getDataFromOneCity = function(url, name){
    $.ajax({
      context: this,
      type: 'GET',
      url: url,
      success: function(response){
        var items = response.list;
        var data = [];

        for (var i = 0; i < items.length; i++){
          data.push({ x: items[i].dt * 1000, y: items[i].main.temp });
        }

        this.seriesData.push({ name: name, data: data });
        this.generateChart();
      }
    })
  };

  Chart.prototype.generateChart = function(){
    var config = {
      title: {
        text: this.title,
      },
      xAxis: {
        type: 'datetime',
        title: {
          text: 'Time'
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
        borderWidth: 1
      },
      series: this.seriesData
    };

    $('#chart').highcharts(config)
  };

  Chart.prototype.graphAllCities = function(){
    this.cities.forEach(function (city) {
      this.getDataFromOneCity(city.url, city.name);
    }, this);
  }

  // Instantiation
  var cities = [
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
  ];

  //Instantiation
  var chart = new Chart('Historical Temperatures', cities);
  chart.graphAllCities();

});
