"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import FloatingHearts from "./floating-hearts"
import MissYouModal from "./miss-you-modal"
import WrongAnswerModal from "./wrong-answer-modal"

export default function MissYouPage() {
  const [showMissYouModal, setShowMissYouModal] = useState(false)
  const [showWrongModal, setShowWrongModal] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })

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
  }

  const handleTryAgain = () => {
    setShowWrongModal(false)
    setShowMissYouModal(true)
    setSliderValue(50)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      <FloatingHearts />

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-rose-500 mb-2">
            I miss u 💕
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold">Do u miss me?</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-8 relative z-20">
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

      {/* Modals */}
      {showMissYouModal && (
        <MissYouModal
          sliderValue={sliderValue}
          onSliderChange={setSliderValue}
          onOk={handleModalOk}
          onClose={() => setShowMissYouModal(false)}
        />
      )}

      {showWrongModal && <WrongAnswerModal onTryAgain={handleTryAgain} />}
    </div>
  )
}
