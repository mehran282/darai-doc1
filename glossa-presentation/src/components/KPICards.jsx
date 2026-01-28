import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { kpiData } from '../data/glossaData';
import './KPICards.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const KPICards = () => {
  const kpiChartData = kpiData.quantitative.map(kpi => ({
    metric: kpi.metric,
    'سال اول': kpi.year1,
    'سال دوم': kpi.year2,
    'سال سوم': kpi.year3
  }));

  const labels = kpiChartData.map(item => item.metric);
  const year1Data = kpiChartData.map(item => item['سال اول']);
  const year2Data = kpiChartData.map(item => item['سال دوم']);
  const year3Data = kpiChartData.map(item => item['سال سوم']);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'سال اول (اجرا)',
        data: year1Data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'سال دوم (پشتیبانی)',
        data: year2Data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'سال سوم (پشتیبانی)',
        data: year3Data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // تابع تبدیل اعداد به فارسی
  const convertToPersianNumbers = (text) => {
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    const englishDigits = '0123456789';
    return text.toString().replace(/[0-9]/g, (w) => persianDigits[englishDigits.indexOf(w)]);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Vazirmatn',
            size: 14,
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
            const value = context.parsed.y;
            const unit = kpiData.quantitative[context.dataIndex]?.unit || '';
            return `${label}: ${convertToPersianNumbers(value.toFixed(2))} ${unit}`;
          },
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
            return convertToPersianNumbers(value.toString());
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
      className="kpi-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="section-container">
        <h2 className="section-title">معیارهای کلیدی عملکرد (KPI)</h2>
        
        <div className="kpi-tabs">
          <div className="kpi-tab-content">
            <h3 className="tab-title">معیارهای کمی</h3>
            
            <div className="kpi-cards-grid">
              {kpiData.quantitative.map((kpi, index) => (
                <motion.div
                  key={index}
                  className="kpi-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="kpi-name">{kpi.metric}</h4>
                  <div className="kpi-values">
                    <div className="kpi-value-item">
                      <span className="kpi-year">سال 1 (اجرا):</span>
                      <span className="kpi-value">{kpi.year1.toLocaleString('fa-IR')} {kpi.unit || ''}</span>
                    </div>
                    <div className="kpi-value-item">
                      <span className="kpi-year">سال 2 (پشتیبانی):</span>
                      <span className="kpi-value">{kpi.year2.toLocaleString('fa-IR')} {kpi.unit || ''}</span>
                    </div>
                    <div className="kpi-value-item">
                      <span className="kpi-year">سال 3 (پشتیبانی):</span>
                      <span className="kpi-value highlight">{kpi.year3.toLocaleString('fa-IR')} {kpi.unit || ''}</span>
                    </div>
                  </div>
                  <div className="kpi-trend">
                    <span className="trend-arrow">↑</span>
                    <span className="trend-text">روند بهبود</span>
                  </div>
                </motion.div>
              ))}
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
                  <span className="chart-icon">📊</span>
                  روند تغییرات KPI در 3 سال
                </h3>
                <p className="chart-subtitle">مقایسه معیارهای کلیدی عملکرد در طول زمان</p>
              </div>
              <div className="chart-content" style={{ height: '450px', direction: 'ltr' }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>

          <div className="kpi-tab-content">
            <h3 className="tab-title">معیارهای کیفی</h3>
            <div className="qualitative-grid">
              {kpiData.qualitative.map((kpi, index) => (
                <motion.div
                  key={index}
                  className="qualitative-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="qualitative-icon">✓</div>
                  <h4>{kpi.metric}</h4>
                  <p className="qualitative-target">{kpi.target}</p>
                  {kpi.description && (
                    <p className="qualitative-description">{kpi.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default KPICards;
