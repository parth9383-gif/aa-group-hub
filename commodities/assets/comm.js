(function(){
  "use strict";

  /* dark/light theme toggle */
  var themeBtn = document.createElement('button');
  themeBtn.className = 'theme-toggle';
  themeBtn.type = 'button';
  themeBtn.setAttribute('aria-label', 'Toggle light or dark mode');
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    themeBtn.innerHTML = (t === 'dark')
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/></svg>'
      : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
    try { localStorage.setItem('aa-theme', t); } catch(e){}
  }
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('aa-theme'); } catch(e){}
  applyTheme(savedTheme || 'dark');
  themeBtn.addEventListener('click', function(){
    var cur = document.documentElement.getAttribute('data-theme');
    applyTheme(cur === 'light' ? 'dark' : 'light');
  });
  var headInner = document.querySelector('.head-inner');
  var navToggle = document.querySelector('.nav-toggle');
  if (headInner && navToggle){ headInner.insertBefore(themeBtn, navToggle); }

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

  /* ================= WOW effects (desktop-first, reduced-motion aware) ================= */
  var finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canFx = false; /* de-AI: no cursor glow / magnetic / tilt / particles */

  /* cursor glow */
  if (canFx){
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    document.body.classList.add('glow-on');
    var gx = innerWidth/2, gy = innerHeight/2, tx = gx, ty = gy;
    window.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; }, {passive:true});
    (function glowLoop(){
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = 'translate3d(' + gx + 'px,' + gy + 'px,0)';
      requestAnimationFrame(glowLoop);
    })();
  }

  /* magnetic buttons */
  if (canFx){
    document.querySelectorAll('.btn').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width/2)) / r.width;
        var dy = (e.clientY - (r.top + r.height/2)) / r.height;
        btn.style.transform = 'translate(' + (dx*6) + 'px,' + (dy*6) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }

  /* 3D tilt on cards/pillars/steps */
  if (canFx){
    document.querySelectorAll('.card, .pillar, .step').forEach(function(card){
      card.addEventListener('mousemove', function(e){
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - .5;
        var py = (e.clientY - r.top)/r.height - .5;
        card.style.transition = 'transform .08s ease-out';
        card.style.transform = 'perspective(900px) rotateY(' + (px*7) + 'deg) rotateX(' + (-py*7) + 'deg) translateY(-6px)';
      });
      card.addEventListener('mouseleave', function(){
        card.style.transition = 'transform .5s cubic-bezier(.16,.75,.28,1)';
        card.style.transform = '';
      });
    });
  }

  /* hero + page-hero headline: no per-word stagger (de-AI — editorial, static display) */
  if (!reducedMotion){
    document.querySelectorAll('.hero h1, .page-hero h1').forEach(function(h){ h.classList.add('in'); });
  }

  /* floating gold particles */
  if (canFx){
    var cv = document.createElement('canvas');
    cv.id = 'particles';
    document.body.appendChild(cv);
    var ctx = cv.getContext('2d');
    var W = cv.width = innerWidth, H = cv.height = innerHeight;
    window.addEventListener('resize', function(){ W = cv.width = innerWidth; H = cv.height = innerHeight; });
    var parts = [];
    for (var i = 0; i < 22; i++){
      parts.push({ x: Math.random()*W, y: Math.random()*H, r: Math.random()*1.4 + .5, vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22, a: Math.random()*.5 + .1 });
    }
    (function drawParts(){
      ctx.clearRect(0,0,W,H);
      for (var i = 0; i < parts.length; i++){
        var p = parts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(254,201,94,' + (p.a * 0.10) + ')';
        ctx.fill();
      }
      requestAnimationFrame(drawParts);
    })();
  }
})();

/* ==== turn-79: ambient aurora + cursor glow + 3D tilt ==== */
(function(){
  function go(){
    var amb=document.createElement('div'); amb.className='ambient'; amb.setAttribute('aria-hidden','true');
    document.body.insertBefore(amb, document.body.firstChild);
    var glow=document.createElement('div'); glow.className='cursor-glow'; glow.setAttribute('aria-hidden','true');
    document.body.appendChild(glow);
    var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(fine && !reduced){
      var mx=innerWidth/2,my=innerHeight/3,tx=mx,ty=my;
      document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; document.body.classList.add('glow-on'); }, {passive:true});
      (function loop(){ tx+=(mx-tx)*.12; ty+=(my-ty)*.12; glow.style.transform='translate3d('+(tx-260)+'px,'+(ty-260)+'px,0)'; requestAnimationFrame(loop); })();
      var tilts=document.querySelectorAll('.card, .div-card, .person, .gitem, .pillar, .step, .split .media');
      Array.prototype.forEach.call(tilts, function(el){
        el.classList.add('tilt-3d');
        el.addEventListener('mousemove', function(e){
          var r=el.getBoundingClientRect(); var x=(e.clientX-r.left)/r.width-.5; var y=(e.clientY-r.top)/r.height-.5;
          el.style.transform='perspective(900px) rotateX('+(y*-4).toFixed(2)+'deg) rotateY('+(x*4).toFixed(2)+'deg) translateY(-3px)';
        });
        el.addEventListener('mouseleave', function(){ el.style.transform=''; });
      });
    }
  }
  if(document.readyState!=='loading') go(); else document.addEventListener('DOMContentLoaded', go);
})();
