


// BAR CHART
const barChartOptions = {
  series: [{
    data: [30, 120, 40, 47, 10, 52, 65, 11, 121, 34]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Wazuh', 'Guacview', 'Misp', 'The Hive', 'Grafana', 'Gophish', 'Zk Gophish',
    ],
  }
  };

const barChart = new ApexCharts(
  document.querySelector('#bar-chart'),
  barChartOptions
);
barChart.render();

//--------------------------------------------------------------------//

var options = {
    series: [100,100,0,100,100,100,0],
    chart: {
    height: 350,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '1%',
      }
    },
  },
  labels: ['Wazuh','Guacview','Misp','The Hive','Grafana','Gophish','Zk Gophish'],
  };
  

  var piechart = new ApexCharts(document.querySelector("#pie-chart"), options);
  piechart.render();

//--------------------------------------------------------------------//

const areaChartOptions = {
  series: [{
    name: 'Active',
    data: [1, 1, 0, 1, 1, 1, 0]
  }, {
    name: 'Passive',
    data: [0, 0, 1, 0, 0, 0, 1]
  }],
    chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Wazuh', 'Guacview', 'Misp', 'The Hive', 'Grafana', 'Gophish', 'Zk Gophish'],
  },
  yaxis: {
    title: {
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return " " + " Connect"
      }
    }
  }
  };

const areaChart = new ApexCharts(
  document.querySelector('#area-chart'),
  areaChartOptions
);
areaChart.render();



function ping(ip, callback) {

  if (!this.inUse) {
      this.status = 'unchecked';
      this.inUse = true;
      this.callback = callback;
      this.ip = ip;
      var _that = this;
      this.img = new Image();
      this.img.onload = function () {
          _that.inUse = false;
          _that.callback('responded');

      };
      this.img.onerror = function (e) {
          if (_that.inUse) {
              _that.inUse = false;
              _that.callback('responded', e);
          }

      };
      this.start = new Date().getTime();
      this.img.src = "http://" + ip;
      this.timer = setTimeout(function () {
          if (_that.inUse) {
              _that.inUse = false;
              _that.callback('timeout');
          }
      }, 1500);
  }
}
var PingModel = function (servers) {
  var self = this;
  var myServers = [];
  ko.utils.arrayForEach(servers, function (location) {
      myServers.push({
          name: location,
          status: ko.observable('unchecked')
      });
  });
  self.servers = ko.observableArray(myServers);
  ko.utils.arrayForEach(self.servers(), function (s) {
      s.status('checking');
      new ping(s.name, function (status, e) {
          s.status(status);
      });
  });
};
var komodel = new PingModel(['localhost',
  'ws-bdimperio8',
  'ws-bdimperio8.payformance.net',
  'ws-bdimperio8.payformance.com',
  'ws-bdimperio8.payspan.com',
  'ws-bdimperio8/favicon.ico',
  '127.0.0.1', 
  'unknown'
  ]);
ko.applyBindings(komodel);











