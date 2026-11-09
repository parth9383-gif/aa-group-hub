(function(){
  "use strict";

  /* theme toggle (light default) */
  var themeToggle = document.querySelector('.theme-toggle');
  function applyTheme(t){
    document.documentElement.setAttribute('data-theme', t);
    if (themeToggle) themeToggle.innerHTML = (t === 'dark')
      ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="4.9" y1="19.1" x2="7" y2="17"/><line x1="17" y1="7" x2="19.1" y2="4.9"/></svg>'
      : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
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
  var canFx = false; /* de-AI: no cursor glow / magnetic / particles */
  var canTilt = finePointer && !reducedMotion; /* premium: subtle 3D tilt on cards only */

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

  /* 3D tilt on cards/pillars (premium, subtle — the "3D motion" story) */
  if (canTilt){
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

  /* hero headline: no per-word stagger (de-AI — editorial, static display) */
  if (!reducedMotion){
    document.querySelectorAll('.hero h1').forEach(function(h){ h.classList.add('in'); });
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

/* ==== turn-79: ambient aurora + cursor glow ==== */
(function(){
  function go(){
    var amb=document.createElement('div'); amb.className='ambient'; amb.setAttribute('aria-hidden','true');
    document.body.insertBefore(amb, document.body.firstChild);
    var fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(fine && !reduced && !document.querySelector('.cursor-glow')){
      var glow=document.createElement('div'); glow.className='cursor-glow'; glow.setAttribute('aria-hidden','true');
      document.body.appendChild(glow);
      var mx=innerWidth/2,my=innerHeight/3,tx=mx,ty=my;
      document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; document.body.classList.add('glow-on'); }, {passive:true});
      (function loop(){ tx+=(mx-tx)*.12; ty+=(my-ty)*.12; glow.style.transform='translate3d('+(tx-260)+'px,'+(ty-260)+'px,0)'; requestAnimationFrame(loop); })();
    }
  }
  if(document.readyState!=='loading') go(); else document.addEventListener('DOMContentLoaded', go);
})();

/* ============ turn-82 ALIVE — pointer light · tactile · scroll-as-dial ============ */
(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var root = document.documentElement;

    /* 1. pointer-reactive spotlight on cards */
    var cards = document.querySelectorAll('.card, .div-card, .pillar, .person, .gitem, .step, .split .media, .rel-card, .tile');
    for (var i = 0; i < cards.length; i++){
      (function(c, idx){
        if (c.classList.contains('alive')) return;
        c.classList.add('alive');
        c.style.setProperty('--i', idx % 8);
        if (fine && !reduced){
          var spot = document.createElement('span');
          spot.className = 'alive-spot';
          spot.setAttribute('aria-hidden', 'true');
          c.insertBefore(spot, c.firstChild);
          c.addEventListener('pointermove', function(e){
            var r = c.getBoundingClientRect();
            c.style.setProperty('--x', (e.clientX - r.left) + 'px');
            c.style.setProperty('--y', (e.clientY - r.top) + 'px');
          }, {passive:true});
        }
      })(cards[i], i);
    }

    if (fine && !reduced){
      /* 2. aurora follows pointer with lag (idle life) */
      var amb = document.querySelector('.ambient');
      var mx = innerWidth/2, my = innerHeight/3;
      window.addEventListener('pointermove', function(e){ mx = e.clientX; my = e.clientY; }, {passive:true});
      (function ambLoop(){
        if (amb){
          amb.style.setProperty('--ax', ((mx - innerWidth/2) * 0.04).toFixed(1) + 'px');
          amb.style.setProperty('--ay', ((my - innerHeight/2) * 0.04).toFixed(1) + 'px');
        }
        root.style.setProperty('--mx', mx + 'px');
        root.style.setProperty('--my', my + 'px');
        requestAnimationFrame(ambLoop);
      })();

      /* 3. tactile (magnetic + press) buttons */
      var btns = document.querySelectorAll('.btn, .nav-cta, .chip, .phone-btn');
      for (var b = 0; b < btns.length; b++){
        (function(btn){
          if (btn.classList.contains('theme-toggle') || btn.classList.contains('nav-toggle') || btn.classList.contains('alive-btn')) return;
          btn.classList.add('alive-btn');
          btn.addEventListener('pointermove', function(e){
            var r = btn.getBoundingClientRect();
            btn.style.setProperty('--mx', ((e.clientX - r.left - r.width/2) * 0.28).toFixed(1) + 'px');
            btn.style.setProperty('--my', ((e.clientY - r.top - r.height/2) * 0.28).toFixed(1) + 'px');
            btn.style.transform = 'translate3d(var(--mx,0), var(--my,0), 0)';
          }, {passive:true});
          btn.addEventListener('pointerdown', function(){ btn.classList.add('pressed'); });
          btn.addEventListener('pointerup', function(){ btn.classList.remove('pressed'); });
          btn.addEventListener('pointerleave', function(){ btn.classList.remove('pressed'); btn.style.transform = ''; });
        })(btns[b]);
      }
    }

    /* 4. scroll parallax on hero media (scroll = dial) */
    if (!reduced){
      var layers = document.querySelectorAll('.hero__bg img, .hero-visual img, .hero-media img, .split .media img');
      var ticking = false;
      function parallax(){
        var y = window.scrollY;
        if (y <= innerHeight * 1.3){
          for (var k = 0; k < layers.length; k++){
            var el = layers[k];
            var sp = el.closest('.hero__bg') ? 0.22 : 0.14;
            el.style.transform = 'translate3d(0,' + (y * sp).toFixed(1) + 'px,0)';
          }
        }
        ticking = false;
      }
      window.addEventListener('scroll', function(){
        if (ticking) return; ticking = true;
        requestAnimationFrame(parallax);
      }, {passive:true});
    }

    /* 5. live ECG sweep (cardio) */
    var ecg = document.querySelector('.ecg path');
    if (ecg && !reduced){
      ecg.style.animation = 'ecglive 4s linear infinite';
      ecg.style.strokeDasharray = '1200';
    }
  });
})();

/* ==== turn-82: reveal fail-safe (content is never left hidden) ==== */
(function(){
  function revealAll(){
    var els = document.querySelectorAll('[data-reveal]');
    for (var i=0;i<els.length;i++){ els[i].classList.add('is-in'); els[i].classList.add('in'); }
  }
  if (document.readyState !== 'loading') setTimeout(revealAll, 2600);
  else document.addEventListener('DOMContentLoaded', function(){ setTimeout(revealAll, 2600); });
})();
