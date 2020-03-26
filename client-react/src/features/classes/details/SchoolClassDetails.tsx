import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import SchoolClassDetailedHeader from "./SchoolClassDetailedHeader";
import SchoolClassDetailedInfo from "./SchoolClassDetailedInfo";
import SchoolClassDetailedSidebar from "./SchoolClassDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const SchoolClassDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  return (
    <Grid>
      <Grid.Column width={10}>
        <SchoolClassDetailedHeader />
        <SchoolClassDetailedInfo />
      </Grid.Column>
      <Grid.Column width={6}>
        <SchoolClassDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(SchoolClassDetails);
