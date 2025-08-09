export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="prose prose-sm max-w-none text-foreground">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-600 mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                1. Introduction
              </h2>
              <p className="text-foreground mb-3">
                This Privacy Policy describes how our online learning platform
                ("we," "our," or "us") collects, uses, and protects your
                personal information when you use our services, including course
                purchases, learning activities, and account management.
              </p>
              <p className="text-foreground">
                By using our platform, you consent to the collection and use of
                information in accordance with this policy. We are committed to
                protecting your privacy and ensuring the security of your
                personal data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                2. Information We Collect
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                2.1 Personal Information
              </h3>
              <p className="text-foreground mb-3">
                We collect the following types of personal information:
              </p>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>
                  Name, email address, and contact information when you register
                </li>
                <li>
                  Payment information including billing address and payment
                  method details
                </li>
                <li>
                  Profile information such as educational background and
                  learning preferences
                </li>
                <li>Communication records when you contact our support team</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mb-2">
                2.2 Learning Data
              </h3>
              <p className="text-foreground mb-3">
                We automatically collect information about your learning
                activities:
              </p>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>Course enrollment and completion data</li>
                <li>Quiz and assignment scores</li>
                <li>Time spent on lessons and overall platform usage</li>
                <li>Learning progress and achievement records</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mb-2">
                2.3 Technical Information
              </h3>
              <p className="text-foreground mb-3">
                We collect technical data to improve our services:
              </p>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>IP address, browser type, and device information</li>
                <li>Operating system and screen resolution</li>
                <li>Referral URLs and pages visited on our platform</li>
                <li>Session duration and interaction patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                3. Cookie Policy
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                3.1 What Are Cookies
              </h3>
              <p className="text-foreground mb-3">
                Cookies are small text files stored on your device when you
                visit our website. They help us provide you with a better
                learning experience by remembering your preferences and tracking
                your progress through courses.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                3.2 Types of Cookies We Use
              </h3>

              <h4 className="text-sm font-medium text-foreground mb-2">
                Essential Cookies
              </h4>
              <p className="text-foreground mb-3">
                These cookies are necessary for the website to function
                properly. They enable core functionality such as security,
                network management, and accessibility. You cannot opt-out of
                these cookies without affecting the functionality of our
                platform.
              </p>

              <h4 className="text-sm font-medium text-foreground mb-2">
                Performance Cookies
              </h4>
              <p className="text-foreground mb-3">
                These cookies collect information about how you use our website,
                such as which pages you visit most often and if you get error
                messages. This data helps us improve the performance and user
                experience of our platform.
              </p>

              <h4 className="text-sm font-medium text-foreground mb-2">
                Functional Cookies
              </h4>
              <p className="text-foreground mb-3">
                These cookies allow our website to remember choices you make and
                provide enhanced, more personal features. They may be set by us
                or by third-party providers whose services we have added to our
                pages.
              </p>

              <h4 className="text-sm font-medium text-foreground mb-2">
                Analytics Cookies
              </h4>
              <p className="text-foreground mb-3">
                We use analytics cookies to understand how our users interact
                with our platform. This information helps us improve our
                courses, user interface, and overall learning experience.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                3.3 Managing Cookies
              </h3>
              <p className="text-foreground mb-3">
                You can control and manage cookies in various ways. Please note
                that removing or blocking cookies can impact your user
                experience and parts of our website may no longer be fully
                accessible.
              </p>
              <p className="text-foreground">
                Most web browsers automatically accept cookies, but you can
                modify your browser settings to decline cookies if you prefer.
                Instructions for managing cookies can be found in your browser's
                help section.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                4. How We Use Your Information
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                4.1 Service Provision
              </h3>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>Creating and managing your learning account</li>
                <li>Processing course enrollments and payments</li>
                <li>Delivering course content and tracking your progress</li>
                <li>Providing customer support and technical assistance</li>
                <li>
                  Issuing certificates and credentials upon course completion
                </li>
              </ul>

              <h3 className="text-base font-medium text-foreground mb-2">
                4.2 Platform Improvement
              </h3>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>Analyzing usage patterns to enhance user experience</li>
                <li>Developing new features and course offerings</li>
                <li>Conducting research to improve learning outcomes</li>
                <li>Optimizing platform performance and reliability</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mb-2">
                4.3 Communication
              </h3>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>Sending course updates and important announcements</li>
                <li>Providing technical support and responding to inquiries</li>
                <li>Sharing relevant educational content and resources</li>
                <li>
                  Notifying you about new courses that match your interests
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                5. Information Sharing and Disclosure
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                5.1 Third-Party Service Providers
              </h3>
              <p className="text-foreground mb-3">
                We may share your information with trusted third-party service
                providers who assist us in operating our platform, conducting
                our business, or serving our users. These parties are obligated
                to keep your information confidential and use it only for the
                purposes we specify.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                5.2 Payment Processing
              </h3>
              <p className="text-foreground mb-3">
                Payment information is processed by secure third-party payment
                processors. We do not store complete payment card information on
                our servers. All payment transactions are encrypted and
                processed in compliance with PCI DSS standards.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                5.3 Legal Requirements
              </h3>
              <p className="text-foreground mb-3">
                We may disclose your information if required to do so by law or
                in response to valid requests by public authorities, such as a
                court or government agency.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                6. Data Security
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                6.1 Security Measures
              </h3>
              <p className="text-foreground mb-3">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul className="list-disc list-inside text-foreground space-y-1 mb-4 ml-4">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
              </ul>

              <h3 className="text-base font-medium text-foreground mb-2">
                6.2 Data Retention
              </h3>
              <p className="text-foreground">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this privacy
                policy, unless a longer retention period is required or
                permitted by law. Learning progress data may be retained to
                maintain your course history and certificates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                7. Your Rights and Choices
              </h2>

              <h3 className="text-base font-medium text-foreground mb-2">
                7.1 Access and Portability
              </h3>
              <p className="text-foreground mb-3">
                You have the right to access your personal information and
                request a copy of the data we hold about you. You can also
                request that we transfer your data to another service provider
                in a structured, commonly used format.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                7.2 Correction and Updates
              </h3>
              <p className="text-foreground mb-3">
                You can update your personal information at any time through
                your account settings. If you need assistance correcting
                inaccurate information, please contact our support team.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                7.3 Deletion
              </h3>
              <p className="text-foreground mb-3">
                You may request deletion of your personal information, subject
                to certain exceptions such as legal obligations or legitimate
                business interests. Please note that deleting your account will
                result in loss of access to purchased courses and learning
                progress.
              </p>

              <h3 className="text-base font-medium text-foreground mb-2">
                7.4 Marketing Communications
              </h3>
              <p className="text-foreground">
                You can opt-out of marketing communications at any time by
                clicking the unsubscribe link in our emails or updating your
                communication preferences in your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                8. International Data Transfers
              </h2>
              <p className="text-foreground mb-3">
                Your information may be transferred to and processed in
                countries other than your country of residence. These countries
                may have data protection laws that are different from the laws
                of your country.
              </p>
              <p className="text-foreground">
                When we transfer your information internationally, we ensure
                appropriate safeguards are in place to protect your data in
                accordance with this privacy policy and applicable data
                protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                9. Children's Privacy
              </h2>
              <p className="text-foreground mb-3">
                Our services are not intended for children under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us
                immediately.
              </p>
              <p className="text-foreground">
                For users between 13 and 18 years of age, we recommend parental
                guidance and supervision when using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p className="text-foreground mb-3">
                We may update this privacy policy from time to time to reflect
                changes in our practices or for other operational, legal, or
                regulatory reasons. We will notify you of any material changes
                by posting the new privacy policy on this page and updating the
                "Last updated" date.
              </p>
              <p className="text-foreground">
                We encourage you to review this privacy policy periodically to
                stay informed about how we are protecting your information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                11. Contact Information
              </h2>
              <p className="text-foreground mb-3">
                If you have any questions about this privacy policy or our data
                practices, please contact us:
              </p>
              <div className="text-foreground space-y-1">
                <p>Email: bingsuedu@gmail.com</p>
                <p>Phone: +84 775 510 335</p>
                <p>Address: Di An, HCM</p>
                <p>Data Protection Officer: ngogiaan11111@gmail.com</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                12. Governing Law
              </h2>
              <p className="text-foreground">
                This privacy policy and any disputes relating to it are governed
                by the laws of [Your Jurisdiction]. Any legal proceedings
                related to this policy will be conducted in the courts of [Your
                Jurisdiction].
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
