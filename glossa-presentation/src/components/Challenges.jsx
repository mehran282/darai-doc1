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
        <p className="section-subtitle">ماتریس چالش‌های احتمالی و استراتژی مدیریت تغییر</p>
        
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

        <div className="strategy-section">
          <h3 className="strategy-title">استراتژی مدیریت تغییر</h3>
          <div className="strategy-list">
            <motion.div
              className="strategy-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="strategy-number">{convertToPersianNumbers('1')}</div>
              <div className="strategy-content">
                <h4>ارتباط موثر</h4>
                <p>اطلاع‌رسانی ماهانه</p>
              </div>
            </motion.div>
            
            <motion.div
              className="strategy-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="strategy-number">{convertToPersianNumbers('2')}</div>
              <div className="strategy-content">
                <h4>آموزش مستمر</h4>
                <p>جلسات آموزش هر ۳ ماه</p>
              </div>
            </motion.div>
            
            <motion.div
              className="strategy-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="strategy-number">{convertToPersianNumbers('3')}</div>
              <div className="strategy-content">
                <h4>تشویق مشارکت</h4>
                <p>پاداش برای اتخاذ سریع</p>
              </div>
            </motion.div>
            
            <motion.div
              className="strategy-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="strategy-number">{convertToPersianNumbers('4')}</div>
              <div className="strategy-content">
                <h4>پشتیبانی فنی</h4>
                <p>خط تلفن فوری</p>
              </div>
            </motion.div>
            
            <motion.div
              className="strategy-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="strategy-number">{convertToPersianNumbers('5')}</div>
              <div className="strategy-content">
                <h4>بازخورد</h4>
                <p>نظرسنجی ماهانه</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Challenges;
