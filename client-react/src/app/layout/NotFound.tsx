import React from "react";
// @ts-ignore
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Ups! Mmmmmmmm! Valami NOK!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/classes" primary>
          Vissza a főoldalra
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
