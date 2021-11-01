const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, async function(e) {
    try {
      var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
        dateFrom: '2018-04-20T06:33:00.000Z'
      })
      var jsonObj = await resp.json()
      const messages = jsonObj.records
      console.log(`We get of a list of ${messages.length} messages`)
      const message = messages[0]
      var resp = await platform.delete( `/restapi/v1.0/account/~/extension/~/message-store/${message.id}` )
      var jsonObj = await resp.json()
      console.log(`Message ${message.id} has been deleted`)
    } catch (e) {
	console.error(e)
    }
})
