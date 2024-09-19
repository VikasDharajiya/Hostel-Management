import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import {
  FaQuestionCircle,
  FaBed,
  FaStethoscope,
  FaClipboardCheck,
  FaClipboardList,
  FaUser,
  FaHouseUser,
  FaCalendarCheck,
} from "react-icons/fa";
import "./StatisticsTab.css";

function StatisticsTab() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [data, setData] = useState({
    attendance: 0,
    roomInquiries: 0,
    cleaning: 0,
    medicalService: 0,
    clearance: 0,
    rooms: 0,
    leaveRequest: 0,
    users: 0,
  });

  const fetchData = async () => {
    try {
      const endpoints = [
        "http://localhost:5111/api/attendance/date",
        "http://localhost:5111/api/inquiries",
        "http://localhost:5111/api/cleaning",
        "http://localhost:5111/api/medical",
        "http://localhost:5111/api/clearance",
        "http://localhost:5111/api/rooms/all",
        "http://localhost:5111/api/leave",
        "http://localhost:5111/api/user/getAllUsers",
      ];
      const token = localStorage.getItem("token");
      const counts = await Promise.all(
        endpoints.map(async (endpoint) => {
          if (!endpoint.includes("attendance/date")) {
            const response = await axios.get(endpoint, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (endpoint.includes("user/getAllUsers")) {
              return response.data.users.length;
            }
            if (endpoint.includes("rooms/all")) {
              return response.data.length;
            }
            return response.data.length;
          }
          if (endpoint.includes("attendance/date")) {
            const response = await axios.post(
              endpoint,
              { date: new Date().toISOString().split("T")[0] },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data.length;
          }
        })
      );

      setData({
        attendance: counts[0],
        roomInquiries: counts[1],
        cleaning: counts[2],
        medicalService: counts[3],
        clearance: counts[4],
        rooms: counts[5],
        leaveRequest: counts[6],
        users: counts[7],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const barChartData = {
    labels: [
      "Attendance",
      "Room Inquiries",
      "Cleaning",
      "Medical Service",
      "Clearance",
      "Rooms",
      "Leave Request",
      "Users",
    ],
    series: [
      data.attendance,
      data.roomInquiries,
      data.cleaning,
      data.medicalService,
      data.clearance,
      data.rooms,
      data.leaveRequest,
      data.users,
    ],
  };

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#5ca4a9"],
    xaxis: {
      categories: barChartData.labels,
    },
    yaxis: {
      title: {
        text: "Counts",
        style: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "14px",
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="statistics-tab">
      <h2 style={{ textAlign: "left" }}>Statistics</h2>
      <div>
        <div className="live-date-time">{currentDateTime.toLocaleString()}</div>
      </div>
      <div className="card-container">
        <div className="card card-pink">
          <div className="card-icon pink">
            <FaHouseUser />
          </div>
          <div className="card-text">
            <div className="card-title">Rooms</div>
            <div className="card-value">{data.rooms}</div>
          </div>
        </div>
        <div className="card card-yellow">
          <div className="card-icon yellow">
            <FaQuestionCircle />
          </div>
          <div className="card-text">
            <div className="card-title">Room Inquiries</div>
            <div className="card-value">{data.roomInquiries}</div>
          </div>
        </div>
        <div className="card card-green">
          <div className="card-icon green">
            <FaBed />
          </div>
          <div className="card-text">
            <div className="card-title">Cleaning</div>
            <div className="card-value">{data.cleaning}</div>
          </div>
        </div>
        <div className="card card-orange">
          <div className="card-icon orange">
            <FaStethoscope />
          </div>
          <div className="card-text">
            <div className="card-title">Medical Service</div>
            <div className="card-value">{data.medicalService}</div>
          </div>
        </div>
        <div className="card card-purple">
          <div className="card-icon purple">
            <FaClipboardCheck />
          </div>
          <div className="card-text">
            <div className="card-title">Clearance</div>
            <div className="card-value">{data.clearance}</div>
          </div>
        </div>
        <div className="card card-teal">
          <div className="card-icon teal">
            <FaClipboardList />
          </div>
          <div className="card-text">
            <div className="card-title">Leave Request</div>
            <div className="card-value">{data.leaveRequest}</div>
          </div>
        </div>
        <div className="card card-blue">
          <div className="card-icon blue">
            <FaCalendarCheck />
          </div>
          <div className="card-text">
            <div className="card-title">Attendance</div>
            <div className="card-value">{data.attendance}</div>
          </div>
        </div>
        <div className="card card-dark">
          <div className="card-icon dark">
            <FaUser />
          </div>
          <div className="card-text">
            <div className="card-title">Users</div>
            <div className="card-value">{data.users}</div>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <div className="chart">
          <h3>Bar Chart</h3>
          <ReactApexChart
            options={barChartOptions}
            series={[{ data: barChartData.series }]}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default StatisticsTab;
