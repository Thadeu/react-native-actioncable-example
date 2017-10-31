// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  // App.cable = ActionCable.createConsumer('ws://localhost:3000/cable?user_id=2');
  App.cable = ActionCable.createConsumer();

}).call(this);
