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
          </li>
          <li>
            <Link href="/Y520-15IKBN">
              <a>Y520-15IKBN</a>
            </Link>
          </li>
        </ul>
      </menu>
    </>
  );
};

export default Page;
