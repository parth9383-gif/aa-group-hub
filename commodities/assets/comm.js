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

/* ============ turn-84 ALIVE2 — premium cursor · scroll-as-dial · clip-reveal ============ */
(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var root = document.documentElement;

    /* 1. pointer-reactive spotlight on cards */
    var cards = document.querySelectorAll('.card, .div-card, .pillar, .person, .gitem, .step, .split .media, .rel-card, .tile');
    for (var i = 0; i < cards.length; i++){
      (function(c){
        if (c.classList.contains('alive')) return;
        c.classList.add('alive');
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
      })(cards[i]);
    }

    /* 2. premium cursor — dot + trailing ring, lerp-follow (no jitter) */
    var cur = null, ring = null, tx = -100, ty = -100, cx = -100, cy = -100, rx = -100, ry = -100, shown = false;
    function curShow(){ if (cur && shown){ cur.style.opacity = '1'; ring.style.opacity = '1'; } }
    function curHide(){ if (cur){ cur.style.opacity = '0'; ring.style.opacity = '0'; } }
    if (fine && !reduced){
      cur = document.createElement('div'); cur.className = 'aa-cursor';
      ring = document.createElement('div'); ring.className = 'aa-cursor-ring';
      document.body.appendChild(ring); document.body.appendChild(cur); /* dot paints on top of ring's fill */
      root.classList.add('aa-cur');

      window.addEventListener('pointermove', function(e){
        tx = e.clientX; ty = e.clientY;
        if (!shown){ shown = true; cur.style.opacity = '1'; ring.style.opacity = '1'; }
      }, {passive:true});
      document.addEventListener('mouseleave', curHide);
      document.addEventListener('mouseenter', curShow);

      document.addEventListener('pointerover', function(e){
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest('input, textarea, select, [contenteditable="true"]')){ curHide(); return; }
        curShow();
        var media = t.closest('.alive, .split .media, .hero-visual, .gitem, .card, .tile, .rel-card, .person');
        var link = t.closest('a, button, .btn, [role="button"], label, .chip, .nav-cta');
        ring.classList.toggle('is-media', !!media); cur.classList.toggle('is-media', !!media);
        ring.classList.toggle('is-link', !!link);   cur.classList.toggle('is-link', !!link);
      });
      document.addEventListener('pointerout', function(e){
        var from = e.target, to = e.relatedTarget;
        if (to && from && from.contains(to)) return; /* still inside same element */
        ring.classList.remove('is-media'); cur.classList.remove('is-media');
        ring.classList.remove('is-link');   cur.classList.remove('is-link');
        curShow();
      });

      (function loop(){
        cx += (tx - cx) * 0.42;
        cy += (ty - cy) * 0.42;
        rx += (tx - rx) * 0.16;
        ry += (ty - ry) * 0.16;
        cur.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
        ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
        requestAnimationFrame(loop);
      })();
    }

    /* 3. ambient aurora drifts toward cursor (individual translate/rotate) */
    var amb = document.querySelector('.ambient');
    if (fine && !reduced && amb){
      var mx = innerWidth / 2, my = innerHeight / 3;
      window.addEventListener('pointermove', function(e){ mx = e.clientX; my = e.clientY; }, {passive:true});
      (function ambLoop(){
        amb.style.setProperty('--ax', ((mx - innerWidth / 2) * 0.05).toFixed(1) + 'px');
        amb.style.setProperty('--ay', ((my - innerHeight / 2) * 0.05).toFixed(1) + 'px');
        amb.style.setProperty('--ar', ((mx - innerWidth / 2) * 0.008).toFixed(2) + 'deg');
        requestAnimationFrame(ambLoop);
      })();
    }

    /* 4. tactile (magnetic + press) buttons */
    if (fine && !reduced){
      var btns = document.querySelectorAll('.btn, .nav-cta, .chip, .phone-btn');
      for (var b = 0; b < btns.length; b++){
        (function(btn){
          if (btn.classList.contains('theme-toggle') || btn.classList.contains('nav-toggle') || btn.classList.contains('alive-btn')) return;
          btn.classList.add('alive-btn');
          btn.addEventListener('pointermove', function(e){
            var r = btn.getBoundingClientRect();
            btn.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.3).toFixed(1) + 'px');
            btn.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px');
            btn.style.transform = 'translate3d(var(--mx,0), var(--my,0), 0)';
          }, {passive:true});
          btn.addEventListener('pointerdown', function(){ btn.classList.add('pressed'); });
          btn.addEventListener('pointerup', function(){ btn.classList.remove('pressed'); });
          btn.addEventListener('pointerleave', function(){ btn.classList.remove('pressed'); btn.style.transform = ''; });
        })(btns[b]);
      }
    }

    /* 5. scroll-as-dial: multi-layer parallax + subtle rotation.
          Uses individual `translate`/`rotate` so it composes with reveal/heroPhoto
          instead of being overridden. Honors [data-speed] / [data-rotate]. */
    if (!reduced){
      var layers = [];
      var defs = [
        ['.hero__bg img', 0.22, 0],
        ['.hero-visual img', 0.14, -0.004],
        ['.hero-media img', 0.14, -0.003],
        ['.split .media img', 0.14, -0.003]
      ];
      for (var d = 0; d < defs.length; d++){
        var els = document.querySelectorAll(defs[d][0]);
        for (var e2 = 0; e2 < els.length; e2++){
          var el = els[e2];
          var speed = el.getAttribute('data-speed') ? parseFloat(el.getAttribute('data-speed')) : defs[d][1];
          var rot = el.getAttribute('data-rotate') ? parseFloat(el.getAttribute('data-rotate')) : defs[d][2];
          layers.push({ el: el, speed: speed, rot: rot });
        }
      }
      var extra = document.querySelectorAll('[data-speed], [data-rotate]');
      for (var x = 0; x < extra.length; x++){
        var seen = false;
        for (var s = 0; s < layers.length; s++){ if (layers[s].el === extra[x]){ seen = true; break; } }
        if (seen) continue;
        layers.push({
          el: extra[x],
          speed: parseFloat(extra[x].getAttribute('data-speed') || '0'),
          rot: parseFloat(extra[x].getAttribute('data-rotate') || '0')
        });
      }
      var tick = false;
      function onScroll(){
        var y = window.scrollY;
        var limit = innerHeight * 1.6;
        for (var k = 0; k < layers.length; k++){
          var L = layers[k];
          if (y <= limit){
            L.el.style.setProperty('translate', '0 ' + (y * L.speed).toFixed(1) + 'px');
            if (L.rot) L.el.style.setProperty('rotate', (y * L.rot).toFixed(2) + 'deg');
          }
        }
        tick = false;
      }
      window.addEventListener('scroll', function(){ if (tick) return; tick = true; requestAnimationFrame(onScroll); }, {passive:true});
      onScroll();
    }

    /* 6. clip-path image unmask (reveals when scrolled into view) */
    if (!reduced){
      var clipEls = document.querySelectorAll('.hero-visual img, .hero-media img, .split .media img, .card .ph img, .gitem img, .person__img img, .div-card img');
      var added = [];
      for (var c2 = 0; c2 < clipEls.length; c2++){
        var im = clipEls[c2];
        if (im.classList.contains('aa-clip')) continue;
        im.classList.add('aa-clip');
        added.push(im);
      }
      if (added.length && 'IntersectionObserver' in window){
        var io = new IntersectionObserver(function(entries){
          for (var z = 0; z < entries.length; z++){
            if (entries[z].isIntersecting){ entries[z].target.classList.add('is-in'); io.unobserve(entries[z].target); }
          }
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
        for (var c3 = 0; c3 < added.length; c3++){ io.observe(added[c3]); }
        /* fail-safe: never leave an in-viewport image masked */
        setTimeout(function(){
          for (var c4 = 0; c4 < added.length; c4++){
            var el = added[c4];
            if (el.classList.contains('is-in')) continue;
            var r = el.getBoundingClientRect();
            if (r.top < innerHeight && r.bottom > 0) el.classList.add('is-in');
          }
        }, 2800);
      } else {
        for (var c5 = 0; c5 < added.length; c5++){ added[c5].classList.add('is-in'); }
      }
    }

    /* 7. live ECG sweep (cardio) */
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
