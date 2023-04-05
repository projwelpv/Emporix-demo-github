/**
 * Home Slider
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getContent } from "../actions/Home/Slider";

const settings = {
  dots: false,
  infinite: true,
  arrows: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const banners = [
  {
    id: "1",
    url: "https://images.ctfassets.net/gqlaeh1nu6o2/4LiT4yLEqGAnn3ucXDOzyq/09fa8aa55df848b1f7aa616d6b7657c6/photo-5b.jpg",
  },
  {
    id: "2",
    url: "https://images.ctfassets.net/gqlaeh1nu6o2/3TnFbh2FaUiMVjDhH6QWto/ceac3bfd88d5f74d257458c87dd59976/Women-s_Jacket.jpg",
  },
];

class HomSlider extends Component {
  constructor(props) {
    super(props);
    // getContent();
  }
  render() {
    return (
      <Slider className="slider-01 slider-simple-arrow" {...settings}>
        {/* <div key={1} className="slide-01-item">
          <div className="slide-inner">
            <div className="slide-image">
              <img
                src={require(`../assets/images/home-01-slider/img-01.jpg`)}
                alt="slide-1"
              />
            </div>
            <div className="slide-content">
              <div class="container">
                <div class="row">
                  <div class="col-xl-6 col-md-8">
                    <div class="slide-left">
                      <div class="slide-sale">
                        20{" "}
                        <span>
                          %<br />
                          off
                        </span>
                      </div>
                      <div class="slide-title">
                        <h1>Spring</h1>
                      </div>
                      <div class="slide-subtitle">Season festival</div>
                      <span class="slide-since">Catalogue 2018</span>
                    </div>
                  </div>
                  <div class="col-xl-6 col-md-4 text-right d-none d-md-block">
                    <div class="slide-offer">Limited time offer</div>
                    <Link class="slide-button" to="/shop">
                      Get the Offer
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {banners.map((info) => {
          return (
            <div key={2} className="slide-01-item">
              <div className="slide-inner">
                <div className="slide-image">
                  <img src={`${info.url}`} alt="slide-1" />
                </div>
                <div className="slide-content">
                  <div class="container">
                    <div class="row">
                      <div class="col-xl-6 col-md-8">
                        <div class="slide-left">
                          {/* <div class="slide-title">
                            <h1 style={{ fontSize: 74 }}>{info.description}</h1>
                          </div> */}
                          {/* <div class="slide-subtitle">For women</div>
                          <Link class="slide-button-flat" to="/shop">
                            Shop now
                          </Link>*/}
                        </div>
                      </div>
                      {/* <div class="col-xl-6 col-md-4 text-right d-none d-md-block">
                        <div class="slide-offer">Limited time offer</div>
                        <Link class="slide-button" to="/shop">
                          Get the Offer
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    );
  }
}

const mapDispatchToProps = (state) => {
  console.log("Dasdsada", state);
  return {
    slider: state.content.slider || [],
  };
};

export default connect(mapDispatchToProps, {})(HomSlider);
