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
guide continue using the same files. Certificates and X-ray assets are excluded.
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

Applied scope: 198 distinct compositions replace 264 photo files. All 148 certificate/X-ray files were hash-checked unchanged. The same blank placeholder at 36 paths remains unchanged. Verification: 21 tests pass, production build passes, and the product detail gallery was visually checked locally.
