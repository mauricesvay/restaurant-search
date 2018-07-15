import React, {Component} from 'react';
import Rating from '../Rating';
import './RestaurantCard.css';

class RestaurantCard extends Component {
  render() {
    const restaurant = this.props.restaurant;
    return (
      <div className="RestaurantCard" key={restaurant.objectID}>
        <a href={restaurant.reserve_url}>
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="RestaurantCard__image"
          />
        </a>
        <div className="RestaurantCard__info">
          <a
            href={restaurant.reserve_url}
            className="RestaurantCard__name"
            title={restaurant.name}
          >
            {restaurant.name}
          </a>
          <div className="RestaurantCard__rating">
            <Rating rating={restaurant.stars_count}/>
            {restaurant.stars_count} <span title={`${restaurant.reviews_count} reviews`}>({restaurant.reviews_count})</span>
          </div>
          <div className="RestaurantCard__category">{restaurant.food_type}</div>
          <div className="RestaurantCard__location">
            {restaurant.city}, {restaurant.state}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantCard;
