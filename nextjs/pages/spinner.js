// pages/spinner.js
import Script from "next/script";
import { useEffect } from "react";

export default function SpinnerPage() {
  useEffect(() => {
    // Wait until Winwheel is loaded on window
    const init = () => {
      if (typeof window === "undefined" || !window.Winwheel) return;

      // Create the wheel: 2 halves, red (lose) and blue (win)
      const theWheel = new window.Winwheel({
        canvasId: "wheelCanvas",
        numSegments: 2,
        segments: [
          { fillStyle: "red", text: "You lose!" },
          { fillStyle: "blue", text: "You win!" },
        ],
        lineWidth: 2,
        pointerGuide: { display: true, strokeStyle: "#333", lineWidth: 2 },
        animation: {
          type: "spinToStop",
          duration: 5,     // seconds
          spins: 8,        // initial spins
          callbackFinished: (indicatedSegment) => {
            const msg = indicatedSegment?.text || "—";
            const out = document.getElementById("result");
            if (out) out.textContent = msg;
          },
        },
      });

      const spinBtn = document.getElementById("spinBtn");
      if (spinBtn) {
        spinBtn.onclick = () => {
          // Reset then spin
          theWheel.stopAnimation(false);
          theWheel.rotationAngle = 0;
          theWheel.draw();
          theWheel.startAnimation();
          const out = document.getElementById("result");
          if (out) out.textContent = "Spinning…";
        };
      }
    };

    // Small delay to ensure scripts are present
    const t = setTimeout(init, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {/* Load GSAP TweenMax v2 (required by Winwheel) */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"
        strategy="beforeInteractive"
      />
      {/* Load your downloaded Winwheel from /public/js */}
      <Script src="/js/Winwheel.min.js" strategy="beforeInteractive" />

      <div className="flex flex-col items-center gap-4">
        {/* Arrow pointer */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderBottom: "18px solid #222",
            marginBottom: 8,
          }}
          aria-hidden
        />

        {/* Canvas for wheel */}
        <canvas
          id="wheelCanvas"
          width="500"
          height="500"
          style={{ display: "block" }}
        />

        {/* Controls */}
        <div className="flex items-center gap-8">
          <button
            id="spinBtn"
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid #ddd",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Spin
          </button>

          <div id="result" style={{ minWidth: 140, textAlign: "center" }}>
            Ready
          </div>
        </div>
      </div>
    </main>
  );
}
