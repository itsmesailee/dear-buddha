
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  },
  {
    text: "The trouble is, you think you have time.",
    author: "Buddha"
  }
];

const DailyInspiration = () => {
  const [quoteIndex, setQuoteIndex] = useState(Math.floor(Math.random() * quotes.length));
  const [fadeIn, setFadeIn] = useState(true);

  const quote = quotes[quoteIndex];

  const changeQuote = (direction: 'next' | 'prev') => {
    setFadeIn(false);
    
    setTimeout(() => {
      if (direction === 'next') {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
      } else {
        setQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      }
      setFadeIn(true);
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl p-5 shadow-sm border border-sage-200 animate-fade-up relative overflow-hidden">
      {/* Rich visual background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-repeat bg-center" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath d='M40 10C51.85 10 60 18.15 60 30C60 41.85 51.85 50 40 50C28.15 50 20 41.85 20 30C20 18.15 28.15 10 40 10ZM40 5C25.67 5 15 15.67 15 30C15 44.33 25.67 55 40 55C54.33 55 65 44.33 65 30C65 15.67 54.33 5 40 5Z' fill='%23718c78' fill-opacity='0.2'/%3E%3Cpath d='M40 25C42.76 25 45 27.24 45 30C45 32.76 42.76 35 40 35C37.24 35 35 32.76 35 30C35 27.24 37.24 25 40 25Z' fill='%23b38c65' fill-opacity='0.2'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="flex flex-col justify-center items-center py-3 relative z-10">
        <div className="w-16 h-16 mb-3">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-saffron-300">
            <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 17.5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 45V42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 30H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 30H42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <blockquote className={`text-center transition-opacity duration-300 glass-quote p-5 rounded-lg ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <p className="font-serif text-xl text-sage-800 mb-3">"{quote.text}"</p>
          <footer className="text-saffron-600 font-medium">— {quote.author}</footer>
        </blockquote>

        <div className="flex gap-4 mt-4">
          <button 
            onClick={() => changeQuote('prev')}
            className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-sage-200 text-sage-600 hover:text-saffron-500 hover:border-saffron-200 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => changeQuote('next')}
            className="h-8 w-8 rounded-full bg-white flex items-center justify-center border border-sage-200 text-sage-600 hover:text-saffron-500 hover:border-saffron-200 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyInspiration;
