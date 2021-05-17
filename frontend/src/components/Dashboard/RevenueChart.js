import React from "react";
import ReactApexChart from 'react-apexcharts';

export default class RevenueChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //colors: ["#3F51B5", '#2196F3'],
            series: [{
                name: "Room",
                data: [1, 15, 26, 20, 33, 27]
            },
            {
                name: "Food",
                data: [3, 33, 21, 42, 19, 32]
            },
            {
                name: "Others",
                data: [0, 39, 52, 11, 29, 43]
            }],
            options: {
                chart: {
                    zoom: {
                        enabled: false
                    },
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 2,
                        blur: 4,
                        opacity: 1,
                    }
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                markers: {
                    size: 6,
                    strokeWidth: 0,
                    hover: {
                        size: 9
                    }
                },
                grid: {
                    show: true,
                    padding: {
                        bottom: 0
                    }
                },
                labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
                xaxis: {
                    tooltip: {
                        enabled: false
                    }
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'center',
                    offsetY: 10
                }
            }
        }
    }

    render() {
        return (
            <div id="revenue-chart" className="box">
                <div className="row">
                    <button
                        type="button"
                        className="btn col-md text-left"
                    ><strong>Doanh thu ngày</strong></button>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}