document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const nav = document.querySelector("nav ul");

  mobileMenuBtn.addEventListener("click", function () {
    nav.style.display = nav.style.display === "block" ? "none" : "block";
  });

  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          nav.style.display = "none";
        }
      }
    });
  });

  // Product Enquiry Modal
  const enquiryBtns = document.querySelectorAll(".enquire-btn");
  const enquiryModal = document.getElementById("enquiryModal");
  const closeModalBtns = document.querySelectorAll(".close-modal");
  const productNameField = document.getElementById("productName");

  enquiryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const productName = this.getAttribute("data-product");
      productNameField.value = productName;
      enquiryModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Close Modal
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      enquiryModal.style.display = "none";
      successModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === enquiryModal) {
      enquiryModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === successModal) {
      successModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Form Submissions
  const enquiryForm = document.getElementById("enquiryForm");
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.getElementById("newsletterForm");
  const successModal = document.getElementById("successModal");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      console.log("Enquiry submitted:", {
        product: document.getElementById("productName").value,
        name: document.getElementById("enquiryName").value,
        email: document.getElementById("enquiryEmail").value,
        phone: document.getElementById("enquiryPhone").value,
        message: document.getElementById("enquiryMessage").value,
      });

      enquiryModal.style.display = "none";
      successModal.style.display = "block";
      enquiryForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Here you would typically send the form data to a server
      console.log("Contact form submitted:", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        message: document.getElementById("message").value,
      });

      successModal.style.display = "block";
      contactForm.reset();
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      // Here you would typically send the email to a newsletter service
      console.log("Newsletter subscription:", email);

      alert("Thank you for subscribing to our newsletter!");
      this.reset();
    });
  }

  // Sticky Header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form redirection

    // Collect form data
    const formData = new FormData(contactForm);

    // Convert form data to URL-encoded string
    const formEntries = new URLSearchParams(formData);

    // Submit form data to Google Forms
    fetch(contactForm.action, {
      method: "POST",
      body: formEntries,
      mode: "no-cors", // Prevent CORS issues
    })
      .then(() => {
        // Display success notification
        alert("Your message has been sent successfully!");
        contactForm.reset(); // Clear the form fields
      })
      .catch(() => {
        // Handle errors
        alert("There was an error sending your message. Please try again.");
      });
  });
});
