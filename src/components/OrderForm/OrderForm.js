import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOrder } from '../../actions';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.clearInputs();
    console.log(this.state.ingredients)
    let order = [{id: Date.now(), name: this.state.name, ingredients: this.state.ingredients}]
    this.props.addOrder(order)
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    const arrayValue = this.state.ingredients.length > 0 ? false : true

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button disabled={arrayValue} onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addOrder: order => dispatch(addOrder(order))
})

export default connect(null, mapDispatchToProps)(OrderForm);