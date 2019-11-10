var OneSignal = require("onesignal-node");
var myClient = new OneSignal.Client({
  userAuthKey: "ZWQwNzhmOWYtMjhhZi00M2FjLWJjZjEtNmVjNjMxMmEwNzI0",
  // note that "app" must have "appAuthKey" and "appId" keys
  app: {
    appAuthKey: "ZGMxNjA4MjEtODU1YS00ZDIzLTlhYjAtNDIzMzUwMmZjMWFm",
    appId: "e3ad473d-a2e2-445f-8e86-b667961ca10a"
  }
});

var firstNotification = new OneSignal.Notification({
  headings: {
    en: "hello"
  }
});
var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ZGMxNjA4MjEtODU1YS00ZDIzLTlhYjAtNDIzMzUwMmZjMWFm"
    };
    
    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };
    
    var https = require('https');
    var req = https.request(options, function(res) {  
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });
    
    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });
    
    req.write(JSON.stringify(data));
    req.end();
    return ;
  };
  

  
exports.sendNotification =  (req, res) => {
  
    var message = { 
        app_id: "e3ad473d-a2e2-445f-8e86-b667961ca10a",
        contents: {"en": req.body.msg},
        filters: [
                {"field": "email",  "value": req.body.email}, 
                
          ]
      };
    sendNotification(message);
    return res.status(200);

};
