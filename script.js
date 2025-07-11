
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let isValid = true;
  
  if(nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  } else {
    showSuccess(nameInput);
  }
  
  if(emailInput.value.trim() === '') {
    showError(emailInput, 'Email is required');
    isValid = false;
  } else if(!isValidEmail(emailInput.value.trim())) {
    showError(emailInput, 'Email is not valid');
    isValid = false;
  } else {
    showSuccess(emailInput);
  }
  
  if(messageInput.value.trim() === '') {
    showError(messageInput, 'Message is required');
    isValid = false;
  } else {
    showSuccess(messageInput);
  }
  
  if(isValid) {
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  }
});

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const projectButtons = document.querySelectorAll('.project-btn');
const modals = document.querySelectorAll('.project-modal');
const closeButtons = document.querySelectorAll('.close-modal');

projectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const projectId = button.getAttribute('data-project');
    document.getElementById(`${projectId}-modal`).style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.closest('.project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  });
});

window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if(e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});

const skillBars = document.querySelectorAll('.skill-level');

function animateSkillBars() {
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      if(entry.target.id === 'skills') {
        animateSkillBars();
      }
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if(window.scrollY > 100) {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = 'none';
  }
});