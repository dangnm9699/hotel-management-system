import React from "react";
import ReactApexChart from 'react-apexcharts';
import api from "../../Api/api";

export default class RoomStatusCountChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'All',
            buttonText: 'Tất cả',
            series: [],
            options: {
                chart: {
                    id: 'room-count-by-status-chart',
                },
                legend: {
                    position: 'right',
                    offsetY: 90,
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                total: {
                                    label: 'Tổng',
                                    show: true,
                                    color: '#373d3f',
                                }
                            },
                        },
                    },
                },
                responsive: [{
                    breakpoint: '1920px',
                    options: {
                        chart: {
                            width: '400px',
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }],
                labels: ['Đang sử dụng', 'Đã đặt trước', 'Trống'],
                dataLabels: {
                    enabled: false,
                },
            },
        };
    }

    componentDidMount = async () => {
        try {
            let series = await this.retrieveData(this.state.option);
            if (series == null) return;
            this.setState({ series });
        } catch (err) {
            console.log(err);
            return;
        }
    }

    onClick = async (opt, btn) => {
        let option = opt;
        let buttonText = btn;
        try {
            let series = await this.retrieveData(opt);
            this.setState({ option, buttonText, series });
        } catch (err) {
            console.log(err);
            return;
        }
    }

    retrieveData = async (opt) => {
        try {
            let res = await api.getRoomCountByStatusWithType(opt);
            if (res.status === 200) {
                let series = [];
                let data = res.data[0]
                series.push(data.count_in_use);
                series.push(data.count_booked);
                series.push(data.count_empty);
                return series;
            } else {
                alert(res.status);
                return;
            }
        } catch (err) {
            console.log(err);
            return;
        }
    }

    render() {
        return (
            <div id="room-count-by-status-chart" className="box">
                <div className="dropdown row">
                    <button
                        type="button"
                        className="btn col-md-8 text-left"
                    ><strong>Số lượng phòng theo trạng thái</strong></button>
                    <button
                        type="button"
                        className="btn dropdown-toggle col-md-4"
                        data-toggle="dropdown"
                    ><strong
                        style={{
                            whiteSpace: "normal"
                        }}
                    >{this.state.buttonText}</strong></button>
                    <div className="dropdown-menu dropdown-menu-right" key={"RoomTypeDropDown"}>
                        <div className="dropdown-item" onClick={() => this.onClick("All", "Tất cả")}>Tất cả</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Standard", "Standard")}>Standard</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Deluxe", "Deluxe")}>Deluxe</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Superior", "Superior")}>Superior</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Suite", "Suite")}>Suite</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Connecting room", "Connecting room")}>Connecting room</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
                    </div>
                </div>
            </div>
        );
    }
}