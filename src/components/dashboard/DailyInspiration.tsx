
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
    <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-2xl p-5 shadow-sm border border-sage-200 animate-fade-up">
      <div className="flex flex-col justify-center items-center py-3">
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

        <blockquote className={`text-center transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
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
