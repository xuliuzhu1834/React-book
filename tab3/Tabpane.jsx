import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import cssModules from 'react-css-modules';
import styles from './style.scss';

@immutableRenderDecorator
@cssModules(styles, { allowMultiple: true })
class TabPane extends Component {
  static propTypes = {
    tab: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    order: PropTypes.string.isRequired,
    disable: PropTypes.bool,
    isActive: PropTypes.bool,
  };

  render() {
    const { isActive, children } = this.props;

    const classes = classnames({
      panel: true,
      contentActive: isActive,
    });

    return (
      <div
        role="tabpanel"
        className={classes}
        aria-hidden={!isActive}
      >
        {children}
      </div>
    );
  }
}

export default TabPane;
