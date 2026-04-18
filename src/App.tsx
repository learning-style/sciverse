import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/features/home/HomePage';
import { AboutPage } from '@/features/about/AboutPage';
import { ShowcasePage } from '@/features/showcase/ShowcasePage';
import { ContactPage } from '@/features/contact/ContactPage';
import { LessonHub } from '@/features/sciverse/modules/LessonHub';
import { LessonShell } from '@/features/sciverse/modules/LessonShell';
import { ScienceLab } from '@/features/science-lab/ScienceLab';
import { AssessmentShell } from '@/features/sciverse/modules/AssessmentShell';

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

        {/* Sciverse Lesson Hub — lists all 15 lessons */}
        <Route path="/projects/science-lab" element={<LessonHub />} />

        {/* Backward-compatible aliases */}
        <Route path="/projects/sciverse" element={<LessonHub />} />

        {/* Individual Lesson Route */}
        <Route path="/projects/science-lab/lesson/:lessonId" element={<LessonShell />} />

        {/* Assessment Route */}
        <Route path="/projects/science-lab/assessment/:bigIdeaId" element={<AssessmentShell />} />

        {/* Original Kinematics Lab (with physics engine) */}
        <Route path="/projects/science-lab/kinematics" element={<ScienceLab />} />
        <Route path="/projects/science-lab/lab" element={<ScienceLab />} />
        <Route path="/projects/science-lab/classic" element={<ScienceLab />} />
      </Routes>
    </Router>
  );
}

export default App;