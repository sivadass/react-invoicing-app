import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EventListItem from "../common/event-list-item";
import EmptyState from "../common/empty-state";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Service from "../../utils/service";
import "react-tabs/style/react-tabs.css";

class Dashboard extends React.Component {
  componentDidMount() {
    Service.get(`${SERVICE_URL}/Invoices/`, (status, data) => {
      if (status === 200) {
        console.log(data);
      } else {
        console.log(data);
      }
    });
  }
  render() {
    return (
      <div className="container">
        <div className="page-header">Dashboard</div>
        <div className="page-content">
          <Tabs className="dashboard-tabs">
            <TabList>
              <Tab>All Events</Tab>
              <Tab>My Events</Tab>
            </TabList>

            <TabPanel />
            <TabPanel />
          </Tabs>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userID: auth.user.userId
});

Dashboard.ProtoTypes = {
  auth: PropTypes.object
};

export default connect(
  mapStateToProps,
  null
)(Dashboard);
