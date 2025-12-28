export function getGradient(
  ctx: CanvasRenderingContext2D,
  area: { top: number; bottom: number },
  up: boolean
): CanvasGradient {
  const gradient = ctx.createLinearGradient(
    0,
    area.top,
    0,
    area.bottom
  );

  gradient.addColorStop(
    0,
    up
      ? 'rgba(34,197,94,0.4)'
      : 'rgba(239,68,68,0.4)'
  );
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  return gradient;
}
