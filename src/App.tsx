import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/features/home/HomePage';
import { AboutPage } from '@/features/about/AboutPage';
import { ShowcasePage } from '@/features/showcase/ShowcasePage';
import { ContactPage } from '@/features/contact/ContactPage';
import { ScienceLab } from '@/features/science-lab/ScienceLab';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Portfolio Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="showcase" element={<ShowcasePage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Standalone Project Routes (No Header/Footer from Portfolio to allow immersive experience) */}
        <Route path="/projects/science-lab" element={<ScienceLab />} />
      </Routes>
    </Router>
  );
}

export default App;