const fetch = require('node-fetch');
const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

import { RESOURCES, ABOUT } from './MoreModel';

describe('resource links', () => {
  RESOURCES.map(async (resource) => {
    if (!['13C'].includes(resource.id)) {
      test(resource.value, async () => {
        if (resource.type == 'link' && resource.link.startsWith('http')) {
          const resp = await fetch(resource.link, {
            method: 'GET',
            agent: httpsAgent,
          });
          expect(resp.status).toEqual(200);
        }
      });
    }
  });
});

describe('about links', () => {
  ABOUT.map(async (about) => {
    test(about.value, async () => {
      if (about.type == 'link' && about.link.startsWith('http')) {
        const resp = await fetch(about.link, {
          method: 'GET',
          agent: httpsAgent,
        });
        expect(resp.status).toEqual(200);
      }
    });
  });
});
