"use client"

interface MissYouModalProps {
  sliderValue: number
  onSliderChange: (value: number) => void
  onOk: () => void
  onClose: () => void
}

export default function MissYouModal({ sliderValue, onSliderChange, onOk, onClose }: MissYouModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">I miss you too! 💕</h2>
        <p className="text-center text-gray-600 mb-6">But how much do u miss me?</p>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700">Miss-O-Meter</label>
            <span className="text-xl font-bold text-pink-500">{sliderValue}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => onSliderChange(Number(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-200 to-pink-200 rounded-full appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        {sliderValue === 100 && (
          <p className="text-center text-sm text-green-600 font-semibold mb-4 animate-pulse">Perfect! 🎉</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all ${
              sliderValue === 100
                ? "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                : "bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500"
            }`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
