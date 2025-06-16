import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <rect x="8" y="12" width="8" height="6" rx="1" />
              </svg>
              <span className="text-2xl font-bold">Vicast</span>
            </Link>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
          <div className="flex gap-6 mr-5">
            <Link
                href="/"
                className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
                </Link>
                <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4">
                Privacy Policy
            </Link>
          </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-4xl py-12">
          <div className="mt-6 space-y-8">
            <div>
              <h1 className="text-5xl font-bold flex justify-center">Terms of Service</h1>
              <p className="mt-2 text-muted-foreground flex justify-center">Last updated: May 8, 2025</p>
            </div>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Introduction</h2>
              <p>
                Welcome to Vicast ("Company", "we", "our", "us")! These Terms of Service ("Terms", "Terms of Service") govern your use of our website and services operated by Vicast.
              </p>
              <p>
                By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Definitions</h2>
              <p>
                <strong>"Service"</strong> refers to the Vicast application, which allows users to conduct video calls, record podcasts, generate AI-based clips, edit recordings, and utilize AI voice generation features.
              </p>
              <p>
                <strong>"User"</strong> refers to the individual accessing or using the Service, or the company or organization on behalf of which such individual is accessing or using the Service.
              </p>
              <p>
                <strong>"Content"</strong> refers to audio, video, text, images, or other materials that users upload, download, or access through our Service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Recording Consent Requirements</h2>
              <p>
                By using Vicast's recording features, you represent and warrant that you have obtained all necessary consents from all participants being recorded in accordance with applicable laws. Many jurisdictions require all parties to consent to being recorded.
              </p>
              <p>
                You are solely responsible for:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Informing all participants that the call is being recorded</li>
                <li>Obtaining necessary consent from all participants prior to recording</li>
                <li>Complying with all applicable recording consent laws in your jurisdiction and the jurisdictions of all participants</li>
                <li>Storing and using recorded content in compliance with applicable privacy laws</li>
              </ul>
              <p>
                Vicast reserves the right to terminate service for users who violate recording consent laws.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Content Ownership & License</h2>
              <p>
                Users retain all ownership rights to the content they create, record, or upload to the Service. By uploading or creating content through our Service, you grant Vicast a limited license to host, store, and process your content solely for the purpose of providing and improving the Service.
              </p>
              <p>
                For AI-generated content and features:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>You retain rights to the output generated based on your inputs</li>
                <li>You grant us permission to use your inputs to train and improve our AI systems</li>
                <li>You understand that multiple users may receive similar AI-generated outputs</li>
              </ul>
              <p>
                You represent and warrant that your content does not violate any third-party rights, including copyright, trademark, privacy, personality, or other personal or proprietary rights.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Prohibited Uses</h2>
              <p>
                You may use our Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>To record individuals without their knowledge or consent</li>
                <li>To violate any applicable local, state, national, or international law or regulation</li>
                <li>To impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Service</li>
                <li>To generate or distribute harmful, offensive, or misleading content</li>
                <li>To attempt to circumvent any technological measure implemented by Vicast to protect the Service</li>
                <li>To use any automated system to access the Service in a manner that sends more request messages than a human can reasonably produce</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. AI-Generated Content Guidelines</h2>
              <p>
                Vicast provides AI-generated video clips, editing suggestions, and voice generation features. When using these features:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>You agree not to generate content that is deceptive, defamatory, or could reasonably mislead others about its origin</li>
                <li>You acknowledge that AI-generated voice content that mimics real individuals without their consent may violate laws in certain jurisdictions</li>
                <li>You are responsible for reviewing AI-generated content before publishing or distributing it</li>
                <li>You understand that AI systems may produce unexpected or unintended outputs, and you take responsibility for the final content you choose to use</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Service Modifications and Termination</h2>
              <p>
                We reserve the right to modify or discontinue, temporarily or permanently, the Service with or without notice. We shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
              </p>
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Data Retention and Deletion</h2>
              <p>
                After account termination or deletion:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Your recorded content will be deleted from our active systems within 30 days</li>
                <li>Backup copies may remain in our system for up to 90 days</li>
                <li>We may retain certain information as required by law or for legitimate business purposes</li>
                <li>We will not retain your data longer than necessary for providing our services</li>
              </ul>
              <p>
                You can request deletion of your content at any time through your account settings or by contacting our support team.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">10. Limitation Of Liability</h2>
              <p>
                In no event shall Vicast, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Your access to or use of or inability to access or use the Service</li>
                <li>Any conduct or content of any third party on the Service</li>
                <li>Any content obtained from the Service</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
                <li>Technical failures or lost recordings</li>
                <li>AI-generated content that does not meet your expectations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">11. Changes To These Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              <p>
                We will provide notice of any significant changes to these Terms by posting the new Terms on this page and updating the "last updated" date at the top of this page.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">12. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="font-medium">legal@vicast.example.com</p>
            </section>
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