// /src/sections/footer/pages/legal/Terms.jsx
import React from 'react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const Terms = () => {
  const lastUpdated = 'March 1, 2024';

  return (
    <FooterPageLayout title="Terms of Service" subtitle={`Last Updated: ${lastUpdated}`}>
      <Card className="p-8 prose max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using TravelEase, you agree to be bound by these Terms of Service.
          If you do not agree to these terms, please do not use our services.
        </p>

        <h2>2. Booking and Payment</h2>
        <ul>
          <li>All bookings are subject to availability and confirmation.</li>
          <li>Prices are quoted in Indian Rupees (INR) unless otherwise stated.</li>
          <li>Payment must be completed at the time of booking.</li>
          <li>We accept major credit/debit cards, UPI, and net banking.</li>
        </ul>

        <h2>3. Cancellations and Refunds</h2>
        <p>
          Cancellation and refund policies vary by airline, hotel, and package.
          Please refer to our Cancellation Policy and your booking confirmation for specific terms.
        </p>

        <h2>4. User Accounts</h2>
        <ul>
          <li>You are responsible for maintaining the confidentiality of your account.</li>
          <li>You must be at least 18 years old to create an account.</li>
          <li>Notify us immediately of any unauthorized account use.</li>
        </ul>

        <h2>5. Prohibited Activities</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use our services for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with the proper functioning of the website</li>
          <li>Provide false or misleading information</li>
        </ul>

        <h2>6. Limitation of Liability</h2>
        <p>
          TravelEase acts as an intermediary between users and travel service providers.
          We are not liable for issues arising from airline, hotel, or other provider services.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Continued use of our services
          after changes constitutes acceptance of the new terms.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          For questions about these Terms, contact us at:{' '}
          <a href="mailto:legal@travelease.com" className="text-blue-600">
            legal@travelease.com
          </a>
        </p>
      </Card>
    </FooterPageLayout>
  );
};

export default Terms;