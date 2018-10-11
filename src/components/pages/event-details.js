import React from "react";
import { Link } from "react-router-dom";
import Loader from "../common/loader";
import Icon from "../common/icons";
import EventMediaObject from "../common/event-media-object";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteEvent, rsvpEvent } from "../../actions/events";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      eventData: {},
      isRSVPed: false,
      hostName: "",
      attendees: []
    };
  }

  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails = () => {
    this.setState({
      isLoading: true
    });
    let events = this.props.events;
    if (events) {
      let eventID = this.props.match.params.id;
      let index = events.findIndex(event => event.eventID == eventID);
      if (index !== -1) {
        this.setState(
          {
            eventData: events[index]
          },
          () => {
            this.checkRSVP();
            let users = this.props.users;
            let eventData = this.state.eventData;
            let hostID = eventData.eventCreator;
            let host = users.filter(user => {
              return user.userID === hostID;
            });
            this.setState({
              hostName: host[0].fullName
            });
            if (eventData.attendees.length > 0) {
              let attendees = users.filter(user =>
                eventData.attendees.includes(user.userID)
              );
              this.setState({
                attendees
              });
            }
          }
        );
      }
      setTimeout(() => {
        this.setState({
          isLoading: false
        });
      }, 1000);
    }
  };

  handleConfirm = onClose => {
    let rsvpData = {
      attendee: this.props.userID,
      eventID: this.props.match.params.id
    };
    this.props.rsvpEvent(rsvpData);
    onClose();
    setTimeout(() => {
      this.checkRSVP();
    }, 2000);
  };

  handleRSVP = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="react-confirm-alert-body custom-confirm">
            <h1>Please complete RSVP</h1>
            <p>You can confirm your RSVP by clicking the button below</p>
            <div className="custom-confirm-actions">
              <button
                className="button primary"
                onClick={this.handleConfirm.bind(this, onClose)}
              >
                Confirm
              </button>
              <button className="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        );
      }
    });
  };

  handleDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.props.deleteEvent(this.props.match.params.id)
        },
        {
          label: "No"
        }
      ]
    });
  };

  checkRSVP = () => {
    let attendees = this.state.eventData.attendees || [];
    if (attendees.length > 0) {
      let index = attendees.findIndex(
        attendee => attendee === this.props.userID
      );
      if (index !== -1) {
        this.setState({
          isRSVPed: true
        });
      }
    } else {
      this.setState({
        isRSVPed: false
      });
    }
  };

  render() {
    const { isLoading, isRSVPed, eventData, attendees, hostName } = this.state;
    const { userID } = this.props;
    if (isLoading) {
      return (
        <div className="page-loading">
          <Loader />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/" className="back-button">
            &larr;
          </Link>
          Event Details
        </div>
        <div className="page-content">
          <div className="row">
            <div className="col-8">
              <div className="event-meta">
                <h1>{eventData.eventName}</h1>
                <p>
                  <span className="event-meta-item">
                    <Icon name="user" size={16} />
                    Hosted by <strong>{hostName}</strong>
                  </span>
                </p>
              </div>
              <div className="event-banner">
                <img
                  src="https://via.placeholder.com/700x300"
                  alt="event banner"
                />
              </div>
              <div className="event-description">
                {eventData.eventDescription}
              </div>
              {attendees.length > 0 && (
                <div className="event-attendees">
                  <ul>
                    {attendees.map(attendee => (
                      <li key={attendee.userID}>{attendee.fullName}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="col-4">
              <div className="event-sidebar">
                <h3>Event Details</h3>
                <EventMediaObject
                  icon="calendar"
                  title="Date"
                  content={eventData.eventDate}
                />
                <EventMediaObject
                  icon="duration"
                  title="Duration"
                  content={`${eventData.eventDuration} Hours`}
                />
                <EventMediaObject
                  icon="location"
                  title="Location"
                  content={
                    eventData.eventLocation ? eventData.eventLocation.label : ""
                  }
                />
                <EventMediaObject
                  icon="price"
                  title="Price"
                  content={`$ ${eventData.eventFees}`}
                />
                <EventMediaObject
                  icon="users"
                  title="Maximum Allowed"
                  content={eventData.eventMaxAllowedParticipants}
                />
                {userID !== eventData.eventCreator && (
                  <div className="event-actions">
                    <button
                      onClick={this.handleRSVP}
                      className={
                        !isRSVPed
                          ? "button primary"
                          : "button primary confirmed"
                      }
                    >
                      {!isRSVPed ? "RSVP NOW" : "RSVP CONFIRMED"}
                    </button>
                  </div>
                )}
              </div>
              {userID === eventData.eventCreator && (
                <div className="event-sidebar creator-options">
                  <h3>Update Event</h3>
                  <div className="event-actions">
                    <Link
                      to={`/events/${this.props.match.params.id}/edit/`}
                      className="button button-link"
                    >
                      <Icon name="edit" size="18" />
                      EDIT
                    </Link>
                    <button className="button" onClick={this.handleDelete}>
                      <Icon name="trash" size="18" /> DELTE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, events, users }) => ({
  userID: auth.user.userID,
  events: events.events,
  users: users.users
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteEvent, rsvpEvent }, dispatch);
}

EventDetails.ProtoTypes = {
  events: PropTypes.array,
  userID: PropTypes.string,
  deleteEvent: PropTypes.func,
  rsvpEvent: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);
