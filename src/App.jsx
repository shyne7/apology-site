import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [forgiven, setForgiven] = useState(false);

  const [noPosition, setNoPosition] = useState({
    top: "72%",
    left: "62%",
  });

  const audioRef = useRef(null);

  // Try to start music immediately when the site opens.
  // If the browser blocks autoplay, the first click/tap anywhere
  // on the page will start it.
  useEffect(() => {
    const startMusic = () => {
      if (!audioRef.current) return;

      audioRef.current.volume = 0.45;

      audioRef.current.play().catch(() => {
        // Browser blocked autoplay.
        // The next user interaction will try again.
      });
    };

    // Try immediately
    startMusic();

    // Fallback for browsers that block autoplay with sound
    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, []);

  const startExperience = () => {
    // Make absolutely sure music starts when Open is clicked
    if (audioRef.current) {
      audioRef.current.volume = 0.45;

      audioRef.current.play().catch(() => {});
    }

    setStarted(true);
  };

  const moveNoButton = () => {
    const top = Math.floor(Math.random() * 55) + 35;
    const left = Math.floor(Math.random() * 70) + 15;

    setNoPosition({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  return (
    <main className="page">

      {/* ================= MUSIC ================= */}

      <audio
        ref={audioRef}
        src="/sorry.mp3"
        autoPlay
        preload="auto"
        loop
      />

      {/* ================= BACKGROUND ================= */}

      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      {/* ================= FLOATING HEARTS ================= */}

      <div className="floating-heart heart-one">♡</div>
      <div className="floating-heart heart-two">♡</div>
      <div className="floating-heart heart-three">♡</div>
      <div className="floating-heart heart-four">♡</div>

      {/* ================= INTRO SCREEN ================= */}

      {!started ? (
        <section className="intro-screen">

          <div className="intro-small">
            hey, Aditi
          </div>

          <h1>
            I made something
            <br />
            for you
          </h1>

          <p>
            bewakoofo wala kaam hai but.
            <br />
            It's also very me.
          </p>

          <button
            className="open-button"
            onClick={startExperience}
          >
            Open it <span>→</span>
          </button>

          <div className="music-hint">
            🎧 pay attention to the music too
          </div>

          <div className="scroll-hint">
            made with questionable decisions ♡
          </div>

        </section>

      ) : !forgiven ? (

        /* ================= APOLOGY SCREEN ================= */

        <section className="card apology-card">

          <div className="emoji">
            😭
          </div>

          <div className="eyebrow">
            okay... here goes
          </div>

          <h2>
            I'm sorry yrr so much.
          </h2>

          <p className="main-message">
            I have something to tell you.
          </p>

          <div className="divider">
            <span>♡</span>
          </div>

          <p className="small-text">
            Would you forgive me?
          </p>

          <div className="buttons">

            <button
              className="yes"
              onClick={() => setForgiven(true)}
            >
              Yes ❤️
            </button>

            <button
              className="no"
              style={{
                top: noPosition.top,
                left: noPosition.left,
              }}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
            >
              No 😭
            </button>

          </div>

        </section>

      ) : (

        /* ================= FORGIVEN SCREEN ================= */

        <section className="card forgiven">

          <div className="emoji">
            😭
          </div>

          <div className="eyebrow">
            thank you so much bbg for forgiveness
          </div>

          <h1>
            YOU FORGAVE ME?
          </h1>

          <p className="forgiven-message">
            abse se ulta bakwaas nhi karunga aai sapat
          </p>

          <div className="big-heart">
            ❤️
          </div>

          <p className="small-text">
            Thank you miss aditi pandey 😭.
          </p>

        </section>

      )}

    </main>
  );
}

export default App;