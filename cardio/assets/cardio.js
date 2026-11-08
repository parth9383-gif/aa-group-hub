(function(){
  "use strict";

  /* theme toggle (light default) */
  var themeToggle = document.querySelector('.theme-toggle');
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    if (themeToggle) themeToggle.textContent = (t === 'dark') ? '☀' : '☾';
    try { localStorage.setItem('aa-theme', t); } catch(e){}
  }
  var saved = null;
  try { saved = localStorage.getItem('aa-theme'); } catch(e){}
  applyTheme(saved || 'light');
  if (themeToggle){
    themeToggle.addEventListener('click', function(){
      var cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

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

  /* ================= WOW effects (desktop-first, reduced-motion aware) ================= */
  var finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canFx = finePointer && !reducedMotion;

  /* scroll progress bar */
  var prog = document.createElement('div');
  prog.className = 'progress';
  document.body.appendChild(prog);
  window.addEventListener('scroll', function(){
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max * 100) : 0) + '%';
  }, {passive:true});

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

  /* 3D tilt on cards/pillars */
  if (canFx){
    document.querySelectorAll('.card, .pillar').forEach(function(card){
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

  /* hero headline word-by-word stagger */
  function splitHeading(h){
    var label = h.textContent.trim();
    var src = Array.from(h.childNodes);
    var idx = 0;
    var frag = document.createDocumentFragment();
    src.forEach(function(node){
      if (node.nodeType === 3){
        node.textContent.split(/\s+/).filter(Boolean).forEach(function(w){
          var s = document.createElement('span');
          s.className = 'w';
          s.style.transitionDelay = (idx++ * 85) + 'ms';
          s.textContent = w;
          frag.appendChild(s);
          frag.appendChild(document.createTextNode(' '));
        });
      } else if (node.nodeType === 1){
        var s = document.createElement('span');
        s.className = 'w';
        s.style.transitionDelay = (idx++ * 85) + 'ms';
        s.appendChild(node);
        frag.appendChild(s);
        frag.appendChild(document.createTextNode(' '));
      }
    });
    h.textContent = '';
    h.appendChild(frag);
    h.setAttribute('aria-label', label);
    requestAnimationFrame(function(){ requestAnimationFrame(function(){ h.classList.add('in'); }); });
  }
  if (!reducedMotion){
    document.querySelectorAll('.hero h1').forEach(splitHeading);
  }

  /* floating teal particles */
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
        ctx.fillStyle = 'rgba(30,116,112,' + (p.a * 0.12) + ')';
        ctx.fill();
      }
      requestAnimationFrame(drawParts);
    })();
  }
})();
