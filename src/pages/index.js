import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductList from "../components/product/product-list"

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    if (!this.state || !this.state.cart) {
      this.state = { cart: {} }
    }
  }

  addToCart = product => {
    const prod = Object.assign({}, product, { selected: false })
    if (this.state && this.state.cart) {
      let newCart = this.state.cart
      if (newCart[prod.sku]) {
        newCart[prod.sku].quantity += 1
        newCart[prod.sku].totalPrice =
          newCart[prod.sku].price * newCart[prod.sku].quantity
      } else {
        prod.quantity = 1
        newCart[prod.sku] = prod
        newCart[prod.sku].totalPrice = newCart[prod.sku].price
      }

      this.setState({ cart: newCart })
    }
  }

  render() {
    return (
      <Layout cart={this.state.cart}>
        <SEO title="Products" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Products</h1>
        <ProductList addToCart={this.addToCart.bind(this)} />
      </Layout>
    )
  }
}

export default IndexPage
