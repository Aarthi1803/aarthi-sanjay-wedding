## Version 10 — responsive photo clarity update

Updated event photo framing for desktop and mobile: full photographs are shown without cropping, blurred duplicate overlays have been removed, and mobile invitation text panels are more compact.

# Aarthi & Sanjay — Wedding Invitation (Version 10)

A mobile-friendly static wedding invitation built with HTML, CSS and JavaScript.

## Features
- Premium cream, antique-gold and sage visual theme
- Interactive scratch card to reveal the reception and wedding dates
- Countdown to reception day (10 April 2027, India time)
- Separate reception and wedding sections
- Google Calendar links
- Apple Calendar `.ics` file with both events as all-day events
- RS Mahal, Gerugambakkam venue details and scannable Google Maps QR
- Wedding memories section ready for a Google Drive shared album URL
- Responsive mobile and desktop layout

## Details confirmed
- Reception: Saturday, 10 April 2027, 7:00 PM onwards
- Wedding: Sunday, 11 April 2027, 7:00 AM–8:00 AM
- Venue: RS Mahal, Panchayat Office, 88, Kolapakkam Main Road, opposite Kolapakkam, VGN Prathish Avenue, Kolapakkam, Gerugambakkam, Chennai – 600128
- Google Drive shared photo/video folder link is still needed

The photo-sharing QR is intentionally a placeholder until the couple provides a real shared album URL. This avoids sending guests to a fake or unrelated folder.

## Activate the photo-sharing link and QR
1. Create a Google Drive folder for wedding photos.
2. Set the sharing permission you want (for example, anyone with the link can add files, if your chosen upload workflow supports it).
3. Copy the folder link.
4. Add it to `SHARE_ALBUM_URL` in `script.js`.
5. Generate a QR code for that exact URL and replace the placeholder panel in `index.html` with an image.

Note: A standard shared Google Drive folder link does not always let guests upload unless permissions and the upload workflow are configured appropriately. Test it from a different Google account before sharing publicly.

## Publish using GitHub Pages
1. Sign in to https://github.com/
2. Create a public repository, for example `aarthi-sanjay-wedding`.
3. Upload `index.html`, `styles.css`, `script.js`, the `assets` folder and `aarthi-sanjay-calendar.ics`.
4. Open repository Settings → Pages.
5. Choose Deploy from a branch, select `main` and `/ (root)`, then Save.
6. GitHub will show the published site URL, usually:
   `https://YOUR-GITHUB-USERNAME.github.io/aarthi-sanjay-wedding/`

## Preview
Extract the ZIP and open `index.html` in a browser. An internet connection is needed for Google Fonts and the remote hero/background photographs.


## Photo-led invitation update
The opening hero uses Aarthi and Sanjay's couple photograph. Reception and wedding details are presented as elegant text overlays on the painted couple portrait and traditional wedding portrait. All photos are stored locally in the assets folder.


## Version 10 refinements
- Couple photos in the hero and event invitation panels now preserve the full image instead of aggressively cropping faces and bodies. A softly blurred backdrop fills the remaining space for a polished look.
- The scratch-card gold and its lettering are now painted onto the same canvas, so scratching visibly removes both and reveals the dates underneath.
- Improved touch handling for phones and tablets, continuous finger strokes, clearer scratch feedback, and a more reliable reveal threshold. The tap-to-reveal fallback remains available.
