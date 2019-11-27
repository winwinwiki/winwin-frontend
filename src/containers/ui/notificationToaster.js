import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { notificationPopupTimeout } from "../../constants/index";
import { connect } from "react-redux";

class NotificationToaster extends Component {
  generateNotification(notification) {
    switch (notification.type) {
      case toast.TYPE.SUCCESS:
        return toast.success(notification.message);
      case toast.TYPE.INFO:
        return toast.info(notification.message);
      case toast.TYPE.ERROR:
        toast.dismiss(); // dismiss all toasts before showing error.
        return toast.error(notification.message);
      case toast.TYPE.WARNING:
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
        className="widthy-toast-container"
      />
    );
  }
}
const mapStateToProps = ({ notifications }) => {
  return {
    notifications
  };
};
export default connect(mapStateToProps)(NotificationToaster);
