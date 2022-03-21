import React from "react";
import PropTypes from "prop-types";
import { Infobar } from "@coalmines/indui";
import Layout from "../components/Layout";
import SidePane from "../components/SidePane";
import FlashUsage from "../components/FlashUsage";
import logo from "../img/art/fiedka.svg";

const UnknownImage = ({ name, fmap }) => {
  return (
    <Layout
      sidepane={
        fmap && (
          <SidePane>
            <FlashUsage usage={fmap} />
          </SidePane>
        )
      }
    >
      <main>
        <Infobar type={2}>No firmware detected</Infobar>
        <figure>
          <img src={logo} />
        </figure>
        No firmware type could be detected in the given file. Sorry! Please file
        an issue if you think that this is a mistake. :)
        <pre>https://github.com/fiedka/fiedka/issues</pre>
        <style jsx>{`
          img {
            width: 200px;
            margin-bottom: 15px;
          }
        `}</style>
      </main>
    </Layout>
  );
};

UnknownImage.propTypes = {
  fmap: PropTypes.object,
  name: PropTypes.string,
};

export default UnknownImage;
