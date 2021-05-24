import React from "react";
import ReactApexChart from 'react-apexcharts';
import api from '../../Api/api';
export default class GuestCountByCountryChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: new Date().getFullYear(),
            series: [],
            options: {
                chart: {
                    id: 'guest-count-by-country-chart',
                    type: 'bar',
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true
                    },
                    zoom: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                fill: {
                    opacity: 1
                }
                ,
                colors: ['#00D8B6', '#008FFB', '#FEB019', '#FF4560', '#775DD0'],
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    tickPlacement: 'on'
                },
            }
        };
    }

    getDate = (time) => {
        return time.split("T")[0];
    }

    componentDidMount = async () => {
        try {
            let series = await this.retrieveData(this.state.buttonText);
            this.setState({ series });
        } catch (err) {
            console.log(err);
            return;
        }
    }

    retrieveData = async (time) => {
        try {
            let res = await api.getGuestCountByRegion(time);
            console.log.apply(this.state.buttonText);
            if (res.status === 200) {
                let data = res.data;
                data.forEach(e => {
                    e.checkinTime = this.getDate(e.checkinTime);
                });
                let count = data.reduce(
                    (counter, obj) => {
                        let monthIndex = this.getMonthIndex(obj.checkinTime.split("-")[1]);
                        if (obj.country === 'Việt Nam') counter['domestic'][monthIndex]++;
                        else counter['international'][monthIndex]++;
                        return counter;
                    },
                    {
                        'domestic': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        'international': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                );
                let series = [
                    {
                        name: "Nội địa",
                        data: count.domestic,
                    }, {
                        name: "Quốc tế",
                        data: count.international,
                    }
                ]
                return series;
            } else {
                alert(res.status);
                return;
            }
        } catch (err) {
            console.log(err);
        }
    }

    onClick = async (date) => {
        let buttonText = date;
        try {
            let series = await this.retrieveData(buttonText);
            this.setState({ series, buttonText });
        } catch (err) {
            console.log(err);
            return;
        }
    }

    getYear = (datetime) => {
        return datetime.split(" ")[3];
    }

    getMonthIndex = (month) => {
        if (month.charAt(0) === '0') month = month.charAt(1);
        let index = parseInt(month) - 1;
        return index;
    }

    render() {
        let menu = [];
        for (let i = 0; i < 5; i++) {
            let text = new Date().getFullYear() - i;
            menu.push(
                <div
                    className="dropdown-item"
                    onClick={() => this.onClick(text)}
                    key={text}
                >{text}</div>
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
                        style={
                            {
                                textAlign: 'right'
                            }
                        }
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