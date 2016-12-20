import React, { PropTypes } from 'react';
import Tabs from './Tabs';
import TabPane from './Tabpane';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }
  handleChange(value) {
    this.setState({
      activeIndex: parseInt(value, 10),
    });
  }
  render() {
    return (
      <div>
        <div className="operate">
          <span>switch tab:</span>
          <select
            value={this.state.activeIndex}
            onChange={e => this.handleChange(e.target.value)}
          >
            <option value={0}>Tab1</option>
            <option value={1}>Tab2</option>
            <option value={2}>Tab3</option>
          </select>
        </div>
        <Tabs activeIndex={this.state.activeIndex} className="tabs-bar">
          <TabPane tab="tab 1" order="0"> description tab 1 </TabPane>
          <TabPane tab="tab 2" order="1"> description tab 2</TabPane>
          <TabPane tab="tab 3" order="2"> description tab 3</TabPane>
        </Tabs>
      </div>
    );
  }

}

export default App;
