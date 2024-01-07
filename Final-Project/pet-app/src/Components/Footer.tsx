// Footer Component

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// Footer Functional Component
const Footer: React.FC = () => {
  // State to manage the email input
  const [email, setEmail] = useState<string>('');
  // State to manage validation error messages
  const [validationError, setValidationError] = useState<string | null>(null);
  // State to manage subscription success status
  const [subscriptionSuccess, setSubscriptionSuccess] = useState<boolean>(false);

  // Function to handle changes in the email input
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidationError(null); // Clear validation error on input change
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setValidationError('Please enter a valid email address');
      return;
    }

    // Simulate sending a subscription email
    console.log(`Subscribing user with email: ${email}`);

    // Reset the form and show success message
    setEmail('');
    setSubscriptionSuccess(true);

    // Simulate clearing the success message after a delay
    setTimeout(() => {
      setSubscriptionSuccess(false);
    }, 5000);
  };

  // Translation hook to enable language translation
  const { t } = useTranslation('common');

  // Rendered TSX
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          {/* Subscription Form */}
          <Col md={6}>
            <h5>{t('SubscribetoOurNewsletter.label')}</h5>
            <p>{t('StayUpdateEvents')}</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Form.Label>{t('email.label.main')}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  style={{ width: '80%' }}
                  value={email}
                  onChange={handleEmailChange}
                />
                {validationError && <Alert variant="danger">{validationError}</Alert>}
                {subscriptionSuccess && <Alert variant="success">{t('subsuccess.button')}</Alert>}
                <Form.Text className="text-muted">
                  {t('email.security.label')}
                </Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit">
                {t('subscribe.button')}
              </Button>
            </Form>
          </Col>

          {/* Contact Us */}
          <Col md={6} className="text-right">
            {/* Contact information */}
            <h5>{t('contactus.label')}</h5>
            <p>
              <strong>{t('address.label')}:</strong> 360 Huntington Ave, Boston, MA 02115
            </p>
            <p>
              <strong>{t('phone.label')}:</strong> +1 (617) 373-2000
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Exporting the Footer component
export default Footer;
