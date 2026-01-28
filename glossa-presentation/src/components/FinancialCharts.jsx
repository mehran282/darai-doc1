import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { financialData } from '../data/glossaData';
import './FinancialCharts.css';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FinancialCharts = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  const roiData = [
    { year: 'سال اول\n(اجرا)', roi: financialData.year1.roi },
    { year: 'سال دوم\n(پشتیبانی)', roi: financialData.year2.cumulativeROI },
    { year: 'سال سوم\n(پشتیبانی)', roi: financialData.year3.cumulativeROI }
  ];

  const savingsData = [
    { year: 'سال اول\n(اجرا)', savings: financialData.year1.savings },
    { year: 'سال دوم\n(پشتیبانی)', savings: financialData.year2.savings },
    { year: 'سال سوم\n(پشتیبانی)', savings: financialData.year3.savings }
  ];

  // محاسبه خودکار درصدها بر اساس بودجه سال اول
  const totalBudget = financialData.year1.budget;
  const budgetBreakdownWithPercentages = financialData.budgetBreakdown.map(item => ({
    ...item,
    percentage: totalBudget > 0 ? ((item.amount / totalBudget) * 100).toFixed(1) : 0
  }));

  // داده‌های Pie Chart برای بودجه
  const pieData = {
    labels: budgetBreakdownWithPercentages.map(item => item.phase),
    datasets: [
      {
        data: budgetBreakdownWithPercentages.map(item => item.amount),
        backgroundColor: COLORS,
        borderColor: COLORS.map(color => color + '80'),
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'Vazirmatn',
            size: 12,
          },
        },
      },
      tooltip: {
        rtl: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = budgetBreakdownWithPercentages[context.dataIndex].percentage;
            return `${label}: ${convertToPersianNumbers(value.toLocaleString('fa-IR'))} میلیارد (${convertToPersianNumbers(percentage)}%)`;
          },
        },
        titleFont: {
          family: 'Vazirmatn',
        },
        bodyFont: {
          family: 'Vazirmatn',
        },
      },
    },
  };

  // داده‌های Line Chart برای ROI با استایل خلاقانه
  const lineData = {
    labels: roiData.map(item => item.year),
    datasets: [
      {
        label: 'بازگشت سرمایه (ROI)',
        data: roiData.map(item => item.roi),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 4,
        tension: 0.5,
        fill: true,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointHoverBorderWidth: 4,
        pointHoverBackgroundColor: '#2563eb',
      },
    ],
  };

  const lineOptions = {
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
            return `📈 ${context[0].label}`;
          },
          label: function(context) {
            return `بازگشت سرمایه: ${convertToPersianNumbers(context.parsed.y.toLocaleString('fa-IR'))}%`;
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
            return convertToPersianNumbers(value.toLocaleString('fa-IR')) + '%';
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

  // داده‌های Bar Chart برای پس‌انداز با گرادیان
  const barData = {
    labels: savingsData.map(item => item.year),
    datasets: [
      {
        label: 'پس‌انداز سالانه',
        data: savingsData.map(item => item.savings),
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(16, 185, 129, 0.9)',
          'rgba(5, 150, 105, 1)',
        ],
        borderColor: [
          '#10b981',
          '#10b981',
          '#059669',
        ],
        borderWidth: 3,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
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
            return `💰 ${context[0].label}`;
          },
          label: function(context) {
            return `پس‌انداز: ${convertToPersianNumbers(context.parsed.y.toLocaleString('fa-IR'))} میلیارد تومان`;
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

  return (
    <motion.section 
      className="financial-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">تحلیل مالی و بازگشت سرمایه (ROI)</h2>
        
        <div className="financial-grid">
          {/* کارت‌های خلاصه مالی */}
          <motion.div
            className="financial-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>سال اول (۱۴۰۴) - اجرای کامل</h3>
            <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '1rem', opacity: 0.9 }}>
              شامل: سخت‌افزار + توسعه + راه‌اندازی + آموزش
            </p>
            <div className="financial-metrics">
              <div className="metric-item">
                <span className="metric-label">بودجه:</span>
                <span className="metric-value">{convertToPersianNumbers(financialData.year1.budget.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">پس‌انداز:</span>
                <span className="metric-value positive">{convertToPersianNumbers(financialData.year1.savings.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">ROI:</span>
                <span className="metric-value positive">{convertToPersianNumbers((financialData.year1.roi).toLocaleString('fa-IR'))}%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">دوره بازگشت:</span>
                <span className="metric-value">{convertToPersianNumbers((financialData.year1.paybackPeriod).toLocaleString('fa-IR'))} ماه</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="financial-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3>خلاصه ۳ ساله</h3>
            <p style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '1rem', opacity: 0.9 }}>
              سال‌های بعد: فقط پشتیبانی و توسعه در صورت نیاز
            </p>
            <div className="financial-metrics">
              <div className="metric-item">
                <span className="metric-label">سرمایه‌گذاری اولیه (سال اول):</span>
                <span className="metric-value">{convertToPersianNumbers(financialData.year1.budget.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">پشتیبانی سالانه:</span>
                <span className="metric-value">سال ۲: {convertToPersianNumbers(financialData.year2.budget.toLocaleString('fa-IR'))} | سال ۳: {convertToPersianNumbers(financialData.year3.budget.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">کل سرمایه‌گذاری:</span>
                <span className="metric-value">{convertToPersianNumbers(financialData.total3Years.totalInvestment.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">کل پس‌انداز:</span>
                <span className="metric-value positive">{convertToPersianNumbers(financialData.total3Years.totalSavings.toLocaleString('fa-IR'))} میلیارد</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">ROI کل:</span>
                <span className="metric-value positive">{convertToPersianNumbers((financialData.total3Years.totalROI).toLocaleString('fa-IR'))}%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* نمودار توزیع بودجه */}
        <motion.div 
          className="chart-wrapper pie-chart-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">
              <span className="chart-icon">🥧</span>
              توزیع بودجه سال اول
            </h3>
            <p className="chart-subtitle">نمودار دایره‌ای نمایش درصد هر بخش</p>
          </div>
          <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </motion.div>

        {/* نمودار ROI */}
        <motion.div 
          className="chart-wrapper line-chart-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">
              <span className="chart-icon">📈</span>
              روند بازگشت سرمایه (ROI)
            </h3>
            <p className="chart-subtitle">افزایش بازگشت سرمایه در طول زمان</p>
          </div>
          <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
            <Line data={lineData} options={lineOptions} />
          </div>
        </motion.div>

        {/* نمودار پس‌انداز سالانه */}
        <motion.div 
          className="chart-wrapper bar-chart-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="chart-header">
            <h3 className="chart-title">
              <span className="chart-icon">💰</span>
              پس‌انداز سالانه (میلیارد تومان)
            </h3>
            <p className="chart-subtitle">مقایسه پس‌انداز در سال‌های مختلف</p>
          </div>
          <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FinancialCharts;
