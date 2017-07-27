
<div class="ss_stream_msg ss_container" data-bind="visible:is_fb_analytics">
    <div class="ss_chart">
        <div class="chartbox">
            <h3 class="chart-title">Facebook Activity</h3>
            <div id="fb-daily-chart" class="linechart" style="min-width: 310px; height: 240px;"></div>
        </div>
        <div class="chartbox">
            <h3 class="chart-title">Comments</h3>
            <h4 class="numbers" data-bind="text:comments"></h4>
        </div>
        <div class="chartbox">
            <h3 class="chart-title">Posts</h3>
            <h4 class="numbers" data-bind="text:posts"></h4>
        </div>
        <div class="chartbox">
            <h3 class="chart-title">Likes</h3>
            <h4 class="numbers" data-bind="text:likes"></h4>
        </div>
        <div class="chartbox">
            <h3 class="chart-title">Shares</h3>
            <h4 class="numbers" data-bind="text:shares"></h4>
        </div>
        <div class="chartbox">
            <h3 class="chart-title">Content Interactions</h3>
            <div id="interaction-chart" class="piechart" style="min-width: 150px; height: 240px; max-width: 600px;"></div>
        </div>
    </div><!--hs_message-->
</div><!--ss_login-->
<script type="text/javascript">
    $(function () {
        $('#line-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Brand1',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'Brand2',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }, {
                name: 'Brand3',
                data: [ 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8, 3.9, 4.2, 5.7, 8.5, 11.9]
            }]
        });
    });
    // TWEETS 2
    $(function () {
        $('#tweets-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Brand1",
                    y: 56.33
                }, {
                    name: "Brand2",
                    y: 24.030000000000005,
                    sliced: true,
                    selected: true
                }, {
                    name: "Brand3",
                    y: 10.38
                }]
            }]
        });
    });
    // Interactions CHART
    $(function () {
        $('#interactions-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Brand1",
                    y: 31
                }, {
                    name: "Brand2",
                    y: 44,
                    sliced: true,
                    selected: true
                }, {
                    name: "Brand3",
                    y: 21
                }]
            }]
        });
    });
    // potential
    $(function () {
        $('#potential-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Brand1",
                    y: 56.33
                }, {
                    name: "Brand2",
                    y: 24.030000000000005,
                    sliced: true,
                    selected: true
                }, {
                    name: "Brand3",
                    y: 10.38
                }]
            }]
        });
    });
    // VIRAL CHART
    $(function () {
        $('#viral-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Brand1",
                    y: 31
                }, {
                    name: "Brand2",
                    y: 44,
                    sliced: true,
                    selected: true
                }, {
                    name: "Brand3",
                    y: 21
                }]
            }]
        });
    });
                    
    // SENTIMENT CHART
    $(function () {
        $('#sentiment-chart').highcharts({
            colors: ['#999999', '#64bf0a', '#e12626'],
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Brand1', 'Brand2', 'Brand3']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: 'Positive',
                data: [5, 3, 4]
            }, {
                name: 'Negative',
                data: [2, 2, 3]
            }, {
                name: 'Neutral',
                data: [3, 4, 4]
            }]
        });
    });
    // engagements rate CHART
    $(function () {
        // Create the chart
        $('#engagementsrate-chart').highcharts({        
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            chart: {
                type: 'column'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
    
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    }
                }
            },
    
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
    
            series: [{
                name: "Brands",
                colorByPoint: true,
                data: [{
                    name: "Brand1",
                    y: 56.33,
                    drilldown: "Brand1"
                }, {
                    name: "Brand2",
                    y: 24.030000000000005,
                    drilldown: "Brand2"
                }, {
                    name: "Brand3",
                    y: 10.38,
                    drilldown: "Brand3"
                }]
            }],
            drilldown: {
                series: [{
                    name: "Brand1",
                    id: "Brand1",
                    data: [["v11.0", 24.13],["v8.0",17.2],["v9.0",8.11],["v10.0",5.33],["v6.0",1.06],["v7.0",0.5]] }, {
                    name: "Brand2",
                    id: "Brand2",
                    data: [["v40.0",5],["v41.0",4.32],["v42.0",3.68],["v39.0",2.96],["v36.0",2.53],["v43.0",1.45],["v31.0",1.24],["v35.0",0.85],["v38.0",0.6],["v32.0",0.55],["v37.0",0.38],["v30.0",0.14]] }, {
                    name: "Brand3",
                    id: "Brand3",
                    data: [["v35",2.76],["v36",2.32],["v37",2.31],["v34",1.27],["v38",1.02],["v31",0.33],["v33",0.22],["v32",0.15]]
                }]
            }
        });
    });
</script>