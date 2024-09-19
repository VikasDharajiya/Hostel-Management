import { MdOutlineMapsHomeWork } from "react-icons/md";
import { TbDeviceAnalytics } from "react-icons/tb";
import { MdCleaningServices } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { BsPersonVideo } from "react-icons/bs";
import { MdExitToApp } from "react-icons/md";
const OurOfferings = () => {
  return (
    <div className="sections rules">
      <h2>Our Offerings</h2>
     <div className="content">
        <div className="offerings-grid">
          <div className="offering">
          <MdOutlineMapsHomeWork className="icon"  />
            <h3>Room Allocation</h3>
            <p>Easily manage room allocations, track occupancy, and streamline the check-in/check-out process.</p>
          </div>
          <div className="offering">
          <TbDeviceAnalytics className="icon" />
            <h3>Reporting & Analytics</h3>
            <p>Generate comprehensive reports and gain valuable insights to optimize your hostel operations.</p>
          </div>
          <div className="offering">
          <MdCleaningServices className="icon" />
            <h3>Cleaning</h3>
            <p>Streamline the cleaning process, track progress, and ensure a clean and well-maintained environment.</p>
          </div>
          <div className="offering">
            <GiMoneyStack className="icon" />
            <h3>Clearance</h3>
            <p>Manage the clearance process for students, ensuring a smooth departure and return of deposits.</p>
          </div>
          <div className="offering">
            <BsPersonVideo className="icon" />
            <h3>Daily Attendance</h3>
            <p>The system provides a daily attendance record of students, ensuring accurate tracking and monitoring of their presence.</p>
          </div>
          <div className="offering">
             <MdExitToApp className="icon"  />
            <h3>Leave Request</h3>
            <p>Streamline the leave request process, allowing students to easily apply and track their leave requests.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurOfferings;