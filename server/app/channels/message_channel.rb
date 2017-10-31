class MessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end

  def unsubscribed
    stop_all_streams
  end

  def receive(data)
    send_message(data)
  end
  
  def send_message(data)
    ActionCable.server.broadcast(
      'messages', 
      message: data['message']
    )
  end
end
