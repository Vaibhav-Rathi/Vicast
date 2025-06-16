import Link from "next/link"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col w-screen items-center">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6" />
              <span className="text-2xl font-bold">Vicast</span>
            </Link>
          </div>
          <div className="flex gap-5 mr-5">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: May 8, 2025</p>
          </div>
          <div className="mt-10 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">1. Introduction</h2>
              <p>
                Welcome to Vicast ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
                the security of your personal information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our video call, recording, and AI-based 
                content generation platform.
              </p>
              <p>
                By accessing or using Vicast, you agree to this Privacy Policy. If you do not agree with our policies
                and practices, please do not use our platform.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold">2.1 Personal Information</h3>
              <p>
                We may collect the following personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Account Information:</span> Name, email address, password, profile picture, and other information you provide when creating an account.
                </li>
                <li>
                  <span className="font-medium">Payment Information:</span> Credit card details, billing address, and other payment-related information if you subscribe to our paid services.
                </li>
                <li>
                  <span className="font-medium">Profile Information:</span> Information you add to your profile, such as biography, social media links, and professional details.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">2.2 Content Data</h3>
              <p>
                When using our platform, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Audio and Video Recordings:</span> Content captured during your video calls, podcast sessions, or uploads.
                </li>
                <li>
                  <span className="font-medium">Voice Data:</span> Voice recordings used for AI voice generation features.
                </li>
                <li>
                  <span className="font-medium">Generated Content:</span> AI-generated clips, edits, and other content created through our platform.
                </li>
                <li>
                  <span className="font-medium">Chat Messages:</span> Text communications sent during video calls.
                </li>
              </ul>

              <h3 className="text-xl font-semibold">2.3 Usage Data</h3>
              <p>
                We automatically collect certain information when you visit, use, or navigate our platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Device Information:</span> IP address, browser type, operating system, and device information.
                </li>
                <li>
                  <span className="font-medium">Usage Patterns:</span> How you interact with our platform, features used, time spent, and actions taken.
                </li>
                <li>
                  <span className="font-medium">Log Data:</span> Error reports, performance data, and diagnostic information.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and maintaining our platform services.</li>
                <li>Processing and completing transactions.</li>
                <li>Storing and processing recordings for playback and editing.</li>
                <li>Training and improving our AI algorithms for video editing and voice generation.</li>
                <li>Personalizing your experience and delivering content relevant to your interests.</li>
                <li>Responding to your inquiries, comments, or concerns.</li>
                <li>Sending administrative information, updates, and marketing communications.</li>
                <li>Analyzing usage patterns to improve our platform.</li>
                <li>Detecting, preventing, and addressing technical issues or security incidents.</li>
                <li>Complying with legal obligations.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">4. Recording and AI-Generated Content</h2>
              <h3 className="text-xl font-semibold">4.1 Local Recording</h3>
              <p>
                Vicast provides local recording capabilities for video calls and podcasts. These recordings are:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Initially stored locally on your device during recording.</li>
                <li>Automatically synced to our secure cloud storage when connectivity is available.</li>
                <li>Accessible only to you and participants with whom you choose to share them.</li>
              </ul>
              <p>
                You are responsible for obtaining appropriate consent from all participants before recording any session.
              </p>

              <h3 className="text-xl font-semibold">4.2 AI Voice Generation</h3>
              <p>
                Our AI voice generation features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process voice samples to create AI-generated speech.</li>
                <li>Store voice patterns securely to enable the feature.</li>
                <li>Require explicit consent before creating voice models from your audio.</li>
              </ul>
              <p>
                You must not create AI voice models of individuals without their explicit consent.
              </p>

              <h3 className="text-xl font-semibold">4.3 AI Clip Generation</h3>
              <p>
                Our AI-based clip generation features:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Analyze your recordings to identify potentially interesting segments.</li>
                <li>Process content to create suggested clips and edits.</li>
                <li>May use recordings to improve our AI algorithms in an anonymized format.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">5. Data Sharing and Disclosure</h2>
              <p>
                We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Service Providers:</span> Third-party vendors who perform services on our behalf (cloud storage, payment processing, analytics).
                </li>
                <li>
                  <span className="font-medium">Business Partners:</span> Companies with whom we collaborate to offer joint services or promotions.
                </li>
                <li>
                  <span className="font-medium">Legal Authorities:</span> When required by law, court order, or governmental regulation.
                </li>
                <li>
                  <span className="font-medium">Other Users:</span> Information you choose to share with other users of the platform.
                </li>
                <li>
                  <span className="font-medium">Corporate Transactions:</span> In connection with a merger, acquisition, or sale of assets.
                </li>
              </ul>
              <p>
                We do not sell your personal information or content to third parties for their marketing purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>End-to-end encryption for video calls and recordings.</li>
                <li>Secure cloud storage with industry-standard encryption.</li>
                <li>Regular security assessments and audits.</li>
                <li>Access controls limiting who can view your content.</li>
                <li>Continuous monitoring for unauthorized access.</li>
              </ul>
              <p>
                However, no method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">7. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and review your personal information.</li>
                <li>Correct inaccurate or incomplete information.</li>
                <li>Delete your personal information under certain circumstances.</li>
                <li>Object to or restrict certain processing activities.</li>
                <li>Data portability (receiving your data in a structured format).</li>
                <li>Withdraw consent for activities based on consent.</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@vicast.com.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">8. Children's Privacy</h2>
              <p>
                Our platform is not intended for children under 16 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When transferring data internationally, we implement appropriate safeguards to protect your information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">10. Retention Period</h2>
              <p>
                We retain your personal information and content for as long as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your account remains active.</li>
                <li>Necessary to provide you with our services.</li>
                <li>Required to comply with legal obligations.</li>
                <li>Needed to resolve disputes or enforce agreements.</li>
              </ul>
              <p>
                You can request deletion of your content and personal information at any time through your account settings or by contacting us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and indicating the date of the latest revision.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">12. Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="pl-6">
                <p>Email: privacy@vicast.com</p>
                <p>Address: 123 Tech Park Avenue, San Francisco, CA 94107</p>
                <p>Phone: (555) 123-4567</p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold">13. Cookie Policy</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. For more information about our use of cookies, please see our <Link href="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <div className="mt-12 pt-6 border-t">
              <p className="text-center text-sm text-muted-foreground">
                By using Vicast, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted w-full">
        <div className="container py-6 flex justify-center items-center">
            <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vicast. All rights reserved.
            </p>
        </div>
       </footer>
    </div>
  )
}