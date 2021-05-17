import React from "react";
import ReactApexChart from "react-apexcharts";

export default class SparkBox1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
            }],
            options: {
                chart: {
                    id: 'spark1',
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
            <div id="spark1">
                <ReactApexChart options={this.state.options} series={this.state.series} />
            </div>
        );
    }
}