// ============================================
//  SPICE GARDEN — main.js
// ============================================

// ---- Menu Data ----
const menuData = {
  starters: [
    { name: "Samosa (2 pcs)", price: "£5.50", desc: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Chicken Tikka", price: "£8.50", desc: "Tender chicken marinated in yogurt and spices, grilled in a clay oven.", badge: "popular", badgeLabel: "Most Popular" },
    { name: "Onion Bhaji", price: "£5.00", desc: "Golden fried onion fritters seasoned with cumin, coriander and green chilli.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Seekh Kebab", price: "£9.00", desc: "Minced lamb mixed with herbs and spices, skewered and grilled over charcoal.", badge: "spicy", badgeLabel: "Spicy" },
    { name: "Paneer Tikka", price: "£7.50", desc: "Cubes of cottage cheese marinated in aromatic spices, chargrilled to perfection.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Prawn Cocktail", price: "£9.50", desc: "Jumbo prawns tossed in a tangy spiced sauce with shredded lettuce.", badge: "popular", badgeLabel: "Chef's Pick" },
  ],
  mains: [
    { name: "Butter Chicken", price: "£14.50", desc: "Tender chicken in a rich, creamy tomato-based sauce with aromatic spices.", badge: "popular", badgeLabel: "Best Seller" },
    { name: "Lamb Rogan Josh", price: "£15.50", desc: "Slow-cooked lamb in a bold Kashmiri sauce of whole spices and dried red chillies.", badge: "spicy", badgeLabel: "Spicy" },
    { name: "Dal Makhani", price: "£11.00", desc: "Black lentils slow-cooked overnight with cream and butter — a Punjabi classic.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Prawn Masala", price: "£16.50", desc: "King prawns cooked in a robust onion-tomato masala with coastal spices.", badge: "spicy", badgeLabel: "Spicy" },
    { name: "Palak Paneer", price: "£12.00", desc: "Fresh cottage cheese cooked in a smooth, lightly spiced spinach gravy.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Chicken Biryani", price: "£14.00", desc: "Fragrant basmati rice layered with spiced chicken, saffron and caramelised onions.", badge: "popular", badgeLabel: "Must Try" },
  ],
  desserts: [
    { name: "Gulab Jamun", price: "£5.00", desc: "Soft milk-solid dumplings soaked in rose-flavoured sugar syrup.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Mango Kulfi", price: "£5.50", desc: "Traditional Indian ice cream made with condensed milk and fresh Alphonso mango.", badge: "popular", badgeLabel: "Chef's Favourite" },
    { name: "Kheer", price: "£5.00", desc: "Creamy rice pudding simmered in milk, cardamom and finished with pistachios.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Rasgulla", price: "£5.00", desc: "Light spongy cottage cheese balls in a clear rose-scented sugar syrup.", badge: "veg", badgeLabel: "Vegetarian" },
  ],
  drinks: [
    { name: "Mango Lassi", price: "£4.00", desc: "Chilled yogurt blended with fresh mango pulp — cooling and refreshing.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Rose Sharbat", price: "£3.50", desc: "A delicate rose-flavoured drink with chia seeds, chilled and lightly sweetened.", badge: "popular", badgeLabel: "House Special" },
    { name: "Masala Chai", price: "£3.00", desc: "Spiced Indian tea brewed with ginger, cardamom, cinnamon and fresh milk.", badge: "veg", badgeLabel: "Vegetarian" },
    { name: "Fresh Lime Soda", price: "£3.00", desc: "Freshly squeezed lime with sparkling water — sweet, salted, or mixed.", badge: "veg", badgeLabel: "Vegetarian" },
  ],
};

// ---- Render Menu ----
function renderMenu(category) {
  const grid = document.getElementById("menu-grid");
  const items = menuData[category];
  grid.innerHTML = items.map((item, i) => `
    <div class="menu-card" style="animation-delay: ${i * 0.06}s">
      <div class="menu-card-top">
        <h3>${item.name}</h3>
        <span class="menu-price">${item.price}</span>
      </div>
      <p>${item.desc}</p>
      <span class="menu-badge badge-${item.badge}">${item.badgeLabel}</span>
    </div>
  `).join("");
}

// ---- Tab Switching ----
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu(btn.dataset.tab);
  });
});

// Init menu
renderMenu("starters");

// ---- Navbar Scroll Effect ----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 60) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ---- Mobile Hamburger ----
const hamburger = document.getElementById("hamburger");
hamburger.addEventListener("click", () => {
  navbar.classList.toggle("mobile-open");
});

// Close mobile nav on link click
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("mobile-open"));
});

// ---- Form Validation ----
const form = document.getElementById("reservation-form");

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(fieldId + "-error");
  if (field) field.classList.add("error");
  if (error) error.textContent = msg;
}

function clearErrors() {
  document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");
  document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearErrors();

  const name  = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date  = document.getElementById("date").value;
  const time  = document.getElementById("time").value;
  let valid   = true;

  if (!name || name.length < 2) {
    showError("name", "Please enter your full name.");
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  }

  if (!date) {
    showError("date", "Please choose a date.");
    valid = false;
  } else {
    const chosen = new Date(date);
    const today  = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosen < today) {
      showError("date", "Date cannot be in the past.");
      valid = false;
    }
  }

  if (!time) {
    showError("time", "Please select a time.");
    valid = false;
  }

  if (valid) {
    form.style.opacity = "0.5";
    form.style.pointerEvents = "none";
    setTimeout(() => {
      form.reset();
      form.style.opacity = "1";
      form.style.pointerEvents = "auto";
      document.getElementById("form-success").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("form-success").classList.add("hidden");
      }, 6000);
    }, 1000);
  }
});

// ---- Scroll Reveal Animation ----
const revealItems = document.querySelectorAll(
  ".why-card, .about-grid, .contact-grid, .gallery-item"
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(30px)";
  item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(item);
});