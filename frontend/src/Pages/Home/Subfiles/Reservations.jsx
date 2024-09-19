import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

function Reservations() {
  const { user } = useContext(UserContext);
  return (
    <div className="reservations sections">
      <div className="reservations_text">
        <h4>Reservations</h4>
        <p>
          Welcome to our premier hostel accommodation, offering three distinct
          blocks: A, B, and C, each designed to cater to diverse needs and
          preferences.<br></br> All blocks feature high-speed internet access,
          24/7 security, and regular cleaning services, ensuring a safe and
          hygienic living environment. Our dedicated staff is always available
          to assist with any needs, making our hostels not just a place to stay,
          but a home away from home.
        </p>
      </div>
      <div className="details">
        <div className="detail_box">
          <img src="/Image/Buildings/blockA.jpg" alt="" />
          <div className="detail_box-text">
            <h6>Block A</h6>
            <p className="detail_box-text_description">
              Available for 1st year and 2nd year students.
            </p>
            <p className="detail_box-text_spaces">
              <strong>1 Room</strong> - 4 students
            </p>
            <div className="detail_box-text_facilities">
              <p className="detail_box-text_title">Facilites</p>
              <div className="detail_box-text_things">
                <ul>
                  <li>4 beds with accessories for 4 students</li>
                  <li>Common study area</li>
                  <li>Common Bathrooms</li>
                  <li>Common Kitchen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="detail_box">
          <img src="/Image/Buildings/blockB.jpg" alt="" />
          <div className="detail_box-text">
            <h6>Block B</h6>
            <p className="detail_box-text_description">
              Available for 3rd, 4th and 5th year students.
            </p>
            <p className="detail_box-text_spaces">
              <strong>1 Room</strong> - 2 students
            </p>
            <div className="detail_box-text_facilities">
              <p className="detail_box-text_title">Facilites</p>
              <div className="detail_box-text_things">
                <ul>
                  <li>2 beds with accessories for 2 students</li>
                  <li>Common study area</li>
                  <li>Personal Bathrooms</li>
                  <li>Common Kitchen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
       
        <div className="detail_box">
          <img src="/Image/Buildings/blockC.jpg" alt="" />
          <div className="detail_box-text">
            <h6>Block C</h6>
            <p className="detail_box-text_description">
              Available for 4th, 5th and final year students.
            </p>
            <p className="detail_box-text_spaces">
              <strong>1 Room</strong> - 1 students
            </p>
            <div className="detail_box-text_facilities">
              <p className="detail_box-text_title">Facilites</p>
              <div className="detail_box-text_things">
                <ul>
                  <li>1 bed with accessories for 1 student</li>
                  <li>Common study area</li>
                  <li>personal Bathrooms</li>
                  <li>Common Kitchen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        {!user?.room && (
          <div className="button">
            <Link to="/accommodation/form">Room Requests</Link>
          </div>
        )}
        {user?.room && (
          <div className="button">
            <Link to="/accommodation/inquire">Room Inquiries</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservations;
