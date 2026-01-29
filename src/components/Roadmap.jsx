import { motion } from 'framer-motion';
import { roadmapPhases } from '../data/glossaData';
import './Roadmap.css';

const Roadmap = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };
  return (
    <motion.section 
      className="roadmap-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">نقشه راه اجرایی تفصیلی</h2>
        <p className="section-subtitle">برنامه ۳ ساله پیاده‌سازی و توسعه دستیار هوش مصنوعی گلوسا</p>
        
        <div className="roadmap-timeline">
          {roadmapPhases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="phase-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="phase-header">
                <div className="phase-number">{convertToPersianNumbers(phase.id.toString())}</div>
                <div className="phase-title-section">
                  <h3 className="phase-title">{phase.title}</h3>
                  <div className="phase-meta">
                    <span className="phase-duration">⏱️ {phase.duration}</span>
                    <span className="phase-budget">💰 {convertToPersianNumbers(phase.budget.toLocaleString('fa-IR'))} میلیارد تومان</span>
                  </div>
                </div>
              </div>
              
              <div className="phase-actions">
                <h4 className="actions-title">اقدامات اصلی:</h4>
                <ul className="actions-list">
                  {phase.actions.map((action, actionIndex) => (
                    <motion.li
                      key={actionIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + actionIndex * 0.1 }}
                    >
                      {action}
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="phase-progress">
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(phase.id / roadmapPhases.length) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Roadmap;
