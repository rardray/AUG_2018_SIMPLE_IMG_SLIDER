module.exports = {
  secret: "secret-catchphrase",
  database: process.env.MONGOLAB_URI,
  port: process.env.PORT || 3001
};

//configuration options could be placed in index.js database could be put directly in mongoose.on
