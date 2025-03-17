import React from "react";
import { Route, Switch } from "react-router-dom";
import Settings from "./Settings";
import Mobile from "./Mobile";
import Logs from "./Logs";

const SistemViews = () => {
  return (
    <Switch>
      <Route path="/app/sistem/settings" component={Settings} />
      <Route path="/app/sistem/mobile" component={Mobile} />
      <Route path="/app/sistem/logs" component={Logs} />
    </Switch>
  );
};

export default SistemViews;
