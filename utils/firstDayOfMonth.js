module.exports = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 1);
}