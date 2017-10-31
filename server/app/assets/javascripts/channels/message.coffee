App.message = App.cable.subscriptions.create "MessageChannel",
  connected: ->

  disconnected: ->

  received: (data) ->
    ul = document.querySelector('.list-messages')
    li = "<li> "+data['message']+" </li>"
    ul.innerHTML += li
    
  sendMessage: (message) ->
  	@perform('send_message', { message: message })
