
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';
import { useLanguage } from '@/context/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground">
                This Privacy Policy explains how we collect, use, and protect your personal information when you use our legal assistance service. We are committed to respecting your privacy and protecting your personal data in compliance with applicable privacy laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-3">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Personal Information:</strong> Name, contact information, and employment details that you voluntarily provide.</li>
                <li><strong>Report Content:</strong> Information about workplace issues, incidents, and related details that you share when submitting reports.</li>
                <li><strong>Conversation Data:</strong> Content of conversations with our AI assistant and human representatives.</li>
                <li><strong>Usage Information:</strong> Data about how you interact with our website and services.</li>
                <li><strong>Device Information:</strong> Technical data about the devices you use to access our service.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-3">
                We use your information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>To provide legal assistance and respond to your inquiries</li>
                <li>To process and follow up on workplace issue reports</li>
                <li>To improve our services and develop new features</li>
                <li>To ensure the security and functionality of our platform</li>
                <li>To communicate important updates or changes to our services</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Anonymous Reporting</h2>
              <p className="text-muted-foreground">
                If you choose to submit an anonymous report, we will not display your name or identifying information publicly or to employers. However, we may still collect certain information to process your report and contact you about its status, unless you specifically request no contact.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-3">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>With legal aid organizations and attorneys, with your consent, to provide you with legal assistance</li>
                <li>With service providers who help us operate our platform</li>
                <li>When required by law or to protect our rights and safety</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Despite our efforts, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Objection to or restriction of processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes through our website or via email.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at privacy@legallifeline.org.
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-right">
            <p className="text-sm text-muted-foreground">Last Updated: {new Date().toLocaleDateString(language === 'en' ? 'en-US' : language)}</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
