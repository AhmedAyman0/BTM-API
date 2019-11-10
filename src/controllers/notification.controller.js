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
  contents: {
    en: "Test notification",
    tr: "Test mesajı"
  },
  headings: {
    en: "hello"
  },
  filters: []
});

exports.sendNotification = async (req, res) => {
  firstNotification.postBody["contents"] = { en: req.body.msg };
  firstNotification.postBody["filters"].push({
    field: "email",
    relation: "=",
    value: req.body.email
  });
  try {
    await myClient.sendNotification(firstNotification);
    return res.status(200);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
