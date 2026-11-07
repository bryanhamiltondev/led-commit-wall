/*!
 * LED Commit Wall - your GitHub contribution graph as a rack of LEDs.
 * Vanilla JS, zero dependencies. Lazy-loads on scroll, hides itself if the API is down.
 * https://github.com/bryanhamiltondev/led-commit-wall
 */
(function (global) {
  'use strict';

  var API = 'https://github-contributions-api.jogruber.de/v4/';

  function render(grid, days) {
    var pad = new Date(days[0].date + 'T00:00:00').getDay();
    var cols = [];
    for (var i = 0; i < pad; i++) cols.push(null);
    days.forEach(function (d) { cols.push(d); });
    while (cols.length % 7) cols.push(null);
    var weeks = cols.length / 7, html = '';
    for (var w = 0; w < weeks; w++) {
      html += '<div class="lcw-week">';
      for (var r = 0; r < 7; r++) {
        var day = cols[w * 7 + r];
        if (!day) html += '<i class="lcw-led lcw-l0 lcw-empty"></i>';
        else html += '<i class="lcw-led lcw-l' + day.level + '" title="' + day.count + ' contributions on ' + day.date + '"></i>';
      }
      html += '</div>';
    }
    grid.innerHTML = html;
    var sum = 0;
    days.forEach(function (d) { sum += d.count; });
    return sum;
  }

  function load(wall) {
    var grid = wall.querySelector('.lcw-grid');
    if (!grid) return;
    fetch(API + wall.getAttribute('data-username'))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var days = (d && d.contributions) || [];
        var section = wall.closest('[data-led-wall]') || wall;
        if (!days.length) { section.hidden = true; return; }
        var sum = render(grid, days);
        var total = wall.querySelector('.lcw-total');
        if (total) total.textContent = sum + ' commits / 365 days';
      })
      .catch(function () {
        var section = wall.closest('[data-led-wall]') || wall;
        section.hidden = true;
      });
  }

  function init(root) {
    var scope = root || document;
    var walls = scope.querySelectorAll('[data-led-wall] [data-username]');
    if (!walls.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        load(e.target);
      });
    }, { rootMargin: '300px' });
    Array.prototype.forEach.call(walls, function (w) { io.observe(w); });
  }

  global.LEDCommitWall = { init: init, version: '1.0.0' };
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', function () { init(); });
})(window);
