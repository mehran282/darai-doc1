import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';
import { comparisonMetrics } from '../data/glossaData';
import './ComparisonChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ComparisonChart = () => {
  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  // تابع تبدیل اعداد فارسی به انگلیسی (برای پردازش)
  const convertPersianToEnglish = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[۰-۹]/g, (w) => englishDigits[persianDigits.indexOf(w)]);
  };

  // آماده‌سازی داده‌ها برای نمودار
  const chartData = comparisonMetrics.map(metric => {
    let currentNum = 0;
    let afterNum = 0;
    
    // تبدیل اعداد فارسی به انگلیسی برای پردازش
    const currentEnglish = convertPersianToEnglish(metric.current);
    const afterEnglish = convertPersianToEnglish(metric.after);
    
    // استخراج و نرمال‌سازی داده‌ها بر اساس نوع معیار
    if (metric.metric === 'ساعات دسترسی') {
      // استخراج عدد از "8 ساعت (8-16)" یا "۸ ساعت (۸-۱۶)"
      currentNum = parseFloat(currentEnglish.match(/\d+/)?.[0] || '0');
      afterNum = parseFloat(afterEnglish.match(/\d+/)?.[0] || '0');
      // نرمال‌سازی: 8 ساعت = 33.3%, 24 ساعت = 100%
      currentNum = (currentNum / 24) * 100;
      afterNum = (afterNum / 24) * 100;
    } 
    else if (metric.metric === 'زمان متوسط پاسخ') {
      // استخراج از "2-4 ساعت" یا "۲-۴ ساعت" -> میانگین = 3 ساعت
      const hoursMatch = currentEnglish.match(/(\d+)-(\d+)/);
      if (hoursMatch) {
        const min = parseFloat(hoursMatch[1]);
        const max = parseFloat(hoursMatch[2]);
        currentNum = (min + max) / 2; // میانگین = 3 ساعت
      } else {
        // استخراج عدد از "10 ثانیه" یا "۱۰ ثانیه"
        const secondsMatch = currentEnglish.match(/(\d+)/);
        if (secondsMatch) {
          currentNum = parseFloat(secondsMatch[1]) / 3600; // تبدیل ثانیه به ساعت
        } else {
          currentNum = parseFloat(currentEnglish.replace(/[^\d.]/g, '')) || 0;
        }
      }
      // بعد: "10 ثانیه" یا "۱۰ ثانیه" = 0.0027 ساعت
      const afterSecondsMatch = afterEnglish.match(/(\d+)/);
      afterNum = afterSecondsMatch ? parseFloat(afterSecondsMatch[1]) / 3600 : 10 / 3600; // تبدیل ثانیه به ساعت
      // نرمال‌سازی: زمان کمتر = مقدار بیشتر در نمودار (چون بهتر است)
      // تبدیل به دقیقه برای نمایش بهتر: 3 ساعت = 180 دقیقه، 10 ثانیه = 0.17 دقیقه
      currentNum = currentNum * 60; // تبدیل به دقیقه
      afterNum = afterNum * 60; // تبدیل به دقیقه
      // نرمال‌سازی: حداکثر 240 دقیقه (4 ساعت) = 100%
      const maxMinutes = 240;
      // زمان کمتر = مقدار بیشتر (معکوس)
      currentNum = (1 - currentNum / maxMinutes) * 100;
      afterNum = (1 - afterNum / maxMinutes) * 100;
      // اطمینان از اینکه مقادیر بین 0 تا 100 باشند
      currentNum = Math.max(0, Math.min(100, currentNum));
      afterNum = Math.max(0, Math.min(100, afterNum));
    } 
    else if (metric.metric === 'درصد خودکارسازی') {
      // استخراج از "0%" و "75-80%" یا "۰%" و "۷۵-۸۰%"
      currentNum = parseFloat(currentEnglish.replace(/[^\d.]/g, '')) || 0;
      const afterMatch = afterEnglish.match(/(\d+)-(\d+)/);
      if (afterMatch) {
        const min = parseFloat(afterMatch[1]);
        const max = parseFloat(afterMatch[2]);
        afterNum = (min + max) / 2; // میانگین = 77.5%
      } else {
        afterNum = parseFloat(afterEnglish.replace(/[^\d.]/g, '')) || 0;
      }
      // درصدها مستقیماً قابل استفاده هستند
    } 
    else if (metric.metric === 'هزینه سالانه') {
      // استخراج از "17.5 میلیارد تومان" و "9.429 میلیارد تومان" (ابتدا کاما را حذف می‌کنیم)
      const currentStr = currentEnglish.replace(/,/g, '');
      const afterStr = afterEnglish.replace(/,/g, '');
      currentNum = parseFloat(currentStr.replace(/[^\d.]/g, '')) || 0;
      afterNum = parseFloat(afterStr.replace(/[^\d.]/g, '')) || 0;
      // نرمال‌سازی: هزینه کمتر = مقدار بیشتر در نمودار (چون بهتر است)
      // استفاده از فرمول معکوس: (1 - هزینه / maxCost) * 100
      const maxCost = 20; // حداکثر هزینه برای نرمال‌سازی (20 میلیارد تومان)
      // هزینه کمتر = مقدار بیشتر در نمودار (معکوس)
      currentNum = (1 - currentNum / maxCost) * 100;
      afterNum = (1 - afterNum / maxCost) * 100;
      // اطمینان از اینکه مقادیر بین 0 تا 100 باشند
      currentNum = Math.max(0, Math.min(100, currentNum));
      afterNum = Math.max(0, Math.min(100, afterNum));
    } 
    else if (metric.metric === 'هزینه هر تعامل') {
      // استخراج از "4,220 هزار تومان" یا "۴,۲۲۰ هزار تومان" (ابتدا کاما را حذف می‌کنیم)
      const currentStr = currentEnglish.replace(/,/g, '');
      const afterStr = afterEnglish.replace(/,/g, '');
      currentNum = parseFloat(currentStr.replace(/[^\d.]/g, '')) || 0;
      afterNum = parseFloat(afterStr.replace(/[^\d.]/g, '')) || 0;
      // نرمال‌سازی: هزینه کمتر = مقدار بیشتر در نمودار (چون بهتر است)
      const maxCost = 5000; // 5000 هزار تومان (5 میلیون)
      // هزینه کمتر = مقدار بیشتر (معکوس)
      currentNum = (1 - currentNum / maxCost) * 100;
      afterNum = (1 - afterNum / maxCost) * 100;
      // اطمینان از اینکه مقادیر بین 0 تا 100 باشند
      currentNum = Math.max(0, Math.min(100, currentNum));
      afterNum = Math.max(0, Math.min(100, afterNum));
    } 
    else {
      // برای رضایتمندی و دقت (درصدها)
      currentNum = parseFloat(currentEnglish.replace(/[^\d.]/g, '')) || 0;
      afterNum = parseFloat(afterEnglish.replace(/[^\d.]/g, '')) || 0;
      // درصدها مستقیماً قابل استفاده هستند
    }
    
    return {
      name: metric.metric,
      current: currentNum,
      after: afterNum,
      improvement: metric.improvement,
      originalCurrent: metric.current,
      originalAfter: metric.after
    };
  });

  const labels = chartData.map(item => item.name);
  const currentValues = chartData.map(item => item.current);
  const afterValues = chartData.map(item => item.after);

  // داده‌های Radar Chart با استایل خلاقانه
  const radarData = {
    labels: labels,
    datasets: [
      {
        label: 'وضع موجود',
        data: currentValues,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        borderColor: '#ef4444',
        borderWidth: 3,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#dc2626',
        pointHoverBorderColor: '#fff',
        pointRadius: 6,
        pointHoverRadius: 9,
        pointBorderWidth: 3,
        tension: 0.1,
        fill: true,
      },
      {
        label: 'بعد از دستیار هوش مصنوعی گلوسا',
        data: afterValues,
        backgroundColor: 'rgba(16, 185, 129, 0.25)',
        borderColor: '#10b981',
        borderWidth: 4,
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#059669',
        pointHoverBorderColor: '#fff',
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBorderWidth: 3,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const radarOptions = {
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
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        },
        align: 'center',
      },
      tooltip: {
        rtl: true,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        padding: 12,
        titleFont: {
          family: 'Vazirmatn',
          size: 15,
          weight: 'bold',
        },
        bodyFont: {
          family: 'Vazirmatn',
          size: 13,
        },
        callbacks: {
          title: function(context) {
            return `📊 ${context[0].label}`;
          },
          label: function(context) {
            const label = context.dataset.label || '';
            const index = context.dataIndex;
            const metricData = chartData[index];
            const originalValue = label === 'وضع موجود' 
              ? metricData.originalCurrent 
              : metricData.originalAfter;
            const icon = label === 'وضع موجود' ? '🔴' : '🟢';
            return `${icon} ${label}: ${originalValue}`;
          },
          afterLabel: function(context) {
            const index = context.dataIndex;
            const improvement = chartData[index].improvement;
            return `✨ بهبود: ${improvement}`;
          },
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          font: {
            family: 'Vazirmatn',
            size: 12,
            weight: '600',
          },
          color: '#64748b',
          callback: function(value) {
            return convertToPersianNumbers(value.toLocaleString('fa-IR')) + '%';
          },
          backdropColor: 'rgba(255, 255, 255, 0.8)',
        },
        pointLabels: {
          font: {
            family: 'Vazirmatn',
            size: 13,
            weight: 'bold',
          },
          color: '#1e293b',
          padding: 15,
        },
        grid: {
          color: [
            'rgba(100, 116, 139, 0.1)',
            'rgba(100, 116, 139, 0.15)',
            'rgba(100, 116, 139, 0.2)',
            'rgba(100, 116, 139, 0.25)',
            'rgba(100, 116, 139, 0.3)',
          ],
          lineWidth: 1.5,
        },
        angleLines: {
          color: 'rgba(100, 116, 139, 0.2)',
          lineWidth: 1.5,
        },
      },
    },
  };

  // داده‌های Progress Bars برای درصد بهبود
  const improvementData = comparisonMetrics.map((metric, index) => {
    const improvement = metric.improvement;
    // تبدیل اعداد فارسی به انگلیسی برای پردازش
    const improvementEnglish = convertPersianToEnglish(improvement);
    let improvementValue = 0;
    
    if (improvement.includes('%') || improvementEnglish.includes('%')) {
      improvementValue = parseFloat(improvementEnglish.replace(/[^\d.]/g, '')) || 0;
      if (improvement.includes('-') || improvementEnglish.includes('-')) {
        improvementValue = -improvementValue; // برای هزینه‌ها که کاهش بهتر است
      }
    } else if (improvement.includes('بهتر') || improvementEnglish.includes('بهتر')) {
      improvementValue = parseFloat(improvementEnglish.replace(/[^\d.]/g, '')) || 0;
    }
    
    return {
      label: metric.metric,
      value: Math.abs(improvementValue),
      isPositive: !improvement.includes('-'),
      originalText: improvement
    };
  });

  return (
    <motion.section 
      className="comparison-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">مقایسه شاخص‌های کلیدی</h2>
        <p className="section-subtitle">وضع موجود در مقابل وضعیت بعد از پیاده‌سازی دستیار هوش مصنوعی گلوسا</p>
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>معیار کلیدی</th>
                <th>وضع موجود</th>
                <th>بعد از دستیار هوش مصنوعی گلوسا</th>
                <th>درصد بهبود</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((metric, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="metric-name">{metric.metric}</td>
                  <td className="current-value">{metric.current}</td>
                  <td className="after-value">{metric.after}</td>
                  <td className="improvement">
                    <span className={`improvement-badge ${metric.improvement.includes('-') ? 'negative' : 'positive'}`}>
                      {metric.improvement}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* نمودار Radar خلاقانه */}
        <motion.div 
          className="chart-container radar-chart-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="radar-header">
            <h3 className="chart-title">
              <span className="chart-icon">📈</span>
              نمودار راداری مقایسه عملکرد
            </h3>
            <p className="chart-subtitle">مقایسه جامع همه معیارها در یک نگاه</p>
          </div>
          <div className="radar-chart-wrapper" style={{ height: '550px', direction: 'ltr' }}>
            <Radar data={radarData} options={radarOptions} />
          </div>
          <div className="radar-legend-custom">
            <div className="legend-item">
              <div className="legend-color legend-current"></div>
              <span>وضع موجود</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-after"></div>
              <span>بعد از دستیار هوش مصنوعی گلوسا</span>
            </div>
          </div>
        </motion.div>

        {/* نمودار پیشرفت درصد بهبود */}
        <div className="improvement-progress-container">
          <h3 className="chart-title">درصد بهبود در هر معیار</h3>
          <div className="progress-bars-grid">
            {improvementData.map((item, index) => {
              const maxValue = Math.max(...improvementData.map(d => d.value));
              const percentage = (item.value / maxValue) * 100;
              
              return (
                <motion.div
                  key={index}
                  className="progress-bar-item"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="progress-label-row">
                    <span className="progress-label">{item.label}</span>
                    <span className={`progress-value ${item.isPositive ? 'positive' : 'negative'}`}>
                      {item.originalText}
                    </span>
                  </div>
                  <div className="progress-bar-wrapper">
                    <motion.div
                      className={`progress-bar-fill ${item.isPositive ? 'positive' : 'negative'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ComparisonChart;
