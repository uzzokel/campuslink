import React from 'react';
// Assuming your theme file exports specific branding colors
import { theme } from "@/components/Styles"; 
import Link from 'next/link';

export default function AboutPage() {
  // Use fallbacks if theme colors aren't globally resolved yet
  const primaryColor = theme?.primaryColor || '#1e293b'; 
  const secondaryColor = theme?.secondaryColor || '#0ea5e9';

  return (
    <main className="min-h-dvh bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* Upper Navigation Back Link */}
      <div className="max-w-4xl w-full mx-auto px-6 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          style={{ color: primaryColor }}
        >
          ← Back to Updates
        </Link>
      </div>

      {/* Main Container Hero Layout */}
      <div className="max-w-4xl w-full mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Branding & Headline Title */}
          <div className="md:col-span-5 space-y-3">
            <span 
              className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-opacity-10"
              style={{ color: secondaryColor, backgroundColor: `${secondaryColor}15` }}
            >
              Our Mission
            </span>
            <h1 
              className="text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ color: primaryColor }}
            >
              About <br />CampusLink
            </h1>
            <p className="text-sm text-slate-400 font-medium">
              Connecting campus ecosystems instantly.
            </p>
          </div>

          {/* Narrative Content Card */}
          <div className="md:col-span-7 bg-white border border-slate-100 rounded-3xl shadow-sm p-6 md:p-8 space-y-4">
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              Welcome to <strong style={{ color: primaryColor }}>CampusLink</strong>, your central verification hub for real-time announcements, core updates, and narrative updates unfolding within your campus network.
            </p>
            
            <p className="text-slate-600 text-base leading-relaxed">
              We eliminate clutter by allowing creators, students, and authorized departments to seamlessly catalog real events as they happen. From breaking schedule modifications to local alerts, everything shared here remains authenticated, precise, and easily accessible.
            </p>

            {/* Quick Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-2xl font-bold" style={{ color: primaryColor }}>Real-time</p>
                <p className="text-xs text-slate-400 font-medium">Instant Notifications</p>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{ color: secondaryColor }}>100%</p>
                <p className="text-xs text-slate-400 font-medium">Verified Contributions</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Structural Utility Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-100 bg-white text-xs text-slate-400 font-medium">
        CampusLink © {new Date().getFullYear()} • All Rights Reserved
      </footer>

    </main>
  );
}
