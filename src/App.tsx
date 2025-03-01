import { type FC, useEffect, useState, FormEvent, useRef } from 'react';
import { Clock, Phone, MapPin, Calendar, ChevronRight, Star, PawPrint, Search, ArrowRight, CheckCircle, Heart, X, ArrowUp, MessageCircle } from 'lucide-react';

interface Step {
  step: string;
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const App: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [currentSection, setCurrentSection] = useState('home');

  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  const locationRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Handle scroll animations and current section
      const sections = [
        { id: 'home', ref: null },
        { id: 'about', ref: aboutRef },
        { id: 'services', ref: servicesRef },
        { id: 'location', ref: locationRef },
        { id: 'contact', ref: contactRef }
      ];

      // Find the current section
      let currentSectionId = 'home';
      sections.forEach(({ id, ref }) => {
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 0.25;
          if (isVisible) {
            currentSectionId = id;
          }
          // Handle animations
          if (rect.top <= window.innerHeight * 0.75) {
            ref.current.classList.add('is-visible');
          }
        }
      });
      setCurrentSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormData]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormStatus('submitting');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header id="home" className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Open Today: 5:00 PM - 10:00 PM</span>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-4 h-4" />
            <a href="tel:7867865561" className="text-sm hover:text-blue-200 transition-colors">(786) 786-5561</a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <PawPrint className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
                <span className="text-3xl font-bold text-blue-600">Pet Urgent Care</span>
              </a>
            </div>
            <div className="hidden md:flex flex-wrap justify-center gap-6">
              <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#location" className="text-gray-600 hover:text-blue-600 transition-colors">Location</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <button 
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button 
                onClick={() => {
                  // This would typically link to a reservation system or form
                  // For now, we'll scroll to the contact section as a fallback
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
              >
                Reserve Your Spot
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-gray-100 py-2 sticky top-[72px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <a href="#home" className={`hover:text-blue-600 transition-colors ${currentSection === 'home' ? 'text-blue-600' : 'text-gray-600'}`}>Home</a>
            {currentSection !== 'home' && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-blue-600 capitalize">{currentSection}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
          <div className="bg-white h-auto w-full p-4 shadow-lg animate-slide-up">
            <div className="space-y-4">
              <a href="#home" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
              <a href="#services" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
              <a href="#location" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Location</a>
              <a href="#contact" className="block text-gray-600 hover:text-blue-600 transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply z-10"></div>
        <img 
          src="/images/dog.jpg"
          alt="Veterinary care for dog"
          className="w-full h-full object-cover animate-fade-in"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl text-white">
              <h1 className="text-5xl font-bold mb-4 animate-slide-up drop-shadow-lg">Urgent Care, for Pets</h1>
              <p className="text-2xl mb-8 animate-slide-up delay-100 drop-shadow-md">Same-day, after-hours care, 365 days a year</p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg animate-slide-up delay-200">
                  Save Your Spot
                </button>
                <button 
                  onClick={() => {
                    const servicesSection = document.getElementById('services');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-white/10 transition-all transform hover:scale-105 shadow-lg animate-slide-up delay-300"
                >
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section ref={aboutRef} id="about" className="py-16 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-3/4 aspect-square">
                <img 
                  src="/images/man-and-dog.jpg" 
                  alt="Veterinarian with dog" 
                  className="rounded-lg shadow-lg w-full h-full object-cover transform -rotate-90 origin-center"
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <h2 className="text-3xl font-bold mb-6">We understand what urgent means.</h2>
              <p className="text-xl text-gray-600">
                At Pet Urgent Care, our mission is simple: We want to be here for your pet when your primary care vet can't. 
                Our goal is to provide quick, convenient, affordable care 365 days a year. Think of us as urgent care 
                for pets in Boca Raton, Florida. We'll be there when you need us most.
              </p>
              <div className="mt-8 flex items-center">
                <div className="px-4 py-2 bg-blue-100 rounded-lg text-blue-700 font-semibold inline-flex items-center">
                  <Star className="w-5 h-5 mr-2 text-blue-600" />
                  Locally Owned & Operated
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section ref={servicesRef} id="services" className="py-12 pb-0 animate-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What to Expect</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Our streamlined process ensures you and your pet receive the best care with minimal wait times.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "Step 1",
                title: "Select your time",
                description: "Select your preferred arrival time online... or just walk in.",
                icon: <Clock className="w-6 h-6 text-blue-600" />
              },
              {
                step: "Step 2",
                title: "Private Room",
                description: "We will escort you to your private Fear-Free examination room as soon as you get here.",
                icon: <Heart className="w-6 h-6 text-blue-600" />
              },
              {
                step: "Step 3",
                title: "Care Plan",
                description: "The care team will partner with you to discover what is going on and plan how we can help.",
                icon: <CheckCircle className="w-6 h-6 text-blue-600" />
              },
              {
                step: "Step 4",
                title: "Treatment",
                description: "Get treated, head home, and we will update your regular vet. Goodbye hugs and cuddles complimentary.",
                icon: <Star className="w-6 h-6 text-blue-600" />
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-100 p-3 rounded-full transform transition-transform duration-300 hover:rotate-12">
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">{step.step}</p>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-600">{step.description}</p>
                <div className="mt-4 flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <span className="text-sm font-medium">Learn more</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        
          {/* Conditions We Treat (integrated into services section) */}
          <div className="mt-16 pt-10 pb-8 bg-white border-t border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-3">Conditions We Treat</h2>
            <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">We offer urgent care for a wide range of pet health issues. Below are some common conditions we treat.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[
                "Skin Allergies / Hot Spots",
                "Respiratory Issues",
                "Coughing / Sneezing",
                "Ear Infections",
                "Eye Problems",
                "Not Eating / Drinking",
                "Dehydration",
                "Allergies",
                "Wounds / Bleeding",
                "Abscesses / Masses",
                "Limping / Lameness",
                "Ticks / Fleas / Parasites / Mites",
                "Vomiting / Diarrhea",
                "Poison / Toxicity",
                "End-of-Life Care / Euthanasia",
                "Unexplained Lethargy",
                "Microchip ID",
                "Urinary Tract Infections (UTIs)",
                "Straining to Urinate",
                "Blood in Urine / Frequent Urination"
              ].map((condition, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-2 rounded-md border border-gray-100 flex items-start text-xs"
                >
                  <div className="mr-1.5 mt-0.5 flex-shrink-0 bg-blue-100 p-1 rounded-full text-blue-600">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                  <span className="text-gray-700">{condition}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600 italic text-xs">
                This is not a comprehensive list. If your pet is experiencing any concerning symptoms, please don't hesitate to contact us.
              </p>
              <button 
                onClick={() => {
                  // This would typically link to a reservation system or form
                  // For now, we'll scroll to the contact section as a fallback
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-3 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md text-sm"
              >
                Reserve Your Spot
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Direct connection to location section */}
      <div className="bg-gradient-to-b from-white to-blue-600 h-10"></div>

      {/* Location Info */}
      <section ref={locationRef} id="location" className="bg-blue-600 text-white pt-6 pb-10 animate-on-scroll">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Location</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Pet Urgent Care of South Florida</p>
                    <p>91 NE 6th St</p>
                    <p>Homestead, FL 33030</p>
                    <p>United States</p>
                    <p className="mt-1 text-blue-200 font-medium">Located by Miami Dade College Homestead Campus</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Hours of Operation</p>
                    <p>Monday - Friday: 5:00 PM - 10:00 PM</p>
                    <p>Saturday - Sunday: 12:00 PM - 6:00 PM</p>
                    <p>All Holidays: 12:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Contact Us</p>
                    <p>(786) 786-5561</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1788.4490659386193!2d-80.47587033901808!3d25.475506284367346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9e72b1a85e0ab%3A0x15c5271989fcf630!2sAnimal%20Urgent%20Care%20of%20South%20Florida!5e0!3m2!1sen!2sus!4v1709669145099!5m2!1sen!2sus"
                  className="w-full h-[400px]"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="bg-blue-700 p-4 rounded-lg">
                <p className="text-sm">
                  Our facility is conveniently located in the heart of Homestead. 
                  Look for our distinctive signage and dedicated parking area. 
                  We're easily accessible from all major routes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-16 bg-gray-50 animate-on-scroll">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Have questions? We're here to help. Reach out to us through any of these channels.</p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <a href="tel:7867865561" className="text-gray-600 hover:text-blue-600 transition-colors">(786) 786-5561</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <a href="https://maps.google.com/?q=91+NE+6th+St,+Homestead,+FL+33030" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors">91 NE 6th St, Homestead, FL 33030</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-gray-600">Mon-Fri: 5PM-10PM</p>
                    <p className="text-gray-600">Sat-Sun: 12PM-6PM</p>
                    <p className="text-gray-600">Holidays: 12PM-6PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PET URGENT CARE</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:text-blue-400">Home</a></li>
                <li><a href="#services" className="hover:text-blue-400">Services</a></li>
                <li><a href="#location" className="hover:text-blue-400">Location</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">ABOUT US</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-blue-400">About</a></li>
                <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PawPrint className="w-6 h-6" />
                <span className="text-xl font-bold">Pet Urgent Care</span>
              </div>
              <div className="text-gray-300 space-y-1 mt-4">
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> (786) 786-5561</p>
                <p className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 91 NE 6th St, Homestead, FL 33030</p>
                <p className="flex items-center text-sm">Located by Miami Dade College Homestead Campus</p>
                <p className="flex items-center"><Clock className="w-4 h-4 mr-2" /> Mon-Fri: 5PM-10PM</p>
                <p className="ml-6 text-sm">Sat-Sun & Holidays: 12PM-6PM</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2018 - {new Date().getFullYear()} Pet Urgent Care | All Rights Reserved</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      {/* Chat Widget */}
      <div className="fixed md:bottom-6 md:right-6 bottom-24 right-6 z-50">
        <button
          onClick={() => setShowChat(!showChat)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110"
          aria-label="Toggle chat"
        >
          {showChat ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
        
        {showChat && (
          <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-xl animate-slide-up">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Chat with Us</h3>
              <p className="text-sm text-gray-600">We typically reply within minutes.</p>
            </div>
            <div className="h-80 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Hello! How can we help you today?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Call Now Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-between items-center">
          <a 
            href="tel:7867865561" 
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 font-semibold hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>CALL NOW</span>
          </a>
          <a 
            href="https://maps.google.com/?q=91+NE+6th+St,+Homestead,+FL+33030" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-4 font-semibold hover:bg-green-700 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>DIRECTIONS</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;