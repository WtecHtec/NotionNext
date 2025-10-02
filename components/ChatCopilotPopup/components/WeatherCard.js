import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, CloudSnow, Wind, CloudFog } from 'lucide-react';

// ==================== 大风组件 ====================
const WindWeather = () => {
  return (
    <>
      {/* Wind lines */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-16 h-0.5 bg-white/30 rounded-full"
          style={{
            top: `${20 + i * 12}%`,
            left: '-20%',
            animation: `windMove ${2 + i * 0.3}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      {/* Moving clouds */}
      <div
        className="absolute top-1/4 left-0 opacity-40"
        style={{ animation: 'cloudMove 8s linear infinite' }}
      >
        <Cloud size={48} className="text-white" />
      </div>
      <div
        className="absolute top-1/2 left-0 opacity-30"
        style={{ animation: 'cloudMove 10s linear infinite', animationDelay: '2s' }}
      >
        <Cloud size={64} className="text-white" />
      </div>
      <Wind size={64} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80" />
    </>
  );
};

// ==================== 雨天组件 ====================
const RainWeather = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 1 + Math.random(),
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Raindrops */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-0.5 h-4 bg-blue-300/60 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: '-10%',
            animation: `rainFall ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      {/* Cloud */}
      <CloudRain size={64} className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/80" />
      {/* Puddles */}
      <div className="absolute bottom-8 left-1/4 w-16 h-2 bg-blue-400/30 rounded-full" 
           style={{ animation: 'puddle 3s ease-in-out infinite' }} />
      <div className="absolute bottom-8 right-1/4 w-20 h-2 bg-blue-400/30 rounded-full" 
           style={{ animation: 'puddle 3s ease-in-out infinite', animationDelay: '1s' }} />
    </>
  );
};

// ==================== 晴天组件 ====================
const SunWeather = () => {
  return (
    <>
      {/* Sun rays */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-16 bg-yellow-300/50 rounded-full origin-bottom"
          style={{
            top: '35%',
            left: '50%',
            transform: `rotate(${i * 30}deg) translateX(-50%)`,
            animation: 'sunRays 3s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      {/* Sun */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: 'sunPulse 3s ease-in-out infinite' }}
      >
        <Sun size={80} className="text-yellow-200" fill="currentColor" />
      </div>
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" 
           style={{ animation: 'sunPulse 3s ease-in-out infinite' }} />
    </>
  );
};

// ==================== 雪天组件 ====================
const SnowWeather = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Snowflakes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-white text-xl"
          style={{
            left: `${particle.left}%`,
            top: '-10%',
            animation: `snowFall ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        >
          ❄
        </div>
      ))}
      {/* Cloud */}
      <CloudSnow size={64} className="absolute top-1/4 left-1/2 -translate-x-1/2 text-white/80" />
      {/* Snow accumulation */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/30 rounded-b-2xl" 
           style={{ animation: 'snowAccumulate 8s ease-in-out infinite' }} />
    </>
  );
};

// ==================== 阴天组件 ====================
const CloudyWeather = () => {
  return (
    <>
      {/* Multiple overlapping clouds */}
      <div
        className="absolute top-1/4 left-1/4 opacity-60"
        style={{ animation: 'cloudFloat 6s ease-in-out infinite' }}
      >
        <Cloud size={72} className="text-gray-300" fill="currentColor" />
      </div>
      <div
        className="absolute top-1/3 right-1/4 opacity-50"
        style={{ animation: 'cloudFloat 7s ease-in-out infinite', animationDelay: '1s' }}
      >
        <Cloud size={64} className="text-gray-300" fill="currentColor" />
      </div>
      <div
        className="absolute top-1/2 left-1/3 opacity-70"
        style={{ animation: 'cloudFloat 8s ease-in-out infinite', animationDelay: '2s' }}
      >
        <CloudFog size={80} className="text-gray-200" fill="currentColor" />
      </div>
      {/* Drifting small clouds */}
      <div
        className="absolute top-2/3 left-0 opacity-40"
        style={{ animation: 'cloudDrift 12s linear infinite' }}
      >
        <Cloud size={48} className="text-gray-300" />
      </div>
      <div
        className="absolute top-1/2 left-0 opacity-30"
        style={{ animation: 'cloudDrift 15s linear infinite', animationDelay: '3s' }}
      >
        <Cloud size={56} className="text-gray-300" />
      </div>
    </>
  );
};

// ==================== 天气卡片容器组件 ====================
const WeatherCard = ({ type, title, tempRange, description }) => {
  console.log('WeatherCard', type, title, tempRange, description)
  const getBackgroundGradient = () => {
    switch (type) {
      case 'wind':
        return 'from-slate-700 via-slate-600 to-slate-700';
      case 'rain':
        return 'from-slate-800 via-blue-900 to-slate-800';
      case 'sun':
        return 'from-orange-500 via-yellow-400 to-orange-500';
      case 'snow':
        return 'from-slate-700 via-blue-800 to-slate-700';
      case 'cloudy':
        return 'from-gray-700 via-gray-600 to-gray-700';
      default:
        return 'from-slate-700 to-slate-800';
    }
  };

  const renderWeatherComponent = () => {
    switch (type) {
      case 'wind':
        return <WindWeather />;
      case 'rain':
        return <RainWeather />;
      case 'sun':
        return <SunWeather />;
      case 'snow':
        return <SnowWeather />;
      case 'cloudy':
        return <CloudyWeather />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-72 h-96 rounded-2xl overflow-hidden shadow-2xl">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundGradient()}`} />
      
      {/* Weather elements */}
      <div className="relative w-full h-full">
        {renderWeatherComponent()}
      </div>

      {/* Info panel */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/30 backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white text-center">{title}</h3>
        <p className="text-white/80 text-center mt-1 text-sm">{description}</p>
        {/* Temperature range */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <div className="text-white/90 font-semibold text-lg">
            {tempRange.min}°
          </div>
          <div className="w-16 h-1 bg-white/30 rounded-full">
            <div className="h-full bg-white/60 rounded-full" style={{ width: '70%' }} />
          </div>
          <div className="text-white/70 font-medium text-lg">
            {tempRange.max}°
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes windMove {
          0% { transform: translateX(0); opacity: 0; }
          20% { opacity: 0.6; }
          100% { transform: translateX(400px); opacity: 0; }
        }

        @keyframes cloudMove {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(350px); }
        }

        @keyframes rainFall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(400px); opacity: 0.3; }
        }

        @keyframes puddle {
          0%, 100% { transform: scaleX(1); opacity: 0.3; }
          50% { transform: scaleX(1.2); opacity: 0.5; }
        }

        @keyframes sunRays {
          0%, 100% { opacity: 0.3; transform: rotate(0deg) translateY(0); }
          50% { opacity: 0.8; transform: rotate(0deg) translateY(-10px); }
        }

        @keyframes sunPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes snowFall {
          0% { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(400px) translateX(20px); opacity: 0.3; }
        }

        @keyframes snowAccumulate {
          0% { height: 2rem; }
          50% { height: 3rem; }
          100% { height: 2rem; }
        }

        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }

        @keyframes cloudDrift {
          0% { transform: translateX(-100px); opacity: 0.3; }
          50% { opacity: 0.5; }
          100% { transform: translateX(350px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

// ==================== 主应用组件 ====================
 


export default WeatherCard