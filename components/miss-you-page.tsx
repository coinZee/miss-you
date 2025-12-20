"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import FloatingHearts from "./floating-hearts"
import MissYouModal from "./miss-you-modal"
import WrongAnswerModal from "./wrong-answer-modal"
import LoveLetterModal from "./love-letter-modal"



const trackEvent = async (eventName: string) => {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventName }),
    });
    // You can console.log('Event tracked!') here if you want
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};


export default function MissYouPage() {
  const [showMissYouModal, setShowMissYouModal] = useState(false)
  const [showLoveLetterModal, setShowLoveLetterModal] = useState(false)
  const [showWrongModal, setShowWrongModal] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const [phase, setPhase] = useState(0) // 0: BABYYYYY, 1: I miss you, 2: Do you miss me, 3: Buttons

  useEffect(() => {
    moveNoButton();
    const timers = [
      setTimeout(() => setPhase(1), 2000), // Switch to "I miss you so much"
      setTimeout(() => setPhase(2), 4000), // Show "Do you miss me"
      setTimeout(() => setPhase(3), 5500), // Show buttons
    ]
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [])

  const moveNoButton = () => {
    const randomX = Math.random() * (window.innerWidth - 150)
    const randomY = Math.random() * (window.innerHeight - 100)
    setNoButtonPos({ x: randomX, y: randomY })
  }

  const handleYes = () => {
    setShowMissYouModal(true)
    setSliderValue(50)
  }

  const handleModalOk = () => {
    if (sliderValue < 100) {
      setShowMissYouModal(false)
      setShowWrongModal(true)
      setTimeout(() => setShowWrongModal(false), 2000)
    }
    else {
      setShowMissYouModal(false)
      setShowLoveLetterModal(true)
    }
  }

  const handleTryAgain = () => {
    setShowWrongModal(false)
    setShowMissYouModal(true)
    setSliderValue(50)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      <FloatingHearts />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1
            className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 transition-opacity duration-1000 ${phase === 0 ? "opacity-100" : "opacity-0"}`}
          >
            BABYYYYY...
          </h1>

          <h1
            className={`text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 transition-opacity duration-1000 ${phase >= 1 ? "opacity-100" : "opacity-0"}`}
          >
            IM SORRYYYY &lt;3
          </h1>

          <p
            className={`text-2xl md:text-3xl text-gray-700 font-semibold mt-4 transition-opacity duration-1000 ${phase >= 2 ? "opacity-100" : "opacity-0"}`}
          >
            Do you forgive me?
          </p>
        </div>

        <div
          className={`flex gap-6 justify-center items-center relative z-20 transition-opacity duration-1000 ${phase >= 3 ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            onClick={handleYes}
            className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Yes ❤️
          </Button>

          <div
            style={{
              position: "fixed",
              left: `${noButtonPos.x}px`,
              top: `${noButtonPos.y}px`,
              transition: "all 0.3s ease-out",
            }}
            className="z-20"
          >
            <Button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="px-8 py-6 text-lg font-bold bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              No 💔
            </Button>
          </div>
        </div>
      </div>

      {showMissYouModal && (
        <MissYouModal
          sliderValue={sliderValue}
          onSliderChange={setSliderValue}
          onOk={handleModalOk}
          onClose={() => setShowMissYouModal(false)}
        />
      )}
      {showLoveLetterModal && (
        <LoveLetterModal
          // onTryAgain={handleTryAgain}
          onOkayy={() => { setShowLoveLetterModal(false); trackEvent('clicked_final_okay_button'); }}
        />
      )}
      {showWrongModal && <WrongAnswerModal onTryAgain={handleTryAgain} />}
    </div>
  )
}
