import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import cssModules from 'react-css-modules';
import styles from './style.scss';

@immutableRenderDecorator
@cssModules(styles, { allowMultiple: true })
class TabContent extends Component {
  static propTypes = {
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  };

  getTabPanes() {
    const { activeIndex, panels } = this.props;

    return React.Children.map(panels, (child) => {
      if (!child) { return; }

      const order = parseInt(child.props.order, 10);
      const isActive = activeIndex === order;

      return cloneElement(child, {
        isActive,
        children: child.props.children,
        key: `tabpane-${order}`,
      });
    });
  }

  render() {
    const classes = classnames({
      content: true,
    });

    return (
      <div className={classes}>
        {this.getTabPanes()}
      </div>
    );
  }
}

export default TabContent;
