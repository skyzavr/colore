import { useContext } from 'react';
import { ColourContext } from '../App';

export function useCopyClipboard(color) {
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
  const copy = (value) => {
    console.log(value);
    copyToClipboard(value).then((el) => {
      setColour({
        ...el,
        id: Math.floor(Math.random() * 10000),
      });
    });
  };
  return [copy];
}
