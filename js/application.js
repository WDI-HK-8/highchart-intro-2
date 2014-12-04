$(document).ready(function(){

  // data is an array
  var doneCities = 0;
  var numCities = 2;
  var dataHK = [];
  var dataNYC = [];
  var urlHK = 'http://api.openweathermap.org/data/2.5/history/city?q=HongKong&type=hour';
  // var urlNYC = 'http://api.openweathermap.org/data/2.5/history/city?q=nyc&type=hour';
  var urlNYC = 'http://asdf';

  function getTemp(data, url){
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'JSON',
      success: function(response){
        // this is how I can get 1 temperature
        // console.log(response.list[0].main.temp);

        // this is how I loop it to get all temperatures
        $(response.list).each(function(){
          // collect each data point 
          var dataPoint = {};
          dataPoint.y = this.main.temp;
          dataPoint.x = this.dt * 1000;

          // add each data point to the data array
          data.push(dataPoint);
        })

        // print out data
        console.log(data);

        doneCities++;

        if (doneCities == numCities){
          initializeHighChart(); 
        }
      },
      error: function(){
        alert("cannot connect");
      }
    });
  }

  getTemp(dataHK, urlHK);
  getTemp(dataNYC, urlNYC);

  function initializeHighChart(){
    $('#chart').highcharts({
      // key: value
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
        max: 300,
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
      series: [{
        // Data points
        name: 'Hong Kong',
        data: dataHK
      },
      {
        // Data points
        name: 'NYC',
        data: dataNYC
      }]
    });
  }

});