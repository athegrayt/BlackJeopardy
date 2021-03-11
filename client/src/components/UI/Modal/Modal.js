import React, { Component, Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    let cssClasses = [
			classes.Modal,
			this.props.show ? classes.ModalOpen : classes.modalClosed,
		].join(' '); 
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={cssClasses}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}
export default Modal;
