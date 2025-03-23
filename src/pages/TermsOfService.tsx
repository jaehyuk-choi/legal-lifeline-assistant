import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundGradient from '@/components/BackgroundGradient';
import { useLanguage } from '@/context/LanguageContext';

const TermsOfService: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundGradient />
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto max-w-4xl bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using Legal Lifeline services ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground">
                Legal Lifeline provides free voice-based legal assistance to workers experiencing workplace violations. The Service includes AI-powered conversations, workplace issue reporting, and connections to legal resources. We do not provide direct legal representation or personalized legal advice.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Eligibility</h2>
              <p className="text-muted-foreground">
                The Service is available to all workers regardless of immigration status. You must be at least 18 years old to use the Service. By using the Service, you represent and warrant that you meet all eligibility requirements.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Accounts</h2>
              <p className="text-muted-foreground">
                Some features of the Service may require you to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. User Conduct</h2>
              <p className="text-muted-foreground mb-3">
                When using the Service, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide false or misleading information</li>
                <li>Use the Service for unlawful purposes</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Harass, threaten, or intimidate other users or our staff</li>
                <li>Post or transmit any content that is defamatory, obscene, or otherwise objectionable</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitations of Services</h2>
              <p className="text-muted-foreground">
                The information provided through the Service is for informational purposes only and does not constitute legal advice. Our AI assistant provides general information about legal rights and processes but cannot replace consultation with a qualified attorney.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Confidentiality and Privacy</h2>
              <p className="text-muted-foreground">
                We respect your privacy and handle your information in accordance with our Privacy Policy. While we strive to keep your information confidential, please be aware that no method of electronic transmission or storage is 100% secure.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by Legal Lifeline or its licensors and are protected by copyright, trademark, and other intellectual property laws.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                IN NO EVENT SHALL LEGAL LIFELINE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">11. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to indemnify and hold harmless Legal Lifeline and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of the Service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">12. Modifications to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes through our website or via email. Your continued use of the Service after such modifications constitutes your acceptance of the updated terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">13. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">14. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions or concerns about these Terms of Service, please contact us at terms@legallifeline.org.
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

export default TermsOfService;
