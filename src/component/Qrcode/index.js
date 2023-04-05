import React, { Component } from "react";
import QRCode from "react-qr-code";
import {
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
const QrCodeScreen = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      // toggle={}
      className="modal-add-user modal-dialog-centered "
    >
      {/* <ModalHeader toggle={this.toggle}></ModalHeader> */}
      <div className={"align-items-center"}>
        <ModalBody>
          <QRCode
            id="123456"
            value={`${props.value}`}
            size={290}
            level={"H"}
            includeMargin={true}
          />
        </ModalBody>
      </div>
      <ModalFooter className="justify-content-start pt-4">
        <Button className="action-button no" href="#" onClick={props.onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QrCodeScreen;
