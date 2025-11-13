"use client"

interface LoveLetterModalProps {
  onOkayy: () => void
}

export default function LoveLetterModal({ onOkayy }: LoveLetterModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in bounce-in text-center">
        {/* <div className="text-6xl mb-4">😤</div> */}
        <h2 className="text-2xl font-bold text-pink-600 mb-2">Baby Chandria, My love.</h2>
        <div className="mx-auto w-full max-w-[min(92vw,720px)] max-h-[84vh] overflow-auto bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-2xl p-6 mb-6 shadow-lg ring-1 ring-pink-100 text-center flex flex-col items-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-3">💌</div>

            <p className="font-serif text-pink-700 text-sm sm:text-base md:text-lg leading-relaxed tracking-wide whitespace-normal break-words">
            I'm truly sorry for what I said earlier — I never meant to hurt you. I regret letting my emotions get the best of me and the pain I caused. You mean everything to me, and I promise to keep growing and being a better partner.
            </p>

            <p className="mt-4 font-medium text-pink-600 text-sm sm:text-base md:text-lg leading-relaxed whitespace-normal">
            My love for you is so big that words fall short. English doesn't have enough words to describe it. I'm here to stay and work through this with you.
            </p>

            <div className="mt-4 text-pink-400 text-xs sm:text-sm md:text-base">— forever & always</div>
        </div>

        <button
          onClick={onOkayy}
          className="w-full mt-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all"
        >
          Okay...
        </button>
      </div>
    </div>
  )
}


