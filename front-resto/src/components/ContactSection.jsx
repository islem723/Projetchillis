import { useState } from "react";
import "./ContactStyles.css";
import contactImg from "../assets/contact-img.png";

function ContactSection() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formValues));
    console.log("Form submitted with values:", formValues);
  };

  return (
    <div className="contact-section">
      <h2 style={{ color: "white" }}>Prendre Contact</h2>
      <div className="contact-inner">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom et Prénom"
            value={formValues.name}
            onChange={handleInputChange}
          />

          <input
            type="email"
            id="email"
            placeholder="Adresse Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />

          <textarea
            id="message"
            name="message"
            placeholder="Votre message ici..."
            value={formValues.message}
            onChange={handleInputChange}
          ></textarea>

          <button>Envoyer</button>
        </form>
        <img className="contact-img" src={contactImg} />
      </div>
    </div>
  );
}

export default ContactSection;
