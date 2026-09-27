// Maysoor landing page — small progressive enhancements only.
// The page is fully readable without JavaScript.
(function () {
  "use strict";

  // Reveal Material Symbols only once the icon font has actually loaded,
  // so a blocked font never shows raw ligature names like "savings".
  if (document.fonts && document.fonts.load) {
    document.fonts.load('24px "Material Symbols Rounded"', "savings").then(function (loaded) {
      if (loaded.length) document.documentElement.classList.add("icons-ready");
    });
  }

  // Sticky header shadow on scroll
  var header = document.querySelector(".header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Signup form
  // TODO: set SIGNUP_ENDPOINT to your form backend (e.g. Formspree, a CRM
  // webhook, or your own API). While it is empty, submissions are only
  // validated and the success message is shown — nothing is sent anywhere.
  var SIGNUP_ENDPOINT = "";

  var form = document.getElementById("signup-form");
  if (!form) return;
  var errorEl = document.getElementById("form-error");
  var fields = form.querySelector(".form__fields");
  var success = document.getElementById("form-success");

  var validate = function (data) {
    if (!data.firstName.trim()) return "من فضلك اكتب الاسم الأول.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return "من فضلك اكتب بريد إلكتروني صحيح.";
    if (!data.childAge) return "من فضلك اختار عمر الطفل.";
    return "";
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var fd = new FormData(form);
    var data = {
      firstName: String(fd.get("firstName") || ""),
      email: String(fd.get("email") || ""),
      childAge: String(fd.get("childAge") || "")
    };
    var message = validate(data);
    errorEl.textContent = message;
    if (message) return;

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    var done = function () {
      fields.hidden = true;
      success.hidden = false;
      success.setAttribute("tabindex", "-1");
      success.focus();
    };

    if (!SIGNUP_ENDPOINT) { done(); return; }

    fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        done();
      })
      .catch(function () {
        errorEl.textContent = "حصلت مشكلة في الإرسال، جرّب تاني بعد شوية.";
        button.disabled = false;
      });
  });
})();
