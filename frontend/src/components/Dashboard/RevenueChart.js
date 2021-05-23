import React from "react";
import ReactApexChart from 'react-apexcharts';
import api from '../../Api/api';

export default class RevenueChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                data: []
            }],
            options: {
                chart: {
                    id: 'revenue-chart',
                },
                stroke: {
                    curve: 'straight'
                },
                xaxis: {
                    type: 'datetime',
                },
                markers: {
                    size: 5,
                }
            },
        };
    }

    componentDidMount = async () => {
        try {
            let res = await api.getRevenue();
            if (res.status === 200) {
                let data = res.data;
                data.forEach(e => {
                    e.checkoutTime = this.getDate(e.checkoutTime);
                });
                let count = data.reduce(
                    (counter, obj) => {
                        counter[obj.checkoutTime] = (counter[obj.checkoutTime] || 0) + obj.cost;
                        return counter;
                    },
                    {}
                );
                let series = [{
                    name: 'Doanh thu',
                    data: [],
                }]
                for (const [key, value] of Object.entries(count)) {
                    series[0].data.push({
                        x: new Date(key).getTime(),
                        y: value
                    })
                }
                this.setState({ series });
            } else {
                alert(res.status);
            }
        } catch (err) {
            console.log(err);
        }
    }

    getDate = (datetime) => {
        return datetime.split("T")[0];
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
                        <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={400} />
                    </div>
                </div>
            </div>
        );
    }
}