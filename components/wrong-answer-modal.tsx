"use client"

interface WrongAnswerModalProps {
  onTryAgain: () => void
}

export default function WrongAnswerModal({ onTryAgain }: WrongAnswerModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in bounce-in text-center">
        <div className="text-6xl mb-4">😤</div>
        <h2 className="text-2xl font-bold text-red-600 mb-2">WRONG ANSWER!</h2>
        <p className="text-gray-600 mb-6">You need to miss me 100%! Try again pwease</p>

        <button
          onClick={onTryAgain}
          className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
