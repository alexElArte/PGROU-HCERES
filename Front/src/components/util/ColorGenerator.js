export default function getRandomBackgroundColor(seed) {
    const hue = (seed * 137.508) % 360;
    const rgb = hsvToRgb(hue, 0.5, 0.95);
    const bgColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    const brightness = calculateBrightness(rgb[0], rgb[1], rgb[2]);
    const textColor = (brightness > 186) ? '#000000' : '#ffffff';
    return {
        backgroundColor: bgColor,
        color: textColor
    }
}

function hsvToRgb(h, s, v) {
    let r, g, b;
    const i = Math.floor(h / 60) % 6;
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
        default: r = 0; g = 0; b = 0; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function calculateBrightness(r, g, b) {
    return r * 0.299 +
        g * 0.587 +
        b * 0.114;
}
