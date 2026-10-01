# Olivier Lelouch, personal website

Plain HTML and CSS, no build step. Publish with GitHub Pages (Settings > Pages > Deploy from branch, root folder).

- `index.html`: home page (photo, position, bio, selected research, contact)
- `research.html`: published papers, working papers, work in progress
- `cv.html`: CV summary and link to the full PDF
- `style.css`: all styling; the accent colour is `--accent` at the top
- `papers/`: PDFs of papers and `cv.pdf`
- `assets/`: photo (replace the "OL" placeholder box in index.html with `<img class="photo" src="assets/photo.jpg" alt="Olivier Lelouch">`)

Everything in [square brackets] is a placeholder waiting for real content.

To add a paper, copy one `<li class="paper">` block in research.html and edit the title, co-authors, journal, links and abstract.
