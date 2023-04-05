/**
 *  Shop Checkout Page
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { placeOrder } from "../../actions/Cart";
import CommonList from "../../api/common";
import GoogleMapReact from "google-map-react";

import locationIcon from "@iconify/icons-mdi/map-marker";
import { Icon, InlineIcon } from "@iconify/react";
import closeIcon from "@iconify/icons-mdi/close";
import {
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Nav,
  ButtonGroup,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardLink,
  Button,
  CardSubtitle,
} from "reactstrap";
import { connect } from "react-redux";
import { getDealer } from "../../actions/Checkout/Dealer";
import { getCartItems } from "../../actions/Cart/index";
import { bindActionCreators } from "redux";
import { toast } from "react-toastify";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon
      style={{ fontSize: 40, color: "red" }}
      icon={locationIcon}
      className="pin-icon"
    />
    <div
      style={{
        backgroundColor: "white",
        padding: 8,
        width: 80,
        borderRadius: 8,
      }}
    >
      <p
        style={{
          fontSize: 16,
          color: "black",
        }}
        className="pin-text"
      >
        {text}
      </p>
    </div>
  </div>
);

class CheckOut extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  constructor(props) {
    super(props);
    this.state = {
      ShippingFlatRate: 0.0,
      ShippingLocalPickUp: 0.0,
      TotalShippingCarge: 0.0,
      fieldvalue: {
        email: "",
        firstname: "",
        lastname: "",
        company_name: "",
        line_1: "",
        line_2: "",
        city: "",
        postcode: "",
        country: "",
        spFirstname: "",
        spLastname: "",
        spCompanyName: "",
        spLine_1: "",
        spLine_2: "",
        selectedOption: "",
        spCity: "",
        spPostcode: "",
        spCountry: "",
        mobile_number: "",
      },
      selectedOption: "Shipping",
      modal: false,
      selectDealer: undefined,
      errors: {},
      selectedPaymentOption: "",
      paymentModal: false,
      cvc: "",
      expiry: "",
      focus: "",
      name: "",
      number: "",
      orderProcess: false,
    };
    this.ReadShippingCharge = this.ReadShippingCharge.bind(this);
    this.props.getDealer();
  }

  componentDidMount() {
    //  this.ReadShippingCharge(document, 'script');
    var evt = document.createEvent("Event");
    evt.initEvent("load", false, false);
    window.dispatchEvent(evt);
    window.scrollTo(0, 0);

    this.props.getCartItems().then((result) => {
      localStorage.setItem("LocalCartItems", JSON.stringify(result));
      this.forceUpdate();
    });
  }

  ReadCartItems() {
    var cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (cart == null) {
      this.props.history.push(`/`);
    }
    return cart;
  }

  ReadShippingCharge() {
    if (localStorage.getItem("TotalShippingCharge") != null) {
      this.state.TotalShippingCarge = parseFloat(
        localStorage.getItem("TotalShippingCharge")
      );
    } else {
      this.state.TotalShippingCarge = 0;
    }

    if (localStorage.getItem("ShippingType") != null) {
      if (localStorage.getItem("ShippingType") == 1) {
        this.refs.rd1.setAttribute("checked", "checked");
        this.refs.rd2.removeAttribute("checked");

        if (this.refs.rd1 != null) this.refs.rd1.checked = true;
      } else if (localStorage.getItem("ShippingType") == 2) {
        this.refs.rd2.setAttribute("checked", "checked");
        this.refs.rd1.removeAttribute("checked");

        this.refs.rd2.checked = true;
      }
    }
    this.forceUpdate();
  }

  onValueChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
      modal: event.target.value != "Shipping",
      ...(event.target.value ? { selectDealer: "" } : null),
    });
  };

  copyBillingInformation() {
    this.setState(
      {
        fieldvalue: {
          ...this.state.fieldvalue,
          spFirstname: this.state.fieldvalue.firstname,
          spLastname: this.state.fieldvalue.lastname,
          spCompanyName: this.state.fieldvalue.company_name,
          spLine_1: this.state.fieldvalue.line_1,
          spLine_2: this.state.fieldvalue.line_2,
          spCity: this.state.fieldvalue.city,
          spPostcode: this.state.fieldvalue.postcode,
          // spCountry: this.state.fieldvalue.country,
        },
      },
      () => {}
    );
  }

  onPaymentOptionChange = (event) => {
    this.setState({
      selectedPaymentOption: event.target.value,
    });
  };

  renderRadioOption() {
    //Shipping

    //Ship from dealer with shipping information

    //Pickup from dealer
    return (
      <Row>
        <Col md={4}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Shipping"
                checked={this.state.selectedOption === "Shipping"}
                onChange={this.onValueChange}
                class="input-radio"
              />{" "}
              Shipping
            </label>
          </div>
        </Col>
        <Col md={4}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Ship from dealer"
                checked={this.state.selectedOption === "Ship from dealer"}
                onChange={this.onValueChange}
                class="input-radio"
              />{" "}
              Ship from dealer
            </label>
          </div>
        </Col>
        <Col md={4}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Pickup from dealer"
                checked={this.state.selectedOption === "Pickup from dealer"}
                onChange={this.onValueChange}
                class="input-radio"
              />{" "}
              Pickup from dealer
            </label>
          </div>
        </Col>
      </Row>
    );
  }

  SetShippingCharge = (CaseNo) => {
    if (CaseNo == 1) {
      this.state.TotalShippingCarge = this.state.ShippingFlatRate;

      this.refs.rd1.setAttribute("checked", "checked");
      this.refs.rd2.removeAttribute("checked");

      if (this.refs.rd1 != null) this.refs.rd1.checked = true;

      localStorage.setItem(
        "TotalShippingCharge",
        this.state.TotalShippingCarge
      );
      localStorage.setItem("ShippingType", 1);
    } else if (CaseNo == 2) {
      this.state.TotalShippingCarge = this.state.ShippingLocalPickUp;

      this.refs.rd2.setAttribute("checked", "checked");
      this.refs.rd1.removeAttribute("checked");

      this.refs.rd2.checked = true;

      localStorage.setItem(
        "TotalShippingCharge",
        this.state.TotalShippingCarge
      );
      localStorage.setItem("ShippingType", 2);
    }
    this.forceUpdate();
  };

  onCheckOutSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    if (this.handleValidation()) {
      if (this.state.selectedPaymentOption === "Online Payment") {
        this.setState({ paymentModal: true });
      } else {
        this.placeOrderCall();
      }
    }
  }

  placeOrderCall() {
    console.log("getCheckoutParams", this.getCheckoutParams());
    this.setState({ orderProcess: true });
    placeOrder(this.getCheckoutParams()).then((response) => {
      console.log("CHECKOUT RESPOSE", response);
      if (response) {
        localStorage.setItem(
          "FinalCheckoutCartItems",
          localStorage.getItem("LocalCartItems")
        );
        this.setState({ paymentModal: false });
        localStorage.removeItem("LocalCartItems");
        this.props.history.push(`/SuccessScreen`);
        this.setState({ orderProcess: false });
      } else {
        alert("Please try again");
        this.setState({ orderProcess: false });
      }
    });
  }

  getCustomerInfo() {
    if (this.props.user.customer_id) {
      return {
        customer: {
          id: this.props.user.customer_id,
        },
      };
    } else {
      return {
        customer: {
          email: this.state.fieldvalue.email,
          name:
            this.state.fieldvalue.firstname +
            " " +
            this.state.fieldvalue.lastname,
        },
      };
    }
  }

  getCheckoutParams() {
    // if (this.state.selectedOption == "Pickup from dealer") {
    //   return this.getDealerParams();
    // } else if (this.state.selectedOption == "Ship from dealer") {
    //   return this.getDealerShippingParams();
    // } else if (this.state.selectedOption == "Shipping") {
    //   return this.getPlaceOrderParams();
    // }
    if (this.state.selectedOption == "Shipping") {
      return this.getPlaceOrderParams();
    }
  }

  getFulfillment() {
    if (this.state.selectedOption == "Pickup from dealer") {
      return {
        fulfillment: 3,
        dealer_info: {
          id: this.state.selectDealer.dealer_ID,
        },
        payment_mode:
          this.state.selectedPaymentOption == "Online Payment" ? 2 : 1,
      };
    } else if (this.state.selectedOption == "Ship from dealer") {
      return {
        fulfillment: 2,
        dealer_info: {
          id: this.state.selectDealer.dealer_ID,
        },
        payment_mode:
          this.state.selectedPaymentOption == "Online Payment" ? 2 : 1,
      };
    } else if (this.state.selectedOption == "Shipping") {
      return {
        fulfillment: 1,
        dealer_info: {
          id: "",
        },
        payment_mode:
          this.state.selectedPaymentOption == "Online Payment" ? 2 : 1,
      };
    }
  }

  getPlaceOrderParams() {
    let params = {
      cartId: this.props.cartID,
      shipping: {
        zoneId: "zone1",
        methodId: "fedex-2dayground",
        amount: 10,
      },
      paymentMethods: [
        {
          provider: "stripe",
          customAttributes: {
            paymentType: "invoice",
          },
          method: "invoice",
        },
      ],
      addresses: [
       
        {
          contactName:  this.state.fieldvalue.firstname,
          street: this.state.fieldvalue.lastname,
          streetNumber: this.state.fieldvalue.companyname,
          streetAppendix:this.state.fieldvalue.line_2,
          zipCode: this.state.fieldvalue.postcode,
          city: this.state.fieldvalue.line_2,
          country: "GB",
          type: "SHIPPING",
        },
        {
          contactName:  this.state.fieldvalue.firstname,
          street: this.state.fieldvalue.lastname,
          streetNumber: this.state.fieldvalue.companyname,
          streetAppendix:this.state.fieldvalue.line_2,
          zipCode: this.state.fieldvalue.postcode,
          city: this.state.fieldvalue.line_2,
          country: "GB",
          type: "BILLING",
        },
      ],
      customer: {
        id:  this.props.user.customer_id,
        title:  this.props.user.title,
        firstName:  this.props.user.firstName,
        lastName:  this.props.user.lastName,
        contactPhone: this.props.user.contactPhone,
        email: this.props.user.contactEmail
        ,
      },
    };

    return params;
  }

  getDealerParams() {
    let params = {
      data: {
        ...this.getFulfillment(),
        ...this.getCustomerInfo(),
        billing_address: {
          first_name: this.state.fieldvalue.firstname,
          last_name: this.state.fieldvalue.lastname,
          company_name: this.state.fieldvalue.company_name,
          line_1: this.state.fieldvalue.line_1,
          line_2: this.state.fieldvalue.line_2,
          city: this.state.fieldvalue.city,
          county: this.state.fieldvalue.country,
          postcode: this.state.fieldvalue.postcode,
          country: this.state.fieldvalue.country,
        },
        shipping_address: {
          first_name: this.state.fieldvalue.firstname,
          last_name: this.state.fieldvalue.lastname,
          company_name: this.state.fieldvalue.company_name,
          line_1: this.state.fieldvalue.line_1,
          line_2: this.state.fieldvalue.line_2,
          city: this.state.fieldvalue.city,
          county: this.state.fieldvalue.country,
          postcode: this.state.fieldvalue.postcode,
          country: this.state.fieldvalue.country,
          mobile_number: this.state.fieldvalue.mobile_number,
        },
      },
    };

    return params;
  }

  getDealerShippingParams() {
    let params = {
      data: {
        ...this.getFulfillment(),
        ...this.getCustomerInfo(),
        billing_address: {
          first_name: this.state.fieldvalue.firstname,
          last_name: this.state.fieldvalue.lastname,
          company_name: this.state.fieldvalue.companyname,
          line_1: this.state.fieldvalue.line_1,
          line_2: this.state.fieldvalue.line_2,
          city: this.state.fieldvalue.t,
          county: this.state.fieldvalue.country,
          postcode: this.state.fieldvalue.postcode,
          country: this.state.fieldvalue.country,
        },
        shipping_address: {
          first_name: this.state.fieldvalue.spFirstname,
          last_name: this.state.fieldvalue.spLastname,
          company_name: this.state.fieldvalue.spCompanyName,
          line_1: this.state.fieldvalue.spLine_1,
          line_2: this.state.fieldvalue.spLine_2,
          city: this.state.fieldvalue.spCity,
          county: this.state.fieldvalue.spCountry,
          postcode: this.state.fieldvalue.spPostcode,
          country: this.state.fieldvalue.spCountry,
          mobile_number: this.state.fieldvalue.mobile_number,
        },
      },
    };

    return params;
  }

  handleValidation() {
    let fieldvalue = this.state.fieldvalue;
    let errors = {};
    let formIsValid = true;

    //First Name
    if (!fieldvalue["firstname"]) {
      formIsValid = false;
      errors["firstname"] = "Please Enter First Name";
    }

    if (typeof fieldvalue["firstname"] !== "undefined") {
      if (!fieldvalue["firstname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["firstname"] = "Please Enter Only Letter";
      }
    }

    //Last Name
    if (!fieldvalue["lastname"]) {
      formIsValid = false;
      errors["lastname"] = "Please Enter Last Name";
    }

    if (typeof fieldvalue["lastname"] !== "undefined") {
      if (!fieldvalue["lastname"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["lastname"] = "Please Enter Only Letter";
      }
    }

    //Last Name
    // if (!fieldvalue["mobile_number"]) {
    //   formIsValid = false;
    //   errors["mobile_number"] = "Please Enter Mobile Name";
    // }

    // //streetno
    // if (!fieldvalue["streetno"]) {
    //   formIsValid = false;
    //   errors["streetno"] = "Please Enter Street address";
    // }

    //state
    // if (!fieldvalue["city"]) {
    //   formIsValid = false;
    //   errors["city"] = "Please Enter Town / City";
    // }

    if (!fieldvalue["postcode"]) {
      formIsValid = false;
      errors["postcode"] = "Please Enter Postcode / ZIP";
    }

    if (typeof fieldvalue["postcode"] !== "undefined") {
      if (fieldvalue["postcode"].length < 4) {
        formIsValid = false;
        errors["postcode"] = "Please Enter valid Postcode / ZIP";
      }
    }

    // if (!fieldvalue["phone"]) {
    //   formIsValid = false;
    //   errors["phone"] = "Please Enter Phone";
    // }

    // if (typeof fieldvalue["phone"] !== "undefined") {
    //   if (!fieldvalue["phone"].match(/^\d{10}$/)) {
    //     formIsValid = false;
    //     errors["phone"] = "Please Enter Valid Phone";
    //   }
    // }

    //Email ID
    // if (!fieldvalue["email"]) {
    //   formIsValid = false;
    //   errors["email"] = "Please Enter Email ID";
    // }
    this.setState({ errors: errors });
    localStorage.setItem("firstname", fieldvalue["firstname"]);
    localStorage.setItem("lastname", fieldvalue["lastname"]);

    // if (this.state.selectedOption != "Pickup from dealer") {

    //   if (!fieldvalue["spFirstname"]) {
    //     formIsValid = false;
    //     errors["spFirstname"] = "Please Enter First Name";
    //   }

    //   if (typeof fieldvalue["spFirstname"] !== "undefined") {
    //     if (!fieldvalue["spFirstname"].match(/^[a-zA-Z]+$/)) {
    //       formIsValid = false;
    //       errors["spFirstname"] = "Please Enter Only Letter";
    //     }
    //   }

    //   //Last Name
    //   if (!fieldvalue["spLastname"]) {
    //     formIsValid = false;
    //     errors["spLastname"] = "Please Enter Last Name";
    //   }

    //   if (typeof fieldvalue["spLastname"] !== "undefined") {
    //     if (!fieldvalue["spLastname"].match(/^[a-zA-Z]+$/)) {
    //       formIsValid = false;
    //       errors["spLastname"] = "Please Enter Only Letter";
    //     }
    //   }

    //   // //streetno
    //   // if (!fieldvalue["streetno"]) {
    //   //   formIsValid = false;
    //   //   errors["streetno"] = "Please Enter Street address";
    //   // }

    //   //state
    //   if (!fieldvalue["spCity"]) {
    //     formIsValid = false;
    //     errors["spCity"] = "Please Enter Town / City";
    //   }

    //   if (!fieldvalue["spPostcode"]) {
    //     formIsValid = false;
    //     errors["spPostcode"] = "Please Enter Postcode / ZIP";
    //   }

    //   if (typeof fieldvalue["spPostcode"] !== "undefined") {
    //     if (fieldvalue["spPostcode"].length < 5) {
    //       formIsValid = false;
    //       errors["spPostcode"] = "Please Enter valid Postcode / ZIP";
    //     }
    //   }
    // }

    if (this.state.selectedPaymentOption == "") {
      alert("Please select the payment mode");
      formIsValid = false;
    }
    return formIsValid;
  }

  handleChange(field, e) {
    let fieldvalue = this.state.fieldvalue;
    fieldvalue[field] = e.target.value;
    this.setState({ fieldvalue });
  }

  // _getCountryList(key, id) {
  //   return (
  //     <select
  //       name={id}
  //       id={id}
  //       class="form-control"
  //       onChange={this.handleChange.bind(this, key)}
  //     >
  //       <option value="AX">Åland Islands</option>
  //       <option value="AF">Afghanistan</option>
  //       <option value="AL">Albania</option>
  //       <option value="DZ">Algeria</option>
  //       <option value="AS">American Samoa</option>
  //       <option value="AD">Andorra</option>
  //       <option value="AO">Angola</option>
  //       <option value="AI">Anguilla</option>
  //       <option value="AQ">Antarctica</option>
  //       <option value="AG">Antigua and Barbuda</option>
  //       <option value="AR">Argentina</option>
  //       <option value="AM">Armenia</option>
  //       <option value="AW">Aruba</option>
  //       <option value="AU">Australia</option>
  //       <option value="AT">Austria</option>
  //       <option value="AZ">Azerbaijan</option>
  //       <option value="BS">Bahamas</option>
  //       <option value="BH">Bahrain</option>
  //       <option value="BD">Bangladesh</option>
  //       <option value="BB">Barbados</option>
  //       <option value="BY">Belarus</option>
  //       <option value="PW">Belau</option>
  //       <option value="BE">Belgium</option>
  //       <option value="BZ">Belize</option>
  //       <option value="BJ">Benin</option>
  //       <option value="BM">Bermuda</option>
  //       <option value="BT">Bhutan</option>
  //       <option value="BO">Bolivia</option>
  //       <option value="BQ">Bonaire, Saint Eustatius and Saba</option>
  //       <option value="BA">Bosnia and Herzegovina</option>
  //       <option value="BW">Botswana</option>
  //       <option value="BV">Bouvet Island</option>
  //       <option value="BR">Brazil</option>
  //       <option value="IO">British Indian Ocean Territory</option>
  //       <option value="VG">British Virgin Islands</option>
  //       <option value="BN">Brunei</option>
  //       <option value="BG">Bulgaria</option>
  //       <option value="BF">Burkina Faso</option>
  //       <option value="BI">Burundi</option>
  //       <option value="KH">Cambodia</option>
  //       <option value="CM">Cameroon</option>
  //       <option value="CA">Canada</option>
  //       <option value="CV">Cape Verde</option>
  //       <option value="KY">Cayman Islands</option>
  //       <option value="CF">Central African Republic</option>
  //       <option value="TD">Chad</option>
  //       <option value="CL">Chile</option>
  //       <option value="CN">China</option>
  //       <option value="CX">Christmas Island</option>
  //       <option value="CC">Cocos (Keeling) Islands</option>
  //       <option value="CO">Colombia</option>
  //       <option value="KM">Comoros</option>
  //       <option value="CG">Congo (Brazzaville)</option>
  //       <option value="CD">Congo (Kinshasa)</option>
  //       <option value="CK">Cook Islands</option>
  //       <option value="CR">Costa Rica</option>
  //       <option value="HR">Croatia</option>
  //       <option value="CU">Cuba</option>
  //       <option value="CW">Curaçao</option>
  //       <option value="CY">Cyprus</option>
  //       <option value="CZ">Czech Republic</option>
  //       <option value="DK">Denmark</option>
  //       <option value="DJ">Djibouti</option>
  //       <option value="DM">Dominica</option>
  //       <option value="DO">Dominican Republic</option>
  //       <option value="EC">Ecuador</option>
  //       <option value="EG">Egypt</option>
  //       <option value="SV">El Salvador</option>
  //       <option value="GQ">Equatorial Guinea</option>
  //       <option value="ER">Eritrea</option>
  //       <option value="EE">Estonia</option>
  //       <option value="ET">Ethiopia</option>
  //       <option value="FK">Falkland Islands</option>
  //       <option value="FO">Faroe Islands</option>
  //       <option value="FJ">Fiji</option>
  //       <option value="FI">Finland</option>
  //       <option value="FR">France</option>
  //       <option value="GF">French Guiana</option>
  //       <option value="PF">French Polynesia</option>
  //       <option value="TF">French Southern Territories</option>
  //       <option value="GA">Gabon</option>
  //       <option value="GM">Gambia</option>
  //       <option value="GE">Georgia</option>
  //       <option value="DE">Germany</option>
  //       <option value="GH">Ghana</option>
  //       <option value="GI">Gibraltar</option>
  //       <option value="GR">Greece</option>
  //       <option value="GL">Greenland</option>
  //       <option value="GD">Grenada</option>
  //       <option value="GP">Guadeloupe</option>
  //       <option value="GU">Guam</option>
  //       <option value="GT">Guatemala</option>
  //       <option value="GG">Guernsey</option>
  //       <option value="GN">Guinea</option>
  //       <option value="GW">Guinea-Bissau</option>
  //       <option value="GY">Guyana</option>
  //       <option value="HT">Haiti</option>
  //       <option value="HM">Heard Island and McDonald Islands</option>
  //       <option value="HN">Honduras</option>
  //       <option value="HK">Hong Kong</option>
  //       <option value="HU">Hungary</option>
  //       <option value="IS">Iceland</option>
  //       <option value="IN">India</option>
  //       <option value="ID">Indonesia</option>
  //       <option value="IR">Iran</option>
  //       <option value="IQ">Iraq</option>
  //       <option value="IE">Ireland</option>
  //       <option value="IM">Isle of Man</option>
  //       <option value="IL">Israel</option>
  //       <option value="IT">Italy</option>
  //       <option value="CI">Ivory Coast</option>
  //       <option value="JM">Jamaica</option>
  //       <option value="JP">Japan</option>
  //       <option value="JE">Jersey</option>
  //       <option value="JO">Jordan</option>
  //       <option value="KZ">Kazakhstan</option>
  //       <option value="KE">Kenya</option>
  //       <option value="KI">Kiribati</option>
  //       <option value="KW">Kuwait</option>
  //       <option value="KG">Kyrgyzstan</option>
  //       <option value="LA">Laos</option>
  //       <option value="LV">Latvia</option>
  //       <option value="LB">Lebanon</option>
  //       <option value="LS">Lesotho</option>
  //       <option value="LR">Liberia</option>
  //       <option value="LY">Libya</option>
  //       <option value="LI">Liechtenstein</option>
  //       <option value="LT">Lithuania</option>
  //       <option value="LU">Luxembourg</option>
  //       <option value="MO">Macao S.A.R., China</option>
  //       <option value="MK">Macedonia</option>
  //       <option value="MG">Madagascar</option>
  //       <option value="MW">Malawi</option>
  //       <option value="MY">Malaysia</option>
  //       <option value="MV">Maldives</option>
  //       <option value="ML">Mali</option>
  //       <option value="MT">Malta</option>
  //       <option value="MH">Marshall Islands</option>
  //       <option value="MQ">Martinique</option>
  //       <option value="MR">Mauritania</option>
  //       <option value="MU">Mauritius</option>
  //       <option value="YT">Mayotte</option>
  //       <option value="MX">Mexico</option>
  //       <option value="FM">Micronesia</option>
  //       <option value="MD">Moldova</option>
  //       <option value="MC">Monaco</option>
  //       <option value="MN">Mongolia</option>
  //       <option value="ME">Montenegro</option>
  //       <option value="MS">Montserrat</option>
  //       <option value="MA">Morocco</option>
  //       <option value="MZ">Mozambique</option>
  //       <option value="MM">Myanmar</option>
  //       <option value="NA">Namibia</option>
  //       <option value="NR">Nauru</option>
  //       <option value="NP">Nepal</option>
  //       <option value="NL">Netherlands</option>
  //       <option value="NC">New Caledonia</option>
  //       <option value="NZ">New Zealand</option>
  //       <option value="NI">Nicaragua</option>
  //       <option value="NE">Niger</option>
  //       <option value="NG">Nigeria</option>
  //       <option value="NU">Niue</option>
  //       <option value="NF">Norfolk Island</option>
  //       <option value="KP">North Korea</option>
  //       <option value="MP">Northern Mariana Islands</option>
  //       <option value="NO">Norway</option>
  //       <option value="OM">Oman</option>
  //       <option value="PK">Pakistan</option>
  //       <option value="PS">Palestinian Territory</option>
  //       <option value="PA">Panama</option>
  //       <option value="PG">Papua New Guinea</option>
  //       <option value="PY">Paraguay</option>
  //       <option value="PE">Peru</option>
  //       <option value="PH">Philippines</option>
  //       <option value="PN">Pitcairn</option>
  //       <option value="PL">Poland</option>
  //       <option value="PT">Portugal</option>
  //       <option value="PR">Puerto Rico</option>
  //       <option value="QA">Qatar</option>
  //       <option value="RE">Reunion</option>
  //       <option value="RO">Romania</option>
  //       <option value="RU">Russia</option>
  //       <option value="RW">Rwanda</option>
  //       <option value="ST">São Tomé and Príncipe</option>
  //       <option value="BL">Saint Barthélemy</option>
  //       <option value="SH">Saint Helena</option>
  //       <option value="KN">Saint Kitts and Nevis</option>
  //       <option value="LC">Saint Lucia</option>
  //       <option value="SX">Saint Martin (Dutch part)</option>
  //       <option value="MF">Saint Martin (French part)</option>
  //       <option value="PM">Saint Pierre and Miquelon</option>
  //       <option value="VC">Saint Vincent and the Grenadines</option>
  //       <option value="WS">Samoa</option>
  //       <option value="SM">San Marino</option>
  //       <option value="SA">Saudi Arabia</option>
  //       <option value="SN">Senegal</option>
  //       <option value="RS">Serbia</option>
  //       <option value="SC">Seychelles</option>
  //       <option value="SL">Sierra Leone</option>
  //       <option value="SG">Singapore</option>
  //       <option value="SK">Slovakia</option>
  //       <option value="SI">Slovenia</option>
  //       <option value="SB">Solomon Islands</option>
  //       <option value="SO">Somalia</option>
  //       <option value="ZA">South Africa</option>
  //       <option value="GS">South Georgia/Sandwich Islands</option>
  //       <option value="KR">South Korea</option>
  //       <option value="SS">South Sudan</option>
  //       <option value="ES">Spain</option>
  //       <option value="LK">Sri Lanka</option>
  //       <option value="SD">Sudan</option>
  //       <option value="SR">Suriname</option>
  //       <option value="SJ">Svalbard and Jan Mayen</option>
  //       <option value="SZ">Swaziland</option>
  //       <option value="SE">Sweden</option>
  //       <option value="CH">Switzerland</option>
  //       <option value="SY">Syria</option>
  //       <option value="TW">Taiwan</option>
  //       <option value="TJ">Tajikistan</option>
  //       <option value="TZ">Tanzania</option>
  //       <option value="TH">Thailand</option>
  //       <option value="TL">Timor-Leste</option>
  //       <option value="TG">Togo</option>
  //       <option value="TK">Tokelau</option>
  //       <option value="TO">Tonga</option>
  //       <option value="TT">Trinidad and Tobago</option>
  //       <option value="TN">Tunisia</option>
  //       <option value="TR">Turkey</option>
  //       <option value="TM">Turkmenistan</option>
  //       <option value="TC">Turks and Caicos Islands</option>
  //       <option value="TV">Tuvalu</option>
  //       <option value="UG">Uganda</option>
  //       <option value="UA">Ukraine</option>
  //       <option value="AE">United Arab Emirates</option>
  //       <option value="GB">United Kingdom (UK)</option>
  //       <option value="US" selected>
  //         United States (US)
  //       </option>
  //       <option value="UM">United States (US) Minor Outlying Islands</option>
  //       <option value="VI">United States (US) Virgin Islands</option>
  //       <option value="UY">Uruguay</option>
  //       <option value="UZ">Uzbekistan</option>
  //       <option value="VU">Vanuatu</option>
  //       <option value="VA">Vatican</option>
  //       <option value="VE">Venezuela</option>
  //       <option value="VN">Vietnam</option>
  //       <option value="WF">Wallis and Futuna</option>
  //       <option value="EH">Western Sahara</option>
  //       <option value="YE">Yemen</option>
  //       <option value="ZM">Zambia</option>
  //       <option value="ZW">Zimbabwe</option>
  //     </select>
  //   );
  // }

  _renderShippingAddress() {
    return (
      <div class="shipping-fields mt-2 mb-4">
        <h4>Shipping details</h4>
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="shipping-check"
            onChange={() => {
              this.copyBillingInformation();
            }}
          />
          <label class="form-check-label" for="shipping-check">
            Copy Shipping Address
          </label>
        </div>

        <div class="shipping-fields__field-wrapper">
          <div class="form-group">
            <label for="shipping_first_name" class="">
            Contact Name&nbsp;
              <abbr class="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              class="form-control"
              name="shipping_first_name"
              id="shipping_first_name"
              placeholder=""
              value={this.state.fieldvalue.spFirstname}
              onChange={this.handleChange.bind(this, "spFirstname")}
            />
            <span className="error">{this.state.errors["spFirstname"]}</span>
          </div>
          <div class="form-group">
            <label for="shipping_last_name" class="">
            Street &nbsp;
              <abbr class="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              class="form-control "
              name="shipping_last_name"
              id="shipping_last_name"
              placeholder=""
              value={this.state.fieldvalue.spLastname}
              onChange={this.handleChange.bind(this, "spLastname")}
            />
            <span className="error">{this.state.errors["spLastname"]}</span>
          </div>

          <div class="form-group">
            <label for="shipping_company" class="">
            Street Number&nbsp;
              {/* <span class="optional">(optional)</span> */}
            </label>
            <Input
              type="text"
              class="form-control"
              name="shipping_company"
              id="shipping_company"
              placeholder=""
              value={this.state.fieldvalue.spCompanyName}
              onChange={this.handleChange.bind(this, "spCompanyName")}
            />
          </div>
          <div class="form-group">
            <label for="shipping_company" class="">
            Street Appendix&nbsp;
              {/* <span class="optional">(optional)</span> */}
            </label>
            <Input
              type="text"
              class="form-control"
              name="line_1"
              id="line_1"
              placeholder=""
              value={this.state.fieldvalue.spLine_1}
              onChange={this.handleChange.bind(this, "spLine_1")}
            />
          </div>
          <div class="form-group">
            <label for="shipping_company" class="">
            City&nbsp;
              {/* <span class="optional">(optional)</span> */}
            </label>
            <Input
              type="text"
              class="form-control"
              name="line_2"
              id="line_2"
              placeholder=""
              value={this.state.fieldvalue.spLine_2}
              onChange={this.handleChange.bind(this, "spLine_2")}
            />
          </div>
          {/* <div class="form-group">
            <label for="sp_shipping_country" class="">
              Country&nbsp;
              <abbr class="required" title="required"></abbr>
            </label>
            {this._getCountryList("spCountry", "sp_shipping_country")}
          </div> */}
          {/* <div class="form-group">
            <label for="shipping_city" class="">
              Town / City&nbsp;
              <abbr class="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              class="form-control"
              name="shipping_city"
              id="shipping_city"
              placeholder=""
              value={this.state.fieldvalue.spCity}
              onChange={this.handleChange.bind(this, "spCity")}
            />
            <span className="error">{this.state.errors["spCity"]}</span>
          </div> */}
          <div class="form-group">
            <label for="shipping_postcode" class="">
              Postcode / ZIP&nbsp;
              <abbr class="required" title="required">
                *
              </abbr>
            </label>
            <Input
              type="text"
              class="form-control"
              name="shipping_postcode"
              id="shipping_postcode"
              placeholder=""
              value={this.state.fieldvalue.spPostcode}
              autocomplete="postal-code"
              onChange={this.handleChange.bind(this, "spPostcode")}
            />
            <span className="error">{this.state.errors["spPostcode"]}</span>
          </div>
        </div>
      </div>
    );
  }

  _dealerCard(info, isHide = false) {
    return (
      <Card className={"mb-2"}>
        <CardBody>
          <CardTitle>{info.dealer_Name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted">
            ZipCode: {info.zipcode}
          </CardSubtitle>
          <CardText>{info.address}</CardText>
          {!isHide && (
            <Button
              onClick={() => {
                this.setState({ modal: false, selectDealer: info });
              }}
            >
              Select
            </Button>
          )}
        </CardBody>
      </Card>
    );
  }

  _renderShopModal() {
    console.log("DAssadsadasasdasthis.props.dealerList", this.props.dealerList);
    let mapCenterPoint = this.props.center;
    if (this.props.dealerList && this.props.dealerList.length > 0) {
      mapCenterPoint = {
        lat: parseFloat(this.props.dealerList[0].latitude),
        lng: parseFloat(this.props.dealerList[0].longitude),
      };
    }
    return (
      <Modal
        className="modal-login my-modal"
        isOpen={this.state.modal}
        toggle={this.toggle}
        onKeyDown={(event) => {
          this.setState({ modal: false });
        }}
        // className="modal-login"
      >
        <ModalHeader toggle={this.toggle}>
          {/* <h3 className="text-center" style={{ color: "#fff" }}> */}
          Select Dealer
          {/* </h3> */}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6} className="text-left dealer-listing">
              {this.props.dealerList.map((info) => {
                return this._dealerCard(info);
              })}
            </Col>
            <Col md={6} className="text-right">
              <div style={{ height: "80vh", width: "100%" }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyCzppWCOb9HvXsq08jQAXJaZJ2-IxLbK0M",
                  }}
                  defaultCenter={mapCenterPoint}
                  defaultZoom={14}
                >
                  {this.props.dealerList.map((info) => {
                    return (
                      <LocationPin
                        lat={parseFloat(info.latitude)}
                        lng={parseFloat(info.longitude)}
                        text={info.dealer_Name}
                      />
                    );
                  })}
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  _renderPaymentCardModel() {
    return (
      <Modal
        className="modal-login modal-dialog-centered"
        isOpen={this.state.paymentModal}
        toggle={this.toggle}
        onKeyDown={(event) => {
          this.setState({ modal: false });
        }}
        // className="modal-login"
      >
        <ModalHeader
          style={{ display: "block", padding: 12 }}
          toggle={this.toggle}
        >
          <Row className="align-items-center mt-1">
            <Col md={8} className="text-left">
              <h1>Payment</h1>
            </Col>
            <Col md={4} className="text-right">
              <button
                style={{ backgroundColor: "transparent" }}
                type="submit"
                class="button alt"
                name="checkout_pay"
                id="place_order"
                value="pay"
                data-value="pay"
                onClick={() => {
                  this.setState({ paymentModal: false });
                }}
              >
                <Icon icon={closeIcon} />
              </button>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <div md={6} className="intro-title align-items-center">
            <div id="PaymentForm">
              <Cards
                cvc={this.state.cvc}
                expiry={this.state.expiry}
                focused={this.state.focus}
                name={this.state.name}
                number={this.state.number}
              />
              <form>
                <Col md={12} className="text-center">
                  <Row className="align-items-center mt-4">
                    <input
                      class="form-control "
                      type="tel"
                      name="number"
                      placeholder="Card Number"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Row>
                  <Row className="align-items-center mt-2">
                    <input
                      class="form-control "
                      type=""
                      name="name"
                      placeholder="Name"
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </Row>
                  <Row className="mt-2">
                    <div
                      style={{ padding: "0px", paddingRigth: "6px" }}
                      className="text-left col-md-6"
                    >
                      <input
                        type="tel"
                        class="form-control "
                        name="expiry"
                        placeholder="Expiry Date"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                    <div
                      style={{ padding: "0px", paddingLeft: "6px" }}
                      className="text-left col-md-6"
                    >
                      <input
                        type="tel"
                        name="cvc"
                        class="form-control "
                        placeholder="CVC"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                      />
                    </div>
                  </Row>
                  <Row className="mt-2 text-center">
                    <div className="mt-2">
                      <Button
                        style={{
                          "vertical-align": "middle",
                          float: "left",
                          padding: "9px 20px",
                          position: "relative",
                          border: "none",
                          "font-size": "14px",
                          background: "#5224B5",
                          color: "#fff",
                          "line-height": "26px",
                          "text-transform": "uppercase",
                          "border-radius": "3px",
                          "font-weight": "400",
                          cursor: "pointer",
                          display: "inline-block",
                          "font-family": "inherit",
                        }}
                        onClick={() => {
                          if (!this.state.orderProcess) {
                            return this.placeOrderCall();
                          }
                        }}
                      >
                        {this.state.orderProcess ? "Order Placing..." : "Pay"}
                      </Button>
                    </div>
                  </Row>
                </Col>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }

  render() {
    return (
      <div class="site-content">
        {this._renderShopModal()}
        {this._renderPaymentCardModel()}

        <div className="inner-intro">
          <Container>
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>Checkout</h1>
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
                    <span>Checkout</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="content-wrapper mb-7">
          <Container>
            <form onSubmit={this.onCheckOutSubmit.bind(this)}>
              <Row class="mt-5">
                <Col class="col-lg-6">
                  <Row>
                    <Col sm={12}>
                      <div class="billing-fields mt-5">
                        <h3>Billing details</h3>
                        <div class="billing-fields__field-wrapper">
                          <div class="form-group">
                            <label for="billing_first_name" class="">
                            Contact Name&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="billing_first_name"
                              id="billing_first_name"
                              placeholder=""
                              value={this.state.fieldvalue.firstname}
                              onChange={this.handleChange.bind(
                                this,
                                "firstname"
                              )}
                            />
                            <span className="error">
                              {this.state.errors["firstname"]}
                            </span>
                          </div>
                          <div class="form-group">
                            <label for="billing_last_name" class="">
                            Street &nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control "
                              name="billing_last_name"
                              id="billing_last_name"
                              placeholder=""
                              value={this.state.fieldvalue.lastname}
                              onChange={this.handleChange.bind(
                                this,
                                "lastname"
                              )}
                            />
                            <span className="error">
                              {this.state.errors["lastname"]}
                            </span>
                          </div>

                          {/* <div class="form-group">
                            <label for="billing_email" class="">
                              Email address&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="email"
                              class="form-control"
                              name="billing_email"
                              id="billing_email"
                              placeholder=""
                              value={this.state.fieldvalue.email}
                              autocomplete="email username"
                              onChange={this.handleChange.bind(this, "email")}
                            />
                            <span className="error">
                              {this.state.errors["email"]}
                            </span>
                          </div> */}

                          {/* <div class="form-group">
                            <label for="billing_mobile_name" class="">
                              Mobile Number&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control "
                              name="billing_last_name"
                              id="billing_last_name"
                              placeholder=""
                              value={this.state.fieldvalue.mobile_number}
                              onChange={this.handleChange.bind(
                                this,
                                "mobile_number"
                              )}
                            />
                            <span className="error">
                              {this.state.errors["mobile_number"]}
                            </span>
                          </div> */}

                          <div class="form-group">
                            <label for="billing_company" class="">
                            Street Number &nbsp;
                              {/* <span class="optional">(optional)</span> */}
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="company_name"
                              id="company_name"
                              placeholder=""
                              value={this.state.fieldvalue.company_name}
                              onChange={this.handleChange.bind(
                                this,
                                "company_name"
                              )}
                            />
                          </div>
                          <div class="form-group">
                            <label for="line_1" class="">
                            Street Appendix &nbsp;
                              {/* <span class="optional">(optional)</span> */}
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="line_1"
                              id="line_1"
                              placeholder=""
                              value={this.state.fieldvalue.line_1}
                              onChange={this.handleChange.bind(this, "line_1")}
                            />
                          </div>
                          <div class="form-group">
                            <label for="line_2" class="">
                            City &nbsp;
                              {/* <span class="optional">(optional)</span> */}
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="line_2"
                              id="line_2"
                              placeholder=""
                              value={this.state.fieldvalue.line_2}
                              onChange={this.handleChange.bind(this, "line_2")}
                            />
                          </div>
                          {/* <div class="form-group">
                            <label for="billing_country" class="">
                              Country&nbsp;
                              <abbr class="required" title="required"></abbr>
                            </label>
                            {this._getCountryList("country", "billing_country")}
                          </div> */}
                          {/* <div class="form-group">
                            <label for="billing_address_1" class="">
                              Street address&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="billing_address_1"
                              id="billing_address_1"
                              placeholder="House number and street name"
                              value={this.state.fieldvalue.streetno}
                              onChange={this.handleChange.bind(
                                this,
                                "streetno"
                              )}
                            />
                            <span className="error">
                              {this.state.errors["streetno"]}
                            </span>
                          </div> */}
                          {/* <div class="form-group">
                            <label
                              for="billing_address_2"
                              class="screen-reader-text"
                            >
                              Apartment, suite, unit etc.&nbsp;
                              <span class="optional">(optional)</span>
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="billing_address_2"
                              id="billing_address_2"
                              placeholder="Apartment, suite, unit etc. (optional)"
                              value={this.state.fieldvalue.address}
                              onChange={this.handleChange.bind(this, "address")}
                            />
                          </div> */}
                          {/* <div class="form-group">
                            <label for="billing_city" class="">
                              Town / City&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="billing_city"
                              id="billing_city"
                              placeholder=""
                              value={this.state.fieldvalue.city}
                              onChange={this.handleChange.bind(this, "city")}
                            />
                            <span className="error">
                              {this.state.errors["city"]}
                            </span>
                          </div> */}
                          <div class="form-group">
                            <label for="billing_postcode" class="">
                              Postcode / ZIP&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="text"
                              class="form-control"
                              name="billing_postcode"
                              id="billing_postcode"
                              placeholder=""
                              value={this.state.fieldvalue.postcode}
                              autocomplete="postal-code"
                              onChange={this.handleChange.bind(
                                this,
                                "postcode"
                              )}
                            />
                            <span className="error">
                              {this.state.errors["postcode"]}
                            </span>
                          </div>
                          {/* <div class="form-group">
                            <label for="billing_phone" class="">
                              Phone&nbsp;
                              <abbr class="required" title="required">
                                *
                              </abbr>
                            </label>
                            <Input
                              type="tel"
                              class="form-control"
                              name="billing_phone"
                              id="billing_phone"
                              placeholder=""
                              value={this.state.fieldvalue.phone}
                              autocomplete="tel"
                              onChange={this.handleChange.bind(this, "phone")}
                            />
                            <span className="error">
                              {this.state.errors["phone"]}
                            </span>
                          </div> */}
                        </div>

                        <h4>Select Preffered Delivery Option</h4>

                        {this.renderRadioOption()}
                        {this.state.selectDealer &&
                          this._dealerCard(this.state.selectDealer, true)}
                        {this.state.selectedOption != "Pickup from dealer" &&
                          this._renderShippingAddress()}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} className="mt-5">
                  <h3 id="order_review_heading">Your order</h3>

                  <div id="order_review" class="checkout-review-order">
                    {this.ReadCartItems() != null &&
                    this.ReadCartItems().length > 0 ? (
                      <table class="shop_table checkout-review-order-table">
                        <thead>
                          <tr>
                            <th class="product-name">Product</th>
                            <th class="product-total">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.ReadCartItems().map((CartItem, index) => (
                            <tr class="cart_item">
                              <td class="product-name">
                                {CartItem.ProductName}&nbsp;{" "}
                                <strong class="product-quantity">
                                  × {CartItem.Qty}
                                </strong>{" "}
                              </td>
                              <td class="product-total">
                                <span class="woocs_special_price_code">
                                  <span class="Price-amount amount">
                                    <span class="Price-currencySymbol">$</span>{" "}
                                    {(
                                      CartItem.Rate * CartItem.Qty
                                    ).toLocaleString(navigator.language, {
                                      minimumFractionDigits: 0,
                                    })}{" "}
                                  </span>
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr class="cart-subtotal">
                            <th>Subtotal</th>
                            <td>
                              <span class="woocs_special_price_code">
                                <span class="Price-amount amount">
                                  <span class="Price-currencySymbol">$</span>
                                  {this.ReadCartItems()
                                    .reduce(
                                      (fr, CartItem) =>
                                        fr + CartItem.Qty * CartItem.Rate,
                                      0
                                    )
                                    .toLocaleString(navigator.language, {
                                      minimumFractionDigits: 0,
                                    })}
                                </span>
                              </span>
                            </td>
                          </tr>
                          {/* <tr class="shipping-totals shipping">
                                            <th>Shipping</th>
                                            <td data-title="Shipping">
                                            <ul id="shipping_method" className="shipping-methods">
                                                            <a onClick={() => this.SetShippingCharge(1)}>
                                                                <li>

                                                                    <input style={{cursor:'pointer'}}  id="rd1" ref="rd1" type="radio" name="shipping_method[0]" data-index="0" id="shipping_method_0_flat_rate3" value="flat_rate:3" className="shipping_method" /><label style={{cursor:'pointer'}} for="shipping_method_0_flat_rate3">Flat rate: <span className="Price-amount amount"><span className="Price-currencySymbol">$</span>{parseFloat(this.state.ShippingFlatRate).toFixed(2)} </span></label>

                                                                </li>
                                                            </a>
                                                            <a onClick={() => this.SetShippingCharge(2)}>
                                                                <li>

                                                                    <input style={{cursor:'pointer'}}  type="radio" id="rd2" ref="rd2" name="shipping_method[0]" data-index="0" id="shipping_method_0_local_pickup4" value="local_pickup:4" className="shipping_method" /><label style={{cursor:'pointer'}}  for="shipping_method_0_local_pickup4">Local pickup: <span className="Price-amount amount"><span className="Price-currencySymbol">$</span>{parseFloat(this.state.ShippingLocalPickUp).toFixed(2)}</span></label>

                                                                </li>
                                                            </a>
                                                        </ul>
                                            </td>
                                        </tr> */}
                          <tr class="order-total">
                            <th>Total</th>
                            <td>
                              <strong>
                                <span class="woocs_special_price_code">
                                  <span class="Price-amount amount">
                                    <span class="Price-currencySymbol">$</span>
                                    {parseFloat(
                                      parseFloat(
                                        this.ReadCartItems().reduce(
                                          (fr, CartItem) =>
                                            fr + CartItem.Qty * CartItem.Rate,
                                          0
                                        )
                                      ) +
                                        parseFloat(
                                          this.state.TotalShippingCarge !=
                                            undefined
                                            ? this.state.TotalShippingCarge.toFixed(
                                                2
                                              )
                                            : 0
                                        )
                                    ).toLocaleString(navigator.language, {
                                      minimumFractionDigits: 2,
                                    })}{" "}
                                  </span>
                                </span>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    ) : (
                      <div>No Items found</div>
                    )}
                    <div id="payment" class="checkout-payment">
                      <ul class="payment_methods methods">
                        <li class="payment_method_paypal">
                          <input
                            id="payment_method_paypal"
                            type="radio"
                            checked={
                              this.state.selectedPaymentOption ==
                              "Online Payment"
                            }
                            class="input-radio"
                            onChange={this.onPaymentOptionChange}
                            name="payment_method"
                            value="Online Payment"
                            data-order_button_text="Proceed to PayPal"
                          />

                          <label for="payment_method_paypal">
                            Online Payment{" "}
                            <img
                              src="https://braviaderm.com/portals/0/Images/creditcardsaccepted.png"
                              alt="Online Payment"
                            />
                          </label>
                        </li>

                        <li class="payment_method_paypal">
                          <input
                            id="payment_method_paypal"
                            type="radio"
                            checked={this.state.selectedPaymentOption == "COD"}
                            class="input-radio"
                            name="payment_method"
                            value="COD"
                            onChange={this.onPaymentOptionChange}
                            data-order_button_text="Proceed to PayPal"
                          />

                          <label for="cod">
                            Cash on delivery{" "}
                            <img
                              src="https://cdn.iconscout.com/icon/free/png-256/cod-credit-debit-card-bank-transaction-32288.png"
                              alt="Cash on delivery"
                            />
                          </label>
                        </li>
                      </ul>
                      <div class="form-row place-order">
                        <div class="terms-and-conditions-wrapper">
                          <div class="privacy-policy-text">
                            <p>
                              Your personal data will be used to process your
                              order, support your experience throughout this
                              website, and for other purposes described in our
                            </p>
                          </div>
                          <p class="form-row validate-required ml-5">
                            <label class="form__label form__label-for-checkbox checkbox">
                              <Input
                                checked
                                disabled
                                type="checkbox"
                                class="form__input form__input-checkbox input-checkbox"
                                name="terms"
                                id="terms"
                              />
                              <span class="terms-and-conditions-checkbox-text">
                                I have read and agree to the website
                              </span>
                              &nbsp;<span class="required">*</span>
                            </label>
                            <Input type="hidden" name="terms-field" value="1" />
                          </p>
                        </div>

                        <button
                          type="submit"
                          class="button alt"
                          name="checkout_place_order"
                          id="place_order"
                          value="Place order"
                          data-value="Place order"
                          disabled={this.state.orderProcess}
                        >
                          {this.state.orderProcess
                            ? "Order Placing...."
                            : "Place Order"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("MAMAMAMAMAM", state);
  return {
    dealerList: state.dealer.dealer || [],
    user: state.user.user,
    cartID: state.cartId.cartId
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getDealer,
      getCartItems,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
