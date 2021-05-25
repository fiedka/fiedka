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
              <a>OVMF 202005 uefi-firmware-parser</a>
            </Link>
          </li>
          <li>
            <Link href="/LS1043ARDB_EFI_NORBOOT.fd.utk">
              <a>LS1043ARDB_EFI_NORBOOT utk</a>
            </Link>
            <Link href="/LS1043ARDB_EFI_NORBOOT.fd.ufp">
              <a>LS1043ARDB_EFI_NORBOOT ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/LS1046ARDB_EFI_QSPIBOOT.fd.utk">
              <a>LS1046ARDB_EFI_QSPIBOOT utk</a>
            </Link>
            <Link href="/LS1046ARDB_EFI_QSPIBOOT.fd.ufp">
              <a>LS1046ARDB_EFI_QSPIBOOT ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/LS2088ARDB_EFI_NORBOOT.fd.utk">
              <a>LS2088ARDB_EFI_NORBOOT utk</a>
            </Link>
            <Link href="/LS2088ARDB_EFI_NORBOOT.fd.ufp">
              <a>LS2088ARDB_EFI_NORBOOT ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/LX2160ARDB_EFI_NORBOOT.fd.utk">
              <a>LX2160ARDB_EFI_NORBOOT utk</a>
            </Link>
            <Link href="/LX2160ARDB_EFI_NORBOOT.fd.ufp">
              <a>LX2160ARDB_EFI_NORBOOT ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/UDOO-BOLT-C4000000.108.utk">
              <a>UDOO-BOLT-C4000000.108 utk</a>
            </Link>
            <Link href="/UDOO-BOLT-C4000000.108.ufp">
              <a>UDOO-BOLT-C4000000.108 ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.50.utk">
              <a>A3MSTX_3.50 utk</a>
            </Link>
            <Link href="/A3MSTX_3.50.ufp">
              <a>A3MSTX_3.50 ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.60.utk">
              <a>A3MSTX_3.60 utk</a>
            </Link>
            <Link href="/A3MSTX_3.60.ufp">
              <a>A3MSTX_3.60 ufp</a>
            </Link>
            <Link href="/A3MSTX_3.60.psp">
              <a>A3MSTX_3.60 PSP</a>
            </Link>
            <Link href="/A3MSTX_3.60.mft">
              <a>A3MSTX_3.60 MFT</a>
            </Link>
            <Link href="/A3MSTX_3.60.all">
              <a>A3MSTX_3.60 all</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.60K.ufp">
              <a>A3MSTX_3.60K ufp</a>
            </Link>
            <Link href="/A3MSTX_3.60K.psp">
              <a>A3MSTX_3.60K PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/A3MSTX_3.60S.ufp">
              <a>A3MSTX_3.60S ufp</a>
            </Link>
            <Link href="/A3MSTX_3.60S.mft">
              <a>A3MSTX_3.60S MFT</a>
            </Link>
          </li>
          <li>
            <Link href="/A320M-HDV_R4.0.ufp">
              <a>A320M-HDV_R4.0 ufp</a>
            </Link>
            <Link href="/A320M-HDV_R4.0.psp">
              <a>A320M-HDV_R4.0 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/X370-Pro4_6.30_real.all">
              <a>X370-Pro4_6.30_real all</a>
            </Link>
            <Link href="/X370-Pro4_6.30_real.ufp">
              <a>X370-Pro4_6.30_real ufp</a>
            </Link>
            <Link href="/X370-Pro4_6.30_real.utk">
              <a>X370-Pro4_6.30_real utk</a>
            </Link>
            <Link href="/X370-Pro4_6.30_real.psp">
              <a>X370-Pro4_6.30_real PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/X574I2T1.00.utk">
              <a>X574I2T1.00</a>
            </Link>
            <Link href="/X574I2T1.00.uefi">
              <a>X574I2T1.00 uefi</a>
            </Link>
            <Link href="/X574I2T1.00.psp">
              <a>X574I2T1.00 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/Y520-15IKBN.utk">
              <a>Y520-15IKBN utk</a>
            </Link>
            <Link href="/Y520-15IKBN.ufp">
              <a>Y520-15IKBN ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/P34V2BF.D08.utk">
              <a>P34V2BF.D08 utk</a>
            </Link>
            <Link href="/P34V2BF.D08.ufp">
              <a>P34V2BF.D08 ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C52AMS.360.utk">
              <a>E7C52AMS.360 utk</a>
            </Link>
            <Link href="/E7C52AMS.360.ufp">
              <a>E7C52AMS.360 ufp</a>
            </Link>
            <Link href="/E7C52AMS.360.psp">
              <a>E7C52AMS.360 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/MZ92-FS0_R16_F01.utk">
              <a>MZ92-FS0_R16_F01 utk</a>
            </Link>
            <Link href="/MZ92-FS0_R16_F01.ufp">
              <a>MZ92-FS0_R16_F01 ufp</a>
            </Link>
            <Link href="/MZ92-FS0_R16_F01.psp">
              <a>MZ92-FS0_R16_F01 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C37AMS.HC0.uefi">
              <a>E7C37AMS.HC0 uefi</a>
            </Link>
            <Link href="/E7C37AMS.HC0.psp">
              <a>E7C37AMS.HC0 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C37AMS.orig.ufp">
              <a>E7C37AMS original ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/E7C37AMS.HD1.uefi">
              <a>E7C37AMS.HD1 uefi</a>
            </Link>
            <Link href="/E7C37AMS.HD1.psp">
              <a>E7C37AMS.HD1 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301.uefi">
              <a>ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301 uefi</a>
            </Link>
            <Link href="/ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301.psp">
              <a>ROG-CROSSHAIR-VII-HERO-WIFI-ASUS-4301 PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/PRIME-X370-PRO-ASUS-5220.CAP.uefi">
              <a>PRIME-X370-PRO-ASUS-5220.CAP uefi</a>
            </Link>
          </li>
          <li>
            <Link href="/P11C-C-ASUS-4L-4001.CAP.ufp">
              <a>P11C-C-ASUS-4L-4001.CAP ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/R440-020903C.cap.ufp.jsx">
              <a>DELL PowerEdge R440 020903C ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/B45AS715.BSS.utk">
              <a>B45AS715.BSS utk</a>
            </Link>
            <Link href="/B45AS715.BSS.ufp">
              <a>B45AS715.BSS ufp</a>
            </Link>
            <Link href="/B45AS715.BSS.psp">
              <a>B45AS715.BSS PSP</a>
            </Link>
          </li>
          <li>
            <Link href="/T480s-0AN2200.FL1-N22ET65P.utk">
              <a>T480s-N22ET65P utk</a>
            </Link>
            <Link href="/T480s-0AN2200.FL1-N22ET65P.ufp">
              <a>T480s-N22ET65P ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/T480s-0AN2200.FL1-N22ET65W.utk">
              <a>T480s-N22ET65W utk</a>
            </Link>
            <Link href="/T480s-0AN2200.FL1-N22ET65W.ufp">
              <a>T480s-N22ET65W ufp</a>
            </Link>
          </li>
          <li>
            <Link href="/T14Gen1_20UD-R1BET58W.ufp">
              <a>T14 Gen1 20UD-R1BET58W</a>
            </Link>
          </li>
          <li>
            <Link href="/jetson-agx-xavier.uefi">
              <a>Jetson AGX Xavier UEFI</a>
            </Link>
          </li>
        </ul>
      </menu>
      <h3>Color Palette</h3>
      This color palette is used for visualization and just printed here for
      reference.
      <Palette />
      <style jsx>{`
        li a:nth-child(n + 2) {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};

export default Page;
