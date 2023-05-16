export function lighten(color: string, amount: number): string {
  const rgb = parseColor(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl[2] += amount / 100;
  const newRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return rgbToString(newRgb.r, newRgb.g, newRgb.b);
}

export function darken(color: string, amount: number): string {
  const rgb = parseColor(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl[2] -= amount / 100;
  const newRgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
  return rgbToString(newRgb.r, newRgb.g, newRgb.b);
}

function parseColor(color: string) {
  let r = 0, g = 0, b = 0;

  // 支持的颜色格式：#RRGGBB、#RGB
  if (/^#([0-9a-f]{3}){1,2}$/i.test(color)) {
    color = color.substr(1);
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    [r, g, b] = color.match(/.{2}/g)!.map(x => parseInt(x, 16));
  }

  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
  let r = 0, g = 0, b = 0;
  if (s === 0) {
    r = g = b = l; // gray scale
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3) * 255;
    g = hue2rgb(p, q, h) * 255;
    b = hue2rgb(p, q, h - 1 / 3) * 255;
  }
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

function rgbToString(r: number, g: number, b: number): string {
  const rr = r.toString(16).padStart(2, '0');
  const gg = g.toString(16).padStart(2, '0');
  const bb = b.toString(16).padStart(2, '0');
  return `#${rr}${gg}${bb}`;
}
