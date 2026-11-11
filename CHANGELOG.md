# Changelog

All notable changes to led-commit-wall.

## Unreleased

- **Docs:** quick-start tightened; demo fetches live contribution data

## 1.0.0 - 2026-11-07

- Initial public release: `src/led-commit-wall.js` (`window.LEDCommitWall.init`,
  `data-led-wall` + `data-username` API), `src/led-commit-wall.css`
  (`lcw-l0`..`lcw-l4` LED levels)
- Lazy fetch via IntersectionObserver (300px rootMargin), hides the section on
  API failure instead of leaving a hole
- Pages demo enabled: https://bryanhamiltondev.github.io/led-commit-wall/
