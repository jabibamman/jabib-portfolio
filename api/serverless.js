module.exports = async (req, res) => {
  const { app } = await import('../dist/jabib-portfolio/server/server.mjs');
  const expressApp = await app();
  return expressApp(req, res);
};