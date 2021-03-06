const Component = require('./component');

const LOG_TAG = '[TabsComponent]';

/** Functions that help interact with pages with tabs */
class TabsComponent extends Component {
  /**
   * Clicks the given tab element
   * @param {object} tabElement - css defining the tab element
   */
  clickTab(tabElement) {
    this.I.say(`${LOG_TAG} Clicking on tab`);
    this.I.waitForElement(tabElement);
    this.I.click(tabElement);

    this.I.say(`${LOG_TAG} waiting for tab to load`);

    this.I.waitForVisible("#overlay");
    this.I.waitForInvisible('#overlay');

  }
}

module.exports = TabsComponent;
