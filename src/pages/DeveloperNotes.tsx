
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const DeveloperNotes = () => {
  const flowSteps = [
    { label: "Splash", description: "Initial loading screen with Buddha illustration and sound" },
    { label: "Emotion Check-in", description: "User selects emotion or inputs text/voice" },
    { label: "Quote", description: "Display wisdom based on emotion/input" },
    { label: "Reactions", description: "User reacts with emoji to the quote" },
    { label: "Voice/To-do", description: "User can record voice note or create to-do list" },
    { label: "Save", description: "User saves their response or wisdom" },
    { label: "Login", description: "Optional login prompt if saving multiple items" },
    { label: "Share", description: "User can share wisdom on social media" },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Developer Notes - Internal Use Only</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Flow Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center">
            {flowSteps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="bg-white rounded-lg border p-3 mb-2">
                  <div className="font-medium">{step.label}</div>
                  <div className="text-sm text-gray-500">{step.description}</div>
                </div>
                
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="mx-2 text-gray-400" />
                )}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Integration Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Firebase Login Required:</strong> After saving multiple quotes or when creating to-do lists.</li>
              <li><strong>Backend Quote Database:</strong> Connected to the emotion selection and text input on the home screen.</li>
              <li><strong>Intent Detection:</strong> Text and voice input should be processed for emotion/intent before fetching quotes.</li>
              <li><strong>Reminder Scheduling:</strong> To-do list items with time selection require local notification system.</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Audio Files:</strong> Bell sounds need to be preloaded for splash screen.</li>
              <li><strong>Image Assets:</strong> Buddha illustration for splash/home, monk portraits for quotes.</li>
              <li><strong>Social Sharing:</strong> Integration with Facebook, Instagram, and Zalo APIs.</li>
              <li><strong>Voice Recording:</strong> Implement MediaRecorder API with proper permission handling.</li>
              <li><strong>Account System:</strong> Firebase Auth with email and optional Google/Facebook.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Feature Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Phase 1 (Current Sprint)</h3>
              <ul className="list-disc pl-5">
                <li>Basic UI implementation</li>
                <li>Quote database integration</li>
                <li>Voice recording capability</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Phase 2</h3>
              <ul className="list-disc pl-5">
                <li>Account system</li>
                <li>Social sharing</li>
                <li>To-do list and reminders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium">Phase 3</h3>
              <ul className="list-disc pl-5">
                <li>Advanced emotion analysis</li>
                <li>Community features</li>
                <li>Monetization implementation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeveloperNotes;
