import React, {Component} from 'react';
import './Rating.css';

class Rating extends Component {
  getIcon(index) {
    return (
      <svg width="14" height="14" key={index}>
        <path d="M8 11.2l-4.702 3.272L4.957 8.99.392 5.528l5.727-.117L8 0l1.88 5.411 5.728.117-4.565 3.46 1.66 5.484z" />
      </svg>
    );
  }

  render() {
    let bgIcons = [];
    let fgIcons = [];
    for (let i = 0; i < 5; i++) {
      bgIcons.push(this.getIcon(i));
    }
    for (let i = 5; i < 10; i++) {
      fgIcons.push(this.getIcon(i));
    }
    const width = this.props.rating * 20 + '%';
    return (
      <div className="Rating" title={`${this.props.rating} out of 5`}>
        <div className="bg">{bgIcons}</div>
        <div className="fg" style={{width: width}}>
          {fgIcons}
        </div>
      </div>
    );
  }
}

export default Rating;
