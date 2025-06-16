'use client'

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function ScrollToDemoButton() {
  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo-section');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button variant="outline" size="lg" onClick={scrollToDemo} className="gap-1">
      <Play className="h-4 w-4" />
      Watch Demo
    </Button>
  );
}