import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import axios from 'axios';

export async function GET(req) {
  const GET_URL = 'https://linktr.ee/cop1besancon';
  const KEYWORDS = ["13 septembre", "13-septembre"];
  
  const { searchParams } = new URL(req.url);
  const isTest = searchParams.get('test', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; MyApp/1.0; +https://myapp.com)',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
    }
  }) === 'true';
  const testData = "Some text that does not contain any of the KEYWORDS";

  try {
    const response = await axios.get(GET_URL);
    const data = isTest ? testData : response.data;
    if (data.length < 10) return NextResponse.json({ ok: false });

    if (!(data.includes(KEYWORDS[0]) && data.includes(KEYWORDS[1]))) {
      const resend = new Resend('re_7KFsWvSD_6VyydUkeoiVgwLaY62e4YTEH');

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'massyl.amarni@outlook.fr',
        subject: 'COP1',
        html: `<p>Updated !</p>`
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
