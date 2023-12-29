const { InsertUserServerDetailsToDb } = require("./db_controller");

const ProxyServerModel =
  require("../../models/proxy_server.model").ProxyServerModel;

async function CreateUserProxyServer(req, res, next) {
  const { serverDetails } = req.body;
  console.log(serverDetails);
  const dbResponse = await InsertUserServerDetailsToDb(serverDetails);

  if (dbResponse) {
    return res.status(200).json({ message: "success" });
  }
  return res.status(400).json({ message: "success" });
}

async function GetUserProxyServers(id) {
  try {
    let proxyServers = await ProxyServerModel.findById(id).populate(
      "proxy_server"
    );
    console.log("User Proxy Server is: " + proxyServers);
    return proxyServers;
  } catch (e) {
    console.log(e.message);
  }
}

async function DeleteAllproxyServers() {
  try {
    let data = await ProxyServerModel.deleteMany({ categories: "" });
    console.log(data);
    return true;
  } catch (e) {
    console.log(e.message);
  }
}

// async function GetUserProxyServers(id) {
//     let categories = await ProxyServerModel.findOne()
//     return categories
// }

module.exports = {
  GetUserProxyServers,
  CreateUserProxyServer,
};
