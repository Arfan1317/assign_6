import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from './products.json';

// Helper for product images inside the 'products' folder
const getImagePath = (imageName) => {
  return new URL(`./assets/products/${imageName}`, import.meta.url).href;
};

// Helper for the banner image directly inside the 'assets' folder
const getBannerPath = (imageName) => {
  return new URL(`./assets/${imageName}`, import.meta.url).href;
};

export default function App() {
  // 1. The State variables
  const [cart, setCart] = useState([]);
  const [activeView, setActiveView] = useState('products');

  // 2. The Cart Logic
  const handleAddToCart = (product) => {
    const isAlreadyInCart = cart.some((item) => item.id === product.id);
    if (!isAlreadyInCart) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  // NEW: Remove from cart logic
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.error("Item removed from cart.", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // NEW: Checkout logic
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCart([]); // Clears the cart
    setActiveView('products'); // Sends user back to products
    toast.success("Purchase successful! Cart cleared.", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  // NEW: Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <ToastContainer />
      
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <span className="text-[40px] font-extrabold tracking-wide bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] bg-clip-text text-transparent">DigiTools</span>
            </div>

            {/* Navigation Links - Center */}
            <div className="md:flex space-x-10">
              <a href="#products" className="text-gray-600 hover:text-[#7C3AED] transition font-bold">Products</a>
              <a href="#features" className="text-gray-600 hover:text-[#7C3AED] transition font-bold">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-[#7C3AED] transition font-bold">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#7C3AED] transition font-bold">Testimonials</a>
              <a href="#faq" className="text-gray-600 hover:text-[#7C3AED] transition font-bold">FAQ</a>
            </div>

            {/* Actions - Right */}
            <div className="flex items-center space-x-8">
              {/* Cart Icon */}
              <div className="relative cursor-pointer flex items-center" onClick={() => setActiveView('cart')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 hover:text-[#7C3AED] transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white box-content">
                    {cart.length}
                  </div>
                )}
              </div>
              
              <button className="font-bold text-gray-700 hover:text-[#7C3AED] transition">Login</button>
              <button className="bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white font-bold px-6 py-3 rounded-full border-2 border-transparent hover:bg-none hover:bg-white hover:text-violet-700 hover:border-violet-700 transition-all">
                Get Started
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Banner */}
      <header className="w-full bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          
          <div className="flex flex-row items-center justify-between w-full">
            
            {/* Left Side: Content Box */}
            <div className="w-[65%] flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 text-[#7C3AED] mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9465e4]"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7C3AED]"></span>
                </span>
                New: AI-Powered Tools Available
              </div>

              <h1 className="text-5xl xl:text-[70px] font-black text-[#1E293B] leading-[1.1] mb-6 tracking-tight">
                Supercharge Your <br/> Digital Workflow
              </h1>

              <p className="text-[18px] text-gray-500 mb-[16px] max-w-[36rem]">
                Access premium AI tools, design assets, templates, and productivity software—all in one place. Start creating faster today.<br/>Explore Products
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-5">
                <a href="#products" className="bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white font-bold py-3.5 px-8 rounded-full border-2 border-transparent hover:bg-none hover:bg-white hover:text-violet-700 hover:border-violet-700 transition-all">
                  Explore Products
                </a>
                <button className="flex items-center gap-2 border border-violet-200 text-[#7C3AED] font-bold py-3 px-6 rounded-full hover:bg-violet-50 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Watch Demo
                </button>
              </div>

            </div>

            {/* Right Side: Image Box */}
            <div className="w-[42%] flex justify-end pl-4">
              <img 
                src={getBannerPath('banner.png')} 
                alt="Digital Workflow Technology" 
                className="w-full max-w-[550px] rounded-xl object-cover"
              />
            </div>

          </div>
        </div>
      </header>

      {/* Stats Section - STRICTLY LOCKED Row-Wise */}
      <section className="w-full bg-gradient-to-r from-[#5a1ddf] to-[#712bb7]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-[65px]">
          <div className="flex flex-row justify-center items-center divide-x divide-white/80 text-center w-full">
            
            <div className="w-1/3 px-2 sm:px-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-1 sm:mb-2">50K+</h2>
              <p className="text-white/80 text-xs sm:text-base lg:text-lg font-medium">Active Users</p>
            </div>

            <div className="w-1/3 px-2 sm:px-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-1 sm:mb-2">200+</h2>
              <p className="text-white/80 text-xs sm:text-base lg:text-lg font-medium">Premium Tools</p>
            </div>

            <div className="w-1/3 px-2 sm:px-4">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-1 sm:mb-2">4.9</h2>
              <p className="text-white/80 text-xs sm:text-base lg:text-lg font-medium">Rating</p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Section*/}
      <main className="max-w-7xl mx-auto py-24 px-6 lg:px-8" id="products">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Premium Digital Tools</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Choose from our curated collection of premium digital products designed to boost your productivity and creativity.
          </p>
        </div>

        {/* Toggling Buttons */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <button 
            onClick={() => setActiveView('products')}
            className={`px-8 py-3 rounded-full font-bold text-[15px] transition-all duration-300 border ${
              activeView === 'products' 
                ? 'bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white border-transparent shadow-lg' 
                : 'bg-white border-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] hover:shadow-md'
            }`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveView('cart')}
            className={`px-8 py-3 rounded-full font-bold text-[15px] transition-all duration-300 border ${
              activeView === 'cart' 
                ? 'bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white border-transparent shadow-lg' 
                : 'bg-white border-gray-200 text-transparent bg-clip-text bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] hover:shadow-md'
            }`}
          >
            Cart ({cart.length})
          </button>
        </div>

        {/* Products View */}
        {activeView === 'products' && (
          <div className="grid grid-cols-3 gap-8 w-full">
            {productsData.map((product) => {
              const isAdded = cart.some(item => item.id === product.id);
              
              // Determine tag colors based on tagType
              let tagClasses = "bg-gray-100 text-gray-700";
              if (product.tagType === 'best-seller') tagClasses = "bg-amber-100 text-amber-700";
              if (product.tagType === 'popular') tagClasses = "bg-indigo-100 text-indigo-700";
              if (product.tagType === 'new') tagClasses = "bg-green-100 text-green-700";

              return (
                <div 
                  key={product.id} 
                  className="bg-white p-8 rounded-3xl border border-gray-170 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center p-3 border border-gray-100">
                      <img src={getImagePath(product.icon)} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <span className={`text-[13px] font-bold px-4 py-1.5 rounded-full ${tagClasses}`}>
                      {product.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-[#1E293B] mb-3">{product.name}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed mb-6 flex-grow">{product.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-2xl font-extrabold text-[#1E293B]">${product.price}</span>
                      <span className="text-gray-400 font-medium">/{product.period}</span>
                    </div>

                    <ul className="space-y-3">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-500 text-[15px]">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={isAdded}
                    className={`w-full py-3.5 rounded-xl font-bold text-[15px] transition-all duration-300 flex justify-center items-center gap-2 mt-auto ${
                      isAdded 
                        ? 'bg-green-600 text-white cursor-default' 
                        : 'bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white hover:opacity-90 hover:shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Added to Cart!
                      </>
                    ) : (
                      'Buy Now'
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}

        {/* Cart View */}
        {activeView === 'cart' && (
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200 shadow-sm">
            <h3 className="text-[22px] font-extrabold text-[#1E293B] mb-8">Your Cart</h3>

            {cart.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
                <button 
                  onClick={() => setActiveView('products')} 
                  className="text-[#7C3AED] font-bold hover:underline"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                
                {/* Cart Items List */}
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 transition-all hover:border-gray-200">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-3 border border-gray-100 shadow-sm">
                        <img src={getImagePath(item.icon)} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-extrabold text-[#1E293B] text-[16px]">{item.name}</h4>
                        <p className="text-gray-500 font-medium text-[14px]">${item.price}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-[#ff4d6d] font-bold text-[14px] hover:text-red-600 transition pr-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {/* Total Price Section */}
                <div className="flex justify-between items-center mt-4 pt-6">
                  <span className="text-gray-400 font-medium text-[15px]">Total:</span>
                  <span className="text-2xl font-black text-[#1E293B]">${totalPrice}</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 py-4 rounded-xl font-bold text-[15px] bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white hover:opacity-90 hover:shadow-lg transition-all duration-300"
                >
                  Proceed To Checkout
                </button>
                
              </div>
            )}
          </div>
        )}

      </main>
    {/* Steps Section */}
      <section className="w-full bg-gray-100 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Get Started In 3 Steps</h2>
            <p className="text-gray-500 text-[17px] font-medium">
              Start using premium digital tools in minutes, not hours.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 w-full">

            <div className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col items-center text-center relative shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-6 right-6 w-9 h-9 bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                01
              </div>
              <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-8 p-6">
                <img src={getBannerPath('user.png')} alt="Create Account" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[22px] font-extrabold text-[#1E293B] mb-4">Create Account</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Sign up for free in seconds. No credit card required to get started.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col items-center text-center relative shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-6 right-6 w-9 h-9 bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                02
              </div>
              <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-8 p-6">
                <img src={getBannerPath('package.png')} alt="Choose Products" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[22px] font-extrabold text-[#1E293B] mb-4">Choose Products</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Browse our catalog and select the tools that fit your needs.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-200 p-10 flex flex-col items-center text-center relative shadow-sm hover:shadow-md transition-all">
              <div className="absolute top-6 right-6 w-9 h-9 bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                03
              </div>
              <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mb-8 p-6">
                <img src={getBannerPath('rocket.png')} alt="Start Creating" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-[22px] font-extrabold text-[#1E293B] mb-4">Start Creating</h3>
              <p className="text-gray-500 font-medium leading-relaxed text-[15px]">
                Download and start using your premium tools immediately.
              </p>
            </div>

          </div>
        </div>
      </section>

  {/* Pricing Cards */}
      <section className="w-full bg-white py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 text-[17px] font-medium">
              Choose the plan that fits your needs. Upgrade or downgrade anytime.
            </p>
          </div>

          {/* Removed max-w-[980px] and updated to gap-8 to match the Steps section */}
          <div className="grid grid-cols-3 gap-8 items-center w-full">
            
            <div className="bg-[#f5f4f4] rounded-[1.5rem] border border-gray-200 p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-extrabold text-[#1E293B]">Starter</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">Perfect for getting started</p>
              
              <div className="mt-4 mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#1E293B]">$0</span>
                <span className="text-gray-400 text-sm font-medium">/Month</span>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {['Access to 10 free tools', 'Basic templates', 'Community support', '1 project per month'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-500 text-[14px] font-medium">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white transition-all duration-300 hover:from-[#4916b8] hover:to-[#7f34be] hover:-translate-y-1 hover:shadow-lg">
                Get Started Free
              </button>
            </div>

            <div className="bg-gradient-to-b from-[#7c3aed] to-[#5a1ddf] rounded-[1.5rem] p-6 flex flex-col h-[103%] relative shadow-2xl z-10 transform scale-103">
              {/* Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FFF8EB] text-[#F59E0B] px-3 py-1 rounded-full text-[10px] font-bold shadow-sm border border-orange-100 whitespace-nowrap">
                Most Popular
              </div>

              <h3 className="text-lg font-extrabold text-white">Pro</h3>
              <p className="text-violet-100 text-sm font-medium mt-1">Best for professionals</p>
              
              <div className="mt-4 mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$29</span>
                <span className="text-violet-100 text-sm font-medium">/Month</span>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {['Access to all premium tools', 'Unlimited templates', 'Priority support', 'Unlimited projects', 'Cloud sync', 'Advanced analytics'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-white text-[14px] font-medium">
                    <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-xl font-bold text-sm bg-white text-[#7C3AED] transition-all duration-300 hover:bg-violet-100 hover:text-[#5a1ddf] hover:-translate-y-1 hover:shadow-lg">
                Start Pro Trial
              </button>
            </div>

            <div className="bg-[#f5f4f4] rounded-[1.5rem] border border-gray-200 p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg font-extrabold text-[#1E293B]">Enterprise</h3>
              <p className="text-gray-500 text-sm font-medium mt-1">For teams and businesses</p>
              
              <div className="mt-4 mb-4 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#1E293B]">$99</span>
                <span className="text-gray-400 text-sm font-medium">/Month</span>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'Custom branding'].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-500 text-[14px] font-medium">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#5a1ddf] to-[#9d44e1] text-white transition-all duration-300 hover:from-[#4916b8] hover:to-[#7f34be] hover:-translate-y-1 hover:shadow-lg">
                Contact Sales
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}