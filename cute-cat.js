/*!
 * cute-cat.js — a tiny pixel cat that follows your cursor around the page.
 * She runs after the pointer, sits and blinks when she catches it,
 * and curls up for a nap if you stay still.
 *
 * Usage: add one line before </body>:
 *   <script src="cute-cat.js"></script>
 *
 * Optional settings (attributes on that script tag):
 *   data-fur="#FFFFFF"    fur color
 *   data-spot="#8E8A8C"   patch color
 *   data-pixel="2"        size of one pixel in px (1–4)
 *   data-speed="3"        running speed in px per frame
 *   data-manual           don't start automatically
 *
 * From your own code:
 *   CuteCat.start({ fur: '#FFFFFF', spot: '#8E8A8C', pixel: 2, speed: 3 })
 *   CuteCat.stop()
 */
(function () {
  var MAPS = {
    sit: ['................','..k........k....','.kgk......kwk...','.kggkkkkkkwwk...','.kgggggwwwwwk...','kggggwwwwwwwwk..','kwwkwwwwwwkwwk..','kwwkwwwwwwkwwk..','kppwwwwwwwwppk..','.kwwwwppwwwwk...','..kwwwwwwwwk....','...kkwwwwkk.....','..kwwwwwwwwk.kk.','.kwwggggwwwwkkgk','.kwwgggwwwwwkgk.','.kwkwwwwkwwwkk..','..kkkkkkkkkkk...'],
    blink: ['................','..k........k....','.kgk......kwk...','.kggkkkkkkwwk...','.kgggggwwwwwk...','kggggwwwwwwwwk..','kwwwwwwwwwwwwk..','kwkkwwwwwwkkwk..','kppwwwwwwwwppk..','.kwwwwppwwwwk...','..kwwwwwwwwk....','...kkwwwwkk.....','..kwwwwwwwwk.kk.','.kwwggggwwwwkkgk','.kwwgggwwwwwkgk.','.kwkwwwwkwwwkk..','..kkkkkkkkkkk...'],
    runA: ['..........k...k..','.........kgk.kwk.','.........kggkwwk.','.k......kgggwwwwk','kgk.....kggwwkwwk','kgk.kkkkkwwwwkwwk','.kgkwwggwwwwwwwpk','..kwwgggwwkppwwk.','..kwwwggwwwkkkk..','..kwwwwwwwwk.....','.kwkkkkkkwwk.....','kwk......kwwk....','kk.........kk....'],
    runB: ['..........k...k..','.........kgk.kwk.','.........kggkwwk.','........kgggwwwwk','.k......kggwwkwwk','kgk.kkkkkwwwwkwwk','kgkkwwggwwwwwwwpk','.kkwwgggwwkppwwk.','..kwwwggwwwkkkk..','..kwwwwwwwwk.....','..kwkwkkkwkwk....','..kwkwk.kwkwk....','..kkkkk.kkkkk....'],
    sleep: ['.......kkkkk....','.....kkwgggwkk..','.k.kkwwwggggwwk.','kgkgkwwwwggwwwwk','kgggkwwwwwwwwwwk','kwkkwkwwwwwwwwwk','kwwwpkwwwwwwwwwk','.kkkkkwwkkkkgggk','.....kkkkkkkkkk.']
  };
  var Z = 'M0 0h4v1h-4z M2 1h1v1h-1z M1 2h1v1h-1z M0 3h4v1h-4z';
  var HEART = 'M1 0h2v1h-2z M4 0h2v1h-2z M0 1h7v2h-7z M1 3h5v1h-5z M2 4h3v1h-3z M3 5h1v1h-1z';
  var script = document.currentScript;
  var running = null;

  function toPaths(rows) {
    var out = { k: '', w: '', g: '', p: '' };
    rows.forEach(function (row, y) {
      var x = 0;
      while (x < row.length) {
        var c = row[x], n = 1;
        while (x + n < row.length && row[x + n] === c) n++;
        if (out[c] !== undefined) out[c] += 'M' + x + ' ' + y + 'h' + n + 'v1h-' + n + 'z';
        x += n;
      }
    });
    out.w0 = rows[0].length; out.h0 = rows.length;
    return out;
  }

  function start(opts) {
    if (running) return running;
    opts = opts || {};
    var fur = opts.fur || '#FFFFFF';
    var spot = opts.spot || '#8E8A8C';
    var px = opts.pixel || 2;
    var speed = opts.speed || 3;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) speed = Math.min(speed, 2);

    var frames = {};
    Object.keys(MAPS).forEach(function (k) { frames[k] = toPaths(MAPS[k]); });

    var css = document.createElement('style');
    css.textContent =
      '@keyframes cc-z{0%{transform:translate(0,0);opacity:0}20%{opacity:1}100%{transform:translate(8px,-18px);opacity:0}}' +
      '@keyframes cc-h{0%{transform:translateY(4px);opacity:0}30%{transform:translateY(0);opacity:1}80%{opacity:1}100%{transform:translateY(-6px);opacity:0}}' +
      '.cc-layer{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483647}' +
      '.cc-cat svg,.cc-fx svg{display:block}' +
      '.cc-z1{position:absolute;left:0;top:0;animation:cc-z 2s steps(8) infinite}' +
      '.cc-z2{position:absolute;left:6px;top:-6px;animation:cc-z 2s steps(8) 1s infinite}' +
      '.cc-heart svg{animation:cc-h 1.2s steps(6) both}';
    document.head.appendChild(css);

    var cat = document.createElement('div');
    cat.className = 'cc-layer cc-cat';
    cat.setAttribute('aria-hidden', 'true');
    var zz = document.createElement('div');
    zz.className = 'cc-layer cc-fx';
    zz.setAttribute('aria-hidden', 'true');
    zz.style.display = 'none';
    zz.innerHTML =
      '<svg class="cc-z1" width="8" height="8" viewBox="0 0 4 4" shape-rendering="crispEdges"><path d="' + Z + '" fill="#1F1B1B"/></svg>' +
      '<svg class="cc-z2" width="6" height="6" viewBox="0 0 4 4" shape-rendering="crispEdges"><path d="' + Z + '" fill="#1F1B1B"/></svg>';
    var heart = document.createElement('div');
    heart.className = 'cc-layer cc-heart';
    heart.setAttribute('aria-hidden', 'true');
    heart.style.display = 'none';
    heart.innerHTML = '<svg width="14" height="12" viewBox="0 0 7 6" shape-rendering="crispEdges"><path d="' + HEART + '" fill="#F08BA3"/></svg>';
    document.documentElement.appendChild(cat);
    document.documentElement.appendChild(zz);
    document.documentElement.appendChild(heart);

    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var tx = x, ty = y, face = 1, t = 0, still = 0, blinkAt = 120;
    var shown = '', raf;

    function draw(name) {
      if (name === shown) return;
      shown = name;
      var f = frames[name];
      cat.innerHTML =
        '<svg width="' + f.w0 * px + '" height="' + f.h0 * px + '" viewBox="0 0 ' + f.w0 + ' ' + f.h0 + '" shape-rendering="crispEdges">' +
        '<path d="' + f.w + '" fill="' + fur + '"/><path d="' + f.g + '" fill="' + spot + '"/>' +
        '<path d="' + f.p + '" fill="#F4A3B4"/><path d="' + f.k + '" fill="#1F1B1B"/></svg>';
    }

    function onMove(e) { tx = e.clientX; ty = e.clientY; }
    window.addEventListener('pointermove', onMove, { passive: true });

    function tick() {
      t++;
      var dx = tx - x, dy = ty - y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var moving = false;
      if (dist > 21) {
        var step = Math.min(dist - 20, speed);
        x += (dx / dist) * step;
        y += (dy / dist) * step;
        moving = true;
        if (dx > 4) face = 1; else if (dx < -4) face = -1;
      }
      still = moving ? 0 : still + 1;

      var name;
      if (moving) name = Math.floor(t / 7) % 2 ? 'runB' : 'runA';
      else if (still > 300) name = 'sleep';
      else {
        if (t >= blinkAt) blinkAt = t + 150 + Math.floor(Math.random() * 120);
        name = (blinkAt - t) > 140 ? 'blink' : 'sit';
      }
      draw(name);

      var f = frames[name];
      var w = f.w0 * px, h = f.h0 * px;
      var rx = Math.round(x), ry = Math.round(y);
      cat.style.transformOrigin = (w / 2) + 'px 100%';
      cat.style.transform = 'translate(' + (rx - Math.round(w / 2)) + 'px,' + (ry - h) + 'px) scaleX(' + face + ')';

      zz.style.display = name === 'sleep' ? 'block' : 'none';
      zz.style.transform = 'translate(' + (rx + (face > 0 ? -4 : 0) * px) + 'px,' + (ry - h - 6 * px) + 'px)';

      var happy = !moving && still > 4 && still < 75;
      if (happy && heart.style.display === 'none') {
        heart.style.display = 'block';
        heart.innerHTML = heart.innerHTML; // restart the pop animation
      } else if (!happy) heart.style.display = 'none';
      heart.style.transform = 'translate(' + (rx - 7) + 'px,' + (ry - h - 8 * px) + 'px)';

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    running = {
      stop: function () {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onMove);
        cat.remove(); zz.remove(); heart.remove(); css.remove();
        running = null;
      }
    };
    return running;
  }

  window.CuteCat = {
    start: start,
    stop: function () { if (running) running.stop(); }
  };

  if (script && !script.hasAttribute('data-manual')) {
    var opts = {
      fur: script.getAttribute('data-fur') || undefined,
      spot: script.getAttribute('data-spot') || undefined,
      pixel: parseFloat(script.getAttribute('data-pixel')) || undefined,
      speed: parseFloat(script.getAttribute('data-speed')) || undefined
    };
    if (document.body) start(opts);
    else document.addEventListener('DOMContentLoaded', function () { start(opts); });
  }
})();
