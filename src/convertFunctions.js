export const hueToRgb = (hue, c, x, m) => {
  let red = 0,
    green = 0,
    blue = 0;
  //depends on Hue we get a special param of each channel
  if (hue >= 0 && hue <= 1) {
    red = c;
    green = x;
  } else if (hue >= 1 && hue <= 2) {
    red = x;
    green = c;
  } else if (hue >= 2 && hue <= 3) {
    green = c;
    blue = x;
  } else if (hue >= 3 && hue <= 4) {
    green = x;
    blue = c;
  } else if (hue >= 4 && hue <= 5) {
    red = x;
    blue = c;
  } else {
    red = c;
    blue = x;
  }
  red = Math.floor((red + m) * 255);
  green = Math.floor((green + m) * 255);
  blue = Math.floor((blue + m) * 255);
  return [red, green, blue];
};
export const hslToRgb = (list) => {
  const [h, s, l] = list;
  //method that convert an HSL color  to an RGB one
  //https://www.baeldung.com/cs/convert-color-hsl-rgb
  //Hue is a colour circle that contains a number between 0 and 360
  //S- saturation, L- lightness. Both is a number between 0 and 1
  //convert Lightness and saturation to correct value
  const lightn = l / 100;
  const satur = s / 100;
  //get the chroma: Chroma= (1-|2*L-1|)*S
  const chroma = (1 - Math.abs(2 * lightn - 1)) * satur;
  //H`=H/60 degr
  const hue = h / 60;
  //X=chroma*(1-|H` mod 2-1|)
  const X = chroma * (1 - Math.abs((hue % 2) - 1));
  //m=L-chroma/2
  const m = lightn - chroma / 2;
  return hueToRgb(hue, chroma, X, m);
};
export const decimalToHex = (value) => {
  if (value >= 255) return 'FF';
  if (value === 0) return '00';
  const alphbet = 'ABCDEF';
  let result = '';
  while (value >= 16) {
    let maxCount = Math.floor(value / 16);
    if (maxCount > 9) result += alphbet[maxCount - 10];
    else result += maxCount;
    value = value - 16 * maxCount;
  }
  if (value > 9) result += alphbet[value - 10];
  else result += value;
  if (result.length === 1) result = '0' + result;
  return result;
};
export const rgbToHex = (huePos, satPos, lightPos) => {
  const rgbArray = hslToRgb([huePos, satPos, lightPos]);
  let result = '#';
  for (let i = 0; i < rgbArray.length; i++) {
    result += decimalToHex(rgbArray[i]);
  }
  return result;
};
const calculateHue = (delta, RGB) => {
  const [R, G, B] = RGB;
  const Cmax = Math.max(R, G, B);
  let h = 0;
  if (R === G && G === B) return 0;
  if (Cmax === R) {
    let value = 60 * (((G - B) / delta) % 6);
    value < 0 ? (h = 360 + value) : (h = value);
  } else if (Cmax === G) {
    let value = (B - R) / delta;
    h = 60 * (value + 2);
  } else if (Cmax === B) {
    let value = (R - G) / delta;
    h = 60 * (value + 4);
  }
  return Number(h.toFixed());
};
export const rgbToHSL = (rgb) => {
  let R = rgb[0] / 255;
  let G = rgb[1] / 255;
  let B = rgb[2] / 255;
  const Cmax = Math.max(R, G, B);
  const Cmin = Math.min(R, G, B);
  const delta = Cmax - Cmin;
  let s = 0,
    l = 0,
    h = 0;
  l = (Cmax + Cmin) / 2;
  if (delta !== 0) s = delta / (1 - Math.abs(2 * l - 1));
  h = Math.floor(calculateHue(delta, [R, G, B]));
  s = Number((s * 100).toFixed(0));
  l = Number((l * 100).toFixed(0));
  return [h, s, l];
};
export const rgbToCMyk = (rgb) => {
  if (rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0) return [0, 0, 0, 100];
  let R = rgb[0] / 255;
  let G = rgb[1] / 255;
  let B = rgb[2] / 255;
  let K = 1 - Math.max(R, G, B);
  let C = (1 - R - K) / (1 - K);
  let M = (1 - G - K) / (1 - K);
  let Y = (1 - B - K) / (1 - K);
  return [
    Math.round(C * 100),
    Math.round(M * 100),
    Math.round(Y * 100),
    Math.round(K * 100),
  ];
};
export const hexToDec = (hexNum) => {
  const index = hexNum.length - 1;
  const alphbet = 'ABCDEF';
  let result = 0;
  for (let i = 0; i < hexNum.length; i++) {
    if (isNaN(hexNum[i])) {
      let letToNum = Number(alphbet.indexOf(hexNum[i].toUpperCase())) + 10;
      result += letToNum * Math.pow(16, index - i);
    } else result += Number(hexNum[i]) * Math.pow(16, index - i);
  }
  return result;
};
export const getRGB = (hex) => {
  return [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)].map((el) =>
    hexToDec(el)
  );
};
export const getLuminosity = (rgb) => {
  return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
};
export const RandomHSL = (colour) => {
  const lum = getLuminosity(getRGB(colour));
  const hue = Math.floor(Math.random() * 360);
  let sat, light;
  if (lum > 0.5) {
    sat = Math.floor(Math.random() * 100);
    light = Math.floor(Math.random() * (12 - 0) + 0);
  } else {
    sat = Math.floor(Math.random() * (100 - 75) + 75);
    light = Math.floor(Math.random() * (100 - 85) + 85);
  }
  return [hue, sat, light];
};
export const contrastColour = (colour, isRandomHue) => {
  const lum = getLuminosity(colour);
  const [hue, sat, light] = RandomHSL(colour);
  if (isRandomHue) return hslToRgb([hue, sat, light]);
  return lum > 0.5 ? hslToRgb([0, 0, 0]) : hslToRgb([0, 0, 100]);
};
export const HexByRgb = (rgb) =>
  `#${decimalToHex(rgb[0])}${decimalToHex(rgb[1])}${decimalToHex(rgb[2])}`;
export const cmykToRgb = (cmyk) => {
  const c = Number(cmyk[0]) / 100,
    m = Number(cmyk[1]) / 100,
    y = Number(cmyk[2]) / 100,
    k = Number(cmyk[3]) / 100;
  const R = Math.floor(255 * (1 - c) * (1 - k));
  const G = Math.floor(255 * (1 - m) * (1 - k));
  const B = Math.floor(255 * (1 - y) * (1 - k));
  return [R, G, B];
};
export const generateColour = () => {
  const alphabet = 'ABCDEF123456789';
  let colour = '#';
  for (let i = 0; i < 6; i++) {
    let value = Math.floor(Math.random() * (alphabet.length - 1));
    colour += alphabet[value];
  }
  return colour;
};
