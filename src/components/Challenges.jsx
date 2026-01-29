import { motion } from 'framer-motion';
import { challenges } from '../data/glossaData';
import './Challenges.css';

const Challenges = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  const getProbabilityColor = (probability) => {
    if (probability === 'بالا') return '#ef4444';
    if (probability === 'متوسط') return '#f59e0b';
    return '#10b981';
  };

  const getImpactColor = (impact) => {
    if (impact === 'بالا') return '#ef4444';
    if (impact === 'متوسط') return '#f59e0b';
    return '#10b981';
  };

  return (
    <motion.section 
      className="challenges-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">شناسایی چالش‌ها و راه‌حل‌ها</h2>
        <p className="section-subtitle">ماتریس چالش‌های احتمالی</p>
        
        <div className="challenges-grid">
          {challenges.map((challenge, index) => (
            <motion.div
              key={index}
              className="challenge-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="challenge-header">
                <h3 className="challenge-name">{challenge.challenge}</h3>
                <div className="challenge-badges">
                  <span 
                    className="badge probability"
                    style={{ backgroundColor: getProbabilityColor(challenge.probability) }}
                  >
                    احتمال: {challenge.probability}
                  </span>
                  <span 
                    className="badge impact"
                    style={{ backgroundColor: getImpactColor(challenge.impact) }}
                  >
                    تأثیر: {challenge.impact}
                  </span>
                </div>
              </div>
              
              <div className="challenge-solution">
                <h4 className="solution-title">راه‌حل:</h4>
                <p className="solution-text">{challenge.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Challenges;
