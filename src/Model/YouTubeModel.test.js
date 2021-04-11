const fetch = require('node-fetch');

import YouTubeModel from './YouTubeModel';

describe.skip('youtube model', () => {
  for (let key in YouTubeModel) {
    for (let group in YouTubeModel[key]) {
      YouTubeModel[key][group].map((video) => {
        test(`${key} ${group} ${video[0]} https://youtu.be/${video[1]}`, async () => {
          const url = 'http://img.youtube.com/vi/' + video[1] + '/default.jpg';
          const resp = await fetch(url, {
            method: 'GET',
          });
          expect(resp.status).toEqual(200);
        });
      });
    }
  }
});
