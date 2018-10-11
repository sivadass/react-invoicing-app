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
            <main className="container">
              <div className="col-md-6">
                {data.users.map(user => {
                  return <h1 style={{ lineHeight: 1.5 }}>{user.email}</h1>;
                })}
              </div>
              <div className="col-md-6">
                {data.users.map(user => {
                  return <div>{user.email}</div>;
                })}
              </div>
            </main>
          </div>
        );
      }}
    </Query>
  );
};

export default Home;
