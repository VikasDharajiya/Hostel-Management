import "./services.css";
import ServicesCard from "./Subfiles/ServicesCard";
import NoticeCard from "./Subfiles/NoticeCard";
import serviceData from "./Subfiles/servicesData";
import noticeBoardData from "./Subfiles/noticeBoardData";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Services = () => {
  const { user } = useContext(UserContext);
  const googleMapSites = {
    main: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.5333424810237!2d72.53768501100456!3d23.114172712816327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83d506ef6f0f%3A0x550c5bf579c81861!2sThe%20Special%20Character!5e0!3m2!1sen!2sin!4v1718560713568!5m2!1sen!2sin",
    Colleges:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d79031.46778175175!2d72.51296776697528!3d23.084937884835828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scollege%20in%20ahmedabad!5e0!3m2!1sen!2sin!4v1718699202433!5m2!1sen!2sin",
    PG: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d117433.29249581897!2d72.64646704177007!3d23.10476777099126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spg%20in%20ahmedabad!5e0!3m2!1sen!2sin!4v1718701733577!5m2!1sen!2sin",
    Hospitals:
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d117484.63739230845!2d72.52925190263463!3d23.045978870872975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s%20all%20hospitals%20in%20ahmedabad%20gujarat%20india!5e0!3m2!1sen!2sin!4v1718701588796!5m2!1sen!2sin",
  };

  const [googleMapLink, SetGoogleMapLink] = useState(googleMapSites["main"]);
  const [services, setServices] = useState(serviceData);
  React.useEffect(() => {
    if (user) {
      if (!user?.room) {
        setServices([]);
      }
    }
  }, [user]);
  const serviceList = services.map((card, index) => (
    <ServicesCard
      key={index}
      imgSrc={card.imgSrc}
      service={card.service}
      details={card.details}
      link={card.link}
    />
  ));

  const noticeList = noticeBoardData.map((card, index) => (
    <NoticeCard
      key={index}
      title={card.title}
      description={card.description}
      link={card.link}
    />
  ));

  return (
    <div className="services-page-container">
      <h2 className="page-heading">Services</h2>
      <div className="card-container">
        {serviceList?.length > 0 ? (
          serviceList
        ) : (
          <h4 align={"center"}>
            We Could not find any service for you,
            <br /> You can Request for a room or create room inquiry
          </h4>
        )}
      </div>

      <h2 className="page-heading">Notice Board</h2>
      <div className="card-container">
        {noticeList}
        {/* <div className="notice-card">
          <h2 style={{ color: "#1b3d49" }}>new notice</h2>
          <div className="box">
            <span className="material-icons-outlined">add</span>
          </div>
        </div> */}
      </div>
      <div className="googlemap-location">
        <h2 className="page-heading-map">Find Us on the Map</h2>
        <iframe
          src={googleMapLink}
          width="80%"
          height="100%"
          style={{ border: "1px solid  #1b3d49" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="sites">
          <button
            type="button"
            onClick={() => SetGoogleMapLink(googleMapSites["main"])}
          >
            Our Location
          </button>
          <button
            type="button"
            onClick={() => SetGoogleMapLink(googleMapSites["Colleges"])}
          >
            Colleges
          </button>
          <button
            type="button"
            onClick={() => SetGoogleMapLink(googleMapSites["PG"])}
          >
            PG
          </button>
          <button
            type="button"
            onClick={() => SetGoogleMapLink(googleMapSites["Hospitals"])}
          >
            Hospitals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
