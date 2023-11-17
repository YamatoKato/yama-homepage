import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { JSDOM } from 'jsdom';

export type OgData = {
  url: string;
  siteName?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
};

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const url = Array.isArray(req.query.url) ? req.query.url[0] : req.query.url;

  if (!url) {
    res.status(400);
    return;
  }

  const httpRes = await fetch(url);
  if (!httpRes.ok) {
    res.status(404);
    return;
  }

  const resHtml = await httpRes.text();
  const jsdom = new JSDOM(resHtml);

  const og: OgData = { url };
  const metaTags = jsdom.window.document.getElementsByTagName('meta');

  for (const metaTag of metaTags as any) {
    const property = metaTag.getAttribute('property');
    const content = metaTag.getAttribute('content');
    switch (property) {
      case 'og:site_name':
        og.siteName = content || undefined;
        break;
      case 'og:title':
        og.title = content || undefined;
        break;
      case 'og:description':
        og.description = content || undefined;
        break;
      case 'og:image':
        og.image = content || undefined;
        break;
      case 'og:type':
        og.type = content || undefined;
        break;
      default:
      // nop
    }
  }

  res.setHeader('Cache-Control', 'max-age=86400');
  res.send(og);
};

export default handler;
