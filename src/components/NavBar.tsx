import { useState } from "react"
import { Search, Menu, X, User, Bell, ChevronDown } from 'lucide-react'
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(true) // Simuler un utilisateur admin - à remplacer par la vraie logique d'auth

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  return (
    <header className="bg-gray-900 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 h-14 w-32 object-cover justify-center">
            <Link to={'/'}>
              <img src="/logotvRM.png" sizes="20" className="h-full"/>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8 bg-gray-900">
            <Link to={'/'} className="hover:text-blue-400 transition-colors font-medium">
              Accueil
            </Link>
            <Link to={'/cataloge'} className="hover:text-blue-400 transition-colors font-medium">
              Émissions
            </Link>
            <Link to={'/live'} className="hover:text-blue-400 transition-colors font-medium">
              Direct
            </Link>
            <Link to={'/'} className="hover:text-blue-400 transition-colors font-medium">
              Documentaires
            </Link>
            {/* Onglet Admin - visible uniquement pour les admins */}
            {isAdmin && (
              <Link to={'/'} className="hover:text-yellow-400 transition-colors font-medium text-yellow-300">
                Admin
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher émissions, événements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* User Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-0 bg-gray-900">
            <button className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            
            <div className="relative ">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-md transition-colors"
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <button
                   //onClick={}
                    className="text-white hover:bg-gray-800 rounded-full p-1 transition-colors">
                    <User className="h-4 w-4" />
                  </button>
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                  <Link to={'/'} className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    Mon Profil
                  </Link>
                  <Link to={'/'} className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    Paramètres
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button 
                  //onClick={()=>} 
                  className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors lg:hidden">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <nav className="px-4 py-4 space-y-4">
            <Link to={'/'} className="block text-white hover:text-blue-400 transition-colors font-medium">
              Accueil
            </Link>
            <Link to={'/catalogue'} className="block text-white hover:text-blue-400 transition-colors font-medium">
              Émissions
            </Link>
            <Link to={'/live'} className="block text-white hover:text-blue-400 transition-colors font-medium">
              Direct
            </Link>
            <Link to={'/'} className="block text-white hover:text-blue-400 transition-colors font-medium">
              Documentaires
            </Link>
            {/* Onglet Admin mobile */}
            {isAdmin && (
              <Link to={'/adminbord'} className="block text-yellow-300 hover:text-yellow-400 transition-colors font-medium">
                Admin
              </Link>
            )}
            <div className="border-t border-gray-900 pt-4 space-y-3">
              <Link to={''} className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
              <Link to={''} className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors">
                <User className="h-5 w-5" />
                <span>Mon Profil</span>
              </Link>
              <Link to={''} className="block text-white hover:text-blue-400 transition-colors">
                Paramètres
              </Link>
              <button 
              //onClick={()}
              className="block text-white hover:text-blue-400 transition-colors">
                Se déconnecter
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Overlay pour fermer le menu utilisateur */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}
    </header>
  )
}
