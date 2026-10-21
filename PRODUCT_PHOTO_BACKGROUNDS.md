# Golden-beige product-photo backgrounds

The product photos use the owner's approved softly blurred golden-beige backdrop,
with complete products visible and comfortable space around them. Single beads
are framed at a moderate size; longer malas and bracelets fit within the frame.

Only the empty backdrop was generated with the built-in image generation tool.
The product foreground comes from the existing photographs, not an AI-redrawn
bead. Foreground RGB values were checked against the source cutouts before
scaling/compositing and AVIF encoding. No color correction, retouching, reshaping,
or invented grooves were applied. Original reflections, surface color, hands and
display stands remain where photographed.

Existing image paths are retained so the catalogue, variant galleries and Mukhi
guide continue using the same files. Certificate and X-ray photographs also use
the matching backdrop. Their original printed content, report numbers, QR codes,
and X-ray imagery are retained from the source photographs, never generated.
Document views use larger framing for readability and high-quality AVIF encoding.
Empty cloth placeholders are excluded; no missing product photos are invented.

Original product photos remain recoverable from the preceding Git revision.
A local ZIP backup and full input/cutout/composite reports are also saved in the
workspace's `background-preview/` directory, outside the published assets.

Backdrop prompt: an empty landscape 4:3 catalogue backdrop matching the owner's
reference: soft warm golden-beige tabletop in the lower third and a defocused
golden-beige studio background above, gentle light from upper left, no objects,
beads, text, borders, UI, or cast shadows. Real photographed products are
composited over that backdrop with a soft contact shadow.

Review product edges, existing props and small natural openings at full size.
No deployment or merge is authorized by this asset preparation.

Initial bead-photo scope: 198 distinct compositions replace 264 photo files.
The same blank product placeholder at 36 paths remains unchanged.
The owner subsequently requested matching backgrounds for certificate and X-ray
photos in every uploaded variant. These use the same original-foreground checks,
and their originals have a separate local ZIP backup in
`background-preview/documents/`. Empty document placeholders remain unchanged.
The image-version helper covers all six gallery slots and fallback paths.
Verification: 22 tests pass, production build passes, and local gallery views and
the full image contact sheets are visually reviewed.

Document-slot scope: 97 distinct compositions replace 129 uploaded certificate/X-ray-slot files. The blank document placeholder reused at 19 paths is unchanged. Combined PR scope: 393 photo files, including the original 264 bead/product views. The 12 Mukhi Super Collector X-ray was checked in the local gallery and fullscreen view.
