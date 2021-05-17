import React from "react";
import ReactApexChart from "react-apexcharts";

export default class SparkBox2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69]
            }],
            options: {
                chart: {
                    id: 'spark2',
                    group: 'sparks',
                    type: 'line',
                    height: 80,
                    sparkline: {
                        enabled: true
                    },
                    dropShadow: {
                        enabled: true,
                        top: 1,
                        left: 1,
                        blur: 2,
                        opacity: 0.2,
                    }
                },
                stroke: {
                    curve: 'smooth'
                },
                grid: {
                    padding: {
                        top: 20,
                        bottom: 10,
                        left: 110
                    }
                },
                markers: {
                    size: 0
                },
                colors: ['#fff'],
                tooltip: {
                    x: {
                        show: false
                    },
                    y: {
                        title: {
                            formatter: function formatter(val) {
                                return '';
                            }
                        }
                    }
                }
            }
        };
    }

    render() {
        return (
            <div id="spark2">
                <ReactApexChart options={this.state.options} series={this.state.series} />
            </div>
        );
    }
}