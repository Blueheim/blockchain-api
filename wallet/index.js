const Transaction = require('./Transaction')
const { STARTING_BALANCE } = require('../config')
const { ec, cryptoHash } = require('../util')

// Allow multiple users to interact with each others in the cryptocurrency
// Hold important keypair containing private/public keys
// Public Key is the address to receive currency on the system
// The private Key is secret an is used ffor generating unique signatures for data
// Important, if we can use getPublic, better not use getPrivate and avoid possible leak
class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;

    this.keyPair = ec.genKeyPair();

    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign (data) {
    return this.keyPair.sign(cryptoHash(data))
  }

  createTransaction({ recipient, amount, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey
      })
    }

    if(amount > this.balance) {
      throw new Error('Amount exceeds balance');
    }

    return new Transaction({ senderWallet: this, recipient, amount });
  }

  // The balance at any point of time is the output amount for that wallet as it most recent transaction
  // In addition to any output amounts sent and received in the blockchain history after the most recent
  // transaction
  static calculateBalance({
    chain,
    address
  }) {
    let hasPerformedTransaction = false;
    let outputsTotal = 0;

    for(let i=chain.length-1; i>0; i--) {
      const block = chain[i];

      for(let transaction of block.data) {
        if(transaction.input.address === address) {
          hasPerformedTransaction = true;
        }
        const addressOutput = transaction.outputMap[address];

        if(addressOutput) {
          outputsTotal = outputsTotal + addressOutput
        }
      }

      if(hasPerformedTransaction) {
        break;
      }
    }

    return hasPerformedTransaction ? outputsTotal : STARTING_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;