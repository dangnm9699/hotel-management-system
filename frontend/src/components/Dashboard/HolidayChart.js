import React from "react";
import ReactApexChart from 'react-apexcharts';

export default class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
                {
                    data: [
                        {
                            x: '30/04 - 01/05',
                            y: [
                                new Date('2021-04-29').getTime(),
                                new Date('2021-05-03').getTime()
                            ],
                            fillColor: '#008FFB'
                        },
                        {
                            x: 'Giỗ tổ Hùng Vương',
                            y: [
                                new Date('2021-04-10').getTime(),
                                new Date('2021-04-12').getTime()
                            ],
                            fillColor: '#00E396'
                        },
                        {
                            x: 'Quốc tế phụ nữ',
                            y: [
                                new Date('2021-03-08').getTime(),
                                new Date('2021-03-09').getTime()
                            ],
                            fillColor: '#775DD0'
                        },
                        {
                            x: 'Quốc tế thiếu nhi',
                            y: [
                                new Date('2021-06-01').getTime(),
                                new Date('2021-06-02').getTime()
                            ],
                            fillColor: '#FEB019'
                        },
                        {
                            x: 'Kỳ nghỉ hè',
                            y: [
                                new Date('2021-05-26').getTime(),
                                new Date('2021-08-31').getTime()
                            ],
                            fillColor: '#FF4560'
                        }
                    ]
                }
            ],
            options: {
                chart: {
                    id: 'holiday-chart',
                    height: 350,
                    type: 'rangeBar'
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true,
                        dataLabels: {
                            hideOverflowingLabels: false
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        let label = opts.w.globals.labels[opts.dataPointIndex]
                        let a = new Date(val[0]).getTime();
                        let b = new Date(val[1]).getTime();
                        let diff = (b - a) / 1000 / 60 / 60 / 24;
                        return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
                    },
                    style: {
                        colors: ['#000']
                    }
                },
                xaxis: {
                    type: 'datetime',
                    min: new Date("2021-01-01").getTime(),
                    max: new Date("2021-12-31").getTime()
                },
                yaxis: {
                    show: false,
                },
                grid: {
                    row: {
                        colors: ['#f3f4f5', '#fff'],
                        opacity: 1
                    }
                }
            },


        };
    }

    render() {
        return (
            <div id="holiday-chart" className="box">
                <div className="row">
                    <button
                        type="button"
                        className="btn col-md text-left"
                    ><strong>Các ngày lễ trong năm</strong></button>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="rangeBar" height={350} />
                    </div>
                </div>
            </div>
        );
    }
}
