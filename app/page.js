import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white text-gray-900">

      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap gradient-text-teal">AI-Powered Learning</span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href={'/workspace'}>
              <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center transition duration-300 ease-in-out transform hover:scale-105">Get started</button>
            </Link>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out">Features</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 transition duration-300 ease-in-out">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="hero" className="relative pt-20 overflow-hidden clickable-section hover-section">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate__animated animate__fadeInDown">
            Unlock Your Potential with <span className="gradient-text-teal">AI-Powered Learning</span> 🚀
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 animate__animated animate__fadeInUp">
            Experience personalized learning paths, instant feedback, and intelligent insights.
          </p>
          <div className="flex justify-center space-x-4 animate__animated animate__zoomIn">
            <Link href={'/workspace'}> <button type="button" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-8 py-4 text-center inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105">
              Start Free Trial <i className="fas fa-arrow-right ml-2"></i>
            </button></Link>
            <Link href={'/workspace'}>  <button type="button" className="text-gray-800 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-8 py-4 text-center inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105">
              Learn More 💪
            </button></Link>
          </div>
          <div className="mt-16">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80" alt="AI-Powered Learning" className="rounded-lg shadow-xl mx-auto max-w-full h-auto animate__animated animate__fadeInUp animate__delay-0.5s" />
          </div>
        </div>
      </section>

      <section id="features" className="py-16 clickable-section hover-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate__animated animate__fadeInUp">Key Features ✨</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInLeft">
              <div className="text-4xl text-teal-500 mb-4"><i className="fas fa-robot"></i></div>
              <h3 className="text-xl font-semibold mb-4">AI-Driven Personalization</h3>
              <p className="text-gray-700">Tailored learning paths based on your progress and goals.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-0.2s">
              <div className="text-4xl text-blue-500 mb-4"><i className="fas fa-comments"></i></div>
              <h3 className="text-xl font-semibold mb-4">Instant Feedback</h3>
              <p className="text-gray-700">Receive immediate feedback on your assignments and quizzes.</p>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInRight animate__delay-0.4s">
              <div className="text-4xl text-purple-500 mb-4"><i className="fas fa-chart-line"></i></div>
              <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
              <p className="text-gray-700">Comprehensive analytics to monitor your learning journey.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-16 gradient-bg-blue text-white clickable-section hover-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate__animated animate__fadeInUp">How It Works 🤔</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-lg shadow-md bg-blue-700 bg-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInLeft">
              <div className="text-4xl mb-4"><i className="fas fa-user-plus"></i></div>
              <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
              <p>Create your free account in minutes.</p>
            </div>
            <div className="p-8 rounded-lg shadow-md bg-blue-700 bg-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInUp animate__delay-0.2s">
              <div className="text-4xl mb-4"><i className="fas fa-book-open"></i></div>
              <h3 className="text-xl font-semibold mb-4">Explore Courses</h3>
              <p>Browse through our vast library of AI-powered courses.</p>
            </div>
            <div className="p-8 rounded-lg shadow-md bg-blue-700 bg-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInRight animate__delay-0.4s">
              <div className="text-4xl mb-4"><i className="fas fa-graduation-cap"></i></div>
              <h3 className="text-xl font-semibold mb-4">Start Learning</h3>
              <p>Begin your personalized learning journey today!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-16 clickable-section hover-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate__animated animate__fadeInUp">What Our Users Say 😊</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 p-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInLeft">
              <div className="flex items-center mb-6">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-600">Student</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                "The AI-powered feedback has been a game-changer for my learning. It's like having a personal tutor!"
              </blockquote>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__fadeInRight">
              <div className="flex items-center mb-6">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" />
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-600">Educator</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">
                "Integrating AI into my teaching has never been easier. The platform is intuitive and powerful."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-16 gradient-bg-purple text-white text-center clickable-section hover-section">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate__animated animate__fadeInUp">Ready to Start Your Learning Journey? 🚀</h2>
          <p className="text-lg md:text-xl mb-8 animate__animated animate__fadeInUp animate__delay-0.2s">Join thousands of learners achieving their goals with our AI platform.</p>
          <button type="button" className="text-purple-700 bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-8 py-4 text-center inline-flex items-center transition duration-300 ease-in-out transform hover:scale-105 animate__animated animate__zoomIn">
            Sign Up for Free <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">AI-Powered Learning</h3>
            <p className="text-sm">Empowering the next generation of learners with cutting-edge AI technology.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Home</a></li>
              <li className="mb-2"><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Features</a></li>
              <li className="mb-2"><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Pricing</a></li>
              <li><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Legal</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4 text-lg">
              <a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-teal-400 transition duration-300 ease-in-out"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 text-center text-sm">
          © 2024 AI-Powered Learning Hub. All rights reserved.
        </div>
      </footer>
    </div>

  );
}
