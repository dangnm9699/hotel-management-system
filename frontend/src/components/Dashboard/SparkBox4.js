import React from "react";
import ReactApexChart from "react-apexcharts";

export default class SparkBox4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61]
            }],
            options: {
                chart: {
                    id: 'spark4',
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
                markers: {
                    size: 0
                },
                grid: {
                    padding: {
                        top: 20,
                        bottom: 10,
                        left: 110
                    }
                },
                colors: ['#fff'],
                xaxis: {
                    crosshairs: {
                        width: 1
                    },
                },
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
            <div id="spark4">
                <ReactApexChart options={this.state.options} series={this.state.series} />
            </div>
        );
    }
}