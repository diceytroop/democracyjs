'use strict'
/* global require */
var Panel = require('react-bootstrap').Panel;
var Marty = require('marty');

var SettingPanel = require('./SettingPanel.jsx');
var SettingChangeProposer = require('./SettingChangeProposer.jsx');

SettingPanel = React.createClass({

  displayName: "SettingPanel",

	render: function() {
		var self =  this;
    var setting = this.props.setting;
    var setting_name = this.props.setting_name;
		return (<div>
              <div>{this.props.setting_name}</div>
              <SettingChangeProposer ref={setting_name+"Proposer"}
                              groupname={this.props.groupname}
                              default_value={this.props.setting.value}
                              setting_name={setting_name}
                              type={setting.type}
                              process={setting.process}

              />
          </div>);
  }
});

module.exports = Marty.createContainer(SettingPanel, {
  listenTo: ["settingsStore"],
  fetch: {
    setting: function() {
      return this.app.settingsStore.getSetting(this.props.groupname, this.props.setting_name);
    }
  }
});
