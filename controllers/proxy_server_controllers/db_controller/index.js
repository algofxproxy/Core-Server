const { ProxyServerModel } = require("../../../models/proxy_server.model");

async function InsertUserServerDetailsToDb(serverDetails) {
  const proxyServer = await ProxyServerModel.create(serverDetails);
  await proxyServer.save();
  console.log("inserted new proxyServer" + proxyServer);
  return true;
}

module.exports = {
  InsertUserServerDetailsToDb,
};
