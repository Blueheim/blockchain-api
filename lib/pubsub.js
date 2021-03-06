const redis = require('redis');
const config = require('config');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
}

// Publisher/Subscriber pattern
// Expose channels to be subscribed by subscribers
// Subscribers listen for messages
// Publishers can broadcast their messages
// Messages are either blockchain replacement or set new transaction
class PubSub {
  constructor({ blockchain, transactionPool }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.publisher = redis.createClient(config.get('redisUrl'));
    this.subscriber = redis.createClient(config.get('redisUrl'));

    this.subscribeToChannels();

    this.subscriber.on(
      'message', 
      (channel, message) => this.handleMessage(channel, message)
    )
  }

  handleMessage(channel, message) {
    console.log(`message received. Channel: ${channel}. Message: ${message}`)

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage, true, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage
          });
        });
        break;
      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;
      default:
        return;
    }
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach((channel) => {
      this.subscriber.subscribe(channel);
    })
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    })
    
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    })
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction)
    })
  }
}

module.exports = PubSub
