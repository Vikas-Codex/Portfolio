// ============ TERMINAL TYPE EFFECT ============
const nameText = "Vikas Bhat A";
const roleText = "Full Stack Developer | Web Developer";

function typeInto(el, text, speed, callback) {
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, speed);
    } else if (callback) {
      callback();
    }
  }
  step();
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const nameEl = document.getElementById('typeName');
const roleEl = document.getElementById('typeRole');

if (prefersReducedMotion) {
  nameEl.textContent = nameText;
  roleEl.textContent = roleText;
} else {
  typeInto(nameEl, nameText, 45, () => {
    setTimeout(() => typeInto(roleEl, roleText, 30), 250);
  });
}

// ============ SIDEBAR ACTIVE STATE ON SCROLL ============
const sections = document.querySelectorAll('.section');
const treeItems = document.querySelectorAll('.tree-item');

function updateActiveSection() {
  // Pick the section whose top has most recently crossed a fixed
  // line near the top of the viewport. Works regardless of how
  // tall any individual section is (unlike a percentage threshold).
  const triggerLine = window.innerHeight * 0.25;
  let current = sections[0];

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= triggerLine) {
      current = section;
    }
  });

  treeItems.forEach(item => {
    item.classList.toggle('active', item.dataset.target === current.id);
  });
}

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      updateActiveSection();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

window.addEventListener('resize', updateActiveSection);
updateActiveSection();

treeItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    closeSidebar();
  });
});

// ============ MOBILE SIDEBAR TOGGLE ============
const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');

function closeSidebar() {
  sidebar.classList.remove('open');
}

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768 &&
      sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    closeSidebar();
  }
});
