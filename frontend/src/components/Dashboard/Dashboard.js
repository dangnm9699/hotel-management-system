import React from 'react';
import '../../css/dashboard.css';
import GuestCountByCountryChart from './GuestCountByCountryChart';
import HolidayChart from './HolidayChart';
import RevenueChart from './RevenueChart';
import RoomStatusCountChart from './RoomCountByStatusChart';
import SparkBox1 from './SparkBox1';
import SparkBox2 from './SparkBox2';
import SparkBox3 from './SparkBox3';
import SparkBox4 from './SparkBox4';

export default class Dashboard extends React.Component {
    componentDidMount() {
        document.title = "MyHotel - Tổng quan"
    }
    render() {
        return (
            <div className="content-container container-fluid">
                <div id="dashboard">
                    <div id="charts" className="row sparkboxes mt-4">
                        <div className="col-md-3">
                            <div className="color-box color-box1">
                                <div className="details">
                                    <h3>1213</h3>
                                    <h4>CLICKS</h4>
                                </div>
                                <SparkBox1 />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="color-box color-box2">
                                <div className="details">
                                    <h3>422</h3>
                                    <h4>VIEWS</h4>
                                </div>
                                <SparkBox2 />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="color-box color-box3">
                                <div className="details">
                                    <h3>311</h3>
                                    <h4>LEADS</h4>
                                </div>
                                <SparkBox3 />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="color-box color-box4">
                                <div className="details">
                                    <h3>22</h3>
                                    <h4>SALES</h4>
                                </div>
                                <SparkBox4 />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <RoomStatusCountChart />
                        </div>
                        <div className="col-md-8">
                            <GuestCountByCountryChart />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <RevenueChart />
                        </div>
                        <div className="col-md-6">
                            <HolidayChart />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}