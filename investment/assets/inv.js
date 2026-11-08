(function(){
  "use strict";

  /* header scroll state */
  var head = document.querySelector('.site-head');
  var onScroll = function(){
    if (head) head.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }); });
  }

  /* reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* count-up stats */
  function animateCount(el){
    var target = parseFloat(el.getAttribute('data-count') || '0');
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var decimals = (el.getAttribute('data-decimals') || '0') === '1' ? 1 : 0;
    var dur = 1600;
    var start = null;
    function fmt(v){ return prefix + v.toFixed(decimals) + suffix; }
    function step(ts){
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length){
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target); }
      });
    }, {threshold:.5});
    counters.forEach(function(el){ cio.observe(el); });
  } else {
    counters.forEach(function(el){ el.textContent = (el.getAttribute('data-prefix')||'') + el.getAttribute('data-count') + (el.getAttribute('data-suffix')||''); });
  }

  /* hero parallax (subtle) */
  var heroImg = document.querySelector('.hero__img img');
  var hero = document.querySelector('.hero');
  if (heroImg && hero && window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
    window.addEventListener('scroll', function(){
      var r = hero.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var y = (r.top * -0.08);
      heroImg.style.transform = 'scale(1.05) translateY(' + y + 'px)';
    }, {passive:true});
  }

  /* contact form -> mailto (word-to-word fields, functional delivery) */
  var form = document.getElementById('contact-form');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = (document.getElementById('cf-name')||{}).value || '';
      var email = (document.getElementById('cf-email')||{}).value || '';
      var phone = (document.getElementById('cf-phone')||{}).value || '';
      var msg = (document.getElementById('cf-msg')||{}).value || '';
      var subject = 'Capital Brief — ' + name;
      var body = 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\n\nMessage:\n' + msg;
      window.location.href = 'mailto:info@aainvestmentgroup.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
