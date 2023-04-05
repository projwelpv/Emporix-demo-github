/*
 * Post Detail Page
 */
import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { addToCartItem } from "../../actions/Cart";
import {
  deleteCartItems,
  getCartItems,
  updateCartQty,
} from "../../actions/Cart";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const productslider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.AddToCart = this.AddToCart.bind(this);
    this.AddToWishList = this.AddToWishList.bind(this);
    this.state = {
      photoIndex: 0,
      isOpen: false,
      qty: 1,
      newImage: props.product.media[0].url,
    };
  }

  changePreviewImage(image) {
    this.setState({
      newImage: image,
      tabid: 1,
    });
  }

  // Add To Cart
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
      // addToCartItem(ProductID, Sku);
      let pricelist = [];
      this.props.allPrices.map((each, index) => {
        if (each.itemId.id === ProductID) {
          pricelist.push(each);
        }
      });

      if (pricelist.length > 0) {
        addToCartItem(this.props.cartID, ProductID, pricelist);
      }
      toast.success("Item Added to Cart");
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

  getQty() {
    const { product } = this.props;

    var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));
    let selectedProduct = undefined;
    let Index = undefined;
    if (UpdatedCart && Array.isArray(UpdatedCart)) {
      UpdatedCart.forEach((element, index) => {
        console.log(element, product);
        if (element.ProductID === product.id) {
          selectedProduct = product;
          Index = index;
        }
      });
    }
    if (selectedProduct != undefined) {
      return UpdatedCart[Index].Qty;
    } else {
      return 1;
    }
  }

  PlusQty = () => {
    const { product } = this.props;

    var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));

    let selectedProduct = undefined;
    let Index = undefined;
    UpdatedCart.forEach((element, index) => {
      console.log(element, product);
      if (element.ProductID === product.id) {
        selectedProduct = product;
        Index = index;
      }
    });

    if (selectedProduct != undefined) {
      UpdatedCart[Index].Qty = parseInt(UpdatedCart[Index].Qty + 1);
      localStorage.removeItem("LocalCartItems");
      localStorage.setItem("LocalCartItems", JSON.stringify(UpdatedCart));
      console.log("dasdasdasd", UpdatedCart);
      this.props
        .updateCartQty(
          UpdatedCart[Index].cart_id,
          parseInt(UpdatedCart[Index].Qty)
        )
        .then((result) => {
          this.props.getCartItems().then((result) => {
            localStorage.setItem("LocalCartItems", JSON.stringify(result));
            this.forceUpdate();
          });
        });
    }
  };

  MinusQty = () => {
    const { product } = this.props;

    var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));

    let selectedProduct = undefined;
    let Index = undefined;
    UpdatedCart.forEach((element, index) => {
      if (element.ProductID === product.id) {
        selectedProduct = product;
        Index = index;
      }
    });

    if (selectedProduct != undefined) {
      if (UpdatedCart[Index].Qty != 1) {
        UpdatedCart[Index].Qty = parseInt(UpdatedCart[Index].Qty - 1);
        localStorage.removeItem("LocalCartItems");
        localStorage.setItem("LocalCartItems", JSON.stringify(UpdatedCart));
        console.log("dasdasdasd", UpdatedCart);
        this.props
          .updateCartQty(
            UpdatedCart[Index].cart_id,
            parseInt(UpdatedCart[Index].Qty)
          )
          .then((result) => {
            this.props.getCartItems().then((result) => {
              localStorage.setItem("LocalCartItems", JSON.stringify(result));
              this.forceUpdate();
            });
          });
      } else {
        this.removeFromCart(Index);
        deleteCartItems(selectedProduct.productID);
      }
    }
  };

  removeFromCart = (Index) => {
    var UpdatedCart = JSON.parse(localStorage.getItem("LocalCartItems"));
    deleteCartItems(UpdatedCart[Index].cart_id);
    UpdatedCart = UpdatedCart.slice(0, Index).concat(
      UpdatedCart.slice(Index + 1, UpdatedCart.length)
    );
    localStorage.removeItem("LocalCartItems");
    localStorage.setItem("LocalCartItems", JSON.stringify(UpdatedCart));
    console.log(this.props.cartItems.items, "index", Index);
  };

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

  getProductPrice(id) {
    let price;

    this.props.allPrices.map((each, index) => {
      if (each.itemId.id === id) {
        price = each.salePrice.discountAmount;
      }
    });
    return price;
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    const qty = this.state.qty;
    const { product } = this.props;
    const images = [product.media[0].url, product.media[0].url];
    // product.pictures.map((pic) => images.push(pic));

    let rat = [];
    let rating = product.rating;
    let i = 1;
    while (i <= 5) {
      if (i <= rating) {
        rat.push(<i className="fa fa-star" />);
      } else {
        rat.push(<i className="fa fa-star-o" />);
      }
      i += 1;
    }

    return (
      <section>
        <div className="product-content-top single-product">
          <Row>
            <div className="product-top-left col-xl-5 col-md-6">
              <div className="product-top-left-inner">
                <div className="ciyashop-product-images">
                  <div className="ciyashop-product-images-wrapper ciyashop-gallery-style-default ciyashop-gallery-thumb_position-bottom ciyashop-gallery-thumb_vh-horizontal">
                    <div className="ciyashop-product-gallery ciyashop-product-gallery--with-images slick-carousel">
                      <Slider
                        {...settings}
                        className="ciyashop-product-gallery__wrapper popup-gallery"
                      >
                        <div className="ciyashop-product-gallery__image">
                          <img
                            src={product?.media[0]?.url}
                            className="img-fluid"
                          />
                        </div>
                      </Slider>
                      <div className="ciyashop-product-gallery_buttons_wrapper">
                        <div
                          className="ciyashop-product-gallery_button ciyashop-product-gallery_button-zoom popup-gallery"
                          onClick={() => this.setState({ isOpen: true })}
                        >
                          <Link
                            to="#"
                            className="ciyashop-product-gallery_button-link-zoom"
                          >
                            <i className="fa fa-arrows-alt" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* <div className="ciyashop-product-thumbnails">
                      <Slider
                        {...productslider}
                        className="ciyashop-product-thumbnails__wrapper"
                      >
                        {product.pictures.map((pictureimage, index) => (
                          <div className="ciyashop-product-thumbnail__image">
                            <Link
                              onMouseOver={() =>
                                this.changePreviewImage(pictureimage)
                              }
                            >
                              <img src={pictureimage} className="img-fluid" />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                    </div> */}
                    <div className="clearfix" />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-top-right col-xl-7 col-md-6">
              <div className="product-top-right-inner">
                <div className="summary entry-summary">
                  <h1 className="product_title entry-title">
                    {product.name.en}
                  </h1>
                  {/* <div className="product-rating">
                    <div className="star-rating">{rat}</div>
                    <p className="review-link mt-2">
                      (<span className="count">{rating}</span> customer reviews)
                    </p>
                  </div> */}
                  {/* <p className="price">{`$${(
                    product.salePrice * qty
                  ).toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })}`}</p> */}
                  <div className="product-details__short-description">
                    <div className="pdp-about-details-txt pdp-about-details-equit">
                      {product.description.en}
                    </div>
                  </div>
                  <form className="cart">
                    <div className="quantity">
                      <label
                        className="screen-reader-text"
                        htmlFor="quantity_5cdab503cf26f"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="input-text qty text"
                        value={this.getQty()}
                        title="Qty"
                      />
                      <div className="quantity-nav">
                        <Link
                          className="quantity-button quantity-up"
                          onClick={() => this.PlusQty()}
                        >
                          +
                        </Link>
                        <Link
                          className="quantity-button quantity-down"
                          onClick={() => this.MinusQty()}
                        >
                          -
                        </Link>
                      </div>
                    </div>
                    {!this.CheckCardItem(product.id) ? (
                      <Link
                        onClick={() =>
                          this.AddToCart(
                            product.id,
                            product.name.en,
                            product.media[0].url,
                            1,
                            this.getProductPrice(product.id),
                            "In Stock",
                            product.id
                          )
                        }
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        Add to cart
                      </Link>
                    ) : (
                      <Link
                        to="/ShopingCart"
                        className="button single_add_to_cart_button"
                        rel="nofollow"
                      >
                        View Cart
                      </Link>
                    )}
                    <div className="clearfix" />
                  </form>
                  {/* <div className="product-summary-actions">
                    {!this.CheckWishList(product.id) ? (
                      <div className="add-to-wishlist">
                        <Link
                          onClick={() =>
                            this.AddToWishList(
                              product.id,
                              product.name,
                              product.pictures[0],
                              qty,
                              product.salePrice,
                              "In Stock",
                              product.sku
                            )
                          }
                        >
                          Add to Wishlist
                        </Link>
                      </div>
                    ) : (
                      <div className="add-to-wishlist-fill">
                        <Link to="/wishlist">Browse Wishlist</Link>
                      </div>
                    )}
                  </div> */}
                  {/* <div className="product_meta"> */}
                  {/* <span className="sku_wrapper">
                      <label>SKU:</label>
                      <span className="sku">9624 </span>
                    </span> */}
                  {/* <span className="size">
                      <label>Size:</label>
                      {product.size.map((sizes, index) => (
                        <span itemProp="size">
                          <Link to="#" rel="tag">
                            {sizes}
                            {index === product.size.length - 1 ? "" : ","}
                          </Link>
                        </span>
                      ))}
                    </span> */}
                  {/* <span className="posted_in">
                      <label>Categories:</label>
                      {product.category}
                    </span> */}
                  {/* <span className="brands">
                      <label>Brand:</label>
                      {product.tags.map((brand, index) => (
                        <span itemProp="brand">
                          <Link to="#" rel="tag">
                            {brand}
                            {index === product.tags.length - 1 ? "" : ","}
                          </Link>
                        </span>
                      ))}
                    </span> */}
                  {/* </div> */}
                  <div className="social-profiles">
                    <span className="share-label">Share :</span>
                    <ul className="share-links">
                      <li>
                        <a
                          href="https://www.facebook.com"
                          className="share-link facebook-share"
                          target="_blank"
                        >
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/"
                          className="share-link twitter-share"
                          target="popup"
                        >
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com"
                          className="share-link linkedin-share"
                          target="popup"
                        >
                          <i className="fa fa-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https:google.com/discover"
                          className="share-link google-share"
                          target="popup"
                        >
                          <i className="fa fa-google" />
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://in.pinterest.com/"
                          className="share-link pinterest-share"
                          target="popup"
                        >
                          <i className="fa fa-pinterest" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="ciyashop-sticky-btn">
                    <div className="ciyashop-sticky-btn-container container">
                      <div className="row align-items-center">
                        <div className="col-lg-5">
                          <div className="ciyashop-sticky-btn-content">
                            <div className="ciyashop-sticky-btn-thumbnail">
                              <img
                                src={require(`../../assets/images/products/product-01.jpg`)}
                                className="img-fluid"
                                alt
                              />
                            </div>
                            <div className="ciyashop-sticky-btn-info">
                              <h4 className="product-title">
                                Women’s Fabric Mix Midi Wrap Jumpsuit
                              </h4>
                              <div className="star-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-7">
                          <div className="ciyashop-sticky-btn-cart">
                            <div className="wishlist-compare-button">
                              <div className="product-action product-action-wishlist">
                                <Link
                                  to="#"
                                  data-toggle="tooltip"
                                  data-original-title="Wishlist"
                                  data-placement="top"
                                >
                                  Browse Wishlist
                                </Link>
                              </div>
                              <div className="product-action product-action-compare">
                                <Link
                                  to="#"
                                  className="compare button"
                                  data-toggle="tooltip"
                                  data-original-title="Compare"
                                  data-placement="top"
                                >
                                  Compare
                                </Link>
                              </div>
                            </div>
                            <span className="price">$9.00</span>
                            <form className="cart">
                              <div className="quantity">
                                <label
                                  className="screen-reader-text"
                                  htmlFor="quantity_5cdab503cf26f"
                                >
                                  Quantity
                                </label>
                                <input
                                  type="number"
                                  id="quantity_5cdab503cf26f"
                                  className="input-text qty text"
                                  step={1}
                                  min={1}
                                  max
                                  name="quantity"
                                  defaultValue={1}
                                  title="Qty"
                                  size={4}
                                  pattern="[0-9]*"
                                  inputMode="numeric"
                                  aria-labelledby
                                />
                                <div className="quantity-nav">
                                  <div className="quantity-button quantity-up">
                                    +
                                  </div>
                                  <div className="quantity-button quantity-down">
                                    -
                                  </div>
                                </div>
                              </div>
                              <button
                                type="submit"
                                className="single_add_to_cart_button button alt"
                              >
                                Add to cart
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div>
          {/* {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              enableZoom={false}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          )} */}
        </div>
      </section>
    );
  }
}

const AppMapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCartItems,
      updateCartQty,
    },
    dispatch
  );
};

const AppMapStateToProps = (state) => {
  return {
    products: state.data.products,
    allPrices: state?.price?.prices,
    cartID: state.cartId.cartId,
  };
};

export default connect(AppMapStateToProps, AppMapDispatchToProps)(PostDetail);
