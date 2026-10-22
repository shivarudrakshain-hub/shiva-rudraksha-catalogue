// Calculate zoom against the painted image, excluding object-fit letterboxing.
export function imageLensGeometry({ width, height, naturalWidth, naturalHeight, x, y }) {
  if (!(width > 0 && height > 0 && naturalWidth > 0 && naturalHeight > 0)) return null;
  const scale = Math.min(width / naturalWidth, height / naturalHeight);
  const paintedWidth = naturalWidth * scale;
  const paintedHeight = naturalHeight * scale;
  const insetX = (width - paintedWidth) / 2;
  const insetY = (height - paintedHeight) / 2;
  const px = x - insetX;
  const py = y - insetY;
  if (px < 0 || py < 0 || px > paintedWidth || py > paintedHeight) return null;
  const size = Math.min(180, paintedWidth, paintedHeight);
  const cx = Math.max(size / 2, Math.min(paintedWidth - size / 2, px));
  const cy = Math.max(size / 2, Math.min(paintedHeight - size / 2, py));
  const zoom = 2.4;
  return {
    size, left: insetX + cx - size / 2, top: insetY + cy - size / 2,
    backgroundSize: `${paintedWidth * zoom}px ${paintedHeight * zoom}px`,
    backgroundPosition: `${size / 2 - cx * zoom}px ${size / 2 - cy * zoom}px`,
  };
}
