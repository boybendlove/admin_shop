import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ApexOptions } from "apexcharts";
import ReactApexCharts from 'react-apexcharts';

Home.propTypes = {


};


function Home(props) {

    const [revenueChartData, setRevenueChartData] = useState({});
    const [chartData, setChartData] = useState({});
    const [report, setReport] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("user"))
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refreshToken");
    // const user = sessionStorage.getItem("user")
    const [isModalOpen, setIsModalOpen] = useState( user.username === 'cuong3') //

    //Biểu đồ cột
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin/reports`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                const latestReport = response.data[response.data.length - 1];
                const revenueChartData = {
                    series: [{
                        name: 'Doanh thu',
                        data: [latestReport.revenue] 
                    }],
                    options: {
                        chart: {
                            type: 'bar',
                            height: 350
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '55%',
                                endingShape: 'rounded'
                            },
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: ['Tổng doanh thu'],
                        },
                        colors: ['#008ffb'],
                        tooltip: {
                            enabled: true,
                            y: {
                                formatter: function(val) {
                                    return "$" + val;
                                }
                            }
                        }
                    },
                };
                setRevenueChartData(revenueChartData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    //Biểu đồ tròn
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin/reports`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                const latestReport = response.data[response.data.length - 1];
                const chartData = {
                    series: [latestReport.successfulOrders, latestReport.failedOrders],
                    options: {
                        labels: ['Số đơn thành công', 'Số đơn thất bại'],
                        colors: ['#00e396', '#e74c3c'],
                        legend: {
                            show: true,
                            position: 'bottom',
                        },
                    },
                };
                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://shopquanao-c8p2.onrender.com/api/admin/reports`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'x-refresh-token': refreshToken
                    }
                });
                const i = response.data.length
                console.log(i)
                setReport(response.data[i - 1])
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);
    console.log("report", report)
    return (

        <div className="page-wrapper">

            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-7 align-self-center">
                        <h3 className="page-title text-truncate text-dark font-weight-medium mb-1">Hello {user.uername}</h3>
                        <div className="d-flex align-items-center">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0 p-0">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                {report !== null && (
                    <div className="card-group">
                        <div className="card border-right">
                            <div className="card-body">
                                <div className="d-flex d-lg-flex d-md-block align-items-center">
                                    <div>
                                        <h2 className="text-dark mb-1 w-100 text-truncate font-weight-medium"><sup
                                            className="set-doller">$</sup>{report.revenue}</h2>
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Tổng doanh thu
                                        </h6>
                                    </div>
                                    <div className="ml-auto mt-md-3 mt-lg-0">
                                        <span className="opacity-7 text-muted"><i data-feather="dollar-sign"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card border-right">
                            <div className="card-body">
                                <div className="d-flex d-lg-flex d-md-block align-items-center">
                                    <div>
                                        <div className="d-inline-flex align-items-center">
                                            <h2 className="text-dark mb-1 font-weight-medium">{report.successfulOrders}</h2>
                                            <span
                                                className="badge bg-primary font-12 text-white font-weight-medium badge-pill ml-2 d-lg-block d-md-none">{report.successRate}</span>
                                        </div>
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate"> Số đơn thành công</h6>
                                    </div>
                                    <div className="ml-auto mt-md-3 mt-lg-0">
                                        <span className="opacity-7 text-muted"><i data-feather="user-plus"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-right">
                            <div className="card-body">
                                <div className="d-flex d-lg-flex d-md-block align-items-center">
                                    <div>
                                        <div className="d-inline-flex align-items-center">
                                            <h2 className="text-dark mb-1 font-weight-medium">{report.failedOrders}</h2>
                                            <span
                                                className="badge bg-danger font-12 text-white font-weight-medium badge-pill ml-2 d-md-none d-lg-block">{(report.failedOrders / report.failedOrders) * 100}</span>
                                        </div>
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Số đơn bị hủy</h6>
                                    </div>
                                    <div className="ml-auto mt-md-3 mt-lg-0">
                                        <span className="opacity-7 text-muted"><i data-feather="file-plus"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex d-lg-flex d-md-block align-items-center">
                                    <div>
                                        <h2 className="text-dark mb-1 font-weight-medium">{report.totalOrders}</h2>
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Tổng số đơn</h6>
                                        <h6 className="text-muted font-weight-normal mb-0 w-100 text-truncate">Số đơn chưa hoàn thành: {report.totalOrders - (report.failedOrders + report.successfulOrders)}</h6>
                                    </div>
                                    <div className="ml-auto mt-md-3 mt-lg-0">
                                        <span className="opacity-7 text-muted"><i data-feather="globe"></i></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )};
                <div style={{ display: "flex", justifyContent: "center" }} className='row'>
                    <div>
                        {revenueChartData.series && (
                            <div className="row">
                                <div className="col-12">
                                    <ReactApexCharts
                                        options={revenueChartData.options}
                                        series={revenueChartData.series}
                                        type="bar"
                                        height={350}
                                        width={500}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {chartData.series && (
                            <div className="row">
                                <div className="col-12">
                                    <ReactApexCharts
                                        options={chartData.options}
                                        series={chartData.series}
                                        type="pie"
                                        height={350}
                                        width={500}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex align-items-center mb-4">
                                    <h4 className="card-title">Top Admin</h4>
                                    <div className="ml-auto">
                                        <div className="dropdown sub-dropdown">
                                            <button className="btn btn-link text-muted dropdown-toggle" type="button"
                                                id="dd1" data-toggle="dropdown" aria-haspopup="true"
                                                aria-expanded="false">
                                                <i data-feather="more-vertical"></i>
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dd1">
                                                <a className="dropdown-item" href="#">Insert</a>
                                                <a className="dropdown-item" href="#">Update</a>
                                                <a className="dropdown-item" href="#">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table no-wrap v-middle mb-0">
                                        <thead>
                                            <tr className="border-0">
                                                <th className="border-0 font-14 font-weight-medium text-muted">Admin
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted px-2">Project
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                    Status
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted text-center">
                                                    Weeks
                                                </th>
                                                <th className="border-0 font-14 font-weight-medium text-muted">Budget</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-top-0 px-2 py-4">
                                                    <div className="d-flex no-block align-items-center">
                                                        <div className="mr-3"><img src="../assets/images/users/IMG_6225.jpg"
                                                            alt="user" className="rounded-circle" width="45"
                                                            height="45" /></div>
                                                        <div className="">
                                                            <h5 className="text-dark mb-0 font-16 font-weight-medium">{user.uername}
                                                            </h5>
                                                            <span
                                                                className="text-muted font-14">{user.email}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-top-0 text-muted px-2 py-4 font-14">Admin</td>

                                                <td className="border-top-0 text-center px-2 py-4"><i
                                                    className="fa fa-circle text-primary font-12" data-toggle="tooltip"
                                                    data-placement="top" title="In Testing"></i></td>
                                                <td
                                                    className="border-top-0 text-center font-weight-medium text-muted px-2 py-4">
                                                    35
                                                </td>
                                                <td className="font-weight-medium text-dark border-top-0 px-2 py-4">
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="footer text-center text-muted">
                All Rights Reserved by Adminmart. Designed and Developed by

            </footer>
        </div>
    );
}

export default Home;