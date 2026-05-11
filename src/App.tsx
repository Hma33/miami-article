import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { PackagePage } from './pages/PackagePage';



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/packages" element={<PackagePage />} />

        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:doctorId" element={<DoctorDetailPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/articles/:documentId" element={<ArticleDetailPage />} />

      </Routes>
    </Router>
  );
}