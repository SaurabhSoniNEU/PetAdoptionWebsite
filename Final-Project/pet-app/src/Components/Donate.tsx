// Donation Component

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Form, Row, Col, Alert } from 'react-bootstrap';
import GooglePayButton from '@google-pay/button-react';

// Donation Functional Component
const Donation: React.FC = () => {
  // State to manage the donation amount input
  const [donationAmount, setDonationAmount] = useState<string>('');
  // State to manage validation error messages
  const [validationError, setValidationError] = useState<string | null>(null);

  // Function to handle changes in the donation amount input
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Check if the entered value is a valid float or integer
    if (/^\d+(\.\d{1,2})?$/.test(value) || value === '') {
      setDonationAmount(value);
      setValidationError(null);
    } else {
      setValidationError('Please enter a valid number');
    }
  };

  // Translation hook to enable language translation
  const { t, i18n } = useTranslation('common');

  // Rendered TSX
  return (
    <div id="donation" className="donation-section py-5 text-center">
      <Container>
        <h2 className="display-4 mb-4">{t('makedonation.label')}</h2>
        <p className="lead">
          {t('makedonation.desc')}
        </p>
        <Row className="justify-content-center">
          <Col xs={10} sm={4} md={4}>
            <Form>
              <Form.Group controlId="donationAmount">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter amount"
                  value={donationAmount}
                  onChange={handleAmountChange}
                  className="mb-2"
                />
                {validationError && <Alert variant="danger">{validationError}</Alert>}
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} sm={6} md={2} className="d-flex align-items-center">
            {/* Google Pay Button */}
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: 'CARD',
                    parameters: {
                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                    },
                    tokenizationSpecification: {
                      type: 'PAYMENT_GATEWAY',
                      parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: '12345678901234567890',
                  merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPriceLabel: 'Total',
                  totalPrice: '1.00', // Use user-entered amount or default to 0.00
                  currencyCode: 'USD',
                  countryCode: 'US',
                },
                shippingAddressRequired: true,
              }}
              buttonType="donate"
              className="mt-3"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Exporting the Donation component
export default Donation;
