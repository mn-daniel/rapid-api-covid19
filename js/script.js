$(document).ready(function() {
  $.ajax({
    url: "https://covid-193.p.rapidapi.com/statistics",
    type: "GET",
  	"headers": {
  		"x-rapidapi-host": "covid-193.p.rapidapi.com",
  		"x-rapidapi-key": "***"
  	},
    error: function(err){
      $('.body').append("ERROR: ", err);
    },
    success: function(data){
      $('.ld').empty();
      $('h3').show();
      $('.t1').text('Showing 100 out of ' + data.response.length + ' entries. Type a "Country" value to filter the results.');
      
      for(i=0; i<100; i++) {
        row = data.response[i];
        $('tbody').append(
          '<tr>' +
            '<td>' + row.continent + '</td>' +
            '<td>' + row.country + '</td>' +
            '<td>' + row.population + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases.new) + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases.active) + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases.critical) + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases.recovered) + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases["1M_pop"]) + '</td>' +
            '<td class="of">' + JSON.stringify(row.cases.total) + '</td>' +
          
            '<td class="of">' + JSON.stringify(row.deaths.new) + '</td>' +
            '<td class="of">' + JSON.stringify(row.deaths["1M_pop"]) + '</td>' +
            '<td class="of">' + JSON.stringify(row.deaths.total) + '</td>' +
          
            '<td class="of">' + JSON.stringify(row.tests["1M_pop"]) + '</td>' +
            '<td class="of">' + JSON.stringify(row.tests.total) + '</td>' +
          '</tr>'
        )
      }     
    }
  });

   $.ajax({
    url: "https://covid-193.p.rapidapi.com/history?country=china",
    type: "GET",
  	"headers": {
  		"x-rapidapi-host": "covid-193.p.rapidapi.com",
  		"x-rapidapi-key": "***"
  	},
    error: function(err){
      $('.body').append("ERROR: ", err);
    },
    success: function(data){      
      hours = []
      activeCases = []
      totalDeaths = []
      test1MPop = []
      for(var i=0; i<20; i++) {
        hours.push(
          new Date(data.response[i]['time']).getHours() 
          + 
          new Date(data.response[i]['time']).getMinutes()/60
        );
        
        if(data.response[i]['cases']['active'] == null) {
          activeCases.push[0];
        } else {
          activeCases.push(data.response[i]['cases']['active']);  
        }
        
        if(data.response[i]['deaths']['total'] == null) {
          totalDeaths.push[0];
        } else {
          totalDeaths.push(data.response[i]['deaths']['total']);  
        }
        
        if(data.response[i]['tests']['1M_pop'] == null) {
          test1MPop.push[0];
        } else {
          test1MPop.push(+(data.response[i]['tests']['1M_pop']));  
        }
      }

      var xValues = hours.sort(function(a,b) {
        return a - b;
      }); //[100.23,200,300,400,500,600,700,800.3,900,1000];
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{ 
            data: activeCases, 
            borderColor: "red",
            fill: false,
            label: 'Active Cases'
          }, { 
            data: totalDeaths, 
            borderColor: "green",
            fill: false,
            label: 'Total Deaths'
          }, { 
            data: test1MPop, 
            borderColor: "blue",
            fill: false,
            label: '1M_pop'
          }]
        },
        options: {
          legend: {display: true}
        }
      });
    }
   }); 
});
