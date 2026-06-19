import React from 'react';
import './Logo.css';

const Logo = ({ variant = "full", size = "md", onClick }) => {
  const sizes = {
    sm: { width: 36, height: 36, fontSize: 14, textSize: 18, taglineSize: 8 },
    md: { width: 48, height: 48, fontSize: 18, textSize: 24, taglineSize: 10 },
    lg: { width: 64, height: 64, fontSize: 22, textSize: 32, taglineSize: 12 },
    xl: { width: 80, height: 80, fontSize: 28, textSize: 40, taglineSize: 14 }
  };

  const currentSize = sizes[size];

  if (variant === "icon") {
    return (
      <div className="logo-icon-only" style={{ width: currentSize.width, height: currentSize.height }} onClick={onClick}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea"/>
              <stop offset="100%" stopColor="#764ba2"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#logoGradient)"/>
          <path d="M30 70 L45 30 L55 30 L70 70 L60 70 L52 45 L48 45 L40 70 L30 70Z" fill="white"/>
          <circle cx="50" cy="42" r="6" fill="white"/>
          <path d="M65 58 L75 68 L85 58" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <path d="M15 58 L25 68 L35 58" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none"/>
          <text x="50" y="88" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AI</text>
        </svg>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="logo-minimal" onClick={onClick}>
        <div className="logo-mark" style={{ width: currentSize.width, height: currentSize.height }}>
          <svg viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#logoGradientSmall)"/>
            <defs>
              <linearGradient id="logoGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea"/>
                <stop offset="100%" stopColor="#764ba2"/>
              </linearGradient>
            </defs>
            <path d="M12 28 L18 12 L22 12 L28 28 L24 28 L20 18 L16 28 L12 28Z" fill="white"/>
            <circle cx="20" cy="17" r="3" fill="white"/>
          </svg>
        </div>
        <span className="logo-text" style={{ fontSize: currentSize.textSize }}>Sales AI</span>
      </div>
    );
  }

  // Full logo with text (Default - Option 1)
  return (
    <div className={`logo-full logo-size-${size}`} onClick={onClick}>
      <div className="logo-icon-container" style={{ width: currentSize.width, height: currentSize.height }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="mainLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea"/>
              <stop offset="100%" stopColor="#764ba2"/>
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
              <feMerge>
                <feMergeNode in="offsetblur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect width="100" height="100" rx="24" fill="url(#mainLogoGradient)" filter="url(#glow)"/>
          {/* Bar chart element */}
          <rect x="25" y="55" width="12" height="35" fill="white" rx="4" opacity="0.9"/>
          <rect x="44" y="35" width="12" height="55" fill="white" rx="4" opacity="0.9"/>
          <rect x="63" y="45" width="12" height="45" fill="white" rx="4" opacity="0.9"/>
          {/* AI Circuit lines */}
          <path d="M30 25 L40 30 L35 40 L45 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
          <path d="M70 25 L60 30 L65 40 L55 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
          {/* Brain/Smart icon */}
          <circle cx="50" cy="25" r="8" fill="white" opacity="0.3"/>
          <path d="M50 20 L50 30 M45 25 L55 25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="logo-text-container">
        <div>
          <span className="logo-main-text" style={{ fontSize: currentSize.textSize }}>Sales</span>
          <span className="logo-accent-text" style={{ fontSize: currentSize.textSize }}>AI</span>
        </div>
        <span className="logo-tagline" style={{ fontSize: currentSize.taglineSize }}>Smart Prediction System</span>
      </div>
    </div>
  );
};

export default Logo;