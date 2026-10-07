"use client";

import "./page.css";

import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  Music2,
  Play,
  ShieldCheck,
  Ticket,
  Users,
  Utensils,
  X,
  Car,
  Star,
  Heart,
  Handshake,
  Route,
  Plus,
  Video,
  Camera,
  ChevronLeft,
  ChevronDown,
  Home as HomeIcon,
  Mic,
  ImageIcon,
  Phone,
  Mail,
} from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

import { useState, useEffect, useCallback } from "react";

const heroSlides = [
  {
    bg: "/gallery/s3.png",
    overlay: "overlay-dark-left",
  },
  {
    bg: "/gallery/s4.png",
    overlay: "overlay-dark-left",
  }
];

const gallery = [
  "/images/gallery/s1.png",
  "/images/gallery/s2.png",
];

const singers = [
  {
    name: "Kairavi Buch",
    role: "Playback Singer",
    image: "/images/singers/singer1.jpg",
  },
  {
    name: "Aishwarya Majumdar",
    role: "Playback Singer",
    image: "/images/singers/singer2.jpg",
  },
  {
    name: "Osman Mir",
    role: "Folk Singer",
    image: "/images/singers/singer3.jpg",
  },
  {
    name: "Aditya Gadhvi",
    role: "Folk Singer",
    image: "/images/singers/singer4.jpg",
  },
  {
    name: "Geeta Rabari",
    role: "Folk Singer",
    image: "/images/singers/singer5.jpg",
  },
  {
    name: "Kinjal Dave",
    role: "Folk Singer",
    image: "/images/singers/singer6.jpg",
  },
];

const associates = [
  { name: "Rahul Sharma", role: "Lead Event Director", image: "/images/coord_1.jpg" },
  { name: "Priya Patel", role: "Stage Coordinator", image: "/images/coord_2.jpg" },
  { name: "Amit Desai", role: "Logistics Manager", image: "/images/coord_3.jpg" },
  { name: "Sneha Joshi", role: "Guest Relations", image: "/images/coord_4.jpg" },
  { name: "Vikram Singh", role: "Security Chief", image: "/images/coord_5.jpg" },
  { name: "Anjali Mehta", role: "Vendor Management", image: "/images/coord_6.jpg" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState("video");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false); // Make sure the menu actually closes!
  };

  const goTo = useCallback((idx: number) => {
    setSlideIndex((idx + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <main className="site">

      {/* ================= HEADER ================= */}

      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav">

          <button
            className="logo"
            onClick={() => scrollTo("home")}
          >
            <img
              src="/images/logo.webp"
              alt="Vadodara Vibrant Navratri"
            />
          </button>

          <nav className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>

            <button onClick={() => scrollTo("home")}>
              Home
            </button>

            <button onClick={() => scrollTo("about")}>
              About Navratri
            </button>

            <button onClick={() => scrollTo("event")}>
              VVN 2026
            </button>

            <button onClick={() => scrollTo("singers")}>
              Singers
            </button>

            <button onClick={() => scrollTo("sponsors")}>
              Sponsors
            </button>

            <button onClick={() => scrollTo("venue")}>
              Venue
            </button>

            <button onClick={() => scrollTo("gallery")}>
              Gallery
            </button>

            <button onClick={() => scrollTo("contact")}>
              Contact Us
            </button>

            <button onClick={() => scrollTo("faq")}>
              FAQs
            </button>

            <button
              className="mobile-register"
              onClick={() => scrollTo("register")}
            >
              Register Now
            </button>

          </nav>

          <div className="header-right">
            <button
              className="desktop-register"
              onClick={() => scrollTo("register")}
            >
              Register Now
              <ArrowRight size={17} />
            </button>
            <img
              src="/images/gujarat-tourism-logo.png"
              alt="Gujarat Tourism"
              className="tourism-logo"
            />
          </div>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </header>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* Slide backgrounds */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`slide-bg ${i === slideIndex ? "slide-active" : "slide-inactive"}`}
            style={{
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className={`hero-overlay ${heroSlides[slideIndex].overlay}`} />

        {/* Decorative mandalas */}
        <div className="mandala mandala-left" />
        <div className="mandala mandala-right" />

        {/* Spinning center logo */}
        <img src="/gallery/ghagra.png" className="center-spinning-logo" alt="" />

        {/* Hero content */}
        <div className="hero-body">
          <div className="hero-text text-enter" key={slideIndex}>

            <span className="hero-eyebrow desktop-only">અનુભવ કરો</span>

            <h1 className="hero-h1">
              <span className="line-vadodara">વડોદરાની</span>
              <span className="line-biggest">સૌથી મોટી</span>
              <span className="line-navratri">નવરાત્રિ</span>
            </h1>

            <h2 className="hero-subtitle-eng mobile-only">
              VADODARA VIBRANT<br/>NAVRATRI 2026
            </h2>

            <p className="hero-tagline desktop-only">
              TRADITION&nbsp;<em>•</em>&nbsp;MUSIC&nbsp;<em>•</em>&nbsp;CULTURE&nbsp;<em>•</em>&nbsp;COMMUNITY
            </p>

            <div className="hero-info">
              <div className="hero-info-item">
                <CalendarDays className="hi-icon" size={22} />
                <div className="hi-text">
                  <strong>11 – 19 Oct 2026</strong>
                  <span>VVN Garba Ground</span>
                </div>
              </div>
              <div className="hero-info-item">
                <MapPin className="hi-icon" size={22} />
                <div className="hi-text">
                  <strong>Vadodara, Gujarat</strong>
                </div>
              </div>
              <div className="hero-info-item mobile-only">
                <Clock3 className="hi-icon" size={22} />
                <div className="hi-text">
                  <strong>7:00 PM Onwards</strong>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <button
                className="hero-register-btn"
                onClick={() => scrollTo("register")}
              >
                Register Now
                <span className="arrow-circle">
                  <ArrowRight size={16} />
                </span>
              </button>

              <button className="hero-watch-btn">
                <span className="watch-play">
                  <Play size={11} fill="currentColor" />
                </span>
                Watch Video
              </button>
            </div>

          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          className="slider-arrow"
          style={{ left: 18 }}
          onClick={() => goTo(slideIndex - 1)}
          aria-label="Previous slide"
        >
          &#8249;
        </button>
        <button
          className="slider-arrow"
          style={{ right: 18 }}
          onClick={() => goTo(slideIndex + 1)}
          aria-label="Next slide"
        >
          &#8250;
        </button>

        {/* Dot indicators */}
        <div className="hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === slideIndex ? "active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="features">

        {/* DESKTOP FEATURE GRID */}
        <div className="container feature-grid desktop-only">

          <Feature
            icon={<Users />}
            title="TRADITIONAL"
            subtitle="GARBA"
          />

          <Feature
            icon={<Music2 />}
            title="FAMOUS"
            subtitle="SINGERS"
          />

          <Feature
            icon={<Users />}
            title="FAMILY"
            subtitle="FRIENDLY"
          />

          <Feature
            icon={<Star />}
            title="PREMIUM"
            subtitle="VENUE"
          />

          <Feature
            icon={<ShieldCheck />}
            title="SAFE & SECURE"
            subtitle="ENVIRONMENT"
          />

          <Feature
            icon={<Utensils />}
            title="FOOD & BEVERAGE"
            subtitle="ZONE"
          />

          <Feature
            icon={<Car />}
            title="AMPLE"
            subtitle="PARKING"
          />

        </div>

        {/* MOBILE FEATURE GRID */}
        <div className="container feature-grid-mobile">
          <Feature icon={<CalendarDays />} title="11 - 19" subtitle="Oct 2026" />
          <Feature icon={<MapPin />} title="VVN Garba" subtitle="Ground" />
          <Feature icon={<Clock3 />} title="7:00 PM" subtitle="Onwards" />
          <Feature icon={<Music2 />} title="Live Music" subtitle="" />
          <Feature icon={<Utensils />} title="Food Stalls" subtitle="" />
          <Feature icon={<Car />} title="Easy Parking" subtitle="" />
        </div>

      </section>


      <section id="about" className="about-nav-section">
        <div className="about-bg-mandala" />
        <div className="about-couple-graphic" />

        <div className="about-nav-grid">

          <div className="about-nav-image-wrap">
            <img
              src="/images/mataji.jpeg"
              alt="Mataji"
              className="about-nav-image"
            />
            <div className="about-image-border" />
          </div>

          <div className="about-content">
            <p className="section-kicker">
              KNOW ABOUT NAVRATRI
            </p>

            <h2 className="about-h2">
              NAVRATRI
            </h2>
            <h3 className="about-h3">
              CELEBRATING DIVINITY
            </h3>

            <div className="about-divider">
              <span className="diamond"></span>
              <span className="diamond center"></span>
              <span className="diamond"></span>
            </div>

            <p>
              Navratri is a vibrant festival celebrated not only in India but all over the world.
              It is a beautiful fusion of <strong>tradition and modernity</strong> & is a grandeur of the
              celebration for <strong>9 nights</strong> dedicated to the worship of <strong>Goddess Shakti</strong> in her nine
              forms. Navratri is not just a religious festival; it's a celebration of life, community
              and the triumph of good over evil. It's a time when people come together to
              honor the feminine divinity, immerse themselves in prayer & dance and create
              memories that last a lifetime.
            </p>

            <p>
              A ritualistic and devotional dance <strong>Garba</strong>, is the famed folk art of Gujarat that has
              earned the coveted <strong>Intangible Cultural Heritage (ICH)</strong> Tag of Humanity from
              <strong>UNESCO</strong>. The festival of Navratri is religiously performed during these nine-days.
              As a dance form Garba is entrenched deeply in ritualistic and devotional roots,
              involving people from all walks of life and it continues to thrive as a vibrant living
              tradition <strong>bringing communities together</strong>. It's fascinating; how the essence of
              devotion remains unwavering, while the expressions of worship differs from one
              community to another.
            </p>

          </div>
        </div>
      </section>



      {/* ================= SINGER SECTION ================= */}
      <section className="singer-section">
        <div className="singer-bg-pattern-left" />

        <div className="singer-content">
          <div className="singer-header">
            <div className="singer-kicker-container">
              <div className="singer-kicker-line"></div>
              <span className="singer-kicker-text">MEET THE SINGER</span>
              <div className="singer-kicker-line"></div>
            </div>

            <h2 className="singer-h2">
              EXPERIENCE THE TRADITION OF <br /> VADODARA'S GARBA
            </h2>

            <h3 className="singer-h3">
              WITH KAIRAVI - KOYALDI OF GUJARAT
            </h3>
          </div>

          <div className="singer-text">
            <p>
              <strong>Kairavi Buch</strong> is undoubtedly a shining star in Vadodara's vibrant
              cultural scene, particularly during the auspicious occasion of Navratri.
              She started her career along with the Garba Legend - Atul Purohit Dada.
              As the queen of Garba, her mesmerizing performances have become
              synonymous with the spirit and essence of this traditional festival.
              Her ability to blend traditional Gujarati classics with contemporary
              music not only keeps the tradition alive but also attracts younger
              generations to embrace their cultural roots.
            </p>
            <p>
              In essence, Kairavi Buch is not just a singer; she is a cultural
              ambassador, preserving traditions while also ushering them into the
              modern era. Her passion, talent, and dedication have truly made her
              the voice of Vadodara and we are proud to bring the melodious singer
              to our Sanskari nagri-Vadodara.
            </p>
          </div>
        </div>

        <div className="singer-image-container">
          <img
            src="/images/kv.png"
            alt="Kairavi Buch"
            className="singer-image"
          />
        </div>

      </section>


      {/* ================= VADODARA ================= */}
      <section className="vadodara-section">
        <div className="vadodara-bg-pattern" />
        <div className="vadodara-image-left" />

        <div className="vadodara-content">
          <div className="vadodara-title-container">
            <h2 className="vadodara-h2">VADODARA</h2>
            <h3 className="vadodara-h3">HEART & SOUL OF TRADITIONAL GARBA</h3>
          </div>

          <p className="vadodara-text">
            Our Sanskari Nagri Vadodara, truly stands as a testament to the fusion of tradition and modernity, with its rich cultural heritage deeply embedded in every aspect of its existence. Vadodara, with its splendid landmarks paint a vivid picture of its illustrious past and vibrant present. From the majestic dome of Maharaja Sayajirao University to the intricate architecture of Champaner and the opulent Laxmi Vilas Palace, each edifice tells a story of artistic brilliance and historical significance. Education, too, has flourished in Vadodara, with institutions not only imparting knowledge but also serving as incubators for creativity and innovation aspiring artists from around the globe.
          </p>

          <p className="vadodara-text">
            The cultural tapestry of Vadodara is woven intricately with threads from diverse communities. This fusion of cultures brings a richness and vibrancy to Vadodara's artistic landscape that is truly unique. One cannot speak of Vadodara without mentioning the grandeur of its Navratri celebrations, which captivate both residents and visitors alike. Garba which is the heart and soul Baroda comes alive during these festivities, showcasing its boundless energy and infectious enthusiasm for dance, music and festivities.
          </p>

          <div className="vvn-info-box">
            <div className="vvn-about">
              <h4 className="vvn-about-title">About Vadodara Vibrant Navratri (VVN) 2026</h4>
              <p className="vvn-about-text">
                The overwhelming response to the first edition has been both humbling and encouraging for BRG Group. With 30,000+ Garba enthusiasts gathering daily in the Player's Arena and an average of 4,000+ spectators every night, Vadodara Vibrant Navratri emerged as a new cultural heartbeat of the city. It was our privilege to be supported and endorsed by Gujarat Tourism, a partnership that played a key role in putting VVN on the global cultural map. The brands associated with us in the inaugural edition received tremendous visibility and engagement, both on-ground and through our extensive media presence.
              </p>
            </div>

            <div className="vvn-stats">
              <div className="vvn-stat-item">
                <Users className="vvn-stat-icon" size={32} />
                <div>
                  <div className="vvn-stat-number">30,000+</div>
                  <div className="vvn-stat-label">Garba Enthusiasts Daily</div>
                </div>
              </div>
              <div className="vvn-stat-item">
                <Users className="vvn-stat-icon" size={32} />
                <div>
                  <div className="vvn-stat-number">4,000+</div>
                  <div className="vvn-stat-label">Spectators Every Night</div>
                </div>
              </div>
              <div className="vvn-stat-item">
                <Handshake className="vvn-stat-icon" size={32} />
                <div>
                  <div className="vvn-stat-label" style={{ textTransform: 'none', color: '#fff', fontSize: '14px', marginBottom: '4px' }}>Supported by</div>
                  <div className="vvn-stat-number" style={{ fontSize: '18px' }}>Gujarat Tourism</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ASSOCIATES SECTION ================= */}
      <section className="associates-section">
        {/* Left Badge */}
        <div className="associates-left-badge">
          <img src="/images/logo.webp" alt="Vadodara Vibrant Navratri" />
        </div>

        {/* Center Content */}
        <div className="associates-content">
          <div className="associates-header">
            <div className="associates-ornament"></div>
            <h2 className="associates-h2">OUR ASSOCIATES</h2>
            <div className="associates-ornament"></div>
          </div>

          <div className="associates-grid">
            <div className="associate-card">
              <img src="/images/b5.png" alt="Coca-Cola" />
            </div>
            <div className="associate-card">
              <img src="/images/b2.png" alt="Amul" />
            </div>
            <div className="associate-card">
              <img src="/images/b4.png" alt="Wall's" />
            </div>
            <div className="associate-card">
              <img src="/images/b6.png" alt="Burger King" />
            </div>
            <div className="associate-card">
              <img src="/images/b1.webp" alt="Sprite" />
            </div>
            <div className="associate-card">
              <img src="/images/b3.png" alt="Yum!" />
            </div>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="associates-right-graphic">
          <img src="/images/vgg.png" alt="Palace" />
        </div>

        {/* Bottom Graphic (Mobile Only) */}
        <div className="associates-bottom-graphic">
          <img src="/images/venue_dancers_bg.png" alt="Garba Dancers" />
        </div>
      </section>

      {/* ================= VENUE SECTION ================= */}
      <section className="venue-section">
        <div className="venue-bg-image"></div>
        <div className="venue-overlay"></div>

        <div className="container venue-content">
          <div className="venue-header">
            <h2 className="venue-h2">ABOUT THE <span className="venue-highlight">VENUE</span></h2>
            <div className="venue-kicker">
              <div className="venue-line"></div>
              <MapPin size={18} className="venue-pin-icon" />
              <span>VVN GARBA GROUND</span>
              <div className="venue-line"></div>
            </div>
            <p className="venue-address">
              BRG Campus, Near Hanumanji Mandir, Maharaja Chowk, Sun Pharma Road, Vadodara.
            </p>
          </div>

          <div className="venue-features-grid">
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Route size={24} /></div>
              <span>Excellent<br />Connectivity</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><MapPin size={24} /></div>
              <span>Various<br />Approach Roads</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Car size={24} /></div>
              <span>Ample<br />Parking</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Users size={24} /></div>
              <span>Spacious<br />Dancing Arena</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Utensils size={24} /></div>
              <span>Food Courts</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><ShieldCheck size={24} /></div>
              <span>Secured<br />Environment</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Users size={24} /></div>
              <span>Public<br />Utilities</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Plus size={24} /></div>
              <span>Medical /<br />First-aid Facility</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Ticket size={24} /></div>
              <span>Box Office</span>
            </div>
            <div className="venue-feature">
              <div className="venue-icon-wrapper"><Video size={24} /></div>
              <span>CCTV<br />Surveillance</span>
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <img src="/images/venue_dancers_bg.png" className="venue-dancers-img" alt="Garba Dancers" />
      </section>





      {/* ================= SINGERS ================= */}

      <section id="singers" className="singers-section section">

        <div className="container">

          <SectionTitle title="OUR SINGERS" />

          <div className="singer-grid">

            {singers.map((singer) => (

              <div
                className="singer-card"
                key={singer.name}
              >

                <div className="singer-image">

                  <img
                    src={singer.image}
                    alt={singer.name}
                  />

                </div>

                <div className="singer-info">

                  <h3>{singer.name}</h3>

                  <p>{singer.role}</p>

                </div>
                
                <div className="singer-arrow">
                  <ChevronRight size={20} color="#c71e22" />
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* ================= EVENT DATES ================= */}

      <section id="event" className="event-section">

        <div className="container">

          <SectionTitle title="EVENT DATES" />

          <div className="event-cards">

            <EventCard
              icon={<CalendarDays />}
              title="11 - 19"
              subtitle="OCTOBER 2026"
            />

            <EventCard
              icon={<MapPin />}
              title="VVN GROUND"
              subtitle={
                <>
                  Near Hanumanji Mandir,
                  <br />
                  Maharaja Chowk, Vadodara
                </>
              }
            />

            <EventCard
              icon={<Clock3 />}
              title="7:00 PM"
              subtitle="ONWARDS"
            />

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats">

        <div className="container stats-grid">

          <Stat
            icon={<Users />}
            number="30,000+"
            text="GARBA ENTHUSIASTS"
          />

          <Stat
            icon={<Music2 />}
            number="TOP"
            text="SINGERS"
          />

          <Stat
            icon={<Star />}
            number="9 NIGHTS"
            text="OF CELEBRATION"
          />

          <Stat
            icon={<Heart />}
            number="TRADITION"
            text="& MODERNITY"
          />

          <Stat
            icon={<Users />}
            number="UNITY"
            text="COMMUNITY SPIRIT"
          />

        </div>

      </section>



      {/* ================= LOCATION & MAP ================= */}

      <section id="location" className="location-section">
        <div className="location-bg-pattern"></div>

        <div className="container location-container">

          <div className="location-info">
            <h4 className="location-kicker">GET DIRECTIONS</h4>
            <h2 className="location-h2">VVN GARBA GROUND</h2>

            <div className="location-address">
              <div className="location-icon-wrapper">
                <MapPin size={24} />
              </div>
              <p>
                BRG Campus, Near Hanumanji Mandir,<br />
                Maharaja Chowk, Sun Pharma Road,<br />
                Vadodara, Gujarat.
              </p>
            </div>

            <a href="https://maps.google.com/?q=BRG+Campus+Vadodara" target="_blank" rel="noreferrer" className="directions-btn">
              Get Directions
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.651139433615!2d73.1678229!3d22.253331!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc631580f4f9d%3A0xc6a8ff719e7a83d3!2sBRG%20Group!5e0!3m2!1sen!2sin!4v1708234567890!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </section>


      {/* ================= GALLERY SECTION ================= */}
      <section id="gallery" className="gallery-section">
        {/* Background elements */}
        <div className="gallery-bg-pattern"></div>
        <img src="/images/vg1.png" className="gallery-dancers-img" alt="Garba Dancers" />
        <div className="gallery-bottom-skyline"></div>

        <div className="container gallery-content">
          <div className="gallery-header">
            <h4 className="gallery-h4">GLIMPSES OF</h4>
            <h2 className="gallery-h2">VADODARA VIBRANT NAVRATRI 2025</h2>
            <p className="gallery-subtitle">
              <span className="desktop-only">FAITH &bull; CULTURE &bull; TRADITION &bull; TOGETHERNESS</span>
              <span className="mobile-only">MOMENTS &bull; MUSIC &bull; MEMORIES</span>
            </p>
          </div>

          <div className="gallery-tabs">
            <button
              className={`gallery-tab ${activeGalleryTab === "video" ? "active" : ""}`}
              onClick={() => setActiveGalleryTab("video")}
            >
              <Play size={16} /> Video Gallery
            </button>
            <button
              className={`gallery-tab ${activeGalleryTab === "photo" ? "active" : ""}`}
              onClick={() => setActiveGalleryTab("photo")}
            >
              <Camera size={16} /> Photo Gallery
            </button>
          </div>

          {activeGalleryTab === "video" && (
          <>
            <div className="gallery-videos-carousel">
              <button className="carousel-nav left mobile-hidden"><ChevronLeft size={24} /></button>

              <div className="video-card">
                <div className="video-thumbnail">
                  <img src="https://picsum.photos/400/300?random=1" alt="Video thumbnail" className="gallery-img-fill" />
                  <div className="play-button"><Play fill="currentColor" size={20} /></div>
                  <div className="video-duration">0:45</div>
                  <div className="video-title">Maa Ambe Aarti Darshan</div>
                </div>
              </div>

              <div className="video-card center">
                <div className="video-thumbnail">
                  <img src="https://picsum.photos/600/400?random=2" alt="Video thumbnail" className="gallery-img-fill" />
                  <div className="play-button"><Play fill="currentColor" size={28} /></div>
                  <div className="video-duration">1:20</div>
                  <div className="video-title">Grand Garba Nights</div>
                </div>
              </div>

              <div className="video-card">
                <div className="video-thumbnail">
                  <img src="https://picsum.photos/400/300?random=3" alt="Video thumbnail" className="gallery-img-fill" />
                  <div className="play-button"><Play fill="currentColor" size={20} /></div>
                  <div className="video-duration">0:58</div>
                  <div className="video-title">Traditional Garba Moments</div>
                </div>
              </div>

              <button className="carousel-nav right mobile-hidden"><ChevronRight size={24} /></button>
            </div>
            
            <div className="gallery-mobile-extras">
              <div className="gallery-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button className="watch-more-btn">
                Watch More Videos <span style={{marginLeft: '8px'}}>→</span>
              </button>
            </div>
          </>
          )}

          {activeGalleryTab === "photo" && (
            <div className="gallery-photos-row">
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=4" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=5" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=6" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=7" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=8" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=9" alt="Photo" className="gallery-img-fill" /></div>
              <div className="photo-thumb"><img src="https://picsum.photos/300/300?random=10" alt="Photo" className="gallery-img-fill" /></div>
            </div>
          )}

          <div className="gallery-footer">
            <a href="#" className="instagram-btn">
              <Instagram className="w-4 h-4" /> View More on Instagram <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>



      {/* ================= REGISTER ================= */}

      <section
        id="register"
        className="register-section"
      >

        <div className="container register-content">

          <div>

            <p className="section-kicker light">
              BE PART OF THE CELEBRATION
            </p>

            <h2>
              READY TO
              <br />
              <span>DANCE?</span>
            </h2>

            <p>
              Experience nine unforgettable nights
              of music, tradition and Garba.
            </p>

          </div>

          <button className="register-large-btn">
            Register Now
            <ArrowRight size={21} />
          </button>

        </div>

      </section>




      {/* ================= SPONSORS ================= */}

      <section
        id="sponsors"
        className="sponsors-section section"
      >

        <div className="container">

          <SectionTitle title="OUR ASSOCIATES" />

          <div className="singer-grid">

            {associates.map((associate, index) => (

              <div
                className="singer-card"
                key={index}
              >
                <div className="singer-image">
                  <img
                    src={associate.image}
                    alt={associate.name}
                  />
                </div>
                <div className="singer-info">
                  <h3>{associate.name}</h3>
                  <p>{associate.role}</p>
                </div>
              </div>

            ))}

          </div>

        </div>

      </section>




      {/* ================= FOOTER ================= */}

      <footer
        id="contact"
        className="footer"
      >

        {/* DESKTOP FOOTER */}
        <div className="container footer-grid desktop-only">

          <div className="footer-brand">
            <img src="/images/logo.webp" alt="Vadodara Vibrant Navratri" />
            <p>Celebrating the spirit, culture and tradition of Gujarat.</p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <button onClick={() => scrollTo("home")}>Home</button>
            <button onClick={() => scrollTo("about")}>About Navratri</button>
            <button onClick={() => scrollTo("event")}>VVN 2026</button>
            <button onClick={() => scrollTo("singers")}>Singers</button>
            <button onClick={() => scrollTo("gallery")}>Gallery</button>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p><MapPin size={16} /> VVN Ground,<br />Near Hanumanji Mandir,<br />Maharaja Chowk, Vadodara</p>
            <p>info@vadodaravibrantnavratri.in</p>
            <p>+91 98765 43210</p>
          </div>

          <div>
            <h3>Follow Us</h3>
            <div className="socials">
              <a href="#"><Facebook /></a>
              <a href="#"><Instagram /></a>
              <a href="#"><Youtube /></a>
            </div>
          </div>
        </div>

        {/* MOBILE FOOTER */}
        <div className="footer-mobile mobile-only">
          <div className="footer-mobile-header">
            <img src="/images/logo.webp" alt="Vadodara Vibrant Navratri" className="footer-mobile-logo" />
            <p>TRADITION &bull; MUSIC &bull; CULTURE &bull; COMMUNITY</p>
            <div className="footer-header-divider"></div>
          </div>

          <div className="footer-mobile-links">
            <button onClick={() => scrollTo("home")} className="mobile-footer-link">
              <div className="link-left"><HomeIcon size={20} /> Home</div>
              <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo("about")} className="mobile-footer-link">
              <div className="link-left"><Users size={20} /> About Navratri</div>
              <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo("event")} className="mobile-footer-link">
              <div className="link-left"><CalendarDays size={20} /> VVN 2026</div>
              <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo("singers")} className="mobile-footer-link">
              <div className="link-left"><Mic size={20} /> Singers</div>
              <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo("gallery")} className="mobile-footer-link">
              <div className="link-left"><ImageIcon size={20} /> Gallery</div>
              <ChevronDown size={20} />
            </button>
            <button onClick={() => scrollTo("contact")} className="mobile-footer-link">
              <div className="link-left"><Phone size={20} /> Contact</div>
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="footer-mobile-contact">
            <h3>Contact Us</h3>
            <div className="contact-item">
              <MapPin size={24} className="contact-icon" />
              <p>VVN Ground, Near Hanumanji Mandir,<br />Maharaja Chowk, Vadodara</p>
            </div>
            <div className="contact-item">
              <Mail size={24} className="contact-icon" />
              <p>info@vadodaravibrantnavratri.in</p>
            </div>
            <div className="contact-item">
              <Phone size={24} className="contact-icon" />
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className="footer-mobile-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-circle"><Facebook /></a>
              <a href="#" className="social-circle"><Instagram /></a>
              <a href="#" className="social-circle"><Youtube /></a>
              <a href="#" className="social-circle"><X /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Vadodara Vibrant Navratri. All Rights Reserved.
        </div>

      </footer>

    </main>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function Feature({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="feature">

      <div className="feature-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>

    </div>
  );
}


function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="section-title">

      <span className="title-line" />

      <h2>{title}</h2>

      <span className="title-line" />

    </div>
  );
}


function EventCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
}) {
  return (
    <div className="event-card">

      <div className="event-icon">
        {icon}
      </div>

      <div>

        <strong>{title}</strong>

        <span>{subtitle}</span>

      </div>

    </div>
  );
}


function Stat({
  icon,
  number,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  text: string;
}) {
  return (
    <div className="stat">

      {icon}

      <div>

        <strong>{number}</strong>

        <span>{text}</span>

      </div>

    </div>
  );
}