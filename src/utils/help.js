const getCurrentTime = () => {
  let date = new Date();

  return {
    time: `${date.getHours()}:${date.getMinutes()}`,
    sec: date.getSeconds() * 6,
    min: date.getMinutes() * 6 + (date.getSeconds() * 6) / 60,
    hour: ((date.getHours() % 12) / 12) * 360 + 90 + (date.getMinutes() * 6 + (date.getSeconds() * 6) / 60) / 12
  };
};

module.exports = { getCurrentTime };
