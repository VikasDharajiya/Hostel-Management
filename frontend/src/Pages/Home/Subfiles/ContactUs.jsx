import "./ContactUs.css";

function ContactUs() {
  return (
    <section className="contact-section" id="contactUs">
      <div className="contact-intro">
        <h2 className="contact-title">Contact Us</h2>
      </div>

      <form
        className="contact-form"
        action="https://api.web3forms.com/submit"
        method="POST"
      >
        <input
          type="hidden"
          name="access_key"
          value="795d2343-e5ef-4843-9f7b-94c45d99ea86"
        />
        <input
          type="hidden"
          name="subject"
          value="New Contact Form Submission from Web3Forms"
        />
        <input type="hidden" name="from_name" value="My Website" />

        <div className="form-group-container">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              name="name"
              className="form-input"
              placeholder="Your name"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="form-input"
              placeholder="Your email"
              type="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              className="form-input"
              placeholder="+91 1231231231"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-textarea"
              id="message"
              name="message"
              placeholder="Your message"
            ></textarea>
          </div>
        </div>
        <button className="form-submit" type="submit">
          Send Message
        </button>
      </form>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
        rel="stylesheet"
      />
    </section>
  );
}

export default ContactUs;
