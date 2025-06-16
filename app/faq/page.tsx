'use client'
import React, { useState } from 'react';
import { Video, ArrowLeft, ChevronDown } from "lucide-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Vicast and how does it work?",
      answer: "Vicast is an all-in-one platform that transforms your video calls into professional content. Simply start a video call, and our system automatically records each participant locally in high quality, then generates beautifully composed videos with all participants and custom frames."
    },
    {
      question: "How many participants can join a video call?",
      answer: "Vicast supports up to 50 participants in a single video call, making it perfect for large podcasts, webinars, and group discussions."
    },
    {
      question: "What video quality can I expect?",
      answer: "We offer multiple video quality options ranging from 720p for basic recordings up to 4K for professional content. The quality depends on your plan and internet connection."
    },
    {
      question: "Is there a time limit for video calls?",
      answer: "There are no time limits for video calls on Vicast. You can record sessions as long as you need for your content creation."
    },
    {
      question: "How does the automatic recording work?",
      answer: "Our system records each participant locally on their device to ensure the highest quality audio and video. All recordings are automatically synced and uploaded to our secure servers after the call ends."
    },
    {
      question: "Can I edit my recordings after the call?",
      answer: "Yes! Vicast includes smart editing tools designed specifically for podcasters and content creators. You can trim, splice, add effects, and create professional-looking videos with ease."
    },
    {
      question: "What formats can I export my videos in?",
      answer: "You can export your videos in various formats including MP4, MOV, and WebM. We also offer direct publishing to popular platforms like YouTube, Spotify, and other podcast directories."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption to protect your recordings and data. All recordings are stored securely, and you maintain full control over who can access your content."
    },
    {
      question: "Can I customize the video templates?",
      answer: "Yes, we offer customizable video templates and frames. You can add your branding, logos, and choose from various layouts to match your content style."
    },
    {
      question: "Do participants need to download any software?",
      answer: "No downloads are required! Vicast works entirely in the browser, making it easy for participants to join calls with just a simple link."
    },
    {
      question: "What happens if my internet connection is unstable?",
      answer: "Since recordings are stored locally on each participant's device, temporary internet issues won't affect the recording quality. The recordings are uploaded once a stable connection is restored."
    },
    {
      question: "Can I use Vicast for live streaming?",
      answer: "Currently, Vicast focuses on recording and post-production. Live streaming features are on our roadmap for future releases."
    },
    {
      question: "How do I get started with Vicast?",
      answer: "Getting started is simple! Sign up for a free account, schedule or start an instant video call, and invite your participants. Our system handles everything else automatically."
    },
    {
      question: "Is there customer support available?",
      answer: "Yes, we provide comprehensive customer support through email, chat, and our help center. Premium users receive priority support with faster response times."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur border-border">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2">
              <Video className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-bold">Vicast</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <button 
            onClick={()=>{router.push('/')}}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
            >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground">
                Get answers to common questions about Vicast
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-border rounded-lg">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between p-6 text-left hover:bg-accent transition-colors"
                  >
                    <h3 className="text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-muted rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <Link href={'/contact'}>
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 flex flex-col gap-6 py-8 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Vicast</span>
              </div>
              <p className="max-w-[350px] text-sm text-muted-foreground">
                Transform your video calls and podcasts into professional content with our all-in-one platform.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Product</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#features" className="text-muted-foreground hover:text-foreground">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                      How It Works
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/about" className="text-muted-foreground hover:text-foreground">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 Vicast. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}