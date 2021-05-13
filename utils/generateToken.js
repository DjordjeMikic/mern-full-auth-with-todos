// Generating string which contians only numbers (6 digits) if num is less
// than 100000 it add 0 at start
const generateToken = () => {
  let x = Math.floor(Math.random() * 999999).toString();
  while(x.length < 6) {
    x = '0' + x;
  }
  return x;
}

module.exports = generateToken;
