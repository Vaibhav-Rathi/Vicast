import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "./theme-toogle"
import { Button } from "@/components/ui/button"
import { VideoModal } from "./VideoModal"
import { ScrollToDemoButton } from "./ScrollToDemoButton"
import { Video, Edit, Download, ArrowRight, Users, Sparkles, CheckCircle } from "lucide-react"
import styles from "../utils/Landing.module.css"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 md:px-8">
          <div className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            <span className="text-2xl font-bold">Vicast</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className={`${styles.footerLink} text-sm font-medium hover:underline underline-offset-4 px-2 py-1 rounded`}>
              Features
            </Link>
            <Link href="#how-it-works" className={`${styles.footerLink} text-sm font-medium hover:underline underline-offset-4 px-2 py-1 rounded`}>
              How It Works
            </Link>
            <Link href="/faq" className={`${styles.footerLink} text-sm font-medium hover:underline underline-offset-4 px-2 py-1 rounded`}>
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" className={`${styles.loadingBtn} hidden md:inline-flex`}>
              <Link href="/signin">
                <span className={styles.btnText}>Sign In</span>
              </Link>
            </Button>
            <Button asChild className={styles.loadingBtn}>
              <Link href="/signup">
                <span className={styles.btnText}>Sign Up Free</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container px-6 md:px-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4 pl-2 md:pl-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm w-fit">Introducing Vicast</div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Transform Your Video Calls Into Professional Content
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Record, edit, and generate beautiful videos automatically from your calls and podcasts. All in one
                  platform.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup" passHref>
                    <Button size="lg" className={`${styles.loadingBtn} gap-1`}>
                      <span className={styles.btnText}>Get Started</span>
                      <ArrowRight className={`${styles.btnIcon} h-4 w-4`} />
                    </Button>
                  </Link>
                  <ScrollToDemoButton />
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
                <Image
                  src="/podcast.png"
                  alt="Vicast platform interface showing video call with multiple participants"
                  width={1280}
                  height={720}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need In One Place
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform combines video calls, recording, editing, and production in one seamless experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 px-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">HD Video Calls</h3>
                <p className="text-sm text-muted-foreground">
                  Crystal clear video and audio for up to 50 participants with no time limits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Automatic Recording</h3>
                <p className="text-sm text-muted-foreground">
                  Local recordings of every participant in high quality, automatically saved and synced.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Edit className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Editing</h3>
                <p className="text-sm text-muted-foreground">
                  Edit recordings with our intuitive tools designed for podcasters and content creators.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI-Generated Videos</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically create beautiful composite videos with all participants and custom frames.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-Participant Support</h3>
                <p className="text-sm text-muted-foreground">
                  Perfect for podcasts, interviews, and group discussions with individual audio tracks.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 text-center shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">One-Click Publishing</h3>
                <p className="text-sm text-muted-foreground">
                  Export and publish your content directly to YouTube, Spotify, and other platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple Process, Amazing Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Our platform handles the technical details so you can focus on creating great content.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 px-4">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Video className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Start Your Call</h3>
                <p className="text-sm text-muted-foreground">
                  Schedule or start an instant video call with your participants. No downloads required.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Download className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Record Automatically</h3>
                <p className="text-sm text-muted-foreground">
                  Our system records each participant locally in high quality with perfect sync.
                </p>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 text-center">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Get Your Video</h3>
                <p id="demo-section" className="text-sm text-muted-foreground">
                  After the call, receive a beautifully composed video with all participants and custom frames.
                </p>
              </div>
            </div>
            <div className="flex justify-center px-4">
              <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-xl border">
                <VideoModal />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted">
          <div className="container px-6 md:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Video Content?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of creators who are already using Vicast to produce professional content.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href={'/signup'}>
                  <Button size="lg" className={`${styles.loadingBtn} gap-1`}>
                    <span className={styles.btnText}>Get Started Free</span>
                    <ArrowRight className={`${styles.btnIcon} h-4 w-4`} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t bg-muted">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-6 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4 pl-2">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6" />
                <span className="text-xl font-bold">Vicast</span>
              </div>
              <p className="max-w-[350px] text-sm text-muted-foreground">
                Transform your video calls and podcasts into professional content with our all-in-one platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 pl-2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#features" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#how-it-works" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      How It Works
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/about" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/terms" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className={`${styles.footerLink} text-muted-foreground hover:text-foreground px-1 py-1 rounded`}>
                      Privacy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pl-2">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Vicast. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="https://twitter.com/Vaibhav_Rathi5" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="https://twitter.com/Vaibhav_Rathi5" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://twitter.com/Vaibhav_Rathi5" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">YouTube</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}