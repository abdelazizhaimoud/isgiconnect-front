import React from 'react';
import { Link } from 'react-router-dom';

function Index() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Area with Video Background */}
      <div className="relative min-h-screen flex flex-col">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-screen z-0">
          <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-gray-50/30 to-red-100/60">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute w-full h-full object-cover -z-10"
            >
              <source src="images/background_meeting_online.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Header */}
        <header className="relative z-50 bg-gray-50/95 border-b border-gray-200 shadow-md">
          <div className="container mx-auto px-6">
            <nav className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link to="/accueil" className="flex items-center">
                <img 
                  src="./images/Logo.svg" 
                  alt="Logo" 
                  className="w-30 h-auto mr-4"
                />
              </Link>

              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-green-500 transition-colors"
                type="button"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="bg-current block h-0.5 w-6 rounded-sm transition-all"></span>
                  <span className="bg-current block h-0.5 w-6 rounded-sm mt-1 transition-all"></span>
                  <span className="bg-current block h-0.5 w-6 rounded-sm mt-1 transition-all"></span>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {/* Nav Links */}
                <ul className="flex items-center space-x-8">
                  <li>
                    <Link 
                      to='/accueil' 
                      className="text-black font-bold uppercase text-sm px-5 py-2 rounded hover:text-green-500 transition-colors"
                    >
                      <div className="nav-link">Accueil de moi <span className="sr-only">(current)</span></div>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/apropos"
                      className="text-black font-bold uppercase text-sm px-5 py-2 rounded hover:text-green-500 transition-colors"
                    >
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/contact"
                      className="text-black font-bold uppercase text-sm px-5 py-2 rounded hover:text-green-500 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>

                {/* Auth Buttons */}
                <div className="flex items-center space-x-4 ml-5">
                  <Link to="/signup">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium mr-11">
                      S'inscrire
                    </button>
                  </Link>
                  <Link to="/login">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors font-medium">
                      S'authentifier
                    </button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex items-center">
              <div className="w-full lg:w-2/3">
                <div className="text-white mb-36">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight font-sans">
                    Connectez-vous, échangez et apprenez avec des étudiants du monde entier 🌍
                  </h1>
                  
                  <div className="mt-8">
                    {/* Custom Button */}
                    <Link to='/offre'>
                      <button className="inline-flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold transition-all hover:bg-green-500 group mt-8">
                        <span className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center transition-colors group-hover:bg-blue-600">
                          <svg
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 text-green-500 group-hover:text-white transition-colors"
                          >
                            <path
                              d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        Recherche d'offres
                      </button>
                    </Link>

                    {/* Status Badges */}
                    <div className="mt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-white/80 text-black px-3 py-1 rounded-full text-sm font-medium">
                          100% free!
                        </span>
                        <span className="bg-white/80 text-black px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ml-6">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          23 631 Online
                        </span>
                      </div>
                      <Link 
                        to='/entreprise'
                        className="inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors mt-4"
                      >
                        Entreprises partenaires →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Community Stats */}
      <section className="py-16 text-center">
        <h2 className="text-2xl lg:text-4xl font-medium mb-12">
          Notre <span className="font-bold">communauté étudiante</span> compte <br />
          plus d' <span className="font-bold">un million</span> de membres 
          <br />
          <small className="text-lg text-gray-600">(et ce n'est que le début)</small>
        </h2>

        <div className="container mx-auto px-6 mt-10">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl text-green-500 font-bold mb-2">+1M</h3>
              <span className="text-gray-600">Membres de la communauté</span>
            </div>
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl text-green-500 font-bold mb-2">+19M</h3>
              <span className="text-gray-600">Sessions d'étude</span>
            </div>
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl text-green-500 font-bold mb-2">+4M</h3>
              <span className="text-gray-600">Membres de la communauté</span>
            </div>
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl text-green-500 font-bold mb-2">+215</h3>
              <span className="text-gray-600">Pays</span>
            </div>
            <div className="text-center">
              <h3 className="text-3xl lg:text-4xl text-green-500 font-bold mb-2">4.8/5</h3>
              <span className="text-gray-600">Avis positifs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-purple-50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-8">
            Trouvez votre communauté. Fixez vos objectifs. Atteignez-les. Soyez récompensé.
          </h1>
          <div className="pt-16">
            <h2 className="text-2xl text-blue-600 mb-4">Plus forts ensemble 💪</h2>
            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Imaginez un monde où <strong>étudier devient agréable</strong>. Un monde où vous <strong>fixez des objectifs</strong> et les accomplissez <strong> réellement </strong>. Où vous trouvez
              <strong> l'accompagnement</strong> dont vous avez besoin et vous sentez soutenu.
              Où vous voyez <strong>vos progrès</strong> et célébrez vos réussites aux côtés de milliers d'autres étudiants.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img src="./images/poeple.png" alt="People" className="w-full h-auto" />
            </div>
            <div className="lg:w-1/2">
              <a 
                href="#header" 
                className="flex items-center mb-6"
              >
                <img 
                  src="./images/Logo.svg" 
                  alt="Logo" 
                  className="w-38 h-auto mr-5 mb-5"
                />
                <span className="text-3xl font-bold">
                  ISGI <span className="text-green-500">Connect</span>
                </span>
              </a>
              <p className="text-black text-lg leading-relaxed mb-6">
                Nous sommes une plateforme d'e-learning dynamique conçue pour rassembler les étudiants dans un environnement
                d'apprentissage collaboratif et bienveillant. ISGIconnect met en relation les apprenants avec des partenaires
                d'étude, favorisant l'engagement et les progrès partagés. Que ce soit pour préparer des examens, surmonter
                des matières difficiles ou adopter des habitudes d'étude régulières, notre plateforme aide les étudiants
                à rester motivés et à réussir en étudiant ensemble.
              </p>
              <Link 
                to='/apropos'
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                En savoir plus →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 pt-8">
            <h2 className="text-3xl font-medium text-gray-800">
              Que disent nos utilisateurs ?
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex items-center gap-4">
              <div className="flex-shrink-0">
                <img 
                  src="./images/client1.jpg" 
                  alt="Client 1" 
                  className="w-50 h-50 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6 className="font-semibold text-lg">Moana Michell</h6>
                <p className="text-gray-600 text-sm">magna aliqua</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md flex items-center gap-4">
              <div className="flex-shrink-0">
                <img 
                  src="./images/client2.jpg" 
                  alt="Client 2" 
                  className="w-50 h-50 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
                </p>
                <h6 className="font-semibold text-lg">Mike Hamell</h6>
                <p className="text-gray-600 text-sm">magna aliqua</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Link 
                to='/contact'
                className="text-xl font-semibold mb-6 text-white hover:text-blue-400 transition-colors"
              >
                Contact Us
              </Link>
              <div className="space-y-4">
                <a href="" className="flex items-center hover:text-blue-400 transition-colors">
                  <i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
                  <span>Location</span>
                </a>
                <a href="" className="flex items-center hover:text-blue-400 transition-colors">
                  <i className="fa fa-phone mr-3" aria-hidden="true"></i>
                  <span>Call +212 723456789</span>
                </a>
                <a href="" className="flex items-center hover:text-blue-400 transition-colors">
                  <i className="fa fa-envelope mr-3" aria-hidden="true"></i>
                  <span>isgiconnect@contact.ma</span>
                </a>
              </div>
            </div>
            <div>
              <div className="mb-6">
                <a href="#header" className="text-4xl font-bold font-dancing">
                  ISGI <span className="text-green-500">Connect</span>
                </a>
                <p className="mt-4 text-gray-300">
                  Notre équipe de passionnés conçoit et améliore cette plateforme pour une expérience d'apprentissage optimale. Vos retours sont les bienvenus !
                </p>
                <div className="flex gap-4 mt-6">
                  <a 
                    href="https://github.com/abdelazizhaimoud" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 hover:border-green-500 hover:scale-105 active:scale-95 transition-all"
                  >
                    <img 
                      src="https://avatars.githubusercontent.com/u/89823304?v=4" 
                      alt="Contributor 1"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://github.com/medchetoui" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 hover:border-green-500 hover:scale-105 active:scale-95 transition-all"
                  >
                    <img 
                      src="https://avatars.githubusercontent.com/u/149297561?v=4" 
                      alt="Contributor 2"
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a 
                    href="https://github.com/walidsabbar1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 hover:border-green-500 hover:scale-105 active:scale-95 transition-all"
                  >
                    <img 
                      src="https://avatars.githubusercontent.com/u/125445648?v=4" 
                      alt="Contributor 3"
                      className="w-full h-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Index