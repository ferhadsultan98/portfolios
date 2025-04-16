 // Wait for DOM to load
 document.addEventListener("DOMContentLoaded", function () {
    // Custom cursor functionality
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      setTimeout(function () {
        cursorFollower.style.left = e.clientX + "px";
        cursorFollower.style.top = e.clientY + "px";
      }, 100);
    });

    document.addEventListener("mousedown", function () {
      cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.8)";
    });

    document.addEventListener("mouseup", function () {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
    });

    // Elements that should show cursor interaction
    const links = document.querySelectorAll(
      "a, button, .project-card, .skill-item, .social-link"
    );

    links.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorFollower.style.width = "30px";
        cursorFollower.style.height = "30px";
      });

      link.addEventListener("mouseleave", function () {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursorFollower.style.width = "40px";
        cursorFollower.style.height = "40px";
      });
    });

    // Theme toggle functionality
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.body;
    const themeIcon = document.querySelector(".theme-toggle i");

    themeToggle.addEventListener("click", function () {
      body.classList.toggle("light-mode");

      if (body.classList.contains("light-mode")) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
      } else {
        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
      }
    });

    // Check for saved theme preference
    if (localStorage.getItem("theme") === "light") {
      body.classList.add("light-mode");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });

    // Close mobile menu when clicking a link
    const menuLinks = document.querySelectorAll(".nav-links a");

    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      });
    });

    // Header scroll effect
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Project modal functionality
    const viewProjectBtns = document.querySelectorAll(".view-project");
    const projectModals = document.querySelectorAll(".project-modal");
    const closeModalBtns = document.querySelectorAll(".close-modal");

    viewProjectBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const projectId = this.getAttribute("data-project");
        const modal = document.getElementById(projectId + "Modal");
        modal.classList.add("active");
      });
    });

    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".project-modal");
        modal.classList.remove("active");
      });
    });

    // Close modal when clicking outside
    projectModals.forEach((modal) => {
      modal.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active");
        }
      });
    });

    // Form submission with validation
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Basic form validation
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
          alert("Please fill in all fields");
          return;
        }

        if (!isValidEmail(email)) {
          alert("Please enter a valid email address");
          return;
        }

        // Form submission would go here
        alert("Thank you for your message! I will get back to you soon.");
        this.reset();
      });
    }

    // Email validation helper function
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Parallax effect on scroll
    window.addEventListener("scroll", function () {
      const scrollY = window.scrollY;

      // Parallax for home section
      const profileImg = document.querySelector(".profile-img");
      if (profileImg) {
        profileImg.style.transform = `translateY(${scrollY * 0.1}px)`;
      }

      // Parallax for gradient circles
      const circles = document.querySelectorAll(".gradient-circle");
      circles.forEach((circle, index) => {
        const speed = 0.05 * (index + 1);
        circle.style.transform = `translate(${scrollY * speed}px, ${
          -scrollY * speed
        }px) scale(${1 + scrollY * 0.0005})`;
      });

      // Animate sections on scroll
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollY > sectionTop - window.innerHeight + 200 &&
          scrollY < sectionTop + sectionHeight
        ) {
          section.style.opacity = "1";
          section.style.transform = "translateY(0)";
        }
      });
    });

    // Initialize section animations
    const sections = document.querySelectorAll("section:not(#home)");
    sections.forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";
      section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

    // Trigger initial animations
    setTimeout(() => {
      window.dispatchEvent(new Event("scroll"));
    }, 500);
  });