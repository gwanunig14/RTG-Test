import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

class Cart extends React.Component {
  constructor(props) {
    super(props)
    if (!this.state || !this.state.cart) {
      this.state = {
        cart: this.props.location.state.cart,
        subTotal: 0,
        tax: 0,
        shipping: 0,
        built: false,
      }
    }
  }

  updateQuantity = event => {
    let newCart = this.state.cart
    let prod = newCart[event.target.id]
    prod.quantity = event.target.value
    prod.totalPrice = prod.price * prod.quantity
    newCart[event.target.id] = prod
    this.setState({ cart: newCart })
    this.buildAmounts()
  }

  subTotal = () => {
    let total = 0
    Object.values(this.state.cart).forEach(item => {
      total += item.totalPrice
    })

    return total
  }

  tax = () => {
    return this.subTotal() * 0.1
  }

  totalQuantity = () => {
    let quant = 0
    Object.values(this.state.cart).forEach(item => {
      quant += item.quantity
    })
    return quant
  }

  shipping = () => {
    const base = 0.02 * this.subTotal()
    const discount = 5 * this.totalQuantity()
    const totalShipping = 50 + base - discount
    return totalShipping > 0 ? totalShipping : 0
  }

  finalTotal = () => {
    return (this.state.subTotal + this.state.tax + this.state.shipping).toFixed(
      2
    )
  }

  buildAmounts = () => {
    this.setState({
      subTotal: this.subTotal(),
      tax: this.tax(),
      shipping: this.shipping(),
      built: true,
    })
  }

  product = product => (
    <div
      className="product cell small-12 grid-x grid-margin-x"
      id={product.sku}
    >
      <div className="product-image cell small-2">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-title cell small-4">{product.title}</div>
      <div className="product-price cell small-2">${product.totalPrice}</div>
      <div className="product-add-to-cart cell small-2">
        Quantity:
        <input
          id={product.sku}
          on
          onChange={this.updateQuantity}
          placeholder={product.quantity}
        />
      </div>
    </div>
  )

  componentDidMount() {
    if (!this.state.built) {
      this.buildAmounts()
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Cart" />
        <h1>Cart</h1>
        <div className="product-list grid-x grid-margin-y">
          {Object.values(this.state.cart).map(product => this.product(product))}
        </div>
        <div>Subtotal: ${this.state.subTotal}</div>
        <div>Tax: ${this.state.tax.toFixed(2)}</div>
        <div>Shipping: ${this.state.shipping.toFixed(2)}</div>
        <div>Total: ${this.finalTotal()}</div>
      </Layout>
    )
  }
}

export default Cart
