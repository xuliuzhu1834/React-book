import React, { Component, PropTypes, cloneElement } from 'react';
import ReacDom from 'react-dom';
import classnames from 'classnames';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';
import cssModules from 'react-css-modules';
import { Motion, spring } from 'react-motion';
import InkBar from './InkBar';
import styles from './style.scss';

function getOuterWidth(el) {
  return el.offsetWidth;
}
function getOffset(el) {
  const html = el.ownerDocument.documentElement;
  const box = el.getBoundingClientRect();

  return {
    top: (box.top + window.pageYOffset) - html.clientTop,
    left: (box.left + window.pageXOffset) - html.clientLeft,
  };
}

@immutableRenderDecorator
@cssModules(styles, { allowMultiple: true })
class TabNav extends Component {
  static propTypes = {
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      inkBarWidth: 0,
      inkBarLeft: 0,
    };
  }
  componentDidMount() {
    const { activeIndex } = this.props;
    const node = ReacDom.findDOMNode(this);
    const el = node.querySelectorAll('li')[activeIndex];
    this.setState({
      inkBarWidth: getOuterWidth(el),
      inkBarLeft: getOffset(el).left,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      const { activeIndex } = this.props;
      const node = ReacDom.findDOMNode(this);
      const el = node.querySelectorAll('li')[activeIndex];
      this.setState({
        inkBarWidth: getOuterWidth(el),
        inkBarLeft: getOffset(el).left,
      });
    }
  }
  getTabs() {
    const { panels, activeIndex } = this.props;

    return panels.map((child) => {
      if (!child) { return null; }
      const order = parseInt(child.props.order, 10);

      const classes = classnames({
        tab: true,
        tabActive: activeIndex === order,
        disabled: child.props.disabled,
      });

      let events = {};
      if (!child.props.disabled) {
        events = {
          onClick: () => this.props.onTabClick(order),
        };
      }

      const ref = {};
      if (activeIndex === order) {
        ref.ref = 'activeTab';
      }
      return (
        <li
          role="tab"
          aria-disabled={child.props.disabled ? 'true' : 'false'}
          aria-selected={activeIndex === order ? 'true' : 'false'}
          {...events}
          className={classes}
          key={order}
          {...ref}
        >
          {child.props.tab}
        </li>
      );
    });
  }

  render() {
    const rootClasses = classnames({
      bar: true,
    });

    const classes = classnames({
      nav: true,
    });

    return (
      <div className={rootClasses} role="tablist">
        <Motion style={{ left: spring(this.state.inkBarLeft) }}>
          {
            ({ left }) => <InkBar left={left} width={this.state.inkBarWidth} />
          }
        </Motion>
        <ul className={classes}>
          {this.getTabs()}
        </ul>
      </div>
    );
  }
}

export default TabNav;
