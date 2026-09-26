// ===== AÑO ACTUAL EN FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== MENÚ MÓVIL =====
const navToggle = document.getElementById('nav-toggle');
const navClose  = document.getElementById('nav-close');
const navMenu   = document.getElementById('nav-menu');

function openMenu()  { navMenu.classList.add('show'); }
function closeMenu() { navMenu.classList.remove('show'); }

if (navToggle) navToggle.addEventListener('click', openMenu);
if (navClose)  navClose.addEventListener('click', closeMenu);

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ===== HEADER CON SOMBRA AL HACER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== ENLACE ACTIVO SEGÚN SECCIÓN =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const top = current.offsetTop - 90;
    const height = current.offsetHeight;
    const id = current.getAttribute('id');
    const link = document.querySelector('.nav__link[href*="' + id + '"]');
    if (!link) return;
    if (scrollY > top && scrollY <= top + height) {
      link.classList.add('active-link');
    } else {
      link.classList.remove('active-link');
    }
  });
});

// ===== ANIMACIONES AL HACER SCROLL (REVEAL) =====
const revealEls = document.querySelectorAll(
  '.about__container, .product-card, .process__step, .section__header, .contact__info, .contact__form'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ===== FORMULARIO DE CONTACTO (abre el correo con los datos) =====
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = encodeURIComponent(document.getElementById('name').value.trim());
    const email   = document.getElementById('email').value.trim();
    const service = encodeURIComponent(document.getElementById('service').value);
    const message = encodeURIComponent(document.getElementById('message').value.trim());

    const subject = 'Nuevo mensaje desde la web - ' + decodeURIComponent(service);
    const body =
      'Nombre: ' + decodeURIComponent(name) + '%0D%0A' +
      'Correo: ' + email + '%0D%0A' +
      'Servicio: ' + decodeURIComponent(service) + '%0D%0A%0D%0A' +
      'Mensaje:%0D%0A' + decodeURIComponent(message);

    // Abre el cliente de correo con el mensaje listo para enviar
    window.location.href =
      'mailto:hcouo23@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + body;

    formNote.textContent = '¡Gracias! Se abrió tu correo para enviarme el mensaje.';
    formNote.classList.add('ok');
    form.reset();
  });
}
