/**
 * Turn 64 bit hex values into an array of 8 bit chunks in binary notation, so,
 * for example, 0x7040600070406 turns into the following:
 * [
 *   '00000000',
 *   '00000111',
 *   '00000100',
 *   '00000110',
 *   '00000000',
 *   '00000111',
 *   '00000100',
 *   '00000110'
 * ]
 */
export const hexToBinArray = (n) =>
  n
    .toString(2)
    .padStart(64, "0")
    .match(/.{1,8}/g);
