/**
 *  Shop Product Detail Page
 */
import React, { Component } from "react";
import PostDetail from "../../templates/post-detail";
import ProductSlider from "../../widgets/ProductSlider";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { post } from "../../api/APIController";

const relatedslider = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllProduct: this.props.products,
      ProductId: this.props.match.params.id,
      CurrentProduct: null,
      activeTab: "1",
    };
    this.toggle = this.toggle.bind(this);
  }

  getProductDetails() {
    post(`products/${this.props.match.params.id}`).then((response) => {
      if (response.status == 200) {
        let info = response.data.data;
        let category = [];
        if (info.relationships.categories) {
          info.relationships.categories.data.forEach((info) => {
            // categoryData.data.forEach(catInfo => {
            //     if(catInfo.id == info.id){
            //         category.push(catInfo.name)
            //     }
            // })
          });
        }

        let product = {
          id: info.id,
          name: info.name,
          pictures: [
            info.relationships.main_image
              ? `https://s3-eu-west-1.amazonaws.com/bkt-svc-files-cmty-api-moltin-com/73101adf-a3b2-4b36-b040-0cc4fe7b7df1/${info.relationships.main_image.data.id}.png`
              : info.image
              ? info.image.href
              : "",
          ],
          stock: info.status == "draft" ? 0 : 1,
          price: info.meta.display_price.with_tax.amount,
          discount: 0,
          salePrice: info.meta.display_price.with_tax.amount,
          description: info.description,
          rating: 4,
          tags: category,
          size: ["100 CM", "90 CM", "95 CM"],
          category: "",
          colors: ["black", "gray", "red"],
        };
        this.setState({ CurrentProduct: product });
      }
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let CurrentProductId = this.state.ProductId;
    let allproductdata = this.state.AllProduct;

    if (allproductdata && allproductdata.length > 0) {
      console.log("product", allproductdata);
      allproductdata.map((product) => {
        console.log("product.id", product.id, "aa", CurrentProductId);
        if (product.id === CurrentProductId) {
          this.setState({
            ...this.state,
            CurrentProduct: product,
          });
        }
      });
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    const Productedit = this.state.CurrentProduct;
    console.log("this is srikanth reddy",Productedit)
    return (
      <div>
        {Productedit !== null ? (
          <div className="site-content">
            <div className="inner-intro">
              <Container>
                <Row className="intro-title align-items-center">
                  <div className="col-12">
                    <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                      <li className="home">
                        <span>
                          <Link className="bread-link bread-home" to="/">
                            Home
                          </Link>
                        </span>
                      </li>
                      {/* <li>
                        <span>{Productedit.category}</span>
                      </li> */}
                      <li>
                        <span>{Productedit.name.en}</span>
                      </li>
                    </ul>
                  </div>
                </Row>
              </Container>
            </div>
            <div className="content-wrapper section-ptb">
              <Container>
                <PostDetail
                  product={Productedit}
                  tabid={this.state.activeTab}
                />
                {/* <div className="product-content-bottom"> */}

                <Nav tabs>
                  <NavItem active>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1",
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Description
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2",
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Reviews
                    </NavLink>
                  </NavItem>
                  {/* <NavItem disabled>
                                    <NavLink  className={classnames({ active: this.state.activeTab === '3' })}  onClick={() => { this.toggle('3'); }}>Custom Tab</NavLink>
                                </NavItem> */}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="description"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        {/* <h2>What is Lorem Ipsum?</h2> */}
                        <p className="mt-2">{Productedit.description.en}</p>

                        <div className="product-info-box border-top border-bottom mt-5  pt-4 pt-lg-0 pb-2 pb-sm-0">
                          <Row>
                            <Col sm={6} md={4}>
                              <div className="ciyashop_info_box_2 ciyashop_info_box_2-layout-style_2 ciyashop_info_box_2-content_alignment-left ciyashop_info_box_2-with-icon ciyashop_info_box_2-icon-source-font  ciyashop_info_box_2-icon-size-md  ciyashop_info_box_2-icon_position-left icon-left-spacing">
                                <div className="ciyashop_info_box_2-inner clearfix align-items-center">
                                  <div className="ciyashop_info_box_2-icon">
                                    <div className="ciyashop_info_box_2-icon-wrap">
                                      <div className="ciyashop_info_box_2-icon-outer">
                                        <div className="ciyashop_info_box_2-icon-inner">
                                          <i className="glyph-icon pgsicon-ecommerce-delivery-truck-1" />{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="ciyashop_info_box_2-content">
                                    <div className="ciyashop_info_box_2-content-wrap">
                                      <div className="ciyashop_info_box_2-content-inner">
                                        <h6 className="ciyashop_info_box_2-title inline_hover">
                                          Free shipping{" "}
                                        </h6>
                                        <div className="ciyashop_info_box_2-content">
                                          <p>Free Shipping on orders $199.</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6} md={4} className="py-3 py-md-0">
                              <div className="ciyashop_info_box_2 ciyashop_info_box_2-layout-style_2 ciyashop_info_box_2-content_alignment-left ciyashop_info_box_2-with-icon ciyashop_info_box_2-icon-source-font  ciyashop_info_box_2-icon-size-md  ciyashop_info_box_2-icon_position-left icon-left-spacing">
                                <div className="ciyashop_info_box_2-inner clearfix align-items-center">
                                  <div className="ciyashop_info_box_2-icon">
                                    <div className="ciyashop_info_box_2-icon-wrap">
                                      <div className="ciyashop_info_box_2-icon-outer">
                                        <div className="ciyashop_info_box_2-icon-inner">
                                          <i className="glyph-icon pgsicon-ecommerce-headphones-1" />{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="ciyashop_info_box_2-content">
                                    <div className="ciyashop_info_box_2-content-wrap">
                                      <div className="ciyashop_info_box_2-content-inner">
                                        <h6 className="ciyashop_info_box_2-title inline_hover">
                                          24/7 Support:{" "}
                                        </h6>
                                        <div className="ciyashop_info_box_2-content">
                                          <p>Online and phone support 24 / 7</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col sm={6} md={4}>
                              <div className="ciyashop_info_box_2 ciyashop_info_box_2-layout-style_2 ciyashop_info_box_2-content_alignment-left ciyashop_info_box_2-with-icon ciyashop_info_box_2-icon-source-font  ciyashop_info_box_2-icon-size-md  ciyashop_info_box_2-icon_position-left icon-left-spacing">
                                <div className="ciyashop_info_box_2-inner clearfix align-items-center">
                                  <div className="ciyashop_info_box_2-icon">
                                    <div className="ciyashop_info_box_2-icon-wrap">
                                      <div className="ciyashop_info_box_2-icon-outer">
                                        <div className="ciyashop_info_box_2-icon-inner">
                                          <i className="glyph-icon pgsicon-ecommerce-reload" />{" "}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="ciyashop_info_box_2-content">
                                    <div className="ciyashop_info_box_2-content-wrap">
                                      <div className="ciyashop_info_box_2-content-inner">
                                        <h6 className="ciyashop_info_box_2-title inline_hover">
                                          30 Days Return{" "}
                                        </h6>
                                        <div className="ciyashop_info_box_2-content">
                                          <p>30 days money back guarantee. </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="product-reviews">
                      <h6 className="mt-2">Add a Review</h6>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      <form>
                        <div class="form-group">
                          <label>Name</label>
                          <input type="Text" class="form-control"></input>
                        </div>
                        <div class="form-group">
                          <label>Email</label>
                          <input type="Text" class="form-control"></input>
                        </div>
                        <div class="form-group">
                          <label className="mb-0">Your rating *</label>
                          <ul class="rating list-unstyled">
                            <li>
                              <i class="fa fa-star"></i>
                            </li>
                            <li>
                              <i class="fa fa-star"></i>
                            </li>
                            <li>
                              <i class="fa fa-star"></i>
                            </li>
                            <li>
                              <i class="fa fa-star-half-o"></i>
                            </li>
                            <li>
                              <i class="fa fa-star-o"></i>
                            </li>
                          </ul>
                        </div>
                        <div class="form-group">
                          <label>Your review *</label>
                          <textarea class="form-control" rows="3"></textarea>
                        </div>
                        <div class="form-group form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="exampleCheck1"
                          ></input>
                          <label class="form-check-label" for="exampleCheck1">
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </div>
                        <div class="form-group">
                          <Link class="btn btn-primary">Submit</Link>
                        </div>
                      </form>
                    </div>
                  </TabPane>
                  {/* <TabPane tabId="3">
                                    <p>The Crochet-Shoulder Chevron Sweatshirt ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, libero, ratione. Tenetur dolor vitae voluptatem, earum nam, voluptas culpa ex vel et aliquid aperiam pariatur ad hic commodi, dicta tempora.</p>
                                    <p>Wearing a sweatshirt in public doesn’t mean you can’t look put-together doing it. The Crochet-Shoulder Chevron Sweatshirt from Knox Rose is slightly more tailored for a pullover, though it still gives you a loose fit that remains comfortable and flexible as you move. The textured fabric is enhanced with crochet sleeve details. Throw this long-sleeve sweatshirt over a pair of jeans and you’re ready to go. </p>
                                </TabPane> */}
                </TabContent>
                {/* <div className="related products">
                                <h2>Related products</h2>
                                <div className="row">
                                    <ProductSlider productSub={Productedit.subcategory}  settings={relatedslider} />
                                </div>
                            </div> */}
                {/* </div> */}
              </Container>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const AppMapStateToProps = (state) => {
  return {
    products: state.data.products,
  };
};

export default connect(AppMapStateToProps)(withRouter(ProductDetail));
