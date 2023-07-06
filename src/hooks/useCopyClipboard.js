import { useContext } from 'react';
import { ColourContext } from '../App';
import { cmykToRgb, HexByRgb, hslToRgb } from '../convertFunctions';

export function useCopyClipboard() {
  const { setColour } = useContext(ColourContext);
  async function copyToClipboard(msg) {
    let type, message;
    try {
      await navigator.clipboard.writeText(msg);
      type = 'success';
      message = `The colour ${msg} has been copied!`;
    } catch {
      type = 'error';
      message = `There is some problem...`;
    }
    return { type, message };
  }
  const copy = (value, type = 'HEX', isCopy = true) => {
    if (!isCopy) {
      setColour({
        type: 'success',
        message: `The colour ${value} has been copied!`,
        colour: value,
        id: Math.floor(Math.random() * 10000),
      });
    } else
      copyToClipboard(value).then((el) => {
        let finalValue = '';
        const list =
          type !== 'HEX' ? value.split(', ').map((el) => Number(el)) : value;
        switch (type) {
          case 'HSL':
            const rgb = hslToRgb(list);
            finalValue = HexByRgb(rgb);
            break;
          case 'CMYK':
            finalValue = HexByRgb(cmykToRgb(list));
            break;
          case 'RGB':
            finalValue = HexByRgb(list);
            break;
          default:
            finalValue = value;
            break;
        }
        setColour({
          ...el,
          colour: finalValue,
          id: Math.floor(Math.random() * 10000),
        });
      });
  };
  return [copy];
}
