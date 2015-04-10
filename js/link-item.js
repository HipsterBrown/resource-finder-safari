import React from 'react';
import CopyIconClass from './copy-icon';

let D = React.DOM;
let Type = React.PropTypes;
let CopyIcon = React.createFactory(CopyIconClass);

export default React.createClass({
  displayName: "LinkItem",

  getInitialState() {
    return {
      copyReady: false
    };
  },

  propTypes: {
    fileName: Type.string,
    link: Type.string
  },

  componentDidUpdate(){
    if( this.state.copyReady ) {
      let linkText = this.getDOMNode().querySelector('.link-text');
      
      linkText.select();
    }
  },

  switchInput(e) {
    if(!this.state.copyReady) {
      this.setState({ copyReady: true });
    } else {
      this.setState({ copyReady: false });
    }
  },

  render() {
    let self = this;

    return D.li({
      className: "link-item"
    }, [
      self.state.copyReady ? D.input({
        className: 'link-text',
        type: 'text',
        value: self.props.link
      }) : D.a({
        className: "link",
        href: self.props.link
      }, self.props.fileName ),
      CopyIcon({
        handleClick: self.switchInput
      })
    ]);
  }
});
