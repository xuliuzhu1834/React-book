import React, { Component, PropTypes } from 'react';

class Tabpane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),isRequired,
    order: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    isActive: PropTypes.bool,
  }

  render() {
    const { classPrefix, className, isActive, children} = this.props;

    const classes = classnames({
      [className]: className,
      [`${classPrefix}-panel`]: true,
      [`${classPrefix}-isActive`]: isActive,
    });

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden = {!isActive}
      >
        {children}
      </div>
    )
  }
}
export default Tabpane;