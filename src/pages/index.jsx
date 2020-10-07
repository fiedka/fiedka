import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <h1>UTK web</h1>
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
        </ul>
      </menu>
      <style jsx>{`
        .psp {
          margin-left: 12px;
        }
      `}</style>
    </>
  );
};

export default Page;
