# LED Commit Wall

Your GitHub contribution graph as a rack of LEDs. Every lit LED is a shipped day.

Vanilla JS, zero dependencies, ~90 lines. Lazy-loads via IntersectionObserver, hides its
whole section gracefully if the contributions API is unreachable, and ships with a
dark-rack default stylesheet you can reskin with three lines of CSS.

**[Live demo](https://bryanhamiltondev.github.io/led-commit-wall/)** - powered by real
commit data, fetched in your browser right now.

## Why

Contribution graphs all look the same. This one looks like the patch bay on a mixing
console, it renders nothing until scrolled into view (no wasted requests), and it fails
quiet: API down, ad-blocker, whatever - the section removes itself instead of showing
an empty box.

## Quick start

```html
<link rel="stylesheet" href="src/led-commit-wall.css">

<div data-led-wall>
  <div class="lcw-wrap">
    <div class="lcw-grid" data-username="octocat"></div>
  </div>
  <div class="lcw-foot">
    <span>LESS <i class="lcw-led lcw-l0"></i>...<i class="lcw-led lcw-l4"></i> MORE</span>
    <span class="lcw-total"></span>
  </div>
</div>

<script src="src/led-commit-wall.js"></script>
```

Anything inside `[data-led-wall]` with a `data-username` attribute becomes a wall.
That's the whole API.

- `LEDCommitWall.init()` is called automatically on DOMContentLoaded; call it manually
  with a root element for dynamically-inserted walls.
- The total footer fills itself: `208 commits / 365 days`.
- Weekday alignment matches GitHub (Sunday-first, first week padded).

## Data

Contribution levels come from the public
[github-contributions-api](https://github.com/rzabdallah/github-activity-graph) style
endpoint at `github-contributions-api.jogruber.de/v4/<user>` (CORS `*`, levels 0-4,
365 days). No token, no rate-limit dance, no build step.

## Styling

LEDs are `<i>` elements with classes `lcw-l0` ... `lcw-l4` (dark to bright). Override
backgrounds, size, glow, border-radius - it is all plain CSS, nothing is inlined.

## Browser support

Anything with `fetch` and `IntersectionObserver` (all evergreen browsers). Older
browsers: nothing renders, nothing breaks.

## License

MIT
