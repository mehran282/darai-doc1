import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        <div className="header-top">
          <div className="header-left">
            <div className="ai-icon">🤖</div>
            <div>
              <h1 className="system-name">دستیار هوش مصنوعی گلوسا</h1>
              <p className="system-subtitle">هوش مصنوعی پیشرفته برای پشتیبانی و دستیاری</p>
            </div>
          </div>
          <div className="header-right">
            <div className="header-badge">
              <span className="badge-dot"></span>
              نسخه {convertToPersianNumbers('1.0')}
            </div>
          </div>
        </div>
      </div>
      <div className="header-gradient-overlay"></div>
    </motion.header>
  );
};

export default Header;
