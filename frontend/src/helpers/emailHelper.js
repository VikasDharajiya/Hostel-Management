import emailjs from "emailjs-com";
import Swal from "sweetalert2";

export const sendLeaveRequestEmail = (toEmail, templateParams, templateId = 'template_h2atv1l') => {
    const emailServiceId = "service_ps3p6vf";
    emailjs
      .send(emailServiceId, templateId,templateParams, 'a9tz2Xl5DsJhOrhOS')
      .then(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "Email Sent Successfully!",
            text: `Email sent to ${toEmail}`,
          });
          console.log("Email sent successfully:", response);
        },
        (error) => {
            console.log("ERROR : ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email sending failed. Please try again later.",
          });
          console.error("Email sending failed:", error);
        }
      );
  };