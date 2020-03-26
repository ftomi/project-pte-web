import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import SchoolClassListItemPlaceholder from "./SchoolClassListItemPlaceholder";
import SchoolClassFilters from "./SchoolClassFilters";

const SchoolClassDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  return (
    <Grid>
      <Grid.Column width={10}>
        {/* {loadingInitial && page === 0 ? (
          <SchoolClassListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <SchoolClassList />
          </InfiniteScroll>
        )} */}
      </Grid.Column>
      <Grid.Column width={6}>
        <SchoolClassFilters />{" "}
      </Grid.Column>
      <Grid.Column width={10}>
        {/* <Loader active={loadingNext} /> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(SchoolClassDashboard);
