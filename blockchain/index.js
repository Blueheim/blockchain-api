const Block = require('./Block')
const Transaction = require('../wallet/Transaction')
const Wallet = require('../wallet')
const { cryptoHash } = require('../util')
const { REWARD_INPUT, MINING_REWARD } = require('../config');

// Collects the blocks together in a chain array
// Every block's lastHash fields must be equal to the hash field of the previous block

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];

  }

  // Add a block
  // Create links between each block by adding the lastBlock reference
  addBlock({data}) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    })

    this.chain.push(newBlock);
  }

  // If an incoming chain is longer than the current blockchain arrayand it's valid, 
  // We need to replace the current blockchain array with the incoming one
  // Mutltiple nodes in the network are able to agree on the longest version of the valid blockchain
  replaceChain(chain, validateTransactions, onSuccess) {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }

    if(!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid');
      return;
    }

    if(validateTransactions && !this.validTransactionData({ chain })) {
      console.error('The incoming chain has invalid data')
      return;
    }

    if (onSuccess) onSuccess();

    console.log('replacing chain with', chain);
    this.chain = chain;
  }

  // Each transaction data must be correctly formatted
  // Only one mining reward per block
  // Valid input amounts according balance in blockchain history
  // Block must not have identical transactions
  validTransactionData({ chain }) {
    for(let i=1; i<chain.length; i++) {
      const block = chain[i];
      const transactionSet = new Set();
      let rewardTransactionCount = 0;

      for(let transaction of block.data) {
        if(transaction.input.address  === REWARD_INPUT.address) {
          rewardTransactionCount += 1;

          if(rewardTransactionCount > 1) {
            console.error('Miner rewards exceed limit');
            return false;
          }

          if(Object.values(transaction.outputMap)[0] !== MINING_REWARD) {
            console.error('Miner reward amount is invalid');
            return false;
          }
        }else {
          if(!Transaction.validTransaction(transaction)) {
            console.error('Invalid transaction')
            return false;
          }

          const trueBalance = Wallet.calculateBalance({
            chain: this.chain,
            address: transaction.input.address
          })

          if(transaction.input.amount !== trueBalance) {
            console.error('Invalid input amount');
            return false;
          }

          if(transactionSet.has(transaction)) {
            console.error('An identical transaction appears more than once in the block')
            return false;
          } else {
            transactionSet.add(transaction);
          }
        }
      }
    }
    return true;
  }

  // Check if the genesis block is correct
  // Check that the last hash references are correct
  // Check that the block difficulty matches the hash leading 0's
  // Check that the generated hash matches the hash
  static isValidChain(chain) {
    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())){
      return false;
    } 

    for(let i=1; i < chain.length; i++) {
      const { timestamp, lastHash, hash, nonce, difficulty, data} = chain[i];

      const actualLastHash = chain[i-1].hash;
      const lastDifficulty = chain[i-1].difficulty;

      if(lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

      if (hash !== validatedHash){
        return false;
      }

      if(Math.abs(lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }

}

module.exports = Blockchain