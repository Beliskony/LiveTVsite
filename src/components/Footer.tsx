import { Facebook, Twitter, Instagram, Youtube, Smartphone, Monitor, Tv, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import FAQModal from './aide/FAQ';
import SupportModal from './aide/Support';
import { useState } from 'react';
import PrivacyPolicyModal from './aide/Confidentialite';

export default function Footer() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showPolitique, setShowPolitique] = useState(false)

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Colonne 1: Contenu */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Contenu</h3>
            <ul className="space-y-2 max-sm:justify-center flex flex-row lg:flex-col gap-x-4">
              <li><Link to="/programmes" className="text-gray-300 hover:text-white">Nos Programmes</Link></li>
              <li><Link to="/egliseYeshoua/articles" className="text-gray-300 hover:text-white">Articles</Link></li>
              <li><Link to={"/"} className="px-2 w-20 gap-x-1 justify-center items-center flex flex-row text-white transition-colors bg-red-500 rounded-lg font-medium cursor-pointer">
                <img src="/liveIcon.svg" className="h-4 w-4"  />
                Live
              </Link></li>
            </ul>
          </div>

          {/* Colonne 2: Aide */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Aide</h3>
            <ul className="gap-y-2 flex max-sm:px-7 max-sm:items-center max-sm:h-10 max-sm:justify-center lg:text-left flex-row lg:flex-col gap-x-4">
              <li><button onClick={() => setShowFAQ(true)} className="text-gray-300 hover:text-white cursor-pointer">FAQ</button></li>
              {/*<li><button onClick={() => setShowSupport(true)} className="text-gray-300 hover:text-white cursor-pointer">Support</button></li>*/}
              <li><button onClick={() => setShowPolitique(true)} className="text-gray-300 hover:text-white cursor-pointer">Politique de confidentialité</button></li>
            </ul>
          </div>

          {/* Colonne 3: À propos */}
          <div className="space-y-4">
            <h3 className="text-lg max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">À propos</h3>
            <ul className="space-y-2 max-sm:justify-center flex flex-row lg:flex-col gap-x-4">
              <li><Link to="/egliseYeshoua/presentation" className="text-gray-300 hover:text-white">Eglise de Yeshoua</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact TV</Link></li>
            </ul>
          </div>

          {/* Colonne 4: Applications + Réseaux sociaux */}
          <div className="space-y-4 max-sm:w-full md:w-full">
          {/* <h3 className="text-lg hidden max-sm:font-bold max-sm:text-2xl max-sm:text-center font-semibold">Nos applications</h3>
            <div className="space-y-2 justify-center items-center max-sm:flex max-sm:flex-row max-sm:gap-x-6">
              <Link to="/app/mobile" className=" items-center space-x-2 text-gray-300 hover:text-white hidden">
                <Smartphone className="h-5 w-5" />
                <span className='max-sm:hidden'>Application mobile</span>
                <span className='sm:hidden'>App mobile</span>
              </Link>
              <Link to="/app/tv" className="hidden items-center space-x-2 text-gray-300 hover:text-white">
                <Tv className="h-5 w-5" />
                <span className='max-sm:hidden'>Application TV</span>
                <span className='sm:hidden'>App TV</span>
              </Link>
              <Link to="/app/web" className="hidden items-center space-x-2 text-gray-300 hover:text-white">
                <Monitor className="h-5 w-5" />
                <span className='max-sm:hidden'>Version Web</span>
                <span className='sm:hidden'>Web</span>
              </Link>
            </div> */}

            <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center max-sm:gap-y-2">
              <h4 className="text-lg font-bold mb-3 max-sm:text-xl max-sm:items-center">Suivez-nous</h4>
              <div className="flex space-x-4 max-sm:gap-x-10">
                <a href="https://www.facebook.com/profile.php?id=61579857472689&mibextid=wwXIfr&rdid=fjV2WY1X4Kvxyu7b&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17MhswwegK%2F%3Fmibextid%3DwwXIfr#" target="_blank" className="text-gray-300 hover:text-white">
                  <Facebook className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://www.tiktok.com/@eglisedeyeshoua" target="_blank" className="text-gray-300 hover:text-white">
                  <img src='/tiktok.svg' alt='tiktokIcon' className="h-6 w-6 max-sm:h-8 max-sm:w-8" />
                  <span className="sr-only">Tiktok</span>
                </a>
                <a href="https://www.youtube.com/@EGLISEDEYESHOUA" target="_blank" className="text-gray-300 hover:text-white">
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

        {/*Modal politique */}
          {showPolitique && <PrivacyPolicyModal onClose={() => setShowPolitique(false)} />}

        {/* Newsletter / Copyright */}
        <div className="mt-12 max-sm:mt-6 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} YeshouaTv. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
