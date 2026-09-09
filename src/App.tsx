import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LessonHub } from '@/features/sciverse/modules/LessonHub';
import { LessonShell } from '@/features/sciverse/modules/LessonShell';
import { AssessmentShell } from '@/features/sciverse/modules/AssessmentShell';

// Vite injects BASE_URL from the build's --base flag: '/' for Vercel and the
// dev server, '/sciverse/' for the GitHub Pages project site. Router needs it
// without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        {/* The lesson hub is the site. */}
        <Route path="/" element={<LessonHub />} />
        <Route path="/projects/science-lab" element={<LessonHub />} />
        <Route path="/projects/sciverse" element={<LessonHub />} />

        <Route path="/projects/science-lab/lesson/:lessonId" element={<LessonShell />} />

        <Route path="/projects/science-lab/assessment/:bigIdeaId" element={<AssessmentShell />} />
        <Route path="/projects/science-lab/assessment/:bigIdeaId/:level" element={<AssessmentShell />} />

        {/* Anything else lands on the hub rather than a blank screen. */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
