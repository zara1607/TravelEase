// /src/sections/footer/pages/legal/Privacy.jsx
import React from 'react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const Privacy = () => {
  const lastUpdated = 'March 1, 2024';

  return (
    <FooterPageLayout title="Privacy Policy" subtitle={`Last Updated: ${lastUpdated}`}>
      <Card className="p-8 prose max-w-none">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account,
          make a booking, or contact customer support. This may include:
        </p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Payment information (processed securely by our payment partners)</li>
          <li>Travel preferences and booking history</li>
          <li>Communications with customer support</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process your bookings and payments</li>
          <li>Send booking confirmations and updates</li>
          <li>Provide customer support</li>
          <li>Improve our services and personalize your experience</li>
          <li>Send promotional offers (with your consent)</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We share your information with:
        </p>
        <ul>
          <li>Airlines, hotels, and other travel partners to fulfill your bookings</li>
          <li>Payment processors to handle transactions</li>
          <li>Service providers who assist in our operations</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>4. Data Security</h2>
        <p>
          We implement industry-standard security measures to protect your information.
          All sensitive data is encrypted using SSL technology.
        </p>

        <h2>5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h2>6. Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience and analyze site traffic.
          You can control cookie settings through your browser preferences.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:{' '}
          <a href="mailto:privacy@travelease.com" className="text-blue-600">
            privacy@travelease.com
          </a>
        </p>
      </Card>
    </FooterPageLayout>
  );
};

export default Privacy;