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
export const hslToRgb = (h, s, l) => {
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
  const rgbArray = hslToRgb(huePos, satPos, lightPos);
  let result = '#';
  console.log(rgbArray);
  for (let i = 0; i < rgbArray.length; i++) {
    result += decimalToHex(rgbArray[i]);
  }
  // console.log(result);
  // setHexColour(result);
  return result;
};
export const hexToDec = (hexNum) => {
  const index = hexNum.length - 1;
  const alphbet = 'ABCDEF';
  let result = 0;
  for (let i = 0; i < hexNum.length; i++) {
    if (isNaN(hexNum[i])) {
      let letToNum = Number(alphbet.indexOf(hexNum[i])) + 10;
      result += letToNum * Math.pow(16, index - i);
    } else result += Number(hexNum[i]) * Math.pow(16, index - i);
  }
  return result;
};
