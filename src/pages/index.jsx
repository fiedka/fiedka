import React from "react";
import Link from "next/link";
import { Palette } from "../util/colors";

const Page = () => {
  return (
    <>
      <h1>UTK web</h1>
      <p>
        This app is an attempt to visualize firmware images, which is useful for
        development, debugging, security research and similar purposes.
        <br />
        Currently supported are JSON outputs from Fiano&apos;s utk and fmap as
        well as PSPTool.
      </p>
      For more information, see the{" "}
      <Link href="/about.html">
        <a>about</a>
      </Link>{" "}
      page.
      <h3>Explore</h3>
      The following firmware images&apos; names are from the respective vendors.
      ufp is short for uefi-firmware-parser, utk (UEFI toolkit) part of Fiano.
      <menu>
        <ul>
          <li>
            <Link href="/ovmf-202005.utk">
              <a>OVMF 202005 utk</a>
            </Link>
            <Link href="/ovmf-202005.ufp">
              <a className="psp">OVMF 202005 uefi-firmware-parser</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.50.utk">
              <a>A3MSTX_3.50 utk</a>
            </Link>
            <Link href="/A3MSTX_3.50.ufp">
              <a className="psp">A3MSTX_3.50 ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.60.utk">
              <a>A3MSTX_3.60 utk</a>
            </Link>
            <Link href="/A3MSTX_3.60.ufp">
              <a className="psp">A3MSTX_3.60 ufp</a>
            </Link>
            <Link href="/A3MSTX_3.60.psp">
              <a className="psp">A3MSTX_3.60 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/Y520-15IKBN.utk">
              <a>Y520-15IKBN utk</a>
            </Link>
            <Link href="/Y520-15IKBN.ufp">
              <a className="psp">Y520-15IKBN ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/P34V2BF.D08.utk">
              <a>P34V2BF.D08 utk</a>
            </Link>
            <Link href="/P34V2BF.D08.ufp">
              <a className="psp">P34V2BF.D08 ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C52AMS.360.utk">
              <a>E7C52AMS.360 utk</a>
            </Link>
            <Link href="/E7C52AMS.360.ufp">
              <a className="psp">E7C52AMS.360 ufp</a>
            </Link>
            <Link href="/E7C52AMS.360.psp">
              <a className="psp">E7C52AMS.360 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/MZ92-FS0_R16_F01.utk">
              <a>MZ92-FS0_R16_F01 utk</a>
            </Link>
            <Link href="/MZ92-FS0_R16_F01.ufp">
              <a className="psp">MZ92-FS0_R16_F01 ufp</a>
            </Link>
            <Link href="/MZ92-FS0_R16_F01.psp">
              <a className="psp">MZ92-FS0_R16_F01 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/B45AS715.BSS.utk">
              <a>B45AS715.BSS utk</a>
            </Link>
            <Link href="/B45AS715.BSS.ufp">
              <a className="psp">B45AS715.BSS ufp</a>
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
