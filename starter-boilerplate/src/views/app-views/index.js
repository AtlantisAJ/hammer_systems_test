import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from 'components/shared-components/Loading';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content"/>}>
      <Switch>
        <Route path={`${APP_PREFIX_PATH}/main`} component={lazy(() => import("./main"))} />
        <Route path={`${APP_PREFIX_PATH}/sistem`} component={lazy(() => import("./sistem"))} />
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/main/dashboards`} />
      </Switch>
    </Suspense>
  )
}

export default React.memo(AppViews);
