# Detecting User Presence

Understanding a user's availability is an essential component when considering who to forward calls to, who can attend an ad-hoc meeting, or even where people are (depending upon their status message). As an all-in-one communication platform, the Presence API gives apps visibility into a user's availability across the entire platform: are they on the phone? are they in a meeting? are they available, but their status is set to "Do Not Disturb" etc.

Apps can determine one's availability by looking at an aggregated status the platform computes automatically, or can look at each presence state independently and make other informed decisions.

## Presence Response

Below is a sample response from the Presence API to illustrate the visibility it can provide. The aggregated/computed status is highlighted below.

```json hl_lines="10"
{
  "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004/presence",
  "extension": {
    "uri": "https://platform.devtest.ringcentral.com/restapi/v1.0/account/248xxx004/extension/248xxx004",
    "id": 248111004,
    "extensionNumber": "101"
  },
  "presenceStatus": "Available",
  "telephonyStatus": "NoCall",
  "userStatus": "Available",
  "dndStatus": "TakeAllCalls",
  "allowSeeMyPresence": true,
  "ringOnMonitoredCall": false,
  "pickUpCallsOnHold": false
}
```

## Sample Code to Get Started with Presence

=== "JavaScript"

```js
	const RC = require('@ringcentral/sdk').SDK

	var rcsdk = new RC({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
	var platform = rcsdk.platform();

	platform.login({username: "username", password: "password", extension: "extension_number"})

  platform.on(platform.events.loginSuccess, function(e){
    get_users_presence()
  });

  async function get_users_presence(){
    try {
      var resp = await platform.get('/restapi/v1.0/account/~/presence', {
                  detailedTelephonyState: true
                })
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
        console.log(record.userStatus)
      }
    }catch(e){
      console.log(e.message)
    }
  }
```

=== "Python"

```python
	from ringcentral import SDK

	rcsdk = SDK( "client_id", "client_secret", "server_url")
	platform = rcsdk.platform()
	platform.login("username", "extension_number", "password")

	resp = platform.get('/restapi/v1.0/account/~/presence',
	    {
		'detailedTelephonyState' : True
	    })
	for record in resp.json().records:
	    print record.userStatus
```

=== "PHP"
	
```php
	<?php
	require('vendor/autoload.php');

	$rcsdk = new RingCentral\SDK\SDK("client_id", "client_secret", "server_url");

	$platform = $rcsdk->platform();
	$platform->login("username", "extension_number", "password");

	$resp = $platform->get('/account/~/presence',
	    array(
		'detailedTelephonyState' => true
	    ));
	foreach ($resp->json()->records as $record)
	    print_r ($record->userStatus . "\n");
```

=== "C#"

```c#
	using System;
	using System.Threading.Tasks;
	using RingCentral;

	namespace Read_Presence
	{
	  class Program
	  {
      static RestClient restClient;

      static void Main(string[] args)
      {
        restClient = new RestClient("client_id", "client_secret", "server_url");
        await restClient.Authorize("username", "extension_number", "password");
        read_users_presence().Wait();
      }

      static private async Task read_users_presence()
		  {
        var parameters = new AccountPresenceParameters();
        parameters.detailedTelephonyState = true;

        var resp = await rc.Restapi().Account().Presence().Get(parameters);
          foreach (var record in resp.records)
          {
            Console.WriteLine(record.userStatus);
          }
      }
	  }
	}
```

=== "Java"

```java
	import com.ringcentral.*;
	import com.ringcentral.definitions.*;

	public class Read_Presence {
    static RestClient restClient;
    public static void main(String[] args) {
        var obj = new Read_Presence();
        try {
          restClient = new RestClient("client_id", "client_secret", "server_url");
          restClient.authorize("username", "extension_number", "password");
          obj.read_users_presence();
        } catch (RestException | IOException e) {
          e.printStackTrace();
        }
    }

	  public static void read_users_presence() throws RestException, IOException{
      var parameters = new ReadAccountPresenceParameters();
      parameters.detailedTelephonyState = true;

      var response = rc.restapi().account().presence().get(parameters);
      for (var record : response.records)
        System.out.println(record.userStatus);
	  }
	}
```

=== "Ruby"

```ruby
	require 'ringcentral'

	rc = RingCentral.new("client_id", "client_secret", "server_url")
	rc.authorize(username: "username", extension: "extension_number", password: "password")

	resp = rc.get('/restapi/v1.0/account/~/presence', payload:
	    {
		      detailedTelephonyState: true
	    })

	for record in resp.body['records'] do
	    puts record.userStatus
	end
```

## Required Permissions

Apps requesting to read presence information require the `ReadPresence` permission.

## Presence APIs

The following APIs are often used in reading and updating user presence information:

* [Get User Status](https://developers.ringcentral.com/api-reference#Presence-getPresenceStatus)
* [Update User Status](https://developers.ringcentral.com/api-reference#Presence-updatePresenceStatus)
* [Get Users Presence Statuses](https://developers.ringcentral.com/api-reference#Presence-accountPresence)
