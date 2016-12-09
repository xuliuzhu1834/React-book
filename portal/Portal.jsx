import React from 'react';
import ReacDOM, { findDOMNode } from 'react-dom';
 import CSSPropertyOperations from 'react-dom/lib/CSSPropertyOperations';

export default class Portal extends React.Component {
  constructor(props){
    super(props);
    //...
  }
  openPortal(props = this.props){
    this.setState({active: true});
    this.renderPortal(props);
    this.props.onOpen(this.node);
  }
  closePortal(isUnmounted = false){
    const resetPortalState = () => {
      if (this.node) {
        ReactDOM.unmountComponentAtNode(this.node);
        document.body.removeChild(this.node);
      }
      this.portal = null;
      this.node = null;
      if(isUnmounted !== true){
        this.setState({active: false});
      }
    };

    if(this.state.active){
      if(this.state.beforeClose) {
        this.props.beforeClose(this.node, resetPortalState)
      }else{
        resetPortalState()
      }
      this.props.onClose();
    }

  }

  renderPortal(props) {
    if(!this.node) {
      this.node = document.createElement('div');
      this.applyClassNameAndStyle(props);
      document.body.appendChild(this.node);
    } else {
      this.applyClassNameAndStyle(props);
    }

    let children = props.children;
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal })
    }
    this.portal = ReacDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate
    );
  }

  render(){
    if(this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn,{onClick: this.handleWrapperClick})
    }
    return null;
  }
}
