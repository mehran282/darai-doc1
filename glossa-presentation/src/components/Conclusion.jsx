import { motion } from 'framer-motion';
import { satisfactionMetrics } from '../data/glossaData';
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
import './Conclusion.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Conclusion = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  const chartData = {
    labels: satisfactionMetrics.map(metric => metric.metric),
    datasets: [
      {
        label: 'وضع موجود',
        data: satisfactionMetrics.map(metric => metric.current),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: '#dc2626',
        borderWidth: 3,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'با دستیار هوش مصنوعی گلوسا',
        data: satisfactionMetrics.map(metric => metric.after),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#059669',
        borderWidth: 3,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
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
          usePointStyle: true,
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
            return `📊 ${context[0].label}`;
          },
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${convertToPersianNumbers(value.toLocaleString('fa-IR'))}`;
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
      y: {
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
      x: {
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

  const benefits = [
    { icon: '💰', title: 'صرفه‌اقتصادی', desc: 'کاهش ۴۶.۱% و ROI ۸۵.۶% سال اول' },
    { icon: '✅', title: 'ممکن', desc: 'فناوری اثبات‌شده' },
    { icon: '🎯', title: 'استراتژیک', desc: 'رهبری فناوری دولت' },
    { icon: '🛡️', title: 'ریسک‌پذیر', desc: 'چالش‌های قابل مدیریت' },
    { icon: '📈', title: 'مقیاس‌پذیر', desc: 'از یک بخش به کل سازمان' }
  ];

  return (
    <motion.section 
      className="conclusion-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">نتایج رضایت‌مندی</h2>
        
        <motion.div 
          className="satisfaction-chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">
              <span className="chart-icon">📊</span>
              مقایسه رضایت‌مندی
            </h3>
            <p className="chart-subtitle">وضع موجود در مقابل وضعیت با گلوسا</p>
          </div>
          <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
            <Bar data={chartData} options={options} />
          </div>
        </motion.div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="final-recommendation"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="recommendation-content">
            <h2 className="recommendation-title">🎯 سفارش نهایی</h2>
            <p className="recommendation-text">
              تصویب فوری و شروع اجرای دستیار هوش مصنوعی گلوسا با پرداخت کل بودجه{' '}
              <strong>{convertToPersianNumbers('9.429')} میلیارد تومان</strong> در سال {convertToPersianNumbers('1404')}
            </p>
            
            <div className="recommendation-actions">
              <div className="action-item">
                <span className="action-label">فوری:</span>
                <span className="action-value">تصویب بودجه سال اول</span>
              </div>
              <div className="action-item">
                <span className="action-label">بلافاصله:</span>
                <span className="action-value">قرارداد شرکت همفکران</span>
              </div>
              <div className="action-item">
                <span className="action-label">فاز ۱:</span>
                <span className="action-value">راه‌اندازی (ماه ۱-۳)</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="footer">
          <div className="footer-content">
            <div className="footer-item">
              <strong>شرکت:</strong> شرکت همفکران
            </div>
            <div className="footer-item">
              <strong>نسخه:</strong> {convertToPersianNumbers('1.0')}
            </div>
            <div className="footer-item">
              <strong>وضعیت:</strong> آماده تقدیم
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Conclusion;
