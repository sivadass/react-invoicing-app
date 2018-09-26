import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_USERS = gql`
  {
    users {
      first_name
      last_name
      email
      id
    }
  }
`;

const Home = () => {
  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        return (
          <div className="app-wrapper">
            <header className="container fluid">Home</header>
            <article className="container">
              Welcome to React Invoicing App
            </article>
            {data.users.map(user => {
              return <div>{user.email}</div>;
            })}
          </div>
        );
      }}
    </Query>
  );
};

export default Home;
