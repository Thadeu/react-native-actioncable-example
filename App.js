import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Alert, Platform } from 'react-native';
import ActionCable from 'react-native-actioncable';
import { Constants, Notifications, Permissions } from 'expo';

export default class App extends React.Component {

  state = {
    connected: false,
    messages: [],
    postMessage: ''
  }

  constructor(props){
    super(props)
    this.cable = ActionCable.createConsumer(`ws://192.168.1.50:3000/cable`)
  }

  componentDidMount() {  
    this.subscription = this.cable.subscriptions.create({channel: 'MessageChannel'}, {
      connected: () => this.setState({connected: true}),
      disconnected: () => this.setState({connected: false}),
      received: (data) => {
        const messages = [...this.state.messages, data]
        this.setState({ messages: messages })
        Notifications.setBadgeNumberAsync(messages.length)
      }
    })
  }

  componentWillMount() {
    if(this.subscription) {
      this.cable.subscriptions.remove(this.subscription)
    }
  }

  onSubmit = () => {
    const message = { message: this.state.postMessage }
    // this.subscription.perform('send_message', message)
    this.subscription.send(message)
    this.setState({postMessage: ''})
  }

  handleChangeText = (text) => {
    this.setState({postMessage: text})
  }

  render() {
    const messages = this.state.messages.map((item, i) => {
      return (
        <Text key={i}>{item.message}</Text>
      )
    })

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ alignItems: 'center' }}>
          <Text>ActionCable Chat</Text>
          <Text>Status: {this.state.connected ? 'online' : 'offline'}</Text>
        </View>
        
        <View style={{flex: 1, alignItems: 'flex-start', padding: 10}}>
          {messages}
        </View>

        <View style={{ alignSelf: 'stretch' }}>
          <TextInput 
            value={this.state.postMessage}
            onChangeText={(text) => this.handleChangeText(text)}
            style={{ alignSelf: 'stretch', height: 56, padding: 8, borderWidth: 0, backgroundColor: '#f7f7f7' }}
            onEndEditing={this.onSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 26,
    marginBottom: 4
  },
});
