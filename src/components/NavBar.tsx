import { useEffect, useState } from "react"
import { Search, Menu, X, User, Bell, ChevronDown, LogOut, PlayCircle, GalleryHorizontal, GalleryHorizontalEnd, GalleryVerticalEnd, Home } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "./auth-context" // branchement sur ton AuthProvider
import { LogSignIn } from "./LogSignIn"
import { useLocation } from "react-router-dom"


export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const location = useLocation()

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

const handleSearch = async (query: string) => {
  if (!query.trim()) {
    setResults([])
    return
  }

    try {
    const [programmesRes, articlesRes] = await Promise.allSettled([
      fetch("https://api.yeshouatv.com/api/list_programmes_for_user", {method: "GET"}),
      fetch("https://api.yeshouatv.com/api/list_article_for_user", {method: "GET"}),
    ])

       let programmes: any[] = []
       let articles: any[] = []
    // ✅ Gestion programmes
    if (programmesRes.status === "fulfilled" && programmesRes.value.ok) {
      const programmesJson = await programmesRes.value.json()
      programmes = programmesJson.data || []
    }

    // ✅ Gestion articles même si la route 404
    if (articlesRes.status === "fulfilled" && articlesRes.value.ok) {
      const articlesJson = await articlesRes.value.json()
      articles = articlesJson.data || []
    }
    
    const lowerQuery = query.toLowerCase()

    const filteredProgrammes = programmes.filter((programme: any) =>
      programme.nom.toLowerCase().includes(lowerQuery)
    ).map((item: any) => ({type: "emission", ...item}))

        // Filtrage des articles (données locales)
    const filteredArticles = articles.filter((article: any) =>
      article.title.toLowerCase().includes(lowerQuery)
    ).map((item: any) => ({ type: "article", ...item }))

    setResults([...filteredProgrammes, ...filteredArticles])
  } catch (error) {
    console.error("Erreur dans handleSearch :", error)
    setResults([])
  }
}

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    handleSearch(searchQuery)
  }, 300)

  return () => clearTimeout(delayDebounce)
}, [searchQuery])


  return (
    <>
      <header className={`fixed backdrop-blur-sm text-white font-normal text-lg hover:bg-[#1faae1] top-0 z-50 ${isScrolled ? " bg-[#1faae1]" : "bg-transparent"}`}>
        <div className="w-screen px-4">
          <div className="flex items-center max-sm:hidden justify-between w-full h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={"/"}>
                <img src="/logotvRM.png" alt="logo" className="h-full p-2 w-32 lg:w-44" />
              </Link>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex md:text-xs lg:text-[15px] items-center space-x-10 md:space-x-4 lg:space-x-5 xl:px-5 text-white">

              <Link to={"/Tvchaine"} className="hover:text-gray-900 transition-colors font-medium">
                Notre chaîne
              </Link>

              <Link to={"/programmes"} className="hover:text-gray-900 transition-colors font-medium">
                Nos émissions
              </Link>

              <Link to={"/"} className="px-3 gap-x-2 justify-center items-center flex flex-row text-white transition-colors bg-red-500 rounded-lg font-medium">
                <img src="/liveIcon.svg" alt="liveIcon" className="h-4 w-4"  />
                Live
              </Link>
              
              <div className="relative group">
                  <button className="hover:text-gray-900 transition-colors font-medium flex items-center gap-1">
                      Eglise Yeshoua
                      <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>

                  <div className="absolute hidden group-hover:block  mt-1 rounded shadow-lg min-w-[150px] z-10 bg-[#1faae1] text-white transition-all ease-in-out delay-75">
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
            <div className="hidden xl:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <input
                  id="recherche"
                  type="text"
                  value={searchQuery}
                  placeholder="Rechercher programmes, articles..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2  border border-white rounded-md text-white placeholder-white/65 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-colors"
                />
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 mt-2 w-full bg-[#1faae1] border border-gray-800 rounded-md shadow-lg z-50">
              {results.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {results.map((result, _index) => (
                    <li key={`${result.type}-${result.id}`} className="px-4 py-2 hover:bg-gray-800 transition-colors">
                      <Link to={
                        result.type === "article"
                          ? `/egliseYeshoua/articles/${result.id}`
                          : result.type === "emission"
                          ? `/programmes/${result.id}`
                          : "#"
                          }
                          onClick={() => {
                            setSearchQuery("")
                            setResults([])
                          }}
                          className="text-white justify-between border-b border-gray-700 hover:border-blue-500 flex items-center pb-1.5">
                          {result.title || result.nom || result.name}
                        <img src={result.couverture || result.feature_image}
                          alt={result.title || result.nom || result.name}
                          className="h-10 w-10 ml-2 inline-block rounded-lg" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
            <div className="px-4 py-3 text-sm text-gray-400 text-center">
              Aucun résultat trouvé pour « {searchQuery} ».
            </div>
          )}
        </div>
        )}

          </div>
              
            </div>

            {/* User Actions Desktop */}
            <div className="hidden md:flex items-center md:space-x-0 md:mx-1 ">

              <div className="relative lg:mr-2 xl:mr-6">
                {!isAuthenticated ? (
                  <button
                    onClick={openAuthModal}
                    className="flex items-center space-x-2 p-2 rounded-full transition-colors text-white  border border-white hover:bg-white hover:text-gray-900"
                  >
                    <div className=" flex items-center justify-center gap-1.5 md:text-xs lg:text-[15px]">
                      <User className="h-4 w-4" />
                      <h4>S'identifier</h4>
                    </div>
                    
                  </button>
                ) : (
                  <>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center space-x-2 p-2 rounded-md transition-colors text-white hover:bg-gray-800 hover:text-white">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-white ">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-medium">{user?.name}</span>
                      <ChevronDown className="h-4 w-4 " />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#1faae1] border border-gray-700 rounded-md shadow-lg py-1 z-50">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-white hover:bg-gray-800 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-xs">Se déconnecter</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
          <div className="md:hidden w-full fixed top-0 z-50 text-sm">
            <div className="flex  bg-[#1faae1] border-t border-gray-800 p-2 justify-around items-center text-white font-bold text-[12px]">
    
            {/* Menu Toggle */}
              <button onClick={() => setIsRightDrawerOpen(true)} className="flex flex-col items-center">
                <Menu className="h-5 w-5" />
                <span className="mt-1">Menu</span>
              </button>

              {isRightDrawerOpen && (
                <>
                  <div className="fixed inset-0 bg-black bg-opacity-50 z-20"
                  onClick={() => setIsRightDrawerOpen(false)}></div>

                  {/* Drawer Content*/}
                  <div className="fixed top-0 left-0 w-2/3 h-screen bg-[rgba(0,0,0,0.9)] z-50 rounded-l p-3 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-4">
                      <img src="/logotvRM.png" className="h-16 w-32"/>
                      <button onClick={() => setIsRightDrawerOpen(false)}>
                        <X className="text-white h-7 w-7"/>
                      </button>
                    </div>

                    <nav className="mt-10 flex flex-col gap-y-4 text-white text-xl">
                      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex justify-between items-center w-full text-white transition-colors">
                            <span>Eglise Yeshoua</span>
                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}/>
                      </button>

                    {isMenuOpen && (
                    <div className="ml-4 mt-2 space-y-2">
                      <Link to="/egliseYeshoua/presentation" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-900" >
                        Présentation
                      </Link>
                      
                      <Link to="/egliseYeshoua/articles" onClick={() => setIsMenuOpen(false)} className="block text-white hover:text-gray-900" >
                        Articles
                      </Link>
                    </div>
                    )}
                        {isAdmin && (
                          <Link to="/admin" onClick={() => setIsRightDrawerOpen(false)} className="text-yellow-300 hover:text-yellow-400">
                            Admin
                          </Link>
                        )}
                    </nav>
                  </div>
                </>
              )}

            {/* Replay */}
              <Link to="/Tvchaine" className={`flex flex-col items-center text-white ${
              location.pathname.startsWith("/Tvchaine") ? "after:content-[''] after:block after:h-[2px] after:w-full after:mt-1 after:bg-gray-900" : ""
              }`}>
                <Home className="h-5 w-5" />
                <span className="mt-1">Chaîne</span>
              </Link>

            {/* Live */}
              <Link to="/" className={`flex flex-col items-center text-white ${
              location.pathname === "/" ? "after:content-[''] after:block after:h-[2px] after:w-full after:mt-1 after:bg-gray-900" : ""
              }`}>
                <img src="/liveRed.svg" alt="liveIcon" className="h-5 w-5"/>
                <span className="mt-1">Live</span>
              </Link>

            {/* Programmes */}
              <Link to="/programmes" className={`flex flex-col items-center text-white ${
              location.pathname.startsWith("/programmes") ? "after:content-[''] after:block after:h-[2px] after:w-full after:mt-1 after:bg-gray-900" : ""
              }`}>
                <GalleryVerticalEnd className="h-5 w-5 rotate-180" />
                <span className="mt-1">Emissions</span>
              </Link>

            {/* Connexion */}
              {!isAuthenticated ? (
                <button onClick={openAuthModal} className="flex flex-col items-center">
                  <User className="h-5 w-5" />
                  <span className="mt-1">Connexion</span>
                </button>
                ) : (
                  <>
                <button onClick={toggleUserMenu} className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white ">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                  </div>
                  <span className="mt-1">{user?.name?.split(" ")[0]}</span>
                </button>

                {isUserMenuOpen && (
                      <div className="absolute top-14 right-5 mt-2 w-48 bg-[#1faae1] border border-gray-700 rounded-md shadow-lg py-1 z-50">
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
