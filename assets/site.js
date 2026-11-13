/* AA Group — shared site behaviour */
(function(){
  var SPRITE = '<svg width="0" height="0" style="position:absolute" aria-hidden="true" id="aa-sprite">' +
    '<symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></symbol>' +
    '<symbol id="i-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>' +
    '<symbol id="i-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></symbol>' +
    '<symbol id="i-facebook" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>' +
    '<symbol id="i-instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></symbol>' +
    '<symbol id="i-youtube" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></symbol>' +
    '<symbol id="i-tiktok" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.5 14.1c-.2.7-1.2 1.3-1.9 1.4-.5.1-1.2.2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .5l-.4.6c-.1.2-.3.4-.1.6.2.3.8 1.4 1.8 2.2 1.3 1.1 2.3 1.4 2.6 1.6.3.1.5.1.7-.1l.9-1c.2-.3.4-.2.6-.1.2.1 1.4.7 1.6.8.2.1.4.1.5.2 0 .1 0 .7-.2 1.2z"/></symbol>' +
  '</svg>';

  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function(){
    var host = document.createElement('div');
    host.innerHTML = SPRITE;
    document.body.insertBefore(host.firstChild, document.body.firstChild);

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
    var headerCta = document.querySelector('.header__cta');
    var navToggleBtn = document.querySelector('.nav-toggle');
    if (navToggleBtn && navToggleBtn.parentNode){
      var controls = document.createElement('div');
      controls.className = 'header__controls';
      navToggleBtn.parentNode.insertBefore(controls, navToggleBtn);
      controls.appendChild(themeBtn);
      controls.appendChild(navToggleBtn);
    } else if (headerCta && headerCta.parentNode){
      headerCta.parentNode.insertBefore(themeBtn, headerCta);
    }

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* scroll progress + header state */
    var progress = document.querySelector('.progress');
    var header = document.querySelector('.header');
    function onScroll(){
      var y = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if(progress && h > 0){ progress.style.setProperty('--p', (y/h).toFixed(3)); }
      if(header){ header.classList.toggle('is-scrolled', y > 24); }
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    /* reveal */
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
    Array.prototype.forEach.call(document.querySelectorAll('[data-reveal]'), function(el){ io.observe(el); });

    /* count-up */
    function countUp(el){
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1400, t0 = null;
      function frame(t){
        if(!t0) t0 = t;
        var p = Math.min((t - t0)/dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
        el.textContent = val.toLocaleString('en-CA') + (p === 1 ? suffix : '');
        if(p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }
    var cio = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } });
    }, {threshold:.5});
    Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function(el){ cio.observe(el); });

    /* mobile nav */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if(toggle && nav){
      toggle.addEventListener('click', function(){
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      nav.addEventListener('click', function(e){ if(e.target.tagName === 'A'){ nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded','false'); } });
    }

    /* gallery filter + lightbox (only when present) */
    var gfilters = document.querySelectorAll('.gfilter');
    var gitems = document.querySelectorAll('.gitem');
    if(gfilters.length && gitems.length){
      Array.prototype.forEach.call(gfilters, function(f){
        f.addEventListener('click', function(){
          Array.prototype.forEach.call(gfilters, function(x){ x.classList.remove('is-active'); });
          f.classList.add('is-active');
          var yr = f.getAttribute('data-year');
          Array.prototype.forEach.call(gitems, function(g){
            g.hidden = (yr !== 'all' && g.getAttribute('data-year') !== yr);
          });
        });
      });
      var lb = document.querySelector('.lightbox');
      if(lb){
        var lbImg = lb.querySelector('img');
        var lbClose = lb.querySelector('.lightbox__close');
        Array.prototype.forEach.call(gitems, function(g){
          g.addEventListener('click', function(){
            var img = g.querySelector('img');
            if(img){ lbImg.src = img.src; lbImg.alt = img.alt || ''; lb.classList.add('is-open'); document.body.style.overflow='hidden'; }
          });
        });
        function closeLb(){ lb.classList.remove('is-open'); document.body.style.overflow=''; }
        lbClose.addEventListener('click', closeLb);
        lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
        document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });
      }
    }
  });
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
    }
  }
  if(document.readyState!=='loading') go(); else document.addEventListener('DOMContentLoaded', go);
})();

/* ============ turn-85 ALIVE2.1 — distinct per-element animation · 3D tilt/depth/hero · gold-dust particles ============ */
(function(){
  function ready(fn){ if(document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var root = document.documentElement;

    /* ============================================================
       1 · DISTINCT REVEAL FLAVOURS — every animated element gets its own
           move (fade / up / left / right / zoom / flip / rotate / blur)
       ============================================================ */
    var flipToggle = false;
    var reveals = document.querySelectorAll('[data-reveal]');
    for (var ri = 0; ri < reveals.length; ri++){
      (function(el){
        if (el.classList.contains('aa-rv')) return;
        el.classList.add('aa-rv');
        var dr = el.getAttribute('data-reveal');
        var f;
        if (dr === 'left') f = 'rv-left';
        else if (dr === 'right') f = 'rv-right';
        else if (dr === 'scale') f = 'rv-zoom';
        else if (el.matches('.eyebrow')) f = 'rv-fade';
        else if (el.matches('h1,h2,h3,.section__title')) f = 'rv-blur';
        else if (el.matches('.founder__portrait,.portrait-stage,.book-hero,.split .media,.hero-visual,.hero-media,.gitem,.person__img,.div-card img')) f = 'rv-zoom';
        else if (el.closest('.stat-grid')) f = 'rv-zoom';
        else if (el.matches('.card,.div-card,.person,.pillar,.step,.rel-card,.tile,.std__pillar,.vg-card')) { f = flipToggle ? 'rv-rotate' : 'rv-flip'; flipToggle = !flipToggle; }
        else if (el.matches('.std__intro')) f = 'rv-left';
        else f = 'rv-up';
        el.classList.add(f);
      })(reveals[ri]);
    }

    /* ============================================================
       2 · POINTER SPOTLIGHT on cards (uses injected --alive-spot)
       ============================================================ */
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

    /* ============================================================
       3 · PREMIUM CURSOR — gold dot + trailing ring (lerp, no jitter)
       ============================================================ */
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
        if (to && from && from.contains(to)) return;
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

    /* ============================================================
       4 · AMBIENT AURORA drifts toward cursor (individual translate/rotate)
       ============================================================ */
    var amb = document.querySelector('.ambient');
    if (fine && !reduced && amb){
      var amx = innerWidth / 2, amy = innerHeight / 3;
      window.addEventListener('pointermove', function(e){ amx = e.clientX; amy = e.clientY; }, {passive:true});
      (function ambLoop(){
        amb.style.setProperty('--ax', ((amx - innerWidth / 2) * 0.05).toFixed(1) + 'px');
        amb.style.setProperty('--ay', ((amy - innerHeight / 2) * 0.05).toFixed(1) + 'px');
        amb.style.setProperty('--ar', ((amx - innerWidth / 2) * 0.008).toFixed(2) + 'deg');
        requestAnimationFrame(ambLoop);
      })();
    }

    /* ============================================================
       5 · TACTILE BUTTONS (magnetic + press)
       ============================================================ */
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

    /* ============================================================
       6 · 3D HOVER TILT + pointer-tracking glare  (replaces flat turn-79 tilt)
       ============================================================ */
    if (fine && !reduced){
      var tiltSel = '.card, .div-card, .person, .gitem, .pillar, .step, .split .media, .tile, .rel-card, .portrait-wrap, .founder__portrait';
      var tilts = document.querySelectorAll(tiltSel);
      for (var t = 0; t < tilts.length; t++){
        (function(el){
          if (el.classList.contains('tilt-3d')) return;
          el.classList.add('tilt-3d');
          var glare = document.createElement('span');
          glare.className = 'tilt-glare';
          glare.setAttribute('aria-hidden', 'true');
          el.appendChild(glare);
          el.addEventListener('pointermove', function(e){
            var r = el.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width - .5;
            var y = (e.clientY - r.top) / r.height - .5;
            el.style.setProperty('--gx', (e.clientX - r.left) + 'px');
            el.style.setProperty('--gy', (e.clientY - r.top) + 'px');
            el.style.transform = 'perspective(1000px) rotateX(' + (y * -10).toFixed(2) + 'deg) rotateY(' + (x * 10).toFixed(2) + 'deg) translateY(-3px) scale(1.01)';
          }, {passive:true});
          el.addEventListener('pointerleave', function(){ el.style.transform = ''; });
        })(tilts[t]);
      }
    }

    /* ============================================================
       7 · HERO / TEXT 3D — subtle pointer parallax on headlines
       ============================================================ */
    if (fine && !reduced){
      var titles = document.querySelectorAll('.hero h1, .page-hero h1');
      for (var h = 0; h < titles.length; h++){
        (function(title){
          var hx = 0, hy = 0, cx2 = 0, cy2 = 0;
          window.addEventListener('pointermove', function(e){
            cx2 = (e.clientX / innerWidth - .5);
            cy2 = (e.clientY / innerHeight - .5);
          }, {passive:true});
          (function titleLoop(){
            hx += (cy2 * -3.5 - hx) * 0.06;
            hy += (cx2 * 3.5 - hy) * 0.06;
            title.style.transform = 'perspective(900px) rotateX(' + hx.toFixed(3) + 'deg) rotateY(' + hy.toFixed(3) + 'deg)';
            requestAnimationFrame(titleLoop);
          })();
        })(titles[h]);
      }
    }

    /* ============================================================
       8 · SCROLL-AS-DIAL — multi-layer parallax + subtle rotation
           (individual translate/rotate = composes with reveal)
       ============================================================ */
    if (!reduced){
      var layers = [];
      var defs = [
        ['.mono-panel', 0.14, 0],           /* hub ghost "A" */
        ['.book-hero', 0.05, 0],            /* hub book cover */
        ['.hero-visual img', 0.14, -0.004], /* cardio hero */
        ['.hero-media img', 0.14, -0.003],  /* investment/commodities */
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
        layers.push({ el: extra[x], speed: parseFloat(extra[x].getAttribute('data-speed') || '0'), rot: parseFloat(extra[x].getAttribute('data-rotate') || '0') });
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

    /* ============================================================
       9 · CLIP-PATH IMAGE UNMASK (reveals when scrolled into view)
       ============================================================ */
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

    /* ============================================================
       10 · LIVE ECG SWEEP (cardio)
       ============================================================ */
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
