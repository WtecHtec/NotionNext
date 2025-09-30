 
 import useSound from 'use-sound';

 function VocabularyCard({
  word,
  phonetic,
  phoneticBreakdown,
  chinesePronunciation,
  chineseDefinition,
  englishDefinition,
  exampleEnglish,
  exampleChinese,
}) {

    const [play] = useSound(`https://dict.youdao.com/dictvoice?audio=${word}&type=2` , {
        html5: true,
        format: ['mp3'],
        loop: false,
        volume: 1,
        rate: 1,
      });

  const handlePronounce = () => {
    play()
    // if ("speechSynthesis" in window) {
    //   const utterance = new SpeechSynthesisUtterance(word)
    //   utterance.lang = "en-US"
    //   utterance.rate = 0.8
    //   window.speechSynthesis.speak(utterance)
    // }
  }

  return (
    <div className="w-full max-w-2xl mx-auto  rounded-xl bg-white  mt-4 ">
      {/* Word Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-5xl font-bold text-blue-600 mb-2">{word}</h1>
          <p className="text-xl text-gray-600 font-mono">{phonetic}</p>
        </div>
        <button
          onClick={handlePronounce}
          className="h-12 w-12 rounded-full border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center transition-colors"
          aria-label="Pronounce word"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </button>
      </div>

      {/* Phonetic Breakdown */}
      { phoneticBreakdown.length ?
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex flex-wrap gap-3">
          {phoneticBreakdown.map((item, index) => (
            <div key={index} className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-gray-200">
              <span className="text-lg font-semibold text-gray-900">{item.syllable}</span>
              <span className="text-sm text-blue-600 font-mono">{item.pronunciation}</span>
            </div>
          ))}
        </div>
      </div>
      : null
      }

      {/* Chinese Pronunciation */}
      {/* <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h2 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
          模拟音 Chinese Pronunciation
        </h2>
        <p className="text-2xl font-medium text-amber-700">{chinesePronunciation}</p>
      </div> */}

      {/* Definitions */}
      <div className="mb-6 space-y-4">
        <div className={ chineseDefinition ? 'block' : 'hidden'}>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
            中文释义:
          </h2>
          <p className="text-lg text-gray-900 leading-relaxed">{chineseDefinition}</p>
        </div>
        <div className={ englishDefinition ? 'block' : 'hidden'}>
          <h2 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">English Definition:</h2>
          <p className="text-lg text-gray-900 leading-relaxed italic">{englishDefinition}</p>
        </div>
      </div>

      {/* Example Sentences */}
      <div className={ ` ${ exampleEnglish || exampleChinese ? 'block' : 'hidden'}  pt-6 border-t border-gray-200`}>
        <h2 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wide">例句:</h2>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-600 font-semibold shrink-0">EN:</span>
            <p className="text-base text-gray-900 leading-relaxed">{exampleEnglish}</p>
          </div>
          <div className="flex gap-3">
            <span className="text-amber-700 font-semibold shrink-0">中:</span>
            <p className="text-base text-gray-900 leading-relaxed">{exampleChinese}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default VocabularyCard;