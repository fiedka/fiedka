import React from "react";
import PropTypes from "prop-types";
import { Boop, TextLine } from "@coalmines/indui";
import { MarkedEntriesProvider } from "../context/MarkedEntriesContext";
import Layout from "../components/Layout";
import SidePane from "../components/SidePane";
import FlashUsage from "../components/FlashUsage";
import MEFS from "../MEFS/MEFS";

const jumpToTop = () => window.scrollTo(0, 2);

const MEFSImage = ({ data, fmap, name }) => {
  const { directories, entries, header } = data;
  return (
    <MarkedEntriesProvider>
      <Layout
        sidepane={
          <SidePane>
            <FlashUsage usage={fmap} />
          </SidePane>
        }
      >
        <div>
          <header className="mefs-header">
            <span className="header-entry">
              <TextLine label="Intel (CS)ME">
                <h2>{name}</h2>
              </TextLine>
            </span>
            <span className="header-entry">
              <Boop small onClick={jumpToTop}>
                👆
              </Boop>
            </span>
          </header>
          <section>
            <MEFS directories={directories} entries={entries} />
          </section>
        </div>
      </Layout>
      <style jsx>{`
        header.cbfs-header {
          background: #fcfcfc;
          position: sticky;
          top: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          z-index: 20;
          padding: 2px;
        }
        .header-entry:nth-of-type(1) {
          flex: 1 1 auto;
          flex-direction: column;
        }
        .header-entry:nth-last-of-type(2) {
          flex: 1 1 auto;
          flex-direction: column;
        }
        .header-entry {
          display: flex;
          margin: 10px 4px 0;
        }
      `}</style>
    </MarkedEntriesProvider>
  );
};

MEFSImage.propTypes = {
  data: PropTypes.object,
  fmap: PropTypes.object,
  name: PropTypes.string,
};

export default MEFSImage;
