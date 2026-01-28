import { useEffect } from 'react';
import Hero from './components/Hero';
import ComparisonChart from './components/ComparisonChart';
import Roadmap from './components/Roadmap';
import FinancialCharts from './components/FinancialCharts';
import KPICards from './components/KPICards';
import TeamStructure from './components/TeamStructure';
import Challenges from './components/Challenges';
import Conclusion from './components/Conclusion';
import './App.css';

function App() {
  useEffect(() => {
    // اسکرول نرم برای تجربه بهتر
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="app">
      <main className="main-content">
        <Hero />
        <ComparisonChart />
        <Roadmap />
        <FinancialCharts />
        <KPICards />
        <TeamStructure />
        <Challenges />
        <Conclusion />
      </main>
    </div>
  );
}

export default App;
