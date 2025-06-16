'use client'

import React from 'react';
import { Video, Users, Download, Shield, Zap, Calendar, Star, ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Multi-Participant Video Conferencing",
      description: "Connect with multiple participants seamlessly in high-quality video calls. Support for up to 50 participants with adaptive video layouts that automatically adjust based on the number of active speakers.",
      badge: "New",
      highlights: ["Up to 50 participants", "Adaptive layouts", "HD video quality", "Real-time switching"]
    },
    {
      icon: <Download className="w-8 h-8 text-green-500" />,
      title: "Local Recording",
      description: "Record your meetings directly to your device with our new local recording feature. No cloud storage needed - keep your recordings private and secure on your own machine.",
      badge: "Featured",
      highlights: ["Privacy-first recording", "No cloud dependency", "Multiple formats", "Instant access"]
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Enhanced Security",
      description: "End-to-end encryption ensures your conversations stay private. With local recording, your data never leaves your control.",
      badge: "Improved",
      highlights: ["End-to-end encryption", "Local data control", "Secure connections", "Privacy protection"]
    }
  ];

  const updates = [
    {
      date: "May 2025",
      title: "Multi-Participant Support Launch",
      description: "Introducing support for multiple participants with intelligent video switching and layout optimization."
    },
    {
      date: "May 2025",
      title: "Local Recording Feature",
      description: "New local recording capability allows you to save meetings directly to your device for maximum privacy and control."
    },
    {
      date: "May 2025",
      title: "Performance Improvements",
      description: "Optimized video processing for smoother performance with multiple participants and reduced bandwidth usage."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">What's New</h1>
          </div>
          <p className="mt-2 text-lg text-foreground/70">Discover the latest features and improvements to your video conferencing experience</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-purple-600 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Latest Updates - May 2025
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Powerful New Features for
            <span className="text-purple-600"> Better Collaboration</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            We've enhanced our platform with multi-participant video conferencing and local recording capabilities to give you more control and flexibility in your meetings.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-background/50 rounded-lg">
                  {feature.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  feature.badge === 'New' ? 'bg-green-100 text-green-800' :
                  feature.badge === 'Featured' ? 'bg-blue-100 text-blue-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-foreground/70 mb-4">{feature.description}</p>
              <div className="space-y-2">
                {feature.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center text-sm text-foreground/80">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Demo Section */}
        <div className="bg-purple-600 rounded-2xl p-8 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">See It In Action</h3>
            <p className="text-xl text-blue-100 mb-8">
              Experience the power of multi-participant video conferencing with local recording
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
              <button onClick={()=>{router.push('/dashboard/studio')}} className="bg-blue-500 bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all flex items-center justify-center">
                Start Meeting
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Update Timeline */}
        <div className="bg-background rounded-xl shadow-lg p-8 mb-12 border">
          <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            Recent Updates
          </h3>
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div key={index} className="flex items-start space-x-4 pb-6 border-b last:border-b-0">
                <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{update.title}</h4>
                    <span className="text-sm text-foreground/60 bg-background/50 px-2 py-1 rounded border">{update.date}</span>
                  </div>
                  <p className="text-foreground/70">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-foreground/70">Participants Supported</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-foreground/70">Local Recording Privacy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">HD</div>
            <div className="text-foreground/70">Video Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;