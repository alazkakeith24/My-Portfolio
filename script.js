/// Contact Form Validation + Inline Feedback
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function showFeedback(input, message, isValid) {
  let feedback = input.nextElementSibling;
  if (!feedback || !feedback.classList.contains("input-feedback")) {
    feedback = document.createElement("small");
    feedback.className = "input-feedback";
    input.insertAdjacentElement("afterend", feedback);
  }
  feedback.textContent = message;
  feedback.style.color = isValid ? "green" : "red";
}

// Real-time validation
nameInput.addEventListener("input", () => {
  nameInput.value.trim() === "" 
    ? showFeedback(nameInput, "Name is required.", false) 
    : showFeedback(nameInput, "✅ Looks good!", true);
});

emailInput.addEventListener("input", () => {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  if (emailInput.value.trim() === "") {
    showFeedback(emailInput, "Email is required.", false);
  } else if (!emailPattern.test(emailInput.value.trim())) {
    showFeedback(emailInput, "Invalid email format.", false);
  } else {
    showFeedback(emailInput, "✅ Valid email!", true);
  }
});

messageInput.addEventListener("input", () => {
  messageInput.value.trim() === "" 
    ? showFeedback(messageInput, "Message cannot be empty.", false) 
    : showFeedback(messageInput, "✅ Ready to send!", true);
});

// Success Popup
function showPopup(message, isSuccess = true) {
  const popup = document.createElement("div");
  popup.className = "popup-message";
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.padding = "12px 20px";
  popup.style.background = isSuccess ? "#28a745" : "#dc3545";
  popup.style.color = "#fff";
  popup.style.borderRadius = "6px";
  popup.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
  popup.style.zIndex = "2000";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Email format validation before sending
contactForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  // Validate name
  if (nameInput.value.trim() === "") {
    showPopup("Please enter your name.", false);
    return;
  }

  // Validate email
  if (!emailPattern.test(emailInput.value.trim())) {
    showPopup("Please enter a valid email address.", false);
    return;
  }

  // Validate message
  if (messageInput.value.trim() === "") {
    showPopup("Please enter your message.", false);
    return;
  }

  showPopup("Sending message...", true);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      showPopup("✅ Message sent successfully!", true);
      contactForm.reset();

      // Remove validation messages
      document.querySelectorAll(".input-feedback").forEach(el => el.remove());

    } else {
      showPopup("❌ Failed to send message. Please try again.", false);
    }

  } catch (error) {
    showPopup("⚠️ Network error. Check your internet connection.", false);
  }
});

/// Highlight Active Nav Link on Scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 130;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/// Scroll-to-Top Button
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/// Dark Mode Toggle with Persistence
const darkModeToggle = document.getElementById("darkModeToggle");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "☀️ Light Mode";
} else {
  darkModeToggle.textContent = "🌙 Dark Mode";
}
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

/// Hamburger Menu Toggle
const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinksMenu.classList.toggle("show");
});

/// Typing Animation with Blinking Cursor
const roles = ["Website Designer", "AI Specialist", "Problem Solver", "Data Analyst"];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingSpeed = 120, pauseBetweenRoles = 1500;

function typeEffect() {
  const typingElement = document.getElementById("typing");
  if (!typingElement) return;

  const currentRole = roles[roleIndex];

  if (!isDeleting && charIndex < currentRole.length) {
    typingElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    typingElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(typeEffect, typingSpeed / 2);
  } else {
    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; typeEffect(); }, pauseBetweenRoles);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, typingSpeed);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
