// /src/sections/footer/pages/legal/Cookies.jsx
import React from 'react';
import FooterPageLayout from '../../components/FooterPageLayout';
import Card from '../../../../ui/Card';

const Cookies = () => {
  const lastUpdated = 'March 1, 2024';

  return (
    <FooterPageLayout title="Cookie Policy" subtitle={`Last Updated: ${lastUpdated}`}>
      <Card className="p-8 prose max-w-none">
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your device when you visit our website.
          They help us provide you with a better experience and understand how you use our site.
        </p>

        <h2>How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          <li><strong>Marketing Cookies:</strong> Track your browsing habits for relevant advertising</li>
        </ul>

        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser</li>
          <li><strong>Persistent Cookies:</strong> Remain on your device for a set period</li>
          <li><strong>First-party Cookies:</strong> Set by TravelEase</li>
          <li><strong>Third-party Cookies:</strong> Set by our analytics and marketing partners</li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings.
          You can typically find these settings in the "Options" or "Preferences" menu of your browser.
          Please note that disabling cookies may affect the functionality of our website.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about our Cookie Policy, please contact us at:{' '}
          <a href="mailto:privacy@travelease.com" className="text-blue-600">
            privacy@travelease.com
          </a>
        </p>
      </Card>
    </FooterPageLayout>
  );
};

export default Cookies;