
/**
 *  Shop Main Page
 */
import { Button } from 'antd';
import debounce from "lodash.debounce";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import AllProduct from '../../api/product';
import { getFilterProductsdata } from '../../services';
import ProductList from '../../widgets/ProductList';
import ShopBanner from '../../widgets/shopfilter/ShopBanner';
import SideFilter from '../../widgets/shopfilter/SideFilter';
import SocialFilter from '../../widgets/shopfilter/SocialInfo';
import TopFilter from '../../widgets/shopfilter/TopFilter';

class ShopPage4 extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
          limit: 8,
          hasMoreProduct: true,
          getproduct:AllProduct,
          lastScrollTop:0,
          isloading:false
        }
        
        window.onscroll = debounce(() => {
          
            var st = window.pageYOffset || document.documentElement.scrollTop; 
            if (st > this.state.lastScrollTop){
                    this.onLoadMore();
            }
            this.setState({
                lastScrollTop: st <= 0 ? 0 : st
            }) 
        }, 100);

        this.showfilter = this.showfilter.bind(this);
        this.setSidebar = this.setSidebar.bind(this);
        this.sidebarOutClick = this.sidebarOutClick.bind(this);
    }
    componentDidMount(){
        document.addEventListener('mousedown', this.sidebarOutClick);
    }
    componentWillMount() {
        document.removeEventListener('mousedown', this.sidebarOutClick);
        this.onLoadMore();
    }
    setSidebar(node) {
        this.SideRef = node;
    }

    
    sidebarOutClick(event) {
        if (this.SideRef && !this.SideRef.contains(event.target)) {
            this.setState({
                sidebarmenu: false
            });
        }
    }

    showfilter(){
        this.setState(prevState => ({
            sidebarmenu: !prevState.sidebarmenu
        }));
    }

    onLoadMore = () => {
        this.setState({ isloading: true });
        setTimeout(() => {
            this.setState({
                limit: this.state.limit + 8, 
                isloading: false 
            });
        }, 2500);
    }
    render() {
    let {products} = this.props;
    const {sidebarmenu} = this.state;
    let layoutstyle=localStorage.getItem('setLayoutStyle')

    if(layoutstyle == null)
    {
        layoutstyle=localStorage.setItem('setLayoutStyle','col-sm-6 col-md-4')
    }

     return (
            <div className="site-content">
                {(sidebarmenu) ? 
                <div className="overlay">
                </div>
                : null}
                <div className="inner-intro">
                <Container>
                    <Row className="intro-title align-items-center">
                        <Col md={6} className="text-left">
                            <div className="intro-title-inner">
                            <h1>Shop</h1>
                            </div>
                        </Col>
                        <Col md={6}  className="text-right">
                            <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                            <li className="home">
                                <span>
                                <Link className="bread-link bread-home" to="/">Home</Link>
                                </span>
                            </li>
                            <li><span>Products</span></li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
                </div>
                <Container>
                <div className="products-header pt-5">
                    <div className="loop-header">
                        <div className="loop-header-tools">
                            <div className="loop-header-tools-wrapper">
                                <TopFilter productlength={products.length} />
                                <Button className="filter-overlay-btn" onClick={this.showfilter} >
                                    <i className="fa fa-filter"> </i> Filter
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                </Container>
                <div className="content-wrapper section-pt mb-3 mb-md-5">
                    <div className={"sidebar sidebar-overlay desktop "+(sidebarmenu ? "sidebar-overlay-open" : "")}  ref={this.setSidebar}>
                    <a class="sidebar-overlay-close" onClick={this.showfilter}></a>
                        <div className="shop-sidebar-widgets">
                            <SideFilter />
                            <SocialFilter />
                            <ShopBanner />
                        </div>
                    </div>
                  <Container>
                        <Row>
                            <div className="content col-xl-12 col-lg-12">
                               
                                {products.length > 0 ?
                                    <div>
                                        <Row className="products products-loop grid ciyashop-products-shortcode pgs-product-list">
                                            {products.slice(0,this.state.limit)
                                            .map((product, index) =>
                                                        <ProductList product={product} key={index} layoutstyle={layoutstyle} />
                                                )
                                            }
                                        </Row>
                                        {this.state.isloading && 
                                            <div className="lazyload-img"></div>
                                        }
                                  
                                    </div>
                                :
                                      <Row className="products products-loop grid ciyashop-products-shortcode">
                                        <div className="col-sm-12 text-center  mt-5" >
                                            <img src={require(`../../assets/images/empty-search.jpg`)} className="img-fluid mb-4" />
                                            <h3>Sorry! No products were found matching your selection!    </h3>
                                            <p>Please try to other words.</p>
                                             <Link to="/shop" className="btn btn-solid">Continue Shopping</Link>
                                        </div>
                                      </Row>
                                }
                            </div>
                     
                         
                        </Row>
                  </Container>
                </div>
        </div>
      )
    }
}
const mapDispatchToProps  = (state) => ({
    products: getFilterProductsdata(state.data, state.filters)
})
export default connect(
    mapDispatchToProps , {}
)(ShopPage4)
