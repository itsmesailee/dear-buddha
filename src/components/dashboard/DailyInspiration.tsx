
import React from 'react';

const quotes = [
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "You will not be punished for your anger, you will be punished by your anger.",
    author: "Buddha"
  },
  {
    text: "To understand everything is to forgive everything.",
    author: "Buddha"
  }
];

const DailyInspiration = () => {
  // Get a random quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-100 animate-fade-up [animation-delay:300ms]">
      <h2 className="section-heading">Daily Inspiration</h2>
      
      <div className="flex flex-col justify-center items-center py-4">
        <div className="w-16 h-16 mb-4">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-300">
            <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 17.5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 45V42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 30H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 30H42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <blockquote className="text-center">
          <p className="font-serif text-lg text-sage-800 mb-2">"{randomQuote.text}"</p>
          <footer className="text-sage-600 font-medium">— {randomQuote.author}</footer>
        </blockquote>
      </div>
    </div>
  );
};

export default DailyInspiration;
