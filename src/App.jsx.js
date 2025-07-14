import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, Info, Book, UserPlus, Image, Mail, Menu, X, Download, Monitor, Users, Award, Briefcase, Phone, MessageSquare, MapPin, Headset, Facebook } from 'lucide-react'; // Added Facebook icon

// Image and PDF Naming Conventions for your /public/images folder
// Slideshow Images: slideshow1.jpg, slideshow2.jpg, slideshow3.jpg
// Staff Photos: staff_gideon_lagat.jpg, staff_fredrrick_olang.jpg, staff_sharon_kiptoo.jpg
// Co-curricular Images: cocurricular1.jpg, cocurricular2.jpg, cocurricular3.jpg, cocurricular4.jpg
// Alumni Photo: alumni_laura.jpg
// Fee Structure PDF: limros_academy_fee_structure.pdf

// Background Images (will be applied as inline styles with specific URLs)
const HOME_BG_IMAGE = 'https://www.pexels.com/photo/pile-of-books-433333/';
const ACADEMICS_BG_IMAGE = 'https://www.pexels.com/photo/photography-of-people-graduating-1205651/';
const CONTACT_BG_IMAGE = 'https://www.pexels.com/photo/clear-light-bulb-placed-on-chalkboard-355952/';

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);
  // State for alternating header color
  const [headerColor, setHeaderColor] = useState('bg-green-950');

  // Effect to alternate header color every few seconds
  useEffect(() => {
    const colorInterval = setInterval(() => {
      setHeaderColor((prevColor) =>
        prevColor === 'bg-green-950' ? 'bg-blue-950' : 'bg-green-950'
      );
    }, 5000); // Alternates every 5 seconds
    return () => clearInterval(colorInterval);
  }, []);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsNavOpen(false); // Close nav on item click
    window.scrollTo(0, 0); // Scroll to top of the page
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage handleNavClick={handleNavClick} />;
      case 'about':
        return <AboutPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'gallery':
        return <GalleryEventsPage />;
      case 'staff':
        return <StaffPage />;
      case 'student-life':
        return <StudentLifePage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage handleNavClick={handleNavClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <Header setActivePage={handleNavClick} isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} headerColor={headerColor} />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

// Header Component
const Header = ({ setActivePage, isNavOpen, setIsNavOpen, headerColor }) => {
  const navItems = [
    { name: 'Home', icon: HomeIcon, page: 'home' },
    { name: 'About', icon: Info, page: 'about' },
    { name: 'Academics', icon: Book, page: 'academics' },
    { name: 'Admissions', icon: UserPlus, page: 'admissions' },
    { name: 'Gallery/Events', icon: Image, page: 'gallery' },
    { name: 'Staff', icon: Users, page: 'staff' },
    { name: 'Student Life', icon: Award, page: 'student-life' },
    { name: 'Contact', icon: Mail, page: 'contact' },
  ];

  return (
    <header className={`${headerColor} text-white shadow-lg sticky top-0 z-50 transition-colors duration-1000 ease-in-out`}> {/* Dynamic header color */}
      <div className="container mx-auto flex items-center justify-between p-4 flex-wrap">
        <div className="flex items-center space-x-3">
          <img
            src="https://scontent.fnuu1-1.fna.fbcdn.net/v/t39.30808-6/347555740_115783778235420_1312282646650984155_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=M6nniVztw-QQ7kNvwHuYEcj&_nc_oc=AdnUs2lcUvA8V_ROouVSCQyZ-jmJcJ78cX4CHWYS50Bn9uZKDFORHaY36N-kbXBDCUg&_nc_zt=23&_nc_ht=scontent.fnuu1-1.fna&_nc_gid=gLCtcpNLYEevC_Hsw5J2-Q&oh=00_AfSlXXu1_3Gj63wGIlDIyzKB1oLJ7HpAzzZnf-V1o_nD7g&oe=687B167D" // Updated logo link
            alt="Limros Academy Logo"
            className="rounded-full h-10 w-10 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/40x40/ffffff/000000?text=LAT"; }} // Changed placeholder text
          />
          <h1 className="text-2xl font-bold rounded-md px-2 py-1">LIMROS ACADEMY TURBO</h1>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400">
            {isNavOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-green-800 transition-colors duration-200"
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile navigation menu */}
      {isNavOpen && (
        <nav className="md:hidden bg-green-900 pb-4">
          <div className="flex flex-col items-center space-y-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setActivePage(item.page)}
                className="flex items-center space-x-3 w-full justify-center py-3 px-4 rounded-md hover:bg-green-800 transition-colors duration-200"
              >
                <item.icon size={22} />
                <span className="text-lg font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center mt-10 rounded-t-lg shadow-inner">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} LIMROS ACADEMY TURBO. IN GOD WE EXEL!</p>
        <p className="mt-2 text-sm">Designed with <span className="text-red-500">&hearts;</span> for education.</p>
        <p className="mt-2 text-sm">Designed by Software engineer jeruto!.</p>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = ({ handleNavClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://scontent.fnuu1-1.fna.fbcdn.net/v/t39.30808-6/469183915_445018818645246_4631592244716068593_n.jpg?stp=dst-jpg_s206x206_tt6&_nc_cat=104&ccb=1-7&_nc_sid=fe5ecc&_nc_ohc=wmAECkm4md0Q7kNvwHd82IF&_nc_oc=AdkgsTcu02RVf7qNyL45EUB2IKISIf1IoQSQ6KP3_qzP0YYf3QWqPll88VP4GSZozDM&_nc_zt=23&_nc_ht=scontent.fnuu1-1.fna&_nc_gid=g47TtZHoByhC2AdmD_l84g&oh=00_AfRTu-Gm-Yli99vj2HEM4KiLuKcWqF4LzsVssSOz7WNk6g&oe=687B1618",
    "https://scontent.fnuu1-1.fna.fbcdn.net/v/t39.30808-6/476561629_486458051176209_1729609647883181033_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=8nLZEy07O50Q7kNvwFsDF1o&_nc_oc=AdkQEELX7RLrXwgdmxpHAMRRz3M32BfmDPbLtslc2bOA6yRtKNbUJX2Lt-fZZ2MVfkQ&_nc_zt=23&_nc_ht=scontent.fnuu1-1.fna&_nc_gid=gSw7zhFR2Vay7IXf6i9TsA&oh=00_AfTa2UhuiK6rPKgd1ih9kSNiqH95AuTI6W7lMgg3vO4Urg&oe=687B320D",
    "https://scontent.fnuu1-1.fna.fbcdn.net/v/t39.30808-6/484563856_510584318763582_3251682745581043745_n.jpg?stp=c0.124.904.904a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=50ad20&_nc_ohc=oOJb-KYf4gQQ7kNvwHflul4&_nc_oc=AdlYW2tCLYefuLtrVWedJ7BW3RuR3iJuIzUnr78HqL84Ag6n-U48bitFSf_TR0WGER0&_nc_zt=23&_nc_ht=scontent.fnuu1-1.fna&_nc_gid=KKS1ZsYxsGgy0rmjyoHxMA&oh=00_AfTg67eR5Gk_FWdQ-XBqQuOFlhYrbj0Gr5Eh1sgelTlQVw&oe=687B2BFC",
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideInterval);
  }, [images.length]);

  return (
    <section
      className="p-8 rounded-lg shadow-md mb-8 relative overflow-hidden"
      style={{
        backgroundImage: `url(${HOME_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div> {/* Overlay for readability */}
      <div className="relative z-10"> {/* Content wrapper */}
        <h2 className="text-4xl font-extrabold text-red-800 mb-6 text-center">Welcome to LIMROS ACADEMY!</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto mb-8">
          LIMROS ACADEMY is a leading primary and junior secondary school dedicated to fostering a nurturing and stimulating environment where every student can achieve their full potential.We nature and produce a whole rounded citizen. We believe in holistic education that balances academic excellence with character development and extracurricular engagement. Join our vibrant community and embark on a journey of discovery, growth, and success!
        </p>

        {/* Image Slideshow */}
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg mb-10 h-64 sm:h-80 md:h-96">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`School Life ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x400/cccccc/333333?text=Image+Error"; }}
            />
          ))}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white scale-150' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Quick Links / Site Summary */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 p-6 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-red-800 mb-3">Admissions</h3>
            <p className="text-gray-600">Discover how to join our school family.</p>
            <button onClick={() => handleNavClick('admissions')} className="mt-4 inline-block bg-red-700 text-white px-5 py-2 rounded-full hover:bg-red-800 transition-colors">Learn More</button>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-3">Calendar</h3>
            <p className="text-gray-600">Stay updated with our academic calendar.</p>
            <button onClick={() => handleNavClick('gallery')} className="mt-4 inline-block bg-green-700 text-white px-5 py-2 rounded-full hover:bg-green-800 transition-colors">View Calendar</button>
          </div>
          <div className="bg-red-50 p-6 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold text-yellow-700 mb-3">Contact Us</h3>
            <p className="text-gray-600">Get in touch with our friendly staff.</p>
            <button onClick={() => handleNavClick('contact')} className="mt-4 inline-block bg-yellow-600 text-white px-5 py-2 rounded-full hover:bg-yellow-700 transition-colors">Contact Now</button>
          </div>
        </div>

        {/* Secondary Navigation Links for Mobile/Home Page */}
        <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">Explore Our School</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <button onClick={() => handleNavClick('about')} className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-200 transition-colors text-center">About Us</button>
            <button onClick={() => handleNavClick('academics')} className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-200 transition-colors text-center">Academics</button>
            <button onClick={() => handleNavClick('staff')} className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-200 transition-colors text-center">Our Staff</button>
            <button onClick={() => handleNavClick('student-life')} className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-200 transition-colors text-center">Student Life</button>
            <button onClick={() => handleNavClick('gallery')} className="bg-blue-100 text-blue-800 py-3 px-4 rounded-lg shadow-sm hover:bg-blue-200 transition-colors text-center">Gallery & Events</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Page Component
const AboutPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">About Us</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Vision & Mission</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed">
          <strong>Vision:</strong> To provide a whole rounded person, spiritually, physically, mentally and socially.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          <strong>Mission:</strong> To provide primary and basic education that is effective, accessible and sustainable.To provide holistic and compitent leaders and scholars of high intergrityand moral uprightness.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">School History</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed">
          LIMROS ACADEMY is a private, ordinary, day and boarding school offering co-education for boys and girls. Founded in 2006, our school began with a vision to provide quality education in a rapidly growing community. Starting with a small group of dedicated teachers and a handful of students, we have grown steadily over the decades, expanding our facilities and curriculum to meet the evolving needs of our students. Our rich history is built on a foundation of academic rigor, strong community ties, and a commitment to nurturing well-rounded individuals.
        </p>
      </div>

      {/* Section for School Statistics */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">School Statistics</h3> {/* Changed to dark green */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">Infrastructure & Classrooms</h4>
            <ul className="list-disc list-inside">
              <li>No. of Classrooms: 16</li> {/* Updated */}
              <li>No. of Boys' Toilets: 2</li>
              <li>No. of Girls' Toilets: 2</li>
              <li>No. of Teachers' Toilets: 2</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-medium text-gray-800 mb-2">Enrollment & Staff</h4>
            <ul className="list-disc list-inside">
              <li>Total Student Enrollment: 312</li> {/* Updated */}
              <li>Total Teachers: 20</li> {/* Updated */}
            </ul>
          </div>
        </div>
      </div>

      {/* School Motto */}
      <div className="mb-8 p-6 bg-green-100 rounded-lg shadow-sm text-center"> {/* Changed to green-100 */}
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Our Motto</h3> {/* Changed to dark green */}
        <p className="text-xl italic font-medium text-gray-800">
          "IN GOD WE EXEL!"
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Message from Principal</h3> {/* Changed to dark green */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src="https://placehold.co/150x150/e0e0e0/333333?text=Principal"
            alt="Principal"
            className="rounded-full shadow-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/e0e0e0/333333?text=Principal"; }}
          />
          <p className="text-gray-700 leading-relaxed flex-1">
            "Welcome to limros ACADEMY! As Principal, I am incredibly proud of our dedicated staff, talented students, and supportive parent community. We strive to create an environment where every child feels valued, challenged, and inspired to reach their highest potential. Our commitment to academic excellence, character development, and a vibrant school life ensures that our students are well-prepared for future success. We look forward to partnering with you on your child's educational journey."
            <br /><br />
            <span className="font-semibold">- [Charles Yagan], Principal</span>
          </p>
        </div>
      </div>
    </section>
  );
};

// Academics Page Component
const AcademicsPage = () => {
  return (
    <section
      className="p-8 rounded-lg shadow-md mb-8 relative overflow-hidden"
      style={{
        backgroundImage: `url(${ACADEMICS_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div> {/* Overlay for readability */}
      <div className="relative z-10"> {/* Content wrapper */}
        <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Academics</h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-900 mb-3">Curriculum</h3> {/* Changed to dark green */}
          <p className="text-gray-700 leading-relaxed">
            LIMROS ACADEMY follows the CBC System, a comprehensive curriculum designed to provide a strong foundation in core subjects while encouraging critical thinking, creativity, and problem-solving skills. We integrate modern pedagogical approaches with traditional teaching methods to ensure a dynamic and engaging learning experience for all students. Our curriculum is regularly reviewed and updated to align with national educational standards and global best practices.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-green-900 mb-3">Subjects Offered</h3> {/* Changed to dark green */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
              <h4 className="text-xl font-medium text-gray-800 mb-2">Primary School</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>English Language Arts</li>
                <li>Mathematics</li>
                <li>Science</li>
                <li>Social Studies</li>
                <li>Art & Craft</li>
                <li>Music</li>
                <li>Physical Education</li>
                <li>Computer studies</li>
              </ul>
            </div>
            <div className="bg-gray-100 p-5 rounded-lg shadow-sm">
              <h4 className="text-xl font-medium text-gray-800 mb-2">Junior Secondary</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>English</li>
                <li>Kiswahili</li>
                <li>Mathematics</li>
                <li>Integrated Science</li>
                <li>History, Geography, CRE</li>
              </ul>
              <h4 className="text-xl font-medium text-gray-800 mt-4 mb-2">Electives/Optional Subjects</h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Computer Science</li>
                <li>Technical Subjects (e.g., Agriculture, Home Science)</li>
                <li>Performing Arts</li>
                <li>French/German</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-green-900 mb-3">Class Levels</h3> {/* Changed to dark green */}
          <ul className="list-disc list-inside text-gray-700 leading-relaxed">
            <li>Early Years (Pre-Kindergarten, Kindergarten)</li>
            <li>Primary School (Grade 1 - Grade 6)</li>
            <li>Junior Secondary School (Grade 7 - Grade 9)</li>
          </ul>
        </div>

        {/* Section: Best Performers */}
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-semibold text-red-800 mb-3 flex items-center space-x-2">
            <Award size={24} className="text-yellow-700" />
            <span>Recognition of Best Performers</span>
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Limros Academy, we celebrate academic excellence and recognize students who consistently achieve outstanding results. Our dedicated programs and supportive environment empower students to reach their full potential.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <img src="https://placehold.co/80x80/ffd700/000000?text=Student" alt="Top Student" className="rounded-full mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/ffd700/000000?text=Student"; }} />
              <p className="font-semibold text-gray-800">Jane Doe</p>
              <p className="text-sm text-gray-600">Top in Mathematics, Grade 8</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <img src="https://placehold.co/80x80/ffd700/000000?text=Student" alt="Top Student" className="rounded-full mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/ffd700/000000?text=Student"; }} />
              <p className="font-semibold text-gray-800">John Smith</p>
              <p className="text-sm text-gray-600">Overall Best, Primary School</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <img src="https://placehold.co/80x80/ffd700/000000?text=Student" alt="Top Student" className="rounded-full mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/ffd700/000000?text=Student"; }} />
              <p className="font-semibold text-gray-800">Emily White</p>
              <p className="text-sm text-gray-600">Outstanding in Science, Grade 7</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <img src="https://placehold.co/80x80/ffd700/000000?text=Student" alt="Top Student" className="rounded-full mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/ffd700/000000?text=Student"; }} />
              <p className="font-semibold text-gray-800">David Green</p>
              <p className="text-sm text-gray-600">Top in English, Grade 6</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <img src="https://placehold.co/80x80/ffd700/000000?text=Student" alt="Top Student" className="rounded-full mx-auto mb-2" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x80/ffd700/000000?text=Student"; }} />
              <p className="font-semibold text-gray-800">Sarah Brown</p>
              <p className="text-sm text-gray-600">Overall Best, Junior Secondary</p>
            </div>
          </div>
        </div>

        {/* Section: History of School Performance */}
        <div className="mt-8 bg-green-50 p-6 rounded-lg shadow-sm"> {/* Changed to green-50 */}
          <h3 className="text-2xl font-semibold text-green-900 mb-3 flex items-center space-x-2"> {/* Changed to dark green */}
            <Book size={24} className="text-green-900" /> {/* Changed to dark green */}
            <span>History of School Performance</span>
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Limros Academy has a proud history of consistent academic performance and improvement. Our students regularly achieve above national averages in key examinations, reflecting the effectiveness of our teaching methodologies and the dedication of our students. We continuously strive for excellence, adapting to new educational trends while maintaining our core values. Detailed performance reports are available upon request from the Academics office.
          </p>
        </div>
      </div>
    </section>
  );
};

// Admissions Page Component
const AdmissionsPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Admissions</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">How to Apply</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed mb-4">
          Interested in joining Limros Academy? Please fill out our online application form for consideration. We will review your submission and get back to you with feedback.
        </p>
        <div className="text-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSchcbj0B_sPI0CKoBU7VrUFiGooRnAGu5t3J6TqgpSxomNzAQ/viewform?usp=header " // Updated Google Form link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-full hover:bg-green-800 transition-colors text-lg flex items-center justify-center space-x-2"
          >
            <UserPlus size={20} />
            <span>Apply Now via Google Form</span>
          </a>
        </div>
        <p className="text-gray-700 mt-4 italic text-center">
          For any feedback or inquiries regarding your application, please email us at: <a href="mailto:limrosacademy@gmail.com" className="text-blue-600 hover:underline">limrosacademy@gmail.com</a>
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Fee Structure</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed mb-4">
          Our detailed fee structure, including various payment methods, is available for download below.
        </p>
        <div className="text-center">
          <a
            href="/images/limros_fee_structure.pdf" // Updated path
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition-colors text-lg flex items-center justify-center space-x-2"
          >
            <Download size={20} />
            <span>Download Fee Structure (PDF)</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// Gallery/Events Page Component
const GalleryEventsPage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Gallery & Events</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Photos & Videos</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed mb-4">
          Explore memorable moments from our school events, academic achievements, sports activities, and creative arts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="relative group rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img
                src={`https://placehold.co/400x300/c7d2fe/3730a3?text=Event+${i}`} // Placeholder for co-curricular images, as new links were only for slideshow
                alt={`School Event ${i}`}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/c7d2fe/3730a3?text=Event+${i}`; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">Activity {i}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href="#" className="inline-block bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition-colors text-lg">View More Photos</a>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Event Calendar</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed mb-4">
          Stay informed about upcoming school events, holidays, parent-teacher conferences, and important dates.
        </p>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">JUL 15</span>
              <div>
                <p className="font-semibold text-gray-800">Parent-Teacher Conference</p>
                <p className="text-sm text-gray-600">9:00 AM - 4:00 PM, School Hall</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-red-200 text-red-800 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">AUG 01</span>
              <div>
                <p className="font-semibold text-gray-800">New Academic Year Begins</p>
                <p className="text-sm text-gray-600">All students report</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-yellow-200 text-yellow-800 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">SEP 10</span>
              <div>
                <p className="font-semibold text-gray-800">Annual Sports Day</p>
                <p className="text-sm text-gray-600">8:00 AM - 1:00 PM, School Field</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-red-200 text-red-800 font-bold px-3 py-1 rounded-full mr-3 flex-shrink-0">OCT 20</span>
              <div>
                <p className="font-semibold text-gray-800">Arts & Culture Festival</p>
                <p className="text-sm text-gray-600">6:00 PM, Auditorium</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

// Staff Page Component (corrected import for Headset if needed)
const StaffPage = () => {
  const staffMembers = [
    { name: "Mr. Gideon Lagat", title: "Head Teacher", photo: "/images/staff_gideon_lagat.jpg", bio: "Mr. Lagat has over 15 years of experience in educational leadership. He is dedicated to fostering a positive learning environment and academic excellence.", icon: Briefcase },
    { name: "Mr. Fredrrick Olang'", title: "Deputy Head Teacher", photo: "/images/staff_fredrrick_olang.jpg", bio: "Mr. Olang' is passionate about curriculum development and student welfare. He plays a key role in implementing innovative teaching strategies.", icon: Briefcase },
    { name: "Ms. Sharon Kiptoo", title: "Guidance Counselor", photo: "/images/staff_sharon_kiptoo.jpg", bio: "Ms. Kiptoo provides invaluable support to students, helping them navigate academic and personal challenges to achieve their full potential.", icon: Headset }, // Used Headset icon
  ];

  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Our Dedicated Staff</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffMembers.map((staff, index) => (
          <div key={index} className="bg-green-50 p-6 rounded-lg shadow-sm text-center transform hover:scale-105 transition-transform duration-300"> {/* Changed to green-50 */}
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-green-300" // Changed border color
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/e0e0e0/333333?text=Staff"; }}
            />
            <h3 className="text-xl font-semibold text-green-900 mb-1">{staff.name}</h3> {/* Changed to dark green */}
            <p className="text-green-700 mb-3 flex items-center justify-center space-x-2"> {/* Changed to green-700 */}
              <staff.icon size={18} />
              <span>{staff.title}</span>
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">{staff.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Student Life Page Component
const StudentLifePage = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Student Life</h2>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Co-curricular Activities</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed mb-4">
          At Limros Academy, we believe in nurturing well-rounded individuals. Our extensive range of co-curricular activities provides students with opportunities to explore their interests, develop new skills, and foster teamwork and leadership.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Sports (Football, Basketball, Athletics, Volleyball)</li>
          <li>Music and Drama Club</li>
          <li>Debate Club</li>
          <li>Science Club</li>
          <li>Environmental Club</li>
          <li>Art and Craft</li>
          <li>Scouting and Girl Guides</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-900 mb-3">Student Well-being & Support</h3> {/* Changed to dark green */}
        <p className="text-gray-700 leading-relaxed">
          The well-being of our students is paramount. We provide a supportive and safe environment where students can thrive academically, emotionally, and socially. Our dedicated team of counselors and teachers offers guidance and support whenever needed.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mt-3">
          <li>Counseling Services</li>
          <li>Health and Wellness Programs</li>
          <li>Peer Mentorship</li>
          <li>Anti-Bullying Initiatives</li>
        </ul>
      </div>

      {/* Alumni Section */}
      <div className="mt-10 bg-green-50 p-8 rounded-lg shadow-lg text-center"> {/* Changed to green-50 */}
        <h3 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3 text-green-900"> {/* Changed to dark green */}
          <Users size={32} className="text-green-700" /> {/* Changed to green-700 */}
          <span>Our Alumni Network</span>
        </h3>
        <p className="text-lg leading-relaxed max-w-3xl mx-auto mb-6 text-gray-800">
          We are incredibly proud of our alumni who have gone on to achieve great success in various fields. The Limros Academy alumni network is a strong and vibrant community that continues to support our current students and school initiatives.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <img
            src="/images/alumni_laura.jpg" // Example alumni photo
            alt="Alumni Success Story"
            className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-green-300" // Changed border color
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/128x128/e0e0e0/333333?text=Alumni"; }}
          />
          <div className="text-left">
            <p className="text-xl font-semibold text-gray-900">Laura M. (Class of 2015)</p>
            <p className="text-gray-700 italic">"Limros Academy provided me with an exceptional foundation, not just academically but also in building confidence and critical thinking. The teachers were incredibly supportive, and the diverse extracurricular activities helped me discover my passion for technology."</p>
            <p className="mt-2 text-sm text-gray-600">Currently a Software Engineer at Tech Innovations Inc.</p>
          </div>
        </div>
        <a
          href="#"
          className="mt-6 inline-block bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors text-lg shadow-md"
        >
          Join Our Alumni Network
        </a>
      </div>
    </section>
  );
};

// Contact Page Component
const ContactPage = () => {
  return (
    <section
      className="p-8 rounded-lg shadow-md mb-8 relative overflow-hidden"
      style={{
        backgroundImage: `url(${CONTACT_BG_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div> {/* Overlay for readability */}
      <div className="relative z-10"> {/* Content wrapper */}
        <h2 className="text-3xl font-bold text-red-800 mb-6 border-b-2 border-red-200 pb-2">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="bg-green-50 p-6 rounded-lg shadow-sm"> {/* Changed to green-50 */}
            <h3 className="text-2xl font-semibold text-green-900 mb-4">Get in Touch</h3> {/* Changed to dark green */}
            <p className="text-gray-700 flex items-center mb-2">
              <MapPin size={20} className="mr-3 text-green-700" /> {/* Changed icon color */}
              <span>Turbo, Uasin Gishu, Kenya</span>
            </p>
            <p className="text-gray-700 flex items-center mb-2">
              <Phone size={20} className="mr-3 text-green-700" /> {/* Changed icon color */}
              <span>+254 722 893 818</span> {/* Updated phone number */}
            </p>
            <p className="text-gray-700 flex items-center mb-2">
              <Mail size={20} className="mr-3 text-green-700" /> {/* Changed icon color */}
              <span><a href="mailto:limrosacademy@gmail.com" className="text-blue-600 hover:underline">limrosacademy@gmail.com</a></span>
            </p>
            <p className="text-gray-700 flex items-center mb-2">
              <Facebook size={20} className="mr-3 text-green-700" /> {/* Added Facebook icon */}
              <span><a href="https://www.facebook.com/Limrose315Turbo/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Page</a></span>
            </p>
            <p className="text-gray-700 flex items-center">
              <Monitor size={20} className="mr-3 text-green-700" /> {/* Changed icon color */}
              <span>Mon - Fri: 8:00 AM - 5:00 PM</span>
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-green-50 p-6 rounded-lg shadow-sm"> {/* Changed to green-50 */}
            <h3 className="text-2xl font-semibold text-green-900 mb-4">Send us a Message</h3> {/* Changed to dark green */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Email" />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                <textarea id="message" name="message" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition-colors duration-200"> {/* Changed button color */}
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Embed */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-green-900 mb-4">Find Us on the Map</h3> {/* Changed to dark green */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.4759495815187!2d35.1633512!3d0.5501174000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178225e01f68e0a3%3A0x8e8b0b8c0a8c0a8c!2sTurbo%2C%20Kenya!5e0!3m2!1sen!2sus!4v1718036219385!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map of Turbo, Kenya"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
