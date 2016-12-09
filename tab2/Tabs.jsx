import React, { Component, PropTypes } from 'react';
import TabContent from './TabContent.jsx';
import TabNav from './TabNav.jsx';

class Tabs extends Component {
  static propTypes = {
    classPrefix: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    className: PropTypes.string,
    activeIndex: PropTypes.number,
    defaultActiveIndex: PropTypes.number,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    classPrefix: 'tabs',
    onChange: () => {}
  };
  constructor(props) {
    super(props);
    const currProps = this.props;
    let activeIndex;

    if( 'activeIndex' in currProps ){
      activeIndex = currProps.activeIndex;
    }else if ('defaultActiveIndex' in currProps) {
      activeIndex = currProps.defaultActiveIndex;
    }

    this.state = {
      activeIndex,
      prevIndex: activeIndex,
    };
  }

  componentWillReceiveProps(nexProps) {
    if('activeIndex' in nexProps) {
      this.setState({
        activeIndex: nexProps.activeIndex,
      });
    }
  }

  handleTabClick(activeIndex){
    const prevIndex = this.state.activeIndex;
    if(prevIndex !== activeIndex && 'defaultActiveIndex' in this.props ) {
      this.setState({
        activeIndex,
        prevIndex
      });
    }
    this.onChange({activeIndex, prevIndex});
  }
  renderTabNav() {
    const { classPrefix, children} = this.props;
    return (
      <TabNav
        key="tabBar"
        classPrefix = {classPrefix}
        onTabClick = {() => this.handleTabClick }
        panels = {children}
        activeIndex = { this.state.activeIndex }
      />
    )
  }
  renderTabContent() {
    const { classPrefix, children } = this.props;
    return (
      <TabContent
        key="tabcontent"
        classPrefix = {classPrefix}
        panels = { children }
        activeIndex ={ this.state.activeIndex }
      />
    )
  }

  render() {
    const {className } = this.props;

    //classbames用于合并class
    const classes = classnames(className, 'ui-tabs');

    return(
      <div
        className={classes}
      >
        { this.renderTabNav() }
        { this.renderTabContent() }
      </div>
    )

  }
}