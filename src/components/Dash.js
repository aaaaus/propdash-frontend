import React, { Fragment } from "react";
import { connect } from "react-redux";
import withAuth from "../hocs/withAuth";

import PropertyContainer from "./dashboard/sidebar/PropertyContainer";
import UnitDetail from "./dashboard/sidebar/UnitDetail";
import FilterContainer from "./dashboard/content/FilterContainer";
import UnitContainer from "./dashboard/content/UnitContainer";

const Dash = () => {
  return (
    <Fragment>
      <div id="dashContainer">
        <div id="sidebar">
          <PropertyContainer />
          <UnitDetail />
        </div>

        <div id="contentContainer">
          <FilterContainer />
          <UnitContainer />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  // avatar,
  // username,
  // bio
});

export default withAuth(connect(mapStateToProps)(Dash));
