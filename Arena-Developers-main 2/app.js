/* ============================================================
   NEXUS AGENCY — JAVASCRIPT
   ============================================================ */

/* ---- THEME ---- */
var isDark = false;
function toggleTheme() {
  isDark = !isDark;
  document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  document.getElementById('tbtn').textContent = isDark ? '☀️' : '🌙';
}

/* ---- NAVIGATION ---- */
function go(p) {
  document.querySelectorAll('.pg').forEach(function(el) { el.classList.remove('on'); });
  document.querySelectorAll('.nl a').forEach(function(a) { a.classList.remove('on'); });
  document.getElementById('pg-' + p).classList.add('on');
  var nl = document.getElementById('nl-' + p);
  if (nl) nl.classList.add('on');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(triggerReveal, 100);
  animateBars();
}

function toggleMob() {
  document.getElementById('mobMenu').classList.toggle('open');
}

/* ---- PORTFOLIO FILTER ---- */
function filterPF(cat, btn) {
  document.querySelectorAll('.pfb').forEach(function(b) { b.classList.remove('on'); });
  btn.classList.add('on');
  var items = document.querySelectorAll('.pi');
  var i = 0;
  items.forEach(function(item) {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px) scale(.96)';
      var delay = i * 80; i++;
      setTimeout(function(el) {
        el.style.transition = 'all .5s cubic-bezier(.22,1,.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      }.bind(null, item), delay);
    } else {
      item.style.transition = 'all .3s';
      item.style.opacity = '0';
      item.style.transform = 'scale(.9)';
      setTimeout(function(el) { el.style.display = 'none'; }.bind(null, item), 300);
    }
  });
}

/* ---- FORM VALIDATION ---- */
function chk(id, eid, msg, extra) {
  var el = document.getElementById(id);
  var er = document.getElementById(eid);
  if (!el || !er) return true;
  if (!el.value.trim() || (extra && !extra(el.value))) {
    el.classList.add('err');
    er.textContent = msg;
    el.style.animation = 'none';
    setTimeout(function() { el.style.animation = 'shake .4s ease'; });
    return false;
  }
  el.classList.remove('err');
  er.textContent = '';
  return true;
}

function submitForm() {
  var ok = true;
  ok = chk('fn', 'fn-e', 'First name is required') && ok;
  ok = chk('ln', 'ln-e', 'Last name is required') && ok;
  ok = chk('em', 'em-e', 'Please enter a valid email address', function(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }) && ok;
  ok = chk('msg', 'msg-e', 'Please describe your project') && ok;
  if (!ok) return;
  document.getElementById('cForm').style.display = 'none';
  document.getElementById('fSuccess').classList.add('show');
}

/* ---- SCROLL PROGRESS BAR ---- */
function updateScrollProg() {
  var el = document.getElementById('scrollProg');
  if (!el) return;
  var h = document.documentElement.scrollHeight - window.innerHeight;
  var pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
  el.style.width = pct + '%';
}
window.addEventListener('scroll', updateScrollProg);

/* ---- SCROLL REVEAL ---- */
function triggerReveal() {
  document.querySelectorAll('.reveal').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      el.classList.add('vis');
    }
  });
}
window.addEventListener('scroll', triggerReveal);
setTimeout(triggerReveal, 200);

/* ---- HERO BARS ANIMATION ---- */
function animateBars() {
  var bars = document.querySelectorAll('#heroChart .cbar');
  if (!bars.length) return;
  var heights = ['38%', '62%', '75%', '50%', '88%', '68%', '100%'];
  bars.forEach(function(b, i) {
    b.style.height = '0%';
    setTimeout(function() {
      b.style.height = heights[i] || '60%';
    }, i * 120 + 400);
  });
}
setTimeout(animateBars, 300);

/* ---- CANVAS PARTICLE SYSTEM ---- */
(function() {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var pts = [];
  var colors = ['#7C3AED', '#F43F5E', '#06B6D4', '#10B981', '#F59E0B', '#F97316', '#6D28D9', '#E11D48'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
  }
  resize();
  window.addEventListener('resize', resize);

  for (var i = 0; i < 80; i++) {
    pts.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight * 3,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.35,
      color: colors[i % colors.length],
      alpha: Math.random() * 0.4 + 0.1,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pts.forEach(function(p) {
      p.wobble += p.wobbleSpeed;
      var wx = Math.sin(p.wobble) * 0.8;
      var wy = Math.cos(p.wobble * 0.7) * 0.6;
      ctx.beginPath();
      ctx.arc(p.x + wx, p.y + wy, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();
})();

/* ---- CURSOR TRAILS ---- */
(function() {
  var colors = ['#7C3AED', '#F43F5E', '#06B6D4', '#10B981', '#F59E0B', '#F97316'];
  var mx = 0, my = 0;
  document.addEventListener('mousemove', function(e) { mx = e.clientX; my = e.clientY; });

  function spawnTrail() {
    var el = document.createElement('div');
    var c = colors[Math.floor(Math.random() * colors.length)];
    el.style.cssText = [
      'position:fixed',
      'width:8px', 'height:8px',
      'border-radius:50%',
      'pointer-events:none',
      'z-index:9999',
      'transform:translate(-50%,-50%)',
      'background:' + c,
      'left:' + mx + 'px',
      'top:' + my + 'px',
      'opacity:.8',
      'transition:opacity .6s,transform .6s'
    ].join(';');
    document.body.appendChild(el);
    setTimeout(function() {
      el.style.opacity = '0';
      el.style.transform = 'translate(-50%,-50%) scale(0)';
    }, 50);
    setTimeout(function() {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 700);
  }
  setInterval(spawnTrail, 60);
})();

/* ---- RIPPLE EFFECT ON BUTTON CLICKS ---- */
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn');
  if (!btn) return;
  var rect = btn.getBoundingClientRect();
  var rip = document.createElement('span');
  var size = Math.max(rect.width, rect.height) * 2;
  rip.style.cssText = [
    'position:absolute',
    'width:' + size + 'px',
    'height:' + size + 'px',
    'border-radius:50%',
    'background:rgba(255,255,255,.35)',
    'transform:scale(0)',
    'animation:ripple .6s ease-out',
    'left:' + (e.clientX - rect.left - size / 2) + 'px',
    'top:' + (e.clientY - rect.top - size / 2) + 'px',
    'pointer-events:none'
  ].join(';');
  btn.appendChild(rip);
  setTimeout(function() {
    if (rip.parentNode) rip.parentNode.removeChild(rip);
  }, 700);
});

/* ---- FLOATING BUBBLES IN HERO ---- */
(function() {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var cols = ['#7C3AED', '#F43F5E', '#06B6D4', '#10B981', '#F59E0B'];

  function spawnBubble() {
    var b = document.createElement('div');
    var size = Math.random() * 12 + 4;
    var col = cols[Math.floor(Math.random() * cols.length)];
    var dur = (Math.random() * 3 + 3).toFixed(1);
    b.style.cssText = [
      'position:absolute',
      'width:' + size + 'px',
      'height:' + size + 'px',
      'border-radius:50%',
      'background:' + col,
      'left:' + (Math.random() * 100) + '%',
      'bottom:0',
      'opacity:0',
      'pointer-events:none',
      'animation:floatBubble ' + dur + 's ease-in-out forwards',
      'z-index:0'
    ].join(';');
    hero.appendChild(b);
    setTimeout(function() {
      if (b.parentNode) b.parentNode.removeChild(b);
    }, parseFloat(dur) * 1000 + 200);
  }
  setInterval(spawnBubble, 600);
})();

/* ---- NAV SCROLL SHADOW ---- */
window.addEventListener('scroll', function() {
  var nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.boxShadow = window.scrollY > 50
    ? '0 8px 40px rgba(124,58,237,.12)'
    : 'none';
});
