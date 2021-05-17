import React from "react";
import ReactApexChart from 'react-apexcharts';

export default class GuestCountByCountryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            today: new Date(),
            buttonText: '',
            series: [{
                name: "Nội địa",
                data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51, 42, 56],
            }, {
                name: "Quốc tế",
                data: [6, 12, 4, 7, 5, 3, 6, 4, 3, 3, 5, 6, 7, 4],
            }],
            options: {
                chart: {
                    width: '100%',
                    stacked: true,
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                    }
                },
                colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
                labels: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                xaxis: {
                    labels: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    },
                    labels: {
                        style: {
                            colors: '#78909c'
                        }
                    }
                },
            }
        };
    }

    componentDidMount = () => {
        let today = this.state.today.toDateString();
        let buttonText = this.getMonthAndYear(today);
        this.setState({ buttonText });
    }

    onClick = (date) => {
        let buttonText = date;
        this.setState({ buttonText })
    }

    getMonthAndYear = (datetime) => {
        let splits = datetime.split(" ");
        let month = splits[1];
        let year = splits[3];
        let buttonText = month + ' ' + year;
        return buttonText;
    }

    render() {
        let menu = [];
        for (let i = 0; i < 5; i++) {
            let datetime = new Date(
                this.state.today.getFullYear(),
                this.state.today.getMonth() - Number(i),
            ).toDateString();
            let text = this.getMonthAndYear(datetime);
            menu.push(
                <div className="dropdown-item" onClick={() => this.onClick(text)}>{text}</div>
            );
        }
        return (
            <div id="guest-count-by-country-chart" className="box">
                <div className="dropdown row">
                    <button
                        type="button"
                        className="btn col-md-8 text-left"
                    ><strong>Số lượng khách hàng</strong></button>
                    <button
                        type="button"
                        className="btn dropdown-toggle col-md-4"
                        data-toggle="dropdown"
                    ><b>{this.state.buttonText}</b></button>
                    <div className="dropdown-menu dropdown-menu-right">
                        {menu}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}