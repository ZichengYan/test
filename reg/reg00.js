var temp = null;
var str = `express = {
                on : {
                    init : function(event){
                        var target = event.target;
                        var global = event.global;
                        var option = {
                            title: {
                                text: 'ECharts 入门示例'
                            },
                            tooltip: {},
                            legend: {
                                data:['销量']
                            },
                            xAxis: {
                                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                            },
                            yAxis: {},
                            series: [{
                                name: '销量',
                                type: 'bar',
                                data: [5, 20, 36, 10, 10, 20]
                            }]
                        };
                        event.target.render(option);
                    }
                }
            }`

temp = str.replace(/\s/g, '');
console.log(temp);
var reg = /(?=option=)/;
console.log(reg.exec(temp));