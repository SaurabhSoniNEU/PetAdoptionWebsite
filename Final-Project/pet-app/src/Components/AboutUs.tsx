//About Us component
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';

//Interface for form page
interface FormValues {
  name: string;
  phoneNumber: string;
  emailAddress: string;
}

const AboutUs: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    phoneNumber: '',
    emailAddress: '',
  });

  //Function for Join Us Button
  const handleJoinUsClick = () => {
    setShowModal(true);
  };

  // Function to handle Close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle form page change
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Function to handle form page submit
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with values:', formValues);
    setShowModal(false);
  };

  //For Translation
  const {t} = useTranslation('common');

  // Rendered TSX
  return (
    <div id="about-us" className="about-us-section py-5 text-center">
      <Container>
        <h2 className="display-4 mb-4">{t('aboutus.label')}</h2>
        <p className="lead">
          {t("aboutus.desc")}
        </p>

        {/* "Join Us" button */}
        <Button variant="dark" className="mt-3" onClick={handleJoinUsClick}>
        {t("joinus.label")} <BsArrowRight />
        </Button>

        {/* Form Modal */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{t("joinus.label")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              {/* form fields with spacing between headings */}
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>{t("name.label")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formValues.name}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber" className="mb-3">
                <Form.Label>{t("phone.label")}</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  value={formValues.phoneNumber}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>{t("email.label.main")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  name="emailAddress"
                  value={formValues.emailAddress}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>

              {/* Button to submit */}
              <Button variant="primary" type="submit">
                {t("submit.button")}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AboutUs;

