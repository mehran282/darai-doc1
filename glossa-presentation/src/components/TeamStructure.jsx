import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { teamStructure } from '../data/glossaData';
import './TeamStructure.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TeamStructure = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  const totalSalary = teamStructure.reduce((sum, member) => sum + (member.count * member.salary), 0);
  
  const chartData = {
    labels: teamStructure.map(member => member.role),
    datasets: [
      {
        label: 'حقوق ماهانه (میلیون تومان)',
        data: teamStructure.map(member => member.count * member.salary),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
        borderColor: [
          '#3b82f6',
          '#10b981',
          '#8b5cf6',
        ],
        borderWidth: 3,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeOutQuart',
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Vazirmatn',
            size: 15,
            weight: 'bold',
          },
          padding: 15,
        },
      },
      tooltip: {
        rtl: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          title: function(context) {
            return `👤 ${context[0].label}`;
          },
          label: function(context) {
            return `حقوق: ${convertToPersianNumbers(context.parsed.x.toLocaleString('fa-IR'))} میلیون تومان`;
          },
        },
        titleFont: {
          family: 'Vazirmatn',
          size: 15,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Vazirmatn',
          size: 13,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            family: 'Vazirmatn',
            size: 12,
            weight: '600',
          },
          color: '#64748b',
          callback: function(value) {
            return convertToPersianNumbers(value.toLocaleString('fa-IR'));
          },
        },
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Vazirmatn',
            size: 12,
            weight: 'bold',
          },
          color: '#1e293b',
        },
        grid: {
          display: false,
        },
      },
    },
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
          
          <div className="summary-card">
            <div className="summary-icon">💰</div>
            <div className="summary-content">
              <h3>حقوق کل ماهانه</h3>
              <p className="summary-value">{convertToPersianNumbers(totalSalary.toLocaleString('fa-IR'))} میلیون تومان</p>
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
                <th>حقوق ماهانه (میلیون تومان)</th>
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
                  <td className="role-salary">{(member.salary).toLocaleString('fa-IR')} میلیون تومان</td>
                </motion.tr>
              ))}
              <tr className="total-row">
                <td colSpan="2" className="total-label">جمع کل</td>
                <td></td>
                <td className="total-value">{convertToPersianNumbers((totalSalary).toLocaleString('fa-IR'))} میلیون تومان</td>
              </tr>
            </tbody>
          </table>
        </div>

        <motion.div 
          className="chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">
              <span className="chart-icon">💼</span>
              توزیع حقوق تیم (میلیون تومان)
            </h3>
            <p className="chart-subtitle">مقایسه حقوق اعضای تیم</p>
          </div>
          <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
            <Bar data={chartData} options={options} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TeamStructure;
