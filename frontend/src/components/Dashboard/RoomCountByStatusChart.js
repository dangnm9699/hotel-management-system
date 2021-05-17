import React from "react";
import ReactApexChart from 'react-apexcharts';

export default class RoomStatusCountChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 'All',
            buttonText: 'Tất cả',
            series: [],
            options: {
                chart: {
                    type: 'donut',
                },
                legend: {
                    position: 'right',
                    offsetY: 100,
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
                labels: ['Đang sử dụng', 'Đã đặt trước', 'Trống'],
                dataLabels: {
                    enabled: false,
                }
            },
        };
    }

    componentDidMount = () => {
        //TODO: query data from database
        let series = [22, 26, 30];
        this.setState({ series });
    }

    onClick = (opt, btn) => {
        let option = opt;
        let buttonText = btn;
        let series = [];
        switch (opt) {
            case 'All':
                series = [22, 26, 30];
                break;
            case 'Standard':
                series = [1, 2, 3];
                break;
            case 'Deluxe':
                series = [4, 5, 6];
                break;
            case 'Superior':
                series = [7, 8, 9];
                break;
            case 'Suite':
                series = [10, 11, 12];
                break;
            default:
                series = [22, 26, 30];
        }
        this.setState({ option, buttonText, series });
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
                    ><b>{this.state.buttonText}</b></button>
                    <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => this.onClick("All", "Tất cả")}>Tất cả</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Standard", "Standard")}>Standard</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Deluxe", "Deluxe")}>Deluxe</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Superior", "Superior")}>Superior</div>
                        <div className="dropdown-item" onClick={() => this.onClick("Suite", "Suite")}>Suite</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md">
                        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={350} />
                    </div>
                </div>
            </div>
        );
    }
}