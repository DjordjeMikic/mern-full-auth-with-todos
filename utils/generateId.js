// Function generates unique id 25 symbols length
const generateId = () => {
  let letters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let x = '';
  for(let i = 0; i < 26; i++) {
    x = x + letters[Math.floor(Math.random() * letters.length)];
  }
  return x;
}

module.exports = generateId;
