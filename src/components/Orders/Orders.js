import React, { Component } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { setOrders, deleteRedux } from '../../actions';
import { getOrders, deleteOrder } from '../../apiCalls';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state ={}
  }

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  deleteThisOrder = burritoId => {
    this.props.deleteRedux(burritoId)
    deleteOrder(burritoId)
  }

  render() {
    const orderEls = this.props.orders.map(order => {
      return (
        <div key={order.name} className="order">
          <h3>{order.name}</h3>
          <ul  className="ingredient-list">
            {order.ingredients.map(ingredient => {
              return <li data-testid ={`${order.name} ${ingredient}`} key={`${ingredient} + ${order.id}`}>{ingredient}</li>
            })}
          </ul>
          <button onClick={() => this.deleteThisOrder(order.id)} className="Delete">DELETE</button>
        </div>
      )
    });

    return (
      <section className="orders-container">
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )
  }
}

const mapStateToProps = ({ orders }) => ({
  orders
});

const mapDispatchToProps = dispatch => ({
    setOrders: (orders) => dispatch(setOrders(orders)),
    deleteRedux: (orderId) => dispatch(deleteRedux(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);