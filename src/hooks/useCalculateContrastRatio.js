import { hexToDec } from '../convertFunctions';
export function useCalculateContrastRatio() {
  const additionalParam = (value) => {
    return (value + 0.055) / 1.055;
  };
  const getParam = (value) => {
    return value <= 0.03928
      ? value / 12.92
      : Math.pow(additionalParam(value), 2.4);
  };
  const getRGB = (hex) => {
    const arr = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5)].map(
      (el) => hexToDec(el) / 255
    );
    return arr.map((el) => getParam(el));
  };
  const getLuminance = (color) => {
    const rgbArr = getRGB(color);
    const Luminance =
      rgbArr[0] * 0.2126 + rgbArr[1] * 0.7152 + rgbArr[2] * 0.0722;
    return Luminance;
  };
  const getRatio = (colour, bgrColour) => {
    const Lum1 = getLuminance(colour),
      Lum2 = getLuminance(bgrColour);
    const L1 = Math.max(Lum1, Lum2);
    const L2 = Math.min(Lum1, Lum2);
    return (L1 + 0.05) / (L2 + 0.05);
  };

  return [getRatio];
}
