'use client'
import React from 'react';
import { Video, ArrowLeft, Users, Zap, Heart, Target, Award, Globe } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function AboutPage() {
    const router = useRouter()
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former product lead at Zoom with 8+ years in video technology. Passionate about democratizing content creation.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&s"
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder", 
      bio: "Ex-Google engineer specializing in real-time video processing and AI. Built scalable systems serving millions.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVQP5_OOoV0CIvHU6CqQ20o8FFhpNoDnnXNA&s"
    },
    {
      name: "Emily Thompson",
      role: "Head of Product",
      bio: "Product designer with expertise in creator tools. Previously led design at Anchor (acquired by Spotify).",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQknLfoxKk38a2ZQqRDYUSIX_GxPK4qLub1Bw&s"
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Full-stack developer with experience in WebRTC and video infrastructure. Former Netflix engineering lead.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfX2VHlWdQAY-aFbelHP0Tr7gHqYnobGVuarrNZo1pXfW2XvW3pbpzzyK6d2YBuU7D7c&usqp=CAU"
    }
  ];

  const values = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Creator-First",
      description: "Every feature we build is designed with content creators in mind, making professional video production accessible to everyone."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with video technology, bringing cutting-edge solutions to market."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Quality",
      description: "We believe great content deserves great tools. Quality is never compromised in our pursuit of simplicity."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Accessibility",
      description: "Professional video production shouldn't require expensive equipment or technical expertise. We make it simple."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Creators" },
    { number: "500,000+", label: "Videos Generated" },
    { number: "50M+", label: "Minutes Recorded" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur border-border">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <a href="#" className="flex items-center gap-2">
              <Video className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">Vicast</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/faq" className="text-sm font-medium hover:text-primary">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={()=>{router.push('/')}} 
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
          
          {/* Hero Section */}
          <section className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                About Vicast
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                Democratizing Professional Video Content Creation
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We believe every creator deserves access to professional-quality video tools. Vicast transforms the way people create, edit, and share video content by making complex video production simple and accessible.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 bg-muted rounded-lg mb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To eliminate the technical barriers that prevent creators from producing high-quality video content. We envision a world where anyone can create professional podcasts, interviews, and video content without needing expensive equipment, technical expertise, or complicated software.
              </p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Trusted by Creators Worldwide</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4 p-6 rounded-lg border border-border bg-background">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  Vicast was born from a simple frustration: creating professional video content was too complicated and expensive. Our founders, having worked at companies like Zoom, Google, and Netflix, saw firsthand how video technology could be powerful yet accessible.
                </p>
                <p className="mb-6">
                  In 2023, we set out to build the platform we wished existed – one that would handle all the technical complexity behind the scenes while giving creators the tools they needed to focus on what matters most: their content.
                </p>
                <p className="mb-6">
                  Today, Vicast serves thousands of podcasters, content creators, educators, and businesses who rely on our platform to produce professional-quality video content. From solo podcasters to large-scale webinars, our technology adapts to meet creators where they are.
                </p>
                <p>
                  We're just getting started. Our vision extends far beyond video calls – we're building the future of content creation, where anyone with a story to tell can share it with the world in the highest quality possible.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recognition Section */}
          <section className="py-16 bg-muted rounded-lg mb-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Recognition</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">TechCrunch Disrupt</h3>
                  <p className="text-sm text-muted-foreground">Startup Battlefield Finalist 2024</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Product Hunt</h3>
                  <p className="text-sm text-muted-foreground">#1 Product of the Day</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Fast Company</h3>
                  <p className="text-sm text-muted-foreground">Most Innovative Company in Media</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Ready to transform your video content creation? Join thousands of creators who trust Vicast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                onClick={()=>{router.push('/signin')}}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Get Started Free
                </button>
                <button
                    onClick={()=>{router.push('/contact')}} 
                    className="px-6 py-3 border border-border rounded-md hover:bg-accent transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 flex flex-col gap-6 py-8 md:py-12">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Video className="h-6 w-6 text-primary" />
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