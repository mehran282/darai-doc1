import { motion } from 'framer-motion';
import { projectInfo, mainGoals } from '../data/glossaData';
import './Hero.css';

const Hero = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="hero-title">سند استراتژیک پیاده‌سازی دستیار هوش مصنوعی گلوسا</h2>
          <p className="hero-subtitle">نقشه راه اجرایی و برنامه توسعه</p>
          
          <div className="hero-info-grid">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <div className="info-text">
                <h3>هدف اصلی</h3>
                <p>جایگزینی تدریجی و هوشمندانه ۱۵ نفر نیروی پشتیبانی دستی با دستیار هوش مصنوعی گلوسا</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📊</div>
              <div className="info-text">
                <h3>دوره اجرایی</h3>
                <p>{projectInfo.period}</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🏛️</div>
              <div className="info-text">
                <h3>مشتری</h3>
                <p>{projectInfo.client}</p>
              </div>
            </div>
          </div>

          <div className="goals-section">
            <h3 className="section-title">اهداف فرعی پروژه</h3>
            <div className="goals-grid">
              {mainGoals.map((goal, index) => (
                <motion.div
                  key={index}
                  className="goal-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="goal-number">{convertToPersianNumbers(index + 1)}</div>
                  <h4>{goal.title}</h4>
                  <p>{goal.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
