import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { notificationPopupTimeout } from "../../constants/index";
import { connect } from "react-redux";

class NotificationToaster extends Component {
  generateNotification(notification) {
    switch (notification.type.toUpperCase()) {
      case "SUCCESS":
        return toast.success(notification.message);
      case "INFO":
        return toast.info(notification.message);
      case "ERROR":
        return toast.error(notification.message);
      case "WARNING":
        return toast.warning(notification.message);
      default:
        return null;
    }
  }
  componentWillReceiveProps(newProps) {
    Object.keys(newProps.notifications).map(notificationId => {
      this.generateNotification(newProps.notifications[notificationId]);
    });
  }
  render() {
    return (
      <ToastContainer
        autoClose={notificationPopupTimeout}
        position={toast.POSITION.TOP_RIGHT}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        // closeButton={false}
      />
      //   <ToastContainer position={toast.POSITION.TOP_CENTER} />
    );
  }
}
const mapStateToProps = ({ notifications }) => {
  return {
    notifications
  };
};
export default connect(mapStateToProps)(NotificationToaster);
