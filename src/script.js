// Header link scroll to the section on click

const navLinks = document.querySelectorAll('header a');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const targetId = link.getAttribute('href');

    if (targetId === 'home.html') {
      window.location.href = targetId;
    } else {
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }
  });
});

// --------------------------------------------

// Header auto hide on scroll animation

const header = document.getElementById('page-header');
let lastScrollPosition = 0;

window.addEventListener('scroll', function () {
  const currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    header.classList.add('hide-header');
  } else {
    header.classList.remove('hide-header');
  }

  // Add parallax effect
  if (currentScrollPosition > 0) {
    header.classList.add('parallax');
  } else {
    header.classList.remove('parallax');
  }

  lastScrollPosition = currentScrollPosition;
});

// --------------------------------------------

// Header logo animations

const logo = document.querySelector('.logo');
const logoText = document.querySelector('.logo-text');

let shakeInterval;
let isHovered = false;

// Function to start the shaking animation
function startShaking() {
  logo.classList.add('shake');
  setTimeout(() => {
    logo.classList.remove('shake');
  }, 4000); // Shake for 2 seconds
}

// Function to schedule the next shaking animation
function scheduleNextShake() {
  const interval = Math.random() * 10000 + 10000; // Random interval between 10 to 20 seconds
  shakeInterval = setTimeout(() => {
    if (!isHovered) {
      startShaking();
      scheduleNextShake();
    }
  }, interval);
}

// Start the initial shaking animation
startShaking();
scheduleNextShake();

// Stop shaking when mouse hovers over the logo
logo.addEventListener('mouseenter', () => {
  isHovered = true;
  clearTimeout(shakeInterval);
  logo.classList.remove('shake');
});

// Resume shaking when mouse leaves the logo
logo.addEventListener('mouseleave', () => {
  isHovered = false;
  scheduleNextShake();
});

// --------------------------------------------

// PROGRESS BAR ANIMATION ON SCROLLING AND LOGIC

// Get the height of the entire page
const documentHeight = Math.max(
  document.body.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.clientHeight,
  document.documentElement.scrollHeight,
  document.documentElement.offsetHeight
);

// Calculate the progress based on the current scroll position
function calculateProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
  return progress.toFixed(2);
}

// Update the width of the progress bar based on the scroll progress
function updateProgressBar() {
  const progress = calculateProgress();
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${progress}%`;
}

// Attach scroll event listener to update the progress bar
window.addEventListener('scroll', updateProgressBar);

function animateOnScroll() {
  const elements = document.querySelectorAll('.animated-element');

  function checkViewport() {
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      // If the element is in the viewport, add the animate class
      if (elementTop <= window.innerHeight && elementBottom >= 0) {
        element.classList.add('animate');
      } else {
        // If the element is not in the viewport, remove the animate class
        element.classList.remove('animate');
      }
    });
  }

  // Add event listener to trigger the animation on scroll
  window.addEventListener('scroll', checkViewport);
  // Trigger the animation on page load
  checkViewport();
}

animateOnScroll();

// --------------------------------------------

// Scroll to top button auto show and animation

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', function () {
  // Show the button when the user scrolls down a certain distance
  if (window.scrollY > 100) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
});

scrollToTopBtn.addEventListener('click', function () {
  // Scroll the page to the top when the button is clicked
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// --------------------------------------------

// Scroll To Top button animation (rotation)

window.addEventListener("scroll", function() {
  let scrollToTopBtn = document.getElementById("scrollToTopBtn");
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight = window.innerHeight;
  let scrollThreshold = 0.15; // Adjust this value to set the scroll threshold

  // Calculate the distance from the top of the page to the scroll threshold
  let thresholdDistance = windowHeight * scrollThreshold;

  if (scrollTop > thresholdDistance && !scrollToTopBtn.classList.contains("rotate-animation")) {
    scrollToTopBtn.classList.add("rotate-animation");
  } else if (scrollTop <= thresholdDistance && scrollTop > 0 && scrollToTopBtn.classList.contains("rotate-animation")) {
    scrollToTopBtn.classList.remove("rotate-animation");
  } else if (scrollTop === 0 && scrollToTopBtn.classList.contains("rotate-animation")) {
    scrollToTopBtn.classList.remove("rotate-animation");
  }
});

// --------------------------------------------

// Mouse trail effect

document.addEventListener('DOMContentLoaded', function() {
  let mouseTrail = document.getElementById('mouse-trail');
  let isDrawing = false;
  let previousX = 0;
  let previousY = 0;
  let currentColor = '#ffffff'; // Initial color

  document.addEventListener('mousemove', function(event) {
    if (!isDrawing) {
      let line = document.createElement('div');
      line.className = 'mouse-trail-line';
      line.style.left = previousX + 'px';
      line.style.top = previousY + 'px';
      let distance = Math.sqrt(
        Math.pow(event.clientX - previousX, 2) +
        Math.pow(event.clientY - previousY, 2)
      );
      line.style.width = distance + 'px';
      let angle = Math.atan2(event.clientY - previousY, event.clientX - previousX);
      line.style.transform = 'rotate(' + angle + 'rad)';
      line.style.backgroundColor = currentColor;

      mouseTrail.appendChild(line);

      setTimeout(function() {
        mouseTrail.removeChild(line);
      }, 500);

      previousX = event.clientX;
      previousY = event.clientY;
    }
  });

  document.addEventListener('mousedown', function(event) {
    if (event.button === 0) {
      isDrawing = true;
      previousX = event.clientX;
      previousY = event.clientY;

      // Change color on left-click
      currentColor = currentColor === '#000000' ? '#ffffff' : '#000000';
    }
  });

  document.addEventListener('mouseup', function() {
    isDrawing = false;
  });
});

// --------------------------------------------

// Intro content reponsiveness logic.
// Always fit on top and center of the video

function adjustIntroContent() {
  const introContent = document.querySelector('.intro-content');
  const introHeading = document.getElementById('intro-heading');
  const introText = document.getElementById('intro-text');
  const video = document.querySelector('.background-video video');

  if (window.innerWidth < video.videoWidth) {
    introContent.style.width = '100%';
    introContent.style.padding = '0 20px';

    const scaleFactor = window.innerWidth / video.videoWidth; // Adjust the scale factor as desired
    const headingFontSize = 48 * scaleFactor; // Adjust the base font size as desired
    const textFontSize = 24 * scaleFactor; // Adjust the base font size as desired

    introHeading.style.fontSize = headingFontSize + 'px';
    introText.style.fontSize = textFontSize + 'px';
  } else {
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const videoHeight = window.innerHeight;
    const videoWidth = videoHeight * videoAspectRatio;
    const introContentWidth = Math.min(videoWidth, window.innerWidth);

    introContent.style.width = `${introContentWidth}px`;
    introContent.style.padding = '0';
    introHeading.style.fontSize = '48px'; // Adjust the font size as desired
    introText.style.fontSize = '24px'; // Adjust the font size as desired
  }

  introHeading.style.transform = 'none';
  introText.style.transform = 'none';
}

window.addEventListener('resize', adjustIntroContent);
adjustIntroContent();

// --------------------------------------------

// FOOTER

// Footer hide by default
// Scroll / Document height math


// Functioin for getting the current scroll percent,
// so that we can show footer if user has scrolled to
// a certain percentage of page / document.
let scrollPercent = (function() {
  "use strict";
  let initDiff;
  let module = {
    config: {

    },
    init: function() {
      let windowHeight = this.getWindowHeight();
      let docHeight = this.getDocHeight() - windowHeight;
      initDiff = (windowHeight / docHeight) * 100;

      return this.percent();
    },
    percent: function() {
      let windowHeight = this.getWindowHeight();
      let docHeight = this.getDocHeight() - windowHeight;
      let scrollPosition = this.getScrollPosition();
      let result = ((scrollPosition + windowHeight) / docHeight) * 100 - initDiff;


      return Math.floor(result);
    },
    getScrollPosition: function() {
      return (window.scrollY !== undefined) ? window.scrollY : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
    getWindowHeight: function() {
      return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    },
    getDocHeight: function() {
      return Math.max(
        document.body.scrollHeight || 0,
        document.documentElement.scrollHeight || 0,
        document.body.offsetHeight || 0,
        document.documentElement.offsetHeight || 0,
        document.body.clientHeight || 0,
        document.documentElement.clientHeight || 0
      );
    }
  };

  return module;
});

let scroller = new scrollPercent();

window.addEventListener('click', function() {
  console.log(scroller.getWindowHeight());
  console.log(scroller.getDocHeight())
});

// Footer auto show on scroll to bottom animation
const footer = document.getElementById('page-footer');

if (scroller.getWindowHeight() == scroller.getDocHeight()) {
  footer.classList.remove('hide-footer')
  footer.classList.remove('parallax')
} else {

    window.addEventListener('DOMContentLoaded', function() {
      footer.classList.add('hide-footer');
    });

    window.onscroll = function(event) {
    if (scroller.init() >= 50) {
      footer.classList.remove('hide-footer');
    }
    
    // Add parallax effect
    if (scroller.init() >= 99) {
      footer.classList.remove('parallax')
    } else {
      footer.classList.add('parallax')
    }
  }

};

// --------------------------------------------
