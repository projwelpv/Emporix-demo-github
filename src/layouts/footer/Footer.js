/**
 *  Footer Main
 */
import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.Checkscroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.Checkscroll);
  }

  Checkscroll() {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollTop > 350) {
      if (document.getElementById("back-to-top") != null) {
        document
          .getElementById("back-to-top")
          .setAttribute("style", "display:block");
      }
    } else {
      if (document.getElementById("back-to-top") != null) {
        document
          .getElementById("back-to-top")
          .setAttribute("style", "display:none");
      }
    }
  }
  ClicktoTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }
  render() {
    let backtotop = { display: "none" };
    return (
      <div>
        <footer className="site-footer">
          <div className="footer-wrapper">
            <div className="footer-widgets-wrapper">
              <div className="footer">
                <Container>
                  <Row>
                    <div className="col-lg-6 col-md-6 footer-align-left">
                      <div className="logo-wrapper widget">
                        <p>
                          <Link to="#">
                            <img
                              className="img-fluid"
                              src={require(`../../assets/images/emporix.svg`)}
                              alt="logo"
                            />
                          </Link>
                        </p>
                      </div>
                      <div className="text-content">
                        <p className="mb-3 mt-4">
                          Emporix provides the leading cloud-native Digital
                          Commerce Platform for B2B and sophisticated B2C in one
                          solution.Emporix allows you to digitize and run your
                          business exactly the way you want. The freedom of our
                          cloud-native, MACH-certified technology offers endless
                          possibilities to build channels that will reflect the
                          uniqueness of your business. Don't be limited by rigid
                          systems any longer. Instead, lead through innovation.
                          Your customers will experience real added value while
                          the business enjoys new levels of operational
                          efficiency.
                        </p>
                        {/* <p className="mb-4">
                          Our patients trust our medicines, and we believe that
                          his trust must be earned every single day. Each of us
                          at Dr. Reddy’s is driven by the belief that Good
                          Health Can’t Wait. Acting with empathy and dynamism,
                          we continually remind ourselves that the interests of
                          our patients always comes first. In pursuit of our
                          belief, we will create an environment of innovation
                          and learning, as we push ourselves to reach higher
                          level of excellence.
                        </p> */}
                        {/* <p className="mb-4">
                          The theme is packed with everything you need to create
                          a new website.
                        </p> */}
                      </div>
                      <div className="pgs-social-profiles mt-4">
                        <div className="social-profiles-wrapper">
                          <div className="social-profiles-wrapper-inner social-profiles-default social-profiles-shape-square">
                            <div className="social-profiles">
                              <ul>
                                <li>
                                  <a
                                    href="https://www.facebook.com"
                                    title="Facebook"
                                    target="_blank"
                                  >
                                    <i className="fa fa-facebook" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://twitter.com"
                                    title="Twitter"
                                    target="_blank"
                                  >
                                    <i className="fa fa-twitter" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://google.com/"
                                    title="Google"
                                    target="_blank"
                                  >
                                    <i className="fa fa-google" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://vimeo.com/"
                                    title="Vimeo"
                                    target="_blank"
                                  >
                                    <i className="fa fa-vimeo" />
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="https://in.pinterest.com/"
                                    title="Pinterest"
                                    target="_blank"
                                  >
                                    <i className="fa fa-pinterest" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 footer-align-left">
                      <div className="footer-nav-menu widget">
                        <h4 className="footer-title title">Useful Links</h4>
                        <div className="menu-useful-links-container">
                          <ul className="menu">
                            <li className="menu-item active">
                              <Link to="/">Home</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/aboutus">About Us</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="/shop">Shop</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Contact Us</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Privacy Policy</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Terms Conditions</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Instagram Wall</Link>
                            </li>
                            {/* <li className="menu-item">
                              <Link to="/Contactus">Contact Us</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Privacy Policy</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Terms Conditions</Link>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-3 col-md-6 footer-align-left">
                      <div className="footer-nav-menu widget mt-4 mt-lg-0">
                        <h4 className="footer-title title">Information</h4>
                        <div className="menu-useful-links-container">
                          <ul className="menu">
                            <li className="menu-item active">
                              <Link to="#">Look Book</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Information</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Instagram Wall</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Typography</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Parallax Presentation</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Modern Process</Link>
                            </li>
                            <li className="menu-item">
                              <Link to="#">Warranty and Services</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div> */}
                    <div className="col-lg-3 col-md-6 footer-align-left">
                      <div className="pgs-contact-widget widget mt-4 mt-lg-0">
                        <h4 className="footer-title title">Contact Info</h4>
                        <div className="footer-address">
                          <ul>
                            <li>
                              <i className="fa fa-map-marker" />
                              <span>
                                8-2-337, Road No. 3,Banjara Hills, Hyderabad,
                                Telangana 500034, INDIA
                              </span>
                            </li>
                            <li className="pgs-contact-email">
                              <i className="fa fa-envelope-o" />
                              <span>support@exporix.com</span>
                            </li>
                            <li>
                              <i className="fa fa-phone" />
                              <span>123-456-7890</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="widget pgs-newsletter-widget">
                        <h4 className="footer-title title">Newsletter</h4>
                        <div className="newsletter">
                          <div className="section-field">
                            <form className="newsletter_form">
                              <div className="input-area">
                                <input
                                  type="text"
                                  className="placeholder newsletter-email"
                                  name="newsletter_email"
                                  placeholder="Enter your email"
                                />
                              </div>
                              <div className="button-area">
                                <span className="input-group-btn">
                                  <button
                                    className="btn btn-icon newsletter-mailchimp submit"
                                    type="button"
                                  >
                                    Subscribe
                                  </button>
                                </span>
                                <span className="newsletter-spinner spinimg-pgs_newsletter_widget_2" />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            </div>
            <div className="footer-bottom-wrapper">
              <Container>
                <Row>
                  <div className="col-12">
                    <div className="footer-bottom">
                      <Row className="align-items-center">
                        <Col lg={6}>
                          <Row>
                            <div className="col-12">
                              <div className="footer-content">
                                We accelerate access to affordable and
                                innovative medicines because Good Health Can’t
                                Wait.
                              </div>
                            </div>
                          </Row>
                        </Col>
                        <Col lg={6}>
                          <div className="app-group row text-lg-right">
                            <Col md={4}>
                              <div className="app-img">
                                <img
                                  src={require(`../../assets/images/appbtntext.png`)}
                                  className="img-fluid"
                                  alt
                                />
                              </div>
                            </Col>
                            <Col md={8}>
                              <Link to="#" className="apps-store-img">
                                <img
                                  src={require(`../../assets/images/google-play-img.png`)}
                                  className="img-fluid"
                                  alt
                                />
                              </Link>
                              <Link to="#" className="apps-store-img">
                                <img
                                  src={require(`../../assets/images/appstorebtn.png`)}
                                  className="img-fluid"
                                  alt
                                />
                              </Link>
                            </Col>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Row>
              </Container>
            </div>
            <div className="site-info">
              <div className="footer-widget">
                <Container>
                  <div className="row align-items-center">
                    <Col md={6} className="float-left">
                      <p>
                        {" "}
                        © Copyright 2023 <Link to="#">Emporix</Link> All Rights
                        Reserved.
                      </p>
                    </Col>
                    <Col md={6} className="float-right">
                      <div className="payments text-right">
                        <img
                          src={require(`../../assets/images/payments.png`)}
                          className="img-fluid"
                          alt
                        />
                      </div>
                    </Col>
                  </div>
                  <div className="clearfix" />
                </Container>
              </div>
            </div>
          </div>
        </footer>
        {/* Back to Top */}
        <div id="back-to-top" style={backtotop} onClick={this.ClicktoTop}>
          <Link class="top arrow">
            <i class="fa fa-angle-up"></i>
          </Link>
        </div>
      </div>
    );
  }
}
export default Footer;
