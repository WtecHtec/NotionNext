
 function ProfileCard() {
    return (
      <div className="max-w-2xl mx-auto mt-4 ">
       
  
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-base text-foreground">
            <span className="text-xl">👋</span>
            <span className="leading-relaxed">虚惊一场 · 技术宅</span>
          </div>
  
          <div className="flex items-center gap-2 text-base text-foreground">
            <span className="text-xl">⬆️</span>
            <span className="leading-relaxed">96 年</span>
          </div>
  
        </div>
  
        <div className="flex flex-wrap gap-2 mb-6">

          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-400 rounded-full text-sm text-white">
            <span>👀</span>
            <span>中国·广东省·深圳市</span>
          </div>
  
          <div className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-400 rounded-full text-sm text-white">
            <span>🏸</span>
            <span>运动</span>
          </div>
        </div>
  
        <div className="flex gap-3">
          <a
            href="https://github.com/wtechtec"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3  text-primary-foreground rounded-xl font-medium text-base hover:bg-opacity-90 transition-colors flex-1"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span>GitHub</span>
          </a>
  
          <a
            href="//iam.xujingyichang.top"
            target="_blank"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl font-medium text-base hover:bg-opacity-90 transition-colors flex-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            <span>项目</span>
          </a>
        </div>
      </div>
    )
  }

  export default ProfileCard;