/**
 * About Banner 2
 */
import React from "react";
import { Col, Row } from "reactstrap";

function AboutBanner2() {
  return (
    <div className="section-wrapper section-ptb">
      <div className="container">
        <Row>
          <Col lg={5}>
            <img
              src={require(`../assets/images/about-us.jpg`)}
              className="img-fluid"
            />
          </Col>
          <Col lg={7} className="mt-4 mt-lg-0">
            <div className="section-title mb-3">
              <h2 className="font-bold">Get to know us better.</h2>
            </div>
            <p>
              We started in 1984 with a modest investment and a bold vision.
              Today, with research and development centres, manufacturing
              facilities and commercial presence across the globe, we serve over
              half a billion patients worldwide.
            </p>
            <p>
              Our products and services are spread across our core businesses of
              Active Pharmaceutical Ingredients (API), generics, branded
              generics, biosimilars and over-the-counter pharmaceutical products
              around the world. We work towards meeting unmet patients needs in
              the areas of gastro-enterology, cardiovascular, diabetology,
              oncology, pain management and dermatology. We are investing in
              businesses of the future including drug discovery,
              clinically-differentiated assets and digital healthcare.
            </p>
            {/* <div className="ciyashop_list_wrapper mb-3">
              <ul className="ciyashop_list list icon-list-type-none">
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">
                    There are basically six key areas to higher achievement
                  </p>
                </li>
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">
                    The first thing to remember about success is that it
                  </p>
                </li>
                <li>
                  <i className="fa fa-check-square" />
                  <p className="ciyashop-list-info">
                    Belief – believing in yourself and those around you
                  </p>
                </li>
              </ul>
            </div> */}
            <Row className="mt-4 pt-4 mt-sm-5 pt-sm-5 border-top no-gutters">
              <Col sm={6} className="pr-2">
                <div className="ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-sm ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title">
                  <div className="ciyashop_info_box-inner clearfix ciyashop-info-left-icon">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: "#dbdbdb",
                              borderWidth: "2px",
                              borderStyle: "solid",
                            }}
                          >
                            <i
                              className="fa fa-archive"
                              style={{ color: "#dbdbdb" }}
                            />{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <h5
                            className="ciyashop_info_box-title"
                            style={{ color: "#323232" }}
                          >
                            Our Store{" "}
                          </h5>
                          <div className="ciyashop_info_box-description">
                            <p>
                              To provide access to affordable and innovative
                              medicines and healthcare solutions.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="ciyashop_info_box ciyashop_info_box-layout-style_2 ciyashop_info_box-content_alignment-left ciyashop_info_box-with-icon ciyashop_info_box-icon-source-font ciyashop_info_box-icon-style-border ciyashop_info_box-icon-size-sm ciyashop_info_box-icon-shape-round ciyashop_info_box-icon_position-left info_box-step_position-above_title mt-4 mt-sm-0">
                  <div className="ciyashop_info_box-inner clearfix ciyashop-info-left-icon">
                    <div className="ciyashop_info_box-icon">
                      <div className="ciyashop_info_box-icon-wrap">
                        <div className="ciyashop_info_box-icon-outer">
                          <div
                            className="ciyashop_info_box-icon-inner"
                            style={{
                              borderColor: "#dbdbdb",
                              borderWidth: "2px",
                              borderStyle: "solid",
                            }}
                          >
                            <i
                              className="fa fa-align-center"
                              style={{ color: "#dbdbdb" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ciyashop_info_box-content">
                      <div className="ciyashop_info_box-content-wrap">
                        <div className="ciyashop_info_box-content-inner">
                          <h5
                            className="ciyashop_info_box-title"
                            style={{ color: "#323232" }}
                          >
                            Our Mission{" "}
                          </h5>
                          <div className="ciyashop_info_box-description">
                            <p>
                              We aspire to triple our reach and touch over 1.5
                              billion patients by 2030.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AboutBanner2;
