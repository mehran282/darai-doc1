import { motion } from 'framer-motion';
import { teamStructure } from '../data/glossaData';
import './TeamStructure.css';

const TeamStructure = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  return (
    <motion.section 
      className="team-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">ساختار سازمانی و تیم</h2>
        
        <div className="team-summary">
          <div className="summary-card">
            <div className="summary-icon">👥</div>
            <div className="summary-content">
              <h3>تعداد کل اعضای تیم</h3>
              <p className="summary-value">{convertToPersianNumbers((teamStructure.reduce((sum, m) => sum + m.count, 0)).toLocaleString('fa-IR'))} نفر</p>
            </div>
          </div>
        </div>

        <div className="team-table-wrapper">
          <table className="team-table">
            <thead>
              <tr>
                <th>نقش</th>
                <th>تعداد</th>
                <th>مسئولیت اصلی</th>
              </tr>
            </thead>
            <tbody>
              {teamStructure.map((member, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="role-name">{member.role}</td>
                  <td className="role-count">{(member.count).toLocaleString('fa-IR')} نفر</td>
                  <td className="role-responsibility">
                    {member.role === 'توسعه و آپدیت' && 'توسعه مدل‌های AI، به‌روزرسانی و بهبود عملکرد گلوسا'}
                    {member.role === 'پشتیبانی و نگهداری' && 'پشتیبانی کاربران، مانیتورینگ سیستم و رفع مشکلات'}
                    {member.role === 'نگهداری سرور، شبکه و امنیت' && 'مدیریت زیرساخت، شبکه، امنیت و DevOps'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </motion.section>
  );
};

export default TeamStructure;
