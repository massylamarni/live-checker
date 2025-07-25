import { Resend } from 'resend';

export default async function handler(req, res) {
  const axios = require('axios');

  const POST_URL = 'https://trouverunlogement.lescrous.fr/api/fr/search/41';
  const POST_BODY = {"idTool":41,"need_aggregation":true,"page":1,"pageSize":24,"sector":null,"occupationModes":[],"location":[{"lon":5.832403367021861,"lat":47.29599256434725},{"lon":6.21623820588905,"lat":47.09630128385372}],"residence":null,"precision":5,"equipment":[],"price":{"max":10000000},"area":{"min":0},"toolMechanism":"residual"};
  const TEST_BODY = {"idTool":41,"need_aggregation":true,"page":1,"pageSize":24,"sector":null,"occupationModes":[],"location":[{"lon":4.48820642836235,"lat":47.98989043961766},{"lon":7.55888513929985,"lat":46.39237900762632}],"residence":null,"precision":4,"equipment":[],"price":{"max":10000000},"area":{"min":0},"toolMechanism":"residual"};

  try {
    const response = await axios.post(POST_URL, POST_BODY);
    const data = response.data;

    if (data.results.total.value !== 0) {
      console.log('Results found. Sending notification...');
      await sendNotification(`Number of results found: ${data.results.total.value}.`);
    } else {
      console.log('No results found.');
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Request failed' });
  }
}

async function sendNotification(message) {
  const resend = new Resend('re_7KFsWvSD_6VyydUkeoiVgwLaY62e4YTEH');

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'massyl.amarni@outlook.fr',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
  });
}
