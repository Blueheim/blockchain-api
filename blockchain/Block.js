
const hexToBinary = require('hex-to-binary')
const { GENESIS_DATA, MINE_RATE } = require('../config')
const { cryptoHash } = require('../util')

class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    // Proof of work system properties
    // Account for how quickly new blocks are created
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // initial dummy block whith hardcoded values
  // Start the blockchain
  // This block has no previous block consequently(lastHash empty)
  static genesis() {
    return new this(GENESIS_DATA)
  }

  // Add real block to the blockchain
  // Proof of work processing
  // Find the correct hash (leading 0s based on difficulty) to add a new block
  static mineBlock({lastBlock, data}) {
    const lastHash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;


    // Proof of work 
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp })
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty))

    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      data,
      difficulty,
      nonce,
      hash
    });
  }

  // Average the rate at which blocks get mined in the system to come close to a certain value
  // This value is set in the config file: MINE_RATE
  // + difficulty = slower to find the hash
  // In bitcoin blockchain, average mining time is set to 10min
  static adjustDifficulty({ originalBlock, timestamp}) {
    const { difficulty } = originalBlock;


    if (difficulty < 1 ) return 1;

    if ((timestamp - originalBlock.timestamp) > MINE_RATE) {
      return difficulty -1;
    }

    return difficulty + 1;
  }
}

module.exports = Block
