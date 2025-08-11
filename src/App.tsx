import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Videos } from './pages/Videos';
import { Acceuil } from './pages/Acceuil';
import { Catalogue } from './pages/Catalogue';
import { Compte } from './pages/Compte';
import './App.css';
import { TVLive } from './pages/Live';
import Admin from './pages/Admin';

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path='/Live' element={<TVLive />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/compte" element={<Compte />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}
