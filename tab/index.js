import './tab.scss';
import Tabs from './tab';

const tab = new Tabs({
  elements: '#tab-demo',
  tabs: '#tab-demo .tabs-nav li',
  panels: '#tab-demo .tab-content div',
  activeIndex: 1,
});
tab.events.on('change', (o) => {
  console.log('change');
});