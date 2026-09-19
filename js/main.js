// Sohaib Mohsin - Portfolio Main Script
// Interactive features, scroll reveals, developer terminal, project modals, and UX micro-interactions.

document.addEventListener('DOMContentLoaded', () => {
  initCursorGlow();
  initMobileMenu();
  initScrollReveal();
  initActiveNav();
  initProjectFilters();
  initProjectModal();
  initDevTerminal();
  initEmailCopy();
  initContactForm();
});

// 1. Ambient Cursor Glow for Desktop
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) {
    if (glow) glow.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
}

// 2. Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen) {
      mobileMenu.classList.remove('active');
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
    } else {
      mobileMenu.classList.add('active');
      mobileMenu.style.maxHeight = '400px';
      mobileMenu.style.opacity = '1';
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      mobileMenu.style.maxHeight = '0px';
      mobileMenu.style.opacity = '0';
    });
  });
}

// 3. Scroll Reveal Observer
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// 4. Active Nav Highlighting on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-amber-400', 'font-semibold');
      link.classList.add('text-slate-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('text-slate-400');
        link.classList.add('text-amber-400', 'font-semibold');
      }
    });
  });
}

// 5. Project Filtering
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
        b.classList.add('bg-slate-900/60', 'text-slate-400', 'border-slate-800');
      });

      btn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
      btn.classList.remove('bg-slate-900/60', 'text-slate-400', 'border-slate-800');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

// 6. Project Modal Data & Interactive Details
const projectDetailsData = {
  'agentive-ai': {
    title: 'Agentive AI Project Manager',
    subtitle: 'Autonomous Task Allocation & Proposal Generation System',
    tags: ['Flutter', 'Dart', 'AI Automation', 'Multi-Role Dashboard', 'Cloud Sync', 'Push Alerts'],
    description: 'A comprehensive cross-platform mobile application engineered with specialized role-based architecture for Managers, Employees, and Clients, powered by integrated AI agents for automated project workflows.',
    architecture: 'Clean Layered Mobile Architecture with secure authenticated sessions. The business logic interacts with high-speed AI inference workers to evaluate developer capacity and automate client proposal drafts.',
    highlights: [
      'Engineered two distinct prompt-engineered AI workflows: Autonomous Task Assignment (workload & skill matching) and Client Proposal Generation.',
      'Role-based access control with distinct dashboard views and permission boundaries.',
      'Real-time live metrics stream for active employee count, task distribution, and completion progress.',
      'Automated push notification delivery across mobile devices with background token management.'
    ],
    github: 'https://github.com/Sohaib1911',
    status: 'Flagship Showcase'
  },
  'car-pulse': {
    title: 'Car Pulse',
    subtitle: 'Offline-First Vehicle Maintenance & Trip Analytics Engine',
    tags: ['Flutter', 'Dart', 'Clean Architecture', 'Offline-First', 'Trip Logger', 'Vehicle Care'],
    description: 'A robust mobile automotive companion designed for complete offline resilience. Car Pulse allows vehicle owners to track maintenance logs, monitor fuel efficiency, and record trip details with instant local operations.',
    architecture: 'Clean decoupled architecture with a dedicated repository pattern. User interfaces subscribe to reactive data streams while local storage is abstracted through structured schema migrations.',
    highlights: [
      'Zero network reliance: 100% offline-first local data operations and persistence.',
      'Separation of concerns: UI logic completely decoupled from data storage layers.',
      'Multi-screen flow: Car Dashboard, Add Vehicle, Maintenance Log, Trip Distance Tracker with responsive UI.',
      'Optimized data queries and relational indices for instant retrieval of maintenance histories.'
    ],
    github: 'https://github.com/Sohaib1911',
    status: 'Core Architecture Project'
  },
  'easy-chat': {
    title: 'Easy Chat Android',
    subtitle: 'Real-time Conversational AI Interface on Native Android',
    tags: ['Native Android', 'Java', 'Conversational AI', 'Dynamic UI', 'Background Processing'],
    description: 'A native Android chat application engineered to deliver low-latency intelligent dialogue in a modern messaging interface.',
    architecture: 'Native Android architecture leveraging asynchronous background execution, ensuring zero UI thread freezes during response synthesis and streaming.',
    highlights: [
      'Responsive conversational UI featuring custom chat bubbles, auto-scrolling message lists, and typing indicators.',
      'Robust error handling and network retry strategies for unreliable mobile connections.',
      'Secure runtime configuration for request headers and payload validation.',
      'Smooth keyboard behavior and edge-to-edge layout adaptation.'
    ],
    github: 'https://github.com/Sohaib1911',
    status: 'Native Android Showcase'
  },
  'notes-app': {
    title: 'Cloud Notes App',
    subtitle: 'Real-time Synchronized Note Engine with Cloud Sync',
    tags: ['Native Android', 'Java', 'Cloud Sync', 'Secure Auth', 'CRUD Engine'],
    description: 'A secure, responsive cloud notes application built natively in Java with enterprise-grade email verification authentication and instant cloud replication.',
    architecture: 'Native Activity lifecycle architecture (Splash → Auth Flow → Main Notes Dashboard → Note Detail/Editor) paired with real-time cloud data listeners for low-latency updates.',
    highlights: [
      'Complete CRUD lifecycle: instantaneous local UI updates reflected across all user devices.',
      'Secure authentication flow including strict email verification checks before granting workspace access.',
      'Memory-efficient viewport rendering of large note collections.',
      'Clean Activity lifecycle handling to maintain data integrity across orientation changes.'
    ],
    github: 'https://github.com/Sohaib1911',
    status: 'Native Cloud Project'
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const backdrop = document.getElementById('modal-backdrop');
  const openButtons = document.querySelectorAll('.open-project-modal');

  if (!modal) return;

  function openModal(projectId) {
    const data = projectDetailsData[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-description').textContent = data.description;
    document.getElementById('modal-architecture').textContent = data.architecture;
    document.getElementById('modal-status').textContent = data.status;

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach(tag => {
      const span = document.createElement('span');
      span.className = 'px-2.5 py-1 text-xs font-mono rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    // Highlights
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    data.highlights.forEach(hl => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-slate-300 space-x-2';
      li.innerHTML = `<span class="text-amber-400 mt-1">▸</span><span>${hl}</span>`;
      highlightsContainer.appendChild(li);
    });

    // Links
    const githubLink = document.getElementById('modal-github-link');
    if (githubLink) {
      githubLink.href = data.github;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// 7. Interactive Developer Terminal
function initDevTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const quickCmds = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalInput || !terminalOutput) return;

  const commands = {
    'help': `Available commands:
  <span class="text-amber-400">sohaib.skills</span>     - View confirmed technical capabilities
  <span class="text-amber-400">sohaib.projects</span>   - Summary of flagship software projects
  <span class="text-amber-400">sohaib.experience</span> - Work history & internship milestones
  <span class="text-amber-400">sohaib.education</span>  - Academic degree & university background
  <span class="text-amber-400">flutter doctor</span>   - Run simulated Flutter & Android environment diagnosis
  <span class="text-amber-400">clear</span>            - Clear terminal screen`,

    'sohaib.skills': `{
  "native_android": ["Kotlin", "Jetpack Compose", "XML Layouts", "Android Studio", "Activity Lifecycle"],
  "cross_platform": ["Flutter", "Dart", "Clean Architecture", "Responsive UI/UX"],
  "architecture_and_cloud": ["Offline-First Systems", "Cloud Sync", "Secure Authentication", "Git & GitHub"],
  "emerging_and_ai": ["AI Agent Automations", "Prompt Engineering", "Data Structures & Algorithms (DSA)"],
  "design_philosophy": "Offline-First, 60fps Smooth UI, Maintainable Layered Separation"
}`,

    'sohaib.projects': `[
  { "name": "Agentive AI Project Manager", "domain": "Cross-Platform + Intelligent AI", "highlight": "Autonomous task allocation & client proposal generation" },
  { "name": "Car Pulse", "domain": "Cross-Platform + Automotive Analytics", "highlight": "Offline-first maintenance tracking & trip analytics" },
  { "name": "Easy Chat", "domain": "Native Android + Conversational AI", "highlight": "Low-latency real-time AI dialogue interface" },
  { "name": "Notes App", "domain": "Native Android + Cloud Productivity", "highlight": "Securely authenticated real-time notes workspace" }
]`,

    'sohaib.experience': `1. IT Globe Software Company (Lahore, Pakistan)
   Role: Software Engineer (Mobile Applications)
   Status: Present (Promoted from Software Engineering Internship)
   Key Focus:
     - Developing and maintaining native Android applications utilizing Kotlin
     - Engineering responsive cross-platform mobile solutions
     - Production codebases, clean architecture, and sprint delivery

2. Jeux Developers (Sahiwal, Pakistan)
   Role: Software Developer Intern (Flutter)
   Duration: 01/08/2025 – 01/10/2025
   Key Focus:
     - Multi-screen UI components & state lifecycle management
     - Weekly technical assessments & rapid delivery`,

    'sohaib.education': `Degree: Bachelors in Computer Science (BS CS)
Institution: University of Southern Punjab
Timeline: 2022 – 2026
Focus: Object-Oriented Programming, Data Structures & Algorithms, Mobile Architecture, Database Systems`,

    'flutter doctor': `<span class="text-emerald-400">[✓] Flutter (Channel stable, 3.29.0, on Microsoft Windows [Version 10.0], locale en-US)</span>
<span class="text-emerald-400">[✓] Android toolchain - develop for Android devices (Android SDK version 34.0.0)</span>
<span class="text-emerald-400">[✓] Android Studio (version 2024.2)</span>
<span class="text-emerald-400">[✓] VS Code (version 1.95)</span>
<span class="text-emerald-400">[✓] Connected device (1 available)</span>
<span class="text-emerald-400">[✓] Network resources</span>

<span class="text-amber-400 font-bold">• No issues found! Development environment is fully calibrated and ready to ship.</span>`,

    'clear': '__CLEAR__'
  };

  function executeCommand(cmd) {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      terminalOutput.innerHTML = '';
      return;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'mb-2';
    commandEntry.innerHTML = `<span class="text-amber-400 font-mono">guest@sohaib-terminal:~$</span> <span class="text-white font-mono">${escapeHtml(cmd)}</span>`;
    terminalOutput.appendChild(commandEntry);

    const resultEntry = document.createElement('div');
    resultEntry.className = 'mb-4 font-mono text-xs md:text-sm text-slate-300 leading-relaxed';

    if (commands[cleanCmd]) {
      resultEntry.innerHTML = commands[cleanCmd];
    } else {
      resultEntry.innerHTML = `<span class="text-rose-400">Command not found: '${escapeHtml(cleanCmd)}'. Type <span class="text-amber-300 underline cursor-pointer" onclick="document.getElementById('terminal-input').value='help'; document.getElementById('terminal-input').focus();">help</span> for a list of valid commands.</span>`;
    }

    terminalOutput.appendChild(resultEntry);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      executeCommand(val);
      terminalInput.value = '';
    }
  });

  quickCmds.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      terminalInput.value = cmd;
      executeCommand(cmd);
      terminalInput.value = '';
    });
  });
}

// 8. Toast Feedback & Email Copy
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-slate-900/90 text-white px-4 py-3 rounded-xl border border-amber-500/40 shadow-2xl backdrop-blur-md';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="text-amber-400">✦</span> <span class="text-sm font-medium">${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const email = 'sohaibmohsin1911@gmail.com';

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('sohaibmohsin1911@gmail.com');
      });
    });
  });
}

// 9. Contact Form Dispatch
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim() || 'Portfolio Inquiry';
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.');
      return;
    }

    const mailtoLink = `mailto:sohaibmohsin1911@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    showToast('Opening email client to send message...');
    setTimeout(() => {
      window.location.href = mailtoLink;
      form.reset();
    }, 600);
  });
}

// Utility: Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
