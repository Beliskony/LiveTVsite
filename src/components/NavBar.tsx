import { useEffect, useState } from "react"
import { Search, Menu, X, User, Bell, ChevronDown, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./auth-context" // branchement sur ton AuthProvider
import { LogSignIn } from "./LogSignIn"
import { emissionData } from "@/data/emissionsData"
import { articleData } from "@/data/articlesData"


export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)
  const [results, setResults] = useState<any[]>()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)
  const openAuthModal = () => setIsAuthModalOpen(true)
  const closeAuthModal = () => setIsAuthModalOpen(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (query: string) => {
  setSearchQuery(query)

  if (!query.trim()) {
    setResults([])
    return
  }

  const lowerQuery = query.toLowerCase()


  const emissionResults = emissionData.filter((emission) =>
    emission.nom.toLowerCase().includes(lowerQuery) 
  )

  const articleResults = articleData.filter((article) =>
    article.title.toLowerCase().includes(lowerQuery)
  )

  setResults([
    ...emissionResults.map((e) => ({ type: "emission", ...e })),
    ...articleResults.map((a) => ({ type: "article", ...a })),
  ])
}


  return (
    <>
      <header className={`absolute w-full bg-transparent backdrop-blur-sm text-white hover:bg-gray-900 top-0 z-50 ${isScrolled ? " bg-gray-900" : ""}`}>
        <div className="container max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 h-14 w-32 object-cover justify-center">
              <Link to={"/home"}>
                <img src="/logotvRM.png" className="h-full p-2 w-32 lg:w-44" />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-10 xl:px-5 text-white">

              <Link to={"/videos"} className="hover:text-blue-400 transition-colors font-medium">
                Replay
              </Link>

              <Link to={"/programmes"} className="hover:text-blue-400 transition-colors font-medium">
                Programmes
              </Link>

              <Link to={"/"} className="px-3 gap-x-2 justify-center items-center flex flex-row text-white transition-colors bg-red-500 rounded-lg font-medium">
                <img src="/liveIcon.svg" className="h-4 w-4"  />
                Live
              </Link>
              
              <div className="relative group">
                  <button className="hover:text-blue-400 transition-colors font-medium flex items-center gap-1">
                      Eglise Yeshoua
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  <div className="absolute hidden group-hover:block  mt-1 rounded shadow-lg min-w-[150px] z-10 bg-gray-900 text-white transition-all ease-in-out delay-75">
                      <Link to="/egliseYeshoua/presentation"
                            className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                          Presentation
                      </Link>
                      
                      <Link to="/egliseYeshoua/articles"
                            className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                          Articles
                      </Link>
                  </div>
              </div>
              {isAdmin && (
                <Link to={"/admin"} className="hover:text-yellow-400 transition-colors font-medium text-yellow-300">
                  Admin
                </Link>
              )}
            </nav>

            {/* Search Bar Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher émissions, événements..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2  border border-white rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                />
                {results && results.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full bg-gray-900 border border-gray-800 rounded-md shadow-lg z-50">
                  <ul className="max-h-60 overflow-y-auto">
                    {results.map((result, _index) => (
                      <li key={`${result.type}-${result.id}`} className="px-4 py-2 hover:bg-gray-800 transition-colors">
                        <Link
                          to={
                            result.type === "article" ? `/egliseYeshoua/articles/${result.id}` :
                            result.type === "emission" ? `/programmes/${result.id}` : "#"
                          }
                          className="text-white justify-between border-b border-gray-700 hover:border-blue-500 flex items-center pb-1.5"
                        >
                          {result.title || result.nom || result.name}
                          <img src={result.couverture || result.featured_image} alt={result.title || result.nom || result.name} className="h-10 w-10 ml-2 inline-block rounded-lg" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
              
            </div>

            {/* User Actions Desktop */}
            <div className="hidden md:flex items-center space-x-4 md:space-x-0">

              <div className="relative">
                {!isAuthenticated ? (
                  <button
                    onClick={openAuthModal}
                    className="flex items-center space-x-2 p-2 rounded-full transition-colors text-white  border border-white hover:bg-white hover:text-gray-900"
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-2 p-2 rounded-md transition-colors text-white hover:bg-gray-800 hover:text-white"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white ">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 " />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1 z-50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Se déconnecter</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button className="hidden p-2 text-gray-900 hover:bg-gray-800 rounded-md transition-colors lg:hidden">
                <Search className="h-5 w-5" />
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                {isMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10 font-bold" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="hidden pb-4">
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
              <Link to={"/"} className="px-2 w-20 gap-x-1 justify-center items-center flex flex-row text-white transition-colors bg-red-500 rounded-lg font-medium cursor-pointer">
                <img src="/liveIcon.svg" className="h-4 w-4"  />
                Live
              </Link>
              
              <Link to={"/videos"} className="block text-white hover:text-blue-400 transition-colors font-medium">
                Replay
              </Link>

              <Link to={"/programmes"} className="block text-white hover:text-blue-400 transition-colors font-medium">
                Nos Programmes
              </Link>
              
              <div>
                  <button onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                  className="hover:text-blue-400 transition-colors font-medium flex items-center gap-1">
                      Eglise Yeshoua
                      <ChevronDown className="h-4 w-4" />
                  </button>
                  {isSubmenuOpen && (
                  <div className="ml-5 bg-gray-900 text-white mt-1 min-w-[150px] z-10 transition-all ease-in-out delay-75">
                      <Link to="/egliseYeshoua/presentation"
                            className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                          Presentation
                      </Link>
                      
                      <Link to="/egliseYeshoua/articles"
                            className="block px-4 py-2 hover:bg-gray-700 transition-colors">
                          Articles
                      </Link>
                  </div>
                  )}
              </div>

              {isAdmin && (
                <Link
                  to={"/admin"}
                  className="block text-yellow-300 hover:text-yellow-400 transition-colors font-medium"
                >
                  Admin
                </Link>
              )}
              <div className="border-t border-gray-900 pt-4 space-y-3">
                {isAuthenticated && (
                  <>
                    <Link to={""} className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors">
                      <Bell className="h-5 w-5" />
                      <span>Notifications</span>
                    </Link>
                    <div className="flex flex-row items-center gap-x-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      <span className="text-sm font-medium">{user?.name}</span>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="block text-white hover:text-blue-400 transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <button
                    onClick={openAuthModal}
                    className="block text-white hover:text-blue-400 transition-colors"
                  >
                    Se connecter
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}

        {/* Overlay fermeture menu utilisateur */}
        {isUserMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)}></div>
        )}
      </header>

      {/* Modale Auth */}
      {isAuthModalOpen && <LogSignIn isOpen={isAuthModalOpen} onClose={closeAuthModal} />}
    </>
  )
}
