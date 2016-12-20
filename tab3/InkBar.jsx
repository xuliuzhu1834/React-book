import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import cssModules from 'react-css-modules';
import styles from './style.scss';

@immutableRenderDecorator
@cssModules(styles, { allowMultiple: true })
class InkBar extends React.Component {
  render() {
    const { width, left } = this.props;
    const classes = classnames({
      inkBar: true,
    });
    return (
      <div
        className={classes}
        style={{
          WebkitTransform: `translate3d(${left}px, 0, 0)`,
          transform: `translate3d(${left}px, 0, 0)`,
          width,
        }}
      />
    );
  }
}

export default InkBar;
