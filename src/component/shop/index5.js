/**
 *  Shop Main Page
 */
import React, { Component, useState } from "react";
import HorizontalFilter from "../../widgets/shopfilter/HorizontalFilter";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import { getFilterProductsdata } from "../../services";
import { connect } from "react-redux";
import { Pagination } from "antd";
import ListviewFilter from "../../widgets/shopfilter/ListviewFilter";
import { ToastContainer, toast } from "react-toastify";
import { addToCartItem } from "../../actions/Cart";

const numEachPage = 12;
class ShopPage5 extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      minValue: 0,
      maxValue: 12,
      open: false,
      stock: "InStock",
      quantity: 1,
    };
    this.AddToCart = this.AddToCart.bind(this);
    this.AddToWishList = this.AddToWishList.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  handleChange = (value) => {
    this.setState({
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage,
    });
  };
  AddToCart(ProductID, ProductName, ProductImage, Qty, Rate, StockStatus, Sku) {
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart == null) Cart = new Array();
    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus,
        Sku: Sku,
      });
      localStorage.removeItem("LocalCartItems");
      localStorage.setItem("LocalCartItems", JSON.stringify(Cart));
      var flag = 0;
      if (flag == 0) {
        toast.success("Item Added to Cart");
        flag = 1;
      }
      addToCartItem(ProductID, Sku);
    } else {
      toast.warning("Item is already in Cart");
    }
  }

  AddToWishList(
    ProductID,
    ProductName,
    ProductImage,
    Qty,
    Rate,
    StockStatus,
    Sku
  ) {
    var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));
    if (Cart == null) Cart = new Array();

    let selectedProduct = Cart.find(
      (product) => product.ProductID === ProductID
    );
    if (selectedProduct == null) {
      Cart.push({
        ProductID: ProductID,
        ProductName: ProductName,
        ProductImage: ProductImage,
        Qty: Qty,
        Rate: Rate,
        StockStatus: StockStatus,
        Sku: Sku,
      });
      localStorage.removeItem("LocalWishListItems");
      localStorage.setItem("LocalWishListItems", JSON.stringify(Cart));

      toast.success("Item Added to WishList");
    } else {
      toast.warning("Item is already in WishList");
    }
  }
  CheckCardItem(ID) {
    let checkcart = false;
    var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
    if (Cart && Cart.length > 0) {
      for (const cartItem of Cart) {
        if (cartItem.ProductID === ID) {
          checkcart = true;
        }
      }
    }
    return checkcart;
  }
  CheckWishList(ID) {
    let wishlist = false;
    var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

    if (Wish && Wish.length > 0) {
      for (const wishItem of Wish) {
        if (wishItem.ProductID === ID) {
          wishlist = true;
        }
      }
    }
    return wishlist;
  }
  Productrating(rating) {
    let rat = [];
    let i = 1;
    while (i <= 5) {
      if (i <= rating) {
        rat.push(<i className="fa fa-star" />);
      } else {
        rat.push(<i className="fa fa-star-o" />);
      }
      i += 1;
    }
    return rat;
  }
  render() {
    let { products } = this.props;
    let layoutstyle = localStorage.getItem("setLayoutStyle");

    if (layoutstyle == null) {
      layoutstyle = localStorage.setItem(
        "setLayoutStyle",
        "col-sm-6 col-xl-3 col-lg-4"
      );
    }

    return (
      <div className="site-content">
        <div className="inner-intro">
          <Container>
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>Shop</h1>
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
                    <span>Products</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="content-wrapper mb-3 mb-md-5">
          <Container>
            <Row>
              <div className="content col-xl-12 col-lg-12">
                <div className="products-header pt-5">
                  <div className="sticky-filter" id="sticky-filter">
                    <Container className="px-0">
                      <div className="d-flex align-items-center">
                        <div className="horizontal-sidebar sidebar desktop">
                          <div className="shop-sidebar-widgets">
                            <HorizontalFilter />
                          </div>
                        </div>
                      </div>
                    </Container>
                  </div>
                  <div className="loop-header">
                    <div className="loop-header-tools">
                      <div className="loop-header-tools-wrapper">
                        <ListviewFilter productlength={products.length} />
                      </div>
                    </div>
                  </div>
                </div>
                {products.length > 0 ? (
                  <Row className="products products-loop grid ciyashop-products-shortcode test pgs-product-list table-list">
                    <ToastContainer autoClose={1000} draggable={false} />
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {products
                            .slice(this.state.minValue, this.state.maxValue)
                            .map((product, index) => (
                              <tr className="product product_tag-black product-hover-style-default product-hover-button-style-light product_title_type-single_line product_icon_type-line-icon">
                                <td>
                                  <div className="product-inner element-hovered">
                                    <div className="product-thumbnail">
                                      <div className="product-thumbnail-inner">
                                        <Link to={`/shop/${product.id}`}>
                                          {product.pictures[0] ? (
                                            <div className="product-thumbnail-main">
                                              <img
                                                src={require(`../../assets/images/${product.pictures[0]}`)}
                                                className="img-fluid"
                                              />
                                            </div>
                                          ) : null}
                                          {product.pictures[1] ? (
                                            <div className="product-thumbnail-swap">
                                              <img
                                                src={require(`../../assets/images/${product.pictures[1]}`)}
                                                className="img-fluid"
                                              />
                                            </div>
                                          ) : null}
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  {product.name ? (
                                    <h3 className="product-name">
                                      <Link to={`/shop/${product.id}`}>
                                        {product.name}
                                      </Link>
                                    </h3>
                                  ) : null}
                                </td>
                                <td>
                                  {product.salePrice ? (
                                    <span className="price">
                                      <ins>
                                        <span className="price-amount amount">
                                          <span className="currency-symbol">
                                            $
                                          </span>
                                          {product.salePrice.toLocaleString(
                                            navigator.language,
                                            { minimumFractionDigits: 0 }
                                          )}
                                        </span>
                                      </ins>
                                    </span>
                                  ) : null}
                                </td>
                                <td>
                                  {product.tags ? (
                                    <span className="ciyashop-product-category">
                                      {product.tags.map((tag, index) => (
                                        <span>
                                          {tag}
                                          {index === product.tags.length - 1
                                            ? ""
                                            : ", "}
                                        </span>
                                      ))}
                                    </span>
                                  ) : null}
                                </td>
                                <td>
                                  <div className="product-rating">
                                    {this.Productrating(product.rating)}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex product-actions-list">
                                    <div className="product-action product-action-wishlist">
                                      {!this.CheckWishList(product.id) ? (
                                        <Link
                                          onClick={() =>
                                            this.AddToWishList(
                                              product.id,
                                              product.name,
                                              product.pictures[0],
                                              1,
                                              product.salePrice,
                                              "In Stock",
                                              product.sku
                                            )
                                          }
                                          className="add_to_wishlist"
                                          data-toggle="tooltip"
                                          data-original-title="Wishlist"
                                          data-placement="top"
                                        >
                                          {" "}
                                          Add to Wishlist
                                        </Link>
                                      ) : (
                                        <Link
                                          to="/wishlist"
                                          className="add_to_wishlist_fill"
                                          data-toggle="tooltip"
                                          data-original-title="Wishlist"
                                          data-placement="top"
                                        >
                                          View Wishlist
                                        </Link>
                                      )}
                                    </div>
                                    <div className="product-action product-action-add-to-cart">
                                      {!this.CheckCardItem(product.id) ? (
                                        <Link
                                          onClick={() =>
                                            this.AddToCart(
                                              product.id,
                                              product.name,
                                              product.pictures[0],
                                              1,
                                              product.salePrice,
                                              "In Stock",
                                              product.sku
                                            )
                                          }
                                          className="button add_to_cart_button"
                                          rel="nofollow"
                                        >
                                          Add to cart
                                        </Link>
                                      ) : (
                                        <Link
                                          to="/ShopingCart"
                                          className="button add_to_cart_button"
                                          rel="nofollow"
                                        >
                                          View Cart
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="text-center col-12">
                      <Pagination
                        defaultCurrent={1}
                        defaultPageSize={numEachPage} //default size of page
                        onChange={this.handleChange}
                        total={products.length} //total number of card data available
                      />
                    </div>
                  </Row>
                ) : (
                  <Row className="products products-loop grid ciyashop-products-shortcode">
                    <div className="col-sm-12 text-center  mt-5">
                      <img
                        src={require(`../../assets/images/empty-search.jpg`)}
                        className="img-fluid mb-4"
                      />
                      <h3>
                        Sorry! No products were found matching your selection!{" "}
                      </h3>
                      <p>Please try to other words.</p>
                      <Link to="/shop" className="btn btn-solid">
                        Continue Shopping
                      </Link>
                    </div>
                  </Row>
                )}
              </div>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (state) => ({
  products: getFilterProductsdata(state.data, state.filters),
});
export default connect(mapDispatchToProps, {})(ShopPage5);
