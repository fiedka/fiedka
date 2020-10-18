import React from "react";
import Link from "next/link";
import { Palette } from "../util/colors";

const about = `
  This is an attempt to visualize firmware images. Currently supported are JSON
  outputs from utk, flashmap and PSPTool.

  The following images' names are from the respective vendors.
`;

const Page = () => {
  return (
    <>
      <h1>UTK web</h1>
      {about}
      <menu>
        <ul>
          <li>
            <Link href="/A3MSTX_3.50">
              <a>A3MSTX_3.50</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.60">
              <a>A3MSTX_3.60</a>
            </Link>
            <Link href="/A3MSTX_3.60.psp">
              <a className="psp">A3MSTX_3.60 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/Y520-15IKBN">
              <a>Y520-15IKBN</a>
            </Link>
          </li>
          <li>
            <Link href="/P34V2BF.D08">
              <a>P34V2BF.D08</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C52AMS.360">
              <a>E7C52AMS.360</a>
            </Link>
            <Link href="/E7C52AMS.360.psp">
              <a className="psp">E7C52AMS.360 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/MZ92-FS0_R16_F01">
              <a>MZ92-FS0_R16_F01</a>
            </Link>
            <Link href="/MZ92-FS0_R16_F01.psp">
              <a className="psp">MZ92-FS0_R16_F01 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/B45AS715.BSS">
              <a>B45AS715.BSS</a>
            </Link>
            <Link href="/B45AS715.BSS.psp">
              <a className="psp">B45AS715.BSS PSP</a>
            </Link>
          </li>
        </ul>
      </menu>
      <h3>Color Palette</h3>
      This color palette is used for visualization and just printed here for
      reference.
      <Palette />
      <style jsx>{`
        .psp {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};

export default Page;
