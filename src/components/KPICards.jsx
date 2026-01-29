import { motion } from 'framer-motion';
import { kpiData } from '../data/glossaData';
import './KPICards.css';

const KPICards = () => {

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
