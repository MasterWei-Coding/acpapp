// pages/spinner.js
import Script from "next/script";
import { useEffect, useState } from "react";

export default function SpinnerPage() {
  const [balance, setBalance] = useState(1000); // starting balance
  const [bet, setBet] = useState(100); // default bet amount

  useEffect(() => {
    const init = () => {
      if (typeof window === "undefined" || !window.Winwheel) return;

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
          duration: 5,
          spins: 8,
          callbackFinished: (indicatedSegment) => {
            const msg = indicatedSegment?.text || "—";
            const out = document.getElementById("result");
            if (out) out.textContent = msg;

            // Update balance based on result
            if (msg === "You win!") {
              // Win x1 payout: profit equals bet (add +bet)
              setBalance((prev) => prev + bet);
            } else if (msg === "You lose!") {
              setBalance((prev) => Math.max(prev - bet, 0));
            }
          },
        },
      });

      const spinBtn = document.getElementById("spinBtn");
      if (spinBtn) {
        spinBtn.onclick = () => {
          if (bet <= 0 || bet > balance) {
            alert("Invalid bet amount!");
            return;
          }

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

    const t = setTimeout(init, 0);
    return () => clearTimeout(t);
  }, [bet, balance]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      {/* Load GSAP TweenMax v2 (required by Winwheel) */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"
        strategy="beforeInteractive"
      />
      {/* Load Winwheel */}
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
        />

        {/* Wheel canvas */}
        <canvas
          id="wheelCanvas"
          width="500"
          height="500"
          style={{ display: "block" }}
        />

        {/* Controls */}
        <div className="flex flex-col items-center gap-3">
          {/* Bet input */}
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            min="1"
            max={balance}
            style={{
              padding: "6px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              width: "120px",
              textAlign: "center",
            }}
          />

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

          {/* Balance display */}
          <div
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: balance > 0 ? "green" : "red",
            }}
          >
            Balance: ${balance}
          </div>
        </div>
      </div>
    </main>
  );
}
