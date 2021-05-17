import React from "react";
import ReactApexChart from "react-apexcharts";

export default class SparkBox3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19]
            }],
            options: {
                chart: {
                    id: 'spark3',
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
            <div id="spark3">
                <ReactApexChart options={this.state.options} series={this.state.series} />
            </div>
        );
    }
}