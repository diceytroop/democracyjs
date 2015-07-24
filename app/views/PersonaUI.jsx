'use strict'
/* global require */

var Panel = require('react-bootstrap').Panel;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var _ = require('underscore');
var Button = require('react-bootstrap').Button;

var PersonaUI = React.createClass({

  displayName: "PersonaUI",

  getInitialState: function() {
    return {
      new_persona_field_value: ""
    }
  },

  onTextChange: function(e) {
    this.setState({
      new_persona_field_value: e.target.value
    })
  },

  addPersona: function() {
    var that = this;
    this.context.app.personaActionCreators.addPersona(this.state.new_persona_field_value);
    this.setState({
      new_persona_field_value: ""
    })
  },

  renderPersonaAdder: function() {
    return( <div><input type="shortText" onChange={this.onTextChange} placeholder="New Persona"/>
      <Button onClick={this.addPersona}>Add</Button>
      </div>
    )
  },

  renderPersonaMenuItem: function(index) {
    return (<MenuItem eventKey={index} key={index}>{index}</MenuItem>)
  },

  renderPersonaMenu: function (personas){
    var persona_menu = [];
    var that = this;
    _.forEach(personas, function(persona, index) {
      var item = that.renderPersonaMenuItem(index);
      persona_menu.push(item);
    });
    return persona_menu;
  },

	render: function() {
		var self = this;
    var menu_items = this.renderPersonaMenu(this.props.personas);
		return (<Panel>
              <div>Current Persona:
                <DropdownButton title={this.props.current_persona}>
                  {menu_items}
                </DropdownButton>
              </div>
              <div>
                {this.renderPersonaAdder()}
              </div>
		        </Panel>);
  }
});


module.exports = Marty.createContainer(PersonaUI, {
  listenTo: ["personaStore"],
  fetch: {
    current_persona: function() {
      return this.app.personaStore.getCurrentPersonaId();
    },
    personas: function() {
      return this.app.personaStore.getAllPersonas();
    }
  }
});