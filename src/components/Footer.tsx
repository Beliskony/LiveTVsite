import { Facebook, Twitter, Instagram, Youtube, Smartphone, Monitor, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQModal from './aide/FAQ';
import SupportModal from './aide/Support';
import { useState } from 'react';

export default function Footer() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Colonne 1: Contenu */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Contenu</h3>
            <ul className="space-y-2 max-sm:justify-center flex flex-row lg:flex-col gap-x-4">
              <li><Link to="/catalogue" className="text-gray-300 hover:text-white">Emissions</Link></li>
              <li><Link to="/egliseYeshoua/articles" className="text-gray-300 hover:text-white">Articles</Link></li>
              <li><Link to="/live" className="text-gray-300 hover:text-white">Live / Direct</Link></li>
            </ul>
          </div>

          {/* Colonne 2: Aide */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Aide</h3>
            <ul className="space-y-2 flex max-sm:justify-center lg:text-left flex-row lg:flex-col gap-x-4">
              <li><button onClick={() => setShowFAQ(true)} className="text-gray-300 hover:text-white cursor-pointer">FAQ</button></li>
              <li><button onClick={() => setShowSupport(true)} className="text-gray-300 hover:text-white cursor-pointer">Support</button></li>
              <li><Link to="#" className="text-gray-300 hover:text-white">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Colonne 3: À propos */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">À propos</h3>
            <ul className="space-y-2 max-sm:justify-center flex flex-row lg:flex-col gap-x-4">
              <li><Link to="/egliseYeshoua/presentation" className="text-gray-300 hover:text-white">Eglise de Yeshoua</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Applications + Réseaux sociaux */}
          <div className="space-y-4 max-sm:w-full md:w-full">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Nos applications</h3>
            <div className="space-y-2 justify-center items-center max-sm:flex max-sm:flex-row max-sm:gap-x-6">
              <Link to="/app/mobile" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Smartphone className="h-5 w-5" />
                <span className='max-sm:hidden'>Application mobile</span>
                <span className='sm:hidden'>App mobile</span>
              </Link>
              <Link to="/app/tv" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Tv className="h-5 w-5" />
                <span className='max-sm:hidden'>Application TV</span>
                <span className='sm:hidden'>App TV</span>
              </Link>
              <Link to="/app/web" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <Monitor className="h-5 w-5" />
                <span className='max-sm:hidden'>Version Web</span>
                <span className='sm:hidden'>Web</span>
              </Link>
            </div>

            <div className="pt-4 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:gap-y-2">
              <h4 className="text-sm font-medium mb-3 max-sm:text-xl max-sm:items-center">Suivez-nous</h4>
              <div className="flex space-x-4 max-sm:gap-x-10">
                <a href="https://facebook.com" target="_blank" className="text-gray-300 hover:text-white">
                  <Facebook className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://twitter.com" target="_blank" className="text-gray-300 hover:text-white">
                  <Twitter className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://instagram.com" target="_blank" className="text-gray-300 hover:text-white">
                  <Instagram className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://youtube.com" target="_blank" className="text-gray-300 hover:text-white">
                  <Youtube className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </div>

        </div>

         {/* Modal FAQ */}
          {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
        
         {/* Modal Support */}
          {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}

        {/* Newsletter / Copyright */}
        <div className="mt-12 max-sm:mt-6 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} YeshouaTv. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
