import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import axios from 'axios';

export async function GET(req) {
  const POST_URL = 'https://trouverunlogement.lescrous.fr/api/fr/search/41';
  const STD_BODY = {"idTool":41,"need_aggregation":true,"page":1,"pageSize":24,"sector":null,"occupationModes":[],"location":[{"lon":5.832403367021861,"lat":47.29599256434725},{"lon":6.21623820588905,"lat":47.09630128385372}],"residence":null,"precision":5,"equipment":[],"price":{"max":10000000},"area":{"min":0},"toolMechanism":"residual"};
  const TEST_BODY = {"idTool":41,"need_aggregation":true,"page":1,"pageSize":24,"sector":null,"occupationModes":[],"location":[{"lon":4.48820642836235,"lat":47.98989043961766},{"lon":7.55888513929985,"lat":46.39237900762632}],"residence":null,"precision":4,"equipment":[],"price":{"max":10000000},"area":{"min":0},"toolMechanism":"residual"};

  const { searchParams } = new URL(req.url);
  const isTest = searchParams.get('test') === 'true';
  const POST_BODY = isTest ? TEST_BODY : STD_BODY;

  try {
    const response = await axios.post(POST_URL, POST_BODY);
    const data = response.data;

    if (data.results.total.value !== 0) {
      const resend = new Resend('re_7KFsWvSD_6VyydUkeoiVgwLaY62e4YTEH');

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'massyl.amarni@outlook.fr',
        subject: 'CROUS',
        html: `<p>Found ${data.results.total.value} result(s).</p>`
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
