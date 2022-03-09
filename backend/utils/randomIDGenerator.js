const getRandomId = (length) => {
  const chars = 'azertyuiopqsdfghjklmnbvcxwAZERTYUIOPLMKJHGFDSQWXCVBN123456789';
  let id = '';
  for (let i = 0; i < length; i++) {
    id += chars[Math.round(Math.random() * chars.length)];
  }

  return id;
};

module.exports = getRandomId;
