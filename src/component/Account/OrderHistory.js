/**
 *  Account Page Order History
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import OrderData from "../../api/userOrder";
import Sitebar from "./Sitebar";
import { getCustomerOrder } from "../../actions/Order/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import QrCodeScreen from "../Qrcode";
class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Order: OrderData,
      ViewOrder: "",
      viewQRCode: "",
      qrCodeValue: "",
    };
    this.toggle = this.toggle.bind(this);
    this.props.getCustomerOrder(this.props.user.email);
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  onViewOrder(data) {
    this.setState({
      ...this.state,
      ViewOrder: data,
    });
    // this.toggle();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const OrderHistory = this.state.Order;
    const ViewOrderdata = this.state.ViewOrder;
    console.log("this is testing", OrderHistory);
    return (
      <div>
        <div className="inner-intro">
          <Container>
            <QrCodeScreen
              value={this.state.qrCodeValue}
              isOpen={this.state.viewQRCode}
              onClose={() => {
                this.setState({ viewQRCode: !this.state.viewQRCode });
              }}
            />
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>My Account</h1>
                </div>
              </Col>
              <Col md={6} className="text-right">
                <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                    <span>
                      <Link className="bread-link bread-home" to="/">
                        Home
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span>My Account</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section-ptb">
          <Container>
            <Row>
              <Sitebar />
              <Col lg={9} className="mt-4 mt-lg-0">
                <Row>
                  <Col lg={12}>
                    <div className="table-responsive">
                      <table class="table orderhistory-table mb-0">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            {/* <th scope="col">Order Type</th> */}
                            {/* <th scope="col">Shipping</th> */}
                            {/* <th scope="col">Total</th> */}
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        {this.props.orderHistory !== null &&
                        Array.isArray(this.props.orderHistory) ? (
                          <tbody>
                            {this.props.orderHistory.map((Ordervalue) => (
                              <tr>
                                <td>#{Ordervalue.id}</td>
                                <td>{Ordervalue.lastStatusChange}</td>
                                <td>{Ordervalue.status}</td>
                                {/* <td style={{ textTransform: "capitalize" }}>
                                  {Ordervalue.fulfill_type.replace(/_/g, " ")}
                                </td> */}

                                {/* <td>{Ordervalue.status}</td> */}
                                {/* <td>{Ordervalue.order_total}</td> */}
                                <td>
                                  <Link
                                    className="action-button"
                                    onClick={() =>
                                      this.setState(
                                        { qrCodeValue: Ordervalue.order_no },
                                        () => {
                                          this.setState({ modal: true });
                                        },
                                        this.setState({ Order: Ordervalue })
                                      )
                                    }
                                    href="#"
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                  </Col>
                </Row>
                {/* modal-view */}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className="modal-view modal-lg modal-dialog-centered"
                >
                  <ModalHeader toggle={this.toggle}></ModalHeader>
                  {OrderHistory !== null ? (
                    <ModalBody>
                      <div className="success-screen">
                        <div className="thank-you text-center">
                          <i className="fa fa-check-circle-o"></i>
                          <h1 className="text-white">Thank You</h1>
                          <span>
                            Success! We received your payment. Your order will
                            be processed soon.
                          </span>
                          <strong className="text-white">
                            Order ID:{OrderHistory.id}
                          </strong>
                        </div>
                        <div className="delivery p-4 p-md-5 bg-light text-center">
                          <span className="h5">Expected Date Of Delivery</span>
                          <h2 className="mb-0 mt-2">
                            {OrderHistory.lastStatusChange}
                          </h2>
                        </div>
                        <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
                          <Row>
                            <Col lg={6}>
                              <h6>Ship To</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  {OrderHistory?.shippingAddress?.contactName}
                                </li>
                                <li>{OrderHistory?.shippingAddress?.street}</li>
                                <li>{OrderHistory?.shippingAddress?.city}</li>
                                <li>
                                  {OrderHistory?.shippingAddress?.streetNumber}
                                </li>
                                <li>
                                  {OrderHistory?.shippingAddress?.country}
                                </li>
                              </ul>
                            </Col>
                            <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
                              <h6>Summary</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <span>Order ID:</span>{" "}
                                  <strong>{OrderHistory.id}</strong>
                                </li>
                                <li>
                                  <span>Order Date:</span>{" "}
                                  <strong>
                                    {OrderHistory.lastStatusChange}
                                  </strong>
                                </li>
                                <li>
                                  <span>Order Total:</span>{" "}
                                  <strong>
                                    {/* {ViewOrderdata.price +
                                      ViewOrderdata.tax +
                                      50}
                                    .00 */}{" "}
                                    ${OrderHistory.totalPrice}
                                  </strong>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </div>
                        <div className="ordered-detail">
                          <h5 className="mb-4">Your Ordered Details</h5>
                          <div className="table-responsive">
                            <table class="table mb-0">
                              <thead class="thead-light">
                                <tr>
                                  <th>IMAGE</th>
                                  <th>PRODUCT NAME</th>
                                  <th>QUANTITY</th>
                                  <th>PRICE</th>
                                </tr>
                              </thead>
                              <tbody>
                                {OrderHistory?.entries.length > 0 &&
                                  OrderHistory?.entries.map(
                                    (ViewOrderdata, index) => (
                                      <tr className="ordered-item">
                                        <td className="ordered-image">
                                          <img
                                            alt="img 01"
                                            src={
                                              ViewOrderdata.product.images[0]
                                                .url
                                            }
                                            className="img-fluid"
                                          />
                                        </td>
                                        <td className="ordered-name">
                                          <span>
                                            {
                                              ViewOrderdata.product
                                                .localizedName.en
                                            }
                                          </span>
                                        </td>
                                        <td className="ordered-quantity">
                                          <span>
                                            {ViewOrderdata.effectiveQuantity}
                                          </span>
                                        </td>
                                        <td className="ordered-price">
                                          <span>
                                            ${ViewOrderdata.totalPrice}.00
                                          </span>
                                        </td>
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          </div>
                          <div className="table-responsive">
                            <table class="table total-table table-borderless mt-4 mb-0">
                              <tbody>
                                <tr>
                                  <td>Subtotal</td>
                                  <td className="text-right">
                                    {/* ${ViewOrderdata.price}.00 */}$
                                    {OrderHistory.subTotalPrice}.00
                                  </td>
                                </tr>
                                <tr>
                                  <td>Shipping</td>
                                  <td className="text-right">${OrderHistory?.shipping?.total?.amount}.00</td>
                                </tr>
                                {/* <tr>
                                  <td>Tax(GST)</td>
                                  <td className="text-right">
                                    ${ViewOrderdata.tax}.00
                                  </td>
                                </tr> */}
                                <tr className="border-top">
                                  <td>
                                    <strong className="h5">Total</strong>
                                  </td>
                                  <td className="text-right h5">
                                    <strong>
                                      $
                                      {/* {ViewOrderdata.price +
                                        ViewOrderdata.tax +
                                        50} */}
                                      {OrderHistory.totalPrice}
                                      .00
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  ) : null}
                </Modal>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orderHistory.orderHistory || [],
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerOrder,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
