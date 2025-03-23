
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sage-50/50 p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sage-300">
            <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 40C35.5228 40 40 35.5228 40 30C40 24.4772 35.5228 20 30 20C24.4772 20 20 24.4772 20 30C20 35.5228 24.4772 40 30 40Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 17.5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M30 45V42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.5 30H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 30H42.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        
        <h1 className="text-4xl font-serif font-medium text-sage-800 mb-4">404</h1>
        <p className="text-xl text-sage-600 mb-6">This page has found inner peace and gone elsewhere.</p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Mindful Path</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
