const express = require('express');
const { GetUserProxyServers, InsertProduct, CreateUserProxyServer } = require('../controllers/proxy_server_controllers/proxy_server.controller');
const router = express.Router();

/* GET home page. */
router.post('/get_user_servers', async function (req, res, next) {
    let {id} = req.body
    console.log(id);
    const userServers = await GetUserProxyServers(id);
    if(userServers!= null){
        return res.status(200).send(userServers);
    }else{
        return res.status(201).json({response:"No User Data"})
    }
});

// router.get('/delete', async function (req, res, next) {
//     const done = await DeleteAllProducts();
//     res.send("done");
// });

router.post('/create_proxy_server',CreateUserProxyServer)
module.exports = router;
