import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Programmes } from './pages/Programmes';
import { Acceuil } from './pages/Acceuil';
import { Videos } from './pages/Videos';
import './App.css';
import { TVLive } from './pages/Live';
import Admin from './pages/Admin';
import { AuthProvider } from './components/auth-context';
import PresentationEglise from './pages/PresentationEglise';
import ArticlesListePage from './pages/ArticlesListePage';
import SingleArticlePage from './pages/SingleArticle';

export default function App() {
  return (
   <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<TVLive />} />
        <Route path="/home" element={<Acceuil />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/:id" element={<Videos />} />
        <Route path="/egliseYeshoua/articles" element={<ArticlesListePage />} />
        <Route path="/egliseYeshoua/articles/:id" element={<SingleArticlePage  />} />
        <Route path="/egliseYeshoua/presentation" element={<PresentationEglise />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
   </AuthProvider>
  );
}
