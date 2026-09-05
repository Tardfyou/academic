# ChengzhiYi · 易承志

Personal academic homepage, hosted on GitHub Pages.

**Website:** https://tardfyou.github.io/academic/

## Update

- Edit `index.html` for profile, research, experience, education, and honors.
- Edit `style.css` for appearance and responsive layouts.
- `navigation.js` highlights the current section as the reader scrolls.
- Replace `assets/portrait.jpg` to update the photo.
- Push to `main`; GitHub Pages publishes from the repository root.

The site is plain HTML and CSS, with no build step or third-party runtime dependencies.

## Design references

Original implementation, with layout research informed by:

- [Jon Barron](https://jonbarron.info/): readable research entries and compact profile.
- [Pascal Michaillat](https://pascalmichaillat.org/): minimal academic typography.
- [Lilian Weng](https://lilianweng.github.io/): clear reading hierarchy.

- [Jingyi Zheng](https://jingyi62.github.io/): profile sidebar and academic reading hierarchy.

Instrument Sans and the Allura signature font are bundled locally under the SIL Open Font License; see their license files in `assets/fonts/`.

The current design retains a profile sidebar and a unified sans-serif typographic system, with interface details informed by Apple’s [materials](https://developer.apple.com/design/human-interface-guidelines/materials), [typography](https://developer.apple.com/design/human-interface-guidelines/typography), and [layout](https://developer.apple.com/design/human-interface-guidelines/layout) guidance.

Typography references: [Instrument](https://www.instrument.com/) (Instrument Sans) and [Pentagram](https://www.pentagram.com/) (typographic hierarchy and spacing). The translucent materials are a browser approximation of iOS 26 Liquid Glass, with opaque fallbacks for reduced transparency and increased contrast.

The ICSE venue classification is shown separately from manuscript status. Source: [CCF](https://www.ccf.org.cn/Media_list/cncc/2025-09-27/849149.shtml).

Interactions include a sliding navigation indicator, control press and hover feedback, pointer-lit glass surfaces, and animated native details disclosure. Motion follows the system reduced-motion preference. The visual palette is restrained to cool gray and mist blue, with Allura reserved for the English-name signature.
