module.exports = {
  rootUrl: 'http://fluengo-app.local:3000',
  mailgun: {
    domain: 'sandbox179969f0e57f459a97c5f072e98e1e4a.mailgun.org',
    apiKey: 'key-78d2d63104e57b1d829bf4d4194845f3',
    from: {
      name: 'Mailgun Sandbox',
      email: 'postmaster@sandbox179969f0e57f459a97c5f072e98e1e4a.mailgun.org'
    }
  },
  facebookAuth : {
    clientID     : '742820965871979', // your App ID
    clientSecret : 'e455ea8afac8fd1e7190b97f48706404', // your App Secret
    callbackURL   : 'http://localhost:3000/api/auth/facebook/callback'
  },
  twitterAuth : {
    consumerKey     : 'EANzNlDFn1XhIJzwknl9khxsi',
    consumerSecret  : '6iSsJ6jeKiRV9XQYEdBrAq5HLEZU6X8Xv9hyiVwAP4Jjldgqfw',
    callbackURL     : 'http://localhost:3000/api/auth/twitter/callback',
    includeEmail    : true
  },
  googleAuth : {
    clientID: '267900198541-qnmfqji9e1qahb9utufeqdibm1qqvq8c.apps.googleusercontent.com',
    clientSecret: 'pjY3sYXKoh35rTXyBrtgbfVE',
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  },
  windowsAuth : {
    clientID: '1f3fa843-dc22-4047-9bb3-94a20d4f92e4',
    clientSecret: '3VVYwdRngOw0uVeKpycmot8',
    callbackURL: 'http://localhost:3000/api/auth/windowslive/callback'
  }

};
