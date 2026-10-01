import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [forgiven, setForgiven] = useState(false);
  const [showNote, setShowNote] = useState(false);

  const [noPosition, setNoPosition] = useState({
    top: "72%",
    left: "62%",
  });

  const audioRef = useRef(null);

  // ================= MUSIC =================

  useEffect(() => {
    const startMusic = () => {
      if (!audioRef.current) return;

      audioRef.current.volume = 0.45;

      audioRef.current.play().catch(() => {
        // Browser may block autoplay.
        // Any interaction will try again.
      });
    };

    // Try immediately
    startMusic();

    // Fallback if browser blocks autoplay
    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
    window.addEventListener("keydown", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  // ================= OPEN EXPERIENCE =================

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.45;
      audioRef.current.play().catch(() => {});
    }

    setStarted(true);
  };

  // ================= NO BUTTON =================

  const moveNoButton = () => {
    const top = Math.floor(Math.random() * 55) + 35;
    const left = Math.floor(Math.random() * 70) + 15;

    setNoPosition({
      top: `${top}%`,
      left: `${left}%`,
    });
  };

  // ================= YES =================

  const handleYes = () => {
    setForgiven(true);
  };

  // ================= FINAL NOTE =================

  const openNote = () => {
    setShowNote(true);
  };

  return (
    <main className="page">

      {/* ================= AUDIO ================= */}

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

      <div className="floating-heart heart-one">♡</div>
      <div className="floating-heart heart-two">♡</div>
      <div className="floating-heart heart-three">♡</div>
      <div className="floating-heart heart-four">♡</div>

      {/* ===================================================== */}
      {/* ================= INTRO SCREEN ====================== */}
      {/* ===================================================== */}

      {!started ? (
        <section className="intro-screen">

          <div className="intro-small">
            hey, Aditi
          </div>

          <h1>
            I made you something
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

        /* ===================================================== */
        /* ================= APOLOGY SCREEN =================== */
        /* ===================================================== */

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
            Will you forgive me?
          </p>

          <div className="buttons">

            <button
              className="yes"
              onClick={handleYes}
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

      ) : !showNote ? (

        /* ===================================================== */
        /* ================= FORGIVEN SCREEN ================= */
        /* ===================================================== */

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

          <div className="cat-video-wrapper">

            <video
              className="cat-video"
              src="/cat.mp4"
              autoPlay
              loop
              muted
              playsInline
            />

          </div>

          <p className="small-text">
            Thank you miss aditi pandey 😭.
          </p>

          <button
            className="note-button"
            onClick={openNote}
          >
            wait... one last thing →
          </button>

        </section>

      ) : (

        /* ===================================================== */
        /* ================= FINAL NOTE ======================= */
        /* ===================================================== */

        <section className="card note-page">

          <div className="note-eyebrow">
            okay wait...
          </div>

          <h1>
            one last thing.
          </h1>

          <p className="note-intro">
            this one is actually handwritten.
          </p>

          <div className="note-paper">

            <img
              src="/apology-note.png"
              alt="Handwritten apology note"
              className="apology-note"
            />

          </div>

          <p className="note-footer">
            that's it. i mean it bhai mummy kasam no lying. 🤍
          </p>

        </section>

      )}

    </main>
  );
}

export default App;