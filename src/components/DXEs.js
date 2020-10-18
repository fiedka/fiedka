import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  getGuidFromDxe,
  getName,
  getDepEx,
  hasName,
} from "../util/dxe-helpers";
import DXE from "./DXE";

const DXEs = ({ dxes, open = false }) => {
  const namedDxes = dxes.filter((d) => hasName(d));
  // const namedDxes = dxes.filter((d) => isDxe(d));
  return (
    <>
      <ul className={classnames({ open })}>
        {namedDxes.map((d) => {
          const guid = getGuidFromDxe(d);
          const name = getName(d);
          const depEx = getDepEx(d);
          return (
            <DXE
              key={guid}
              guid={guid}
              name={name}
              offset={100000}
              length={14}
              depEx={depEx}
            />
          );
        })}
      </ul>
      <style jsx>{`
        ul {
          max-height: 135px;
          overflow: hidden;
          list-style: none;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
        }
        .open {
          max-height: none;
        }
      `}</style>
    </>
  );
};

DXEs.propTypes = {
  open: PropTypes.bool,
  dxes: PropTypes.array,
};

export default DXEs;
