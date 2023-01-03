Below is the formatting for an excerpt. There are some optional fields that
aren't always filled out, but all are displayed when filled out.

The `videos` key contains a slug that is a key for the YouTubeModel file,
pulling in up-to-date videos across the app. This key is also used for the
jobs field, so that jobs can reference specific excerpts.

@todo In the future, update the ID to contain the videos slug, to clarify its
meaning in the app.

```js
{
  id: 0,
  composer: '',
  composerLast: '',
  name: '',
  date: '',
  era: '',
  genre: '',
  excerpts: [
    {
      id: 0,
      description: '',
      avgTempo: '',
      measures: '',
      pictures: [['Trombone 1', 'Path/To/Image.png']],
    },
  ],
  mutes: '',
  commonDifficulties: 'Optional',
  professionalAdvice: 'Optional',
  videos: 'videoSlug',
}
```
