from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'enabled': True,
    'type': 'AfterHours',
    'name': "Company off time",
    'schedule' : {
      'weeklyRanges': {
      	'monday': [{ 'from': "09:00",'to': "10:00" }],
        'friday': [{ 'from': "10:00", 'to': "15:00" }]
      }
    },
    'callHandlingAction': "TakeMessagesOnly"
  }
resp = platform.post('/restapi/v1.0/account/~/answering-rule', params)

print( resp.text() )
