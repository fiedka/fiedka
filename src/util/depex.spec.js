import { hexifyGuidArray } from "./depex.js";

const sampleGuids = {
  AMITSESETUP_GUID: [
    3356621368,
    17096,
    17785,
    169,
    187,
    96,
    233,
    78,
    221,
    251,
    52,
  ],
};

describe("convertGuidArray", () => {
  it("should convert number array to hex notation with dashes", () => {
    const converted = hexifyGuidArray(sampleGuids.AMITSESETUP_GUID);
    const expected = "C811FA38-42C8-4579-A9BB-60E94EDDFB34";
    expect(converted).toEqual(expected);
  });
});
