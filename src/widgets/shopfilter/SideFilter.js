/**
 * Shop Page Side Bar Filter
 */
import { Slider } from "antd";
import React, { Component, useRef } from "react";
import { connect } from "react-redux";
import {
  categoryValue,
  colorValue,
  priceValue,
  searchValue,
  sizeValue,
} from "../../actions/filter";
import {
  uniqueCategory,
  uniqueColors,
  uniqueMinMaxPrice,
  uniqueSizes,
} from "../../services";
import { Scrollbars } from "react-custom-scrollbars";
import { bindActionCreators } from "redux";
import { getSearchProduct } from "../../actions/Search";
import debounce from "lodash.debounce";
class SideFilter extends Component {
  searchTextchangeFunc = undefined;
  constructor(props) {
    super(props);
    console.log("props =>", props);
    this.state = {
      SearchValue: "",
      priceplace: [this.props.prices.min, this.props.prices.max],
      setfistprice: [this.props.prices.min, this.props.prices.max],
      sidebarmenu: false,
    };
    this.showfilter = this.showfilter.bind(this);
    this.searchTextchangeFunc = debounce(this.SearchTextchange, 400);
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      SearchValue: "",
    });
    this.props.searchValue("");
    this.nameInput.focus();
  }
  showfilter() {
    this.setState((prevState) => ({
      sidebarmenu: !prevState.sidebarmenu,
    }));
  }
  onClickColorFilter = (event, colors) => {
    var index = colors.indexOf(event.target.value);
    if (event.target.checked) {
      colors.push(event.target.value);
    } else {
      colors.splice(index, 1);
    }
    this.props.colorValue(colors);
  };

  onClickCategoryFilter(event, categorys) {
    var index = categorys.indexOf(event.target.value);
    if (event.target.checked) {
      categorys.push(event.target.value);
    } else {
      categorys.splice(index, 1);
    }
    this.props.categoryValue(categorys);
    this.props.onChange();
  }

  onClickSizeFilter(event, sizes) {
    var index = sizes.indexOf(event.target.value);
    if (event.target.checked) {
      sizes.push(event.target.value);
    } else {
      sizes.splice(index, 1);
    }
    this.props.sizeValue(sizes);
  }
  SearchTextchange(searchText) {
    console.log("search method called", this.state.SearchValue);
    // this.props.searchValue(SearchText.target.value);
    // this.props
    //   .getSearchProduct(searchText, this.props.totalCategory)
    //   .then((response) => {
    //     if (response.status == 200) {
    //       if (response.searchText == this.state.SearchValue) {
    //         this.props.onChange();
    //       } else {
    //         this.searchTextchangeFunc(this.state.SearchValue);
    //       }
    //     }
    //   });
  }

  onChangePricePlace = (values) => {
    var maximumval = this.props.prices.max / 5;

    var value = {
      min: values["0"],
      max: values["1"],
    };
    if (value.min == 0) {
      value.min = 0;
    } else if (value.min > 0 && value.min <= 20) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 1)) / 20));
    } else if (value.min > 20 && value.min <= 40) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 2)) / 40));
    } else if (value.min > 40 && value.min <= 60) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 3)) / 60));
    } else if (value.min > 60 && value.min <= 80) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 4)) / 80));
    } else if (value.min > 80 && value.min <= 100) {
      value.min = parseInt(this.fncl((value.min * (maximumval * 5)) / 100));
    } else {
      value.min = false;
    }

    if (value.max === 0) {
      value.max = 0;
    } else if (value.max > 0 && value.max <= 20) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 1)) / 20));
    } else if (value.max > 20 && value.max <= 40) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 2)) / 40));
    } else if (value.max > 40 && value.max <= 60) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 3)) / 60));
    } else if (value.max > 60 && value.max <= 80) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 4)) / 80));
    } else if (value.max > 80 && value.max <= 100) {
      value.max = parseInt(this.fncl((value.max * (maximumval * 5)) / 100));
    } else {
      value.max = false;
    }
    this.setState(
      {
        priceplace: values,
      },
      () => {
        this.props.onChange();
      }
    );
    this.props.priceValue({ value });
  };
  fncl = (value) => {
    return Number.parseFloat(value).toFixed(0);
  };
  convertValue = (labelValue) => {
    return labelValue.toLocaleString("en", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  toolformatter = (value) => {
    var maximumval = this.props.prices.max / 5;
    if (value === 0) {
      value = "0";
    } else if (value > 0 && value <= 20) {
      value = (value * (maximumval * 1)) / 20;
    } else if (value > 20 && value <= 40) {
      value = (value * (maximumval * 2)) / 40;
    } else if (value > 40 && value <= 60) {
      value = (value * (maximumval * 3)) / 60;
    } else if (value > 60 && value <= 80) {
      value = (value * (maximumval * 4)) / 80;
    } else if (value > 80 && value <= 100) {
      value = (value * (maximumval * 5)) / 100;
    }
    return this.convertValue(value);
  };

  clearprice(pricesval) {
    var value = {
      min: pricesval.min,
      max: pricesval.max,
    };
    this.setState({
      priceplace: [this.props.prices.min, this.props.prices.max],
    });
    this.props.priceValue({ value });
    this.props.onChange();
  }
  // Clear Color Filter Code
  clearcolor() {
    var colors = [];
    this.props.colorValue(colors);
    this.props.onChange();
  }
  // Clear Category Filter Code
  clearcategory() {
    var categorys = [];
    this.props.categoryValue(categorys);
    this.props.onChange();
  }
  // Clear Size Filter Code
  clearsize() {
    var sizes = [];
    this.props.sizeValue(sizes);
    this.props.onChange();
  }
  render() {
    var max = this.props.prices.max;
    var maxdivide = max / 5;
    const marks = {
      0: 0,
      20: (maxdivide * 1).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      40: (maxdivide * 2).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      60: (maxdivide * 3).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      80: (maxdivide * 4).toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
      }),
      100: max.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
    };
    const sizeFilterValues = this.props.filters.size;
    const categoryFilterValues = this.props.filters.category;
    const colorsFilterValues = this.props.filters.color;
    console.log("categoryFilterValues", categoryFilterValues);
    return (
      <div>
        <div className="widget">
          <h4 className="widget-title">Search</h4>
          <input
            type="text"
            id="btn-search"
            ref={(input) => {
              this.nameInput = input;
            }}
            className="form-control"
            value={this.state.SearchValue}
            onChange={(e) => {
              this.setState({
                ...this.state,
                SearchValue: e.target.value,
              });
              this.searchTextchangeFunc(e.target.value);
            }}
            placeholder="Search a Product"
          />
        </div>
        <div className="widget widget_price_filter">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Price</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearprice(this.props.prices)}
              >
                Clear
              </a>
            </p>
          </div>
          <div classs="shop-filter shop-filter-product-price widget_price_filter">
            <div className="shop-filter-wrapper">
              <div className="price_slider_wrapper">
                <Slider
                  range
                  step={1}
                  min={0}
                  max={100}
                  tipFormatter={this.toolformatter}
                  value={this.state.priceplace}
                  onChange={this.onChangePricePlace}
                  marks={marks}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="widget-title">Filter by Color</h4>
                        <p><a className="price-clear-filter" onClick={() => this.clearcolor()} >Clear</a></p>
                    </div>

                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '210px' }}>
                        <Scrollbars>
                            <ul className="pgs-widget-layered-nav-list" tabIndex={0} style={{ right: '-17px' }}>
                                {this.props.colors.map((color, index) => {
                                    return (
                                        <div className="form-check pgs-filter-checkbox" key={index}>
                                            <input type="checkbox" onClick={(e) => this.onClickColorFilter(e, colorsFilterValues)} value={color} defaultChecked={colorsFilterValues.includes(color) ? true : false} className="form-check-input" id={color} />
                                            <label className="form-check-label"
                                                htmlFor={color}>{color}</label>
                                        </div>
                                    )
                                })}
                            </ul>
                        </Scrollbars>
                    </div>
                </div> */}
        {/* <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="widget-title">Filter by Categories</h4>
            <p>
              <a
                className="price-clear-filter"
                onClick={() => this.clearcategory()}
              >
                Clear
              </a>
            </p>
          </div>
          <div
            className="pgs-widget-layered-nav-list-container has-scrollbar"
            style={{ height: "215px" }}
          >
            <Scrollbars>
              {this.props.categorys.map((category, index) => {
                return (
                  <div className="form-check pgs-filter-checkbox" key={index}>
                    <input
                      type="checkbox"
                      onClick={(e) =>
                        this.onClickCategoryFilter(e, categoryFilterValues)
                      }
                      value={category}
                      defaultChecked={
                        categoryFilterValues.includes(category) ? true : false
                      }
                      checked={
                        categoryFilterValues.includes(category) ? true : false
                      }
                      className="form-check-input"
                      id={category}
                    />
                    <label className="form-check-label" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                );
              })}
            </Scrollbars>
          </div>
        </div> */}
        {/* <div className="widget widget_layered_nav widget-layered-nav pgs_widget-layered-nav">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 className="widget-title">Filter by Size</h4>
                        <p><a className="price-clear-filter" onClick={() => this.clearsize()} >Clear</a></p>
                    </div>
                    <div className="pgs-widget-layered-nav-list-container has-scrollbar" style={{ height: '215px' }}>
                        <Scrollbars>
                            {this.props.sizes.map((size, index) => {
                                return (

                                    <div class="form-check pgs-filter-checkbox">
                                        <input type="checkbox" onClick={(e) => this.onClickSizeFilter(e, sizeFilterValues)} value={size} defaultChecked={sizeFilterValues.includes(size) ? true : false} class="form-check-input" id={size} />
                                        <label class="form-check-label" htmlFor={size}>{size}</label>
                                    </div>
                                )
                            })}
                        </Scrollbars>
                    </div>
                </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorys: uniqueCategory(state.data.products),
    sizes: uniqueSizes(state.data.products),
    colors: uniqueColors(state.data.products),
    prices: uniqueMinMaxPrice(state.data.products),
    filters: state.filters,
    totalCategory: state.category.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      categoryValue,
      sizeValue,
      colorValue,
      priceValue,
      searchValue,
      getSearchProduct,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SideFilter);
