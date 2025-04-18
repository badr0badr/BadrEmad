/*
* Main JavaScript File
* Author: Badr Emad
*/

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // DOM element selectors
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const backToTopBtn = document.querySelector('.back-to-top');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const contactForm = document.getElementById('contact-form');
  
  // Create a loading screen
  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading';
  loadingScreen.innerHTML = '<div class="spinner"></div>';
  document.body.prepend(loadingScreen);
  
  // Hide loading screen after page is loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingScreen.classList.add('hide');
      // Remove after transition completes
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 500);
  });
  
  // Check for saved theme preference or use user's system preference
  function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      document.body.classList.toggle('dark-theme', savedTheme === 'dark');
      themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.classList.toggle('dark-theme', prefersDark);
      themeIcon.className = prefersDark ? 'fas fa-sun' : 'fas fa-moon';
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }
  
  // Set initial theme
  setInitialTheme();
  
  // Theme toggler
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Add animation class
    this.classList.add('toggled');
    setTimeout(() => {
      this.classList.remove('toggled');
    }, 500);
  });
  
  // Navbar scroll effect
  function updateNavbar() {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Active nav link based on scroll position
  function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Back to Top button visibility
  function updateScrollToTopBtn() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  
  // Scroll reveal animation
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  
  // Add reveal class to elements that should animate on scroll
  function initRevealElements() {
    const elementsToReveal = [
      '.skills-category', 
      '.project-card', 
      '.about-text h3', 
      '.about-text p', 
      '.contact-info h3', 
      '.contact-form-wrapper'
    ];
    
    elementsToReveal.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
      });
    });
  }
  
  // Initialize reveal elements
  initRevealElements();
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return; // Ignore links with just #
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Update URL without refreshing the page
        history.pushState(null, null, targetId);
        
        // If mobile menu is open, close it
        if (window.innerWidth < 992) {
          const navbarCollapse = document.getElementById('navbarNav');
          if (navbarCollapse.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
          }
        }
      }
    });
  });
  
  // Contact form handling
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Form validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Normally this would send data to a backend
      // For this demo, just show a success message
      alert(`Thank you, ${name}! Your message has been received.`);
      contactForm.reset();
    });
  }
  
  // Event listeners for scroll
  window.addEventListener('scroll', function() {
    updateNavbar();
    updateActiveLink();
    updateScrollToTopBtn();
    revealOnScroll();
  });
  
  // Initial call to set things up
  updateNavbar();
  updateActiveLink();
  updateScrollToTopBtn();
  revealOnScroll();
  
  // Back to top button click handler
  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add typing effect to the hero section
  function setupTypingEffect() {
    const targetElement = document.querySelector('.hero-intro h2');
    if (!targetElement) return;

    const originalText = targetElement.textContent;
    targetElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 100; // ms per character
    
    function typeNextChar() {
      if (charIndex < originalText.length) {
        targetElement.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeNextChar, typingSpeed);
      }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeNextChar, 1000);
  }
  
  // Initialize typing effect
  setupTypingEffect();
});