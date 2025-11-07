import React, { useState, useEffect } from "react";
import "./BirthdayCard.css";
import frontPhoto from "./senpai.jpg";
import coverPhoto from "./anu3.jpg";

const BirthdayCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate Texas midnight (Central Time)
  const getTexasMidnight = () => {
    const now = new Date();
    const texasTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
    const tomorrow = new Date(texasTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.getTime();
  };

  useEffect(() => {
    const texasMidnight = getTexasMidnight();
    const now = new Date().getTime();
    
    if (now >= texasMidnight) {
      setShowCard(true);
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = texasMidnight - now;

      if (distance <= 0) {
        clearInterval(timer);
        setShowCard(true);
        // Start celebration animation
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 5000); // Celebration lasts 5 seconds
      } else {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCardClick = () => {
    if (showCard) {
      setIsOpen(!isOpen);
    }
  };

  if (!showCard && timeLeft) {
    return (
      <div className="countdown-container">
        <div className="countdown-content">
          <div className="countdown-title">🎉 Birthday Countdown 🎉</div>
          <div className="countdown-subtitle">Your special surprise unlocks at midnight!</div>
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <span className="time-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
              <span className="time-label">Minutes</span>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <span className="time-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
          <div className="countdown-message">
            <p>Get ready for something special! 🎂</p>
            <p>Texas Time Zone (CT)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="birthday-card-container">
      {/* Celebration Animations */}
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="balloons-pop">
            <div className="balloon-pop balloon-pop-1">🎈</div>
            <div className="balloon-pop balloon-pop-2">🎈</div>
            <div className="balloon-pop balloon-pop-3">🎈</div>
            <div className="balloon-pop balloon-pop-4">🎈</div>
            <div className="balloon-pop balloon-pop-5">🎈</div>
          </div>
          <div className="firecrackers">
            <div className="firecracker firecracker-1">💥</div>
            <div className="firecracker firecracker-2">💥</div>
            <div className="firecracker firecracker-3">💥</div>
            <div className="firecracker firecracker-4">💥</div>
            <div className="firecracker firecracker-5">💥</div>
          </div>
          <div className="sparkles">
            <div className="sparkle-large sparkle-large-1">✨</div>
            <div className="sparkle-large sparkle-large-2">✨</div>
            <div className="sparkle-large sparkle-large-3">✨</div>
          </div>
        </div>
      )}

      {/* Blur overlay that disappears when card is shown */}
      {!showCard && <div className="blur-overlay"></div>}
      
      <div
        className={`birthday-card ${isOpen ? "open" : ""} ${!showCard ? "blurred" : ""}`}
        onClick={handleCardClick}
      >
        {/* Front of the card - Closed state */}
        <div className="card-front">
          <div className="front-content">
            <div className="front-image-section">
              <div className="image-container">
                <img
                  src={frontPhoto}
                  alt="Birthday Celebration"
                  className="front-image"
                />
                <div className="gradient-overlay"></div>
                <div className="floating-elements">
                  
                </div>
              </div>
            </div>
            <div className="front-text-section">
              <div className="text-content">
                <div className="icon-wrapper">
                  <div className="main-icon">✨</div>
                </div>
                <h1 className="front-title">A Special Birthday Wish</h1>
                <p className="front-subtitle">
                  Someone wonderful is celebrating today!
                </p>
                <div className="cta-button">
                  <span className="button-text">Open Your Card</span>
                  <div className="button-arrow">→</div>
                </div>
                <div className="decoration-dots">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inside of the card - Opened state */}
        <div className="card-inside">
          {/* Left side - Landscape Photo */}
          <div className="inside-left">
            <div className="photo-display">
              <div className="photo-wrapper">
                <img
                  src={coverPhoto}
                  alt="Birthday Celebration"
                  className="landscape-photo"
                />
                <div className="photo-effects">
                  <div className="sparkle sparkle-1">✨</div>
                  <div className="sparkle sparkle-2">✨</div>
                  <div className="sparkle sparkle-3">✨</div>
                </div>
                <div className="photo-border"></div>
                <div className="photo-shine"></div>
              </div>
              <div className="photo-message">
                <h3>Celebrating You! 🎊</h3>
                <p>Today is all about your wonderful journey</p>
              </div>
            </div>
          </div>

          {/* Right side - Message */}
          <div className="inside-right">
            <div className="message-scroll">
              <div className="message-header">
                <div className="title-container">
                  <h1 className="birthday-title">Happy Birthday!</h1>
                  <div className="title-underline"></div>
                </div>
                <div className="decoration-emojis">
                  <span className="emoji">🎈</span>
                  <span className="emoji">🎂</span>
                  <span className="emoji">🎁</span>
                </div>
              </div>

              <div className="message-body">
                <div className="message-text">
                  <p className="main-message">
                    Every moment with you feels like a beautiful chapter in a
                    story I never want to end. You bring warmth to my days,
                    comfort to my heart, and a kind of happiness I didn't know
                    existed before you. Today is your day, but honestly, I feel
                    like I'm the one who received the gift — you
                  </p>

                  <div className="highlight-box">
                    <p className="highlight-message">
                      I hope this year wraps you in love, fills your days with
                      laughter, and brings you everything your heart quietly
                      wishes for. I'll be right here, celebrating you, loving
                      you, and choosing you — today and always.
                    </p>
                  </div>

                  <div className="wish-list">
                    <div className="wish-item">
                      <span className="wish-icon">❤️</span>
                      <span>You make my world brighter every day</span>
                    </div>
                    <div className="wish-item">
                      <span className="wish-icon">💖</span>
                      <span>My heart smiles a little more because of you</span>
                    </div>
                    <div className="wish-item">
                      <span className="wish-icon">💘</span>
                      <span>Loving you is the best part of my life</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="message-footer">
                <div className="confetti-container">
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                </div>
                <div className="signature-section">
                  <div className="signature-line"></div>
                  <p className="signature">With warmest wishes,</p>
                  <p className="signature-name">Your Beautiful Half </p>
                  <p className="signature-name">Jester</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isOpen && showCard && (
        <div className="instruction">
          <p>Click anywhere to open this special birthday card</p>
          <div className="pulse-animation"></div>
        </div>
      )}
    </div>
  );
};

export default BirthdayCard;
