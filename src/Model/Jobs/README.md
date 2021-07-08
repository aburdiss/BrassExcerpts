To add new jobs, add the following completed object to the appropriate job
file and commit. The app will pull in this data from the GitHub URL. These
files are not pulled into the app at compile time, but stored in this repo
to keep them associated with the project, and provide them a reliable URL to
pull them in from the internet.

All jobs, past and present are kept in these files. The app will sort through
the jobs and display the right ones on the right pages.

```json
{
  "orchestra": "",
  "position": "",
  "link": "",
  "closingDate": "",
  "excerpts": [""]
}
```

Here is a VSCode Snippet for easily creating these Jobs:

```js
"Jobs": {
  "scope": "json",
  "prefix": "job",
  "body": [
    "{",
    "  \"orchestra\": \"${1}\",",
    "  \"position\": \"${2}\",",
    "  \"link\": \"${3}\",",
    "  \"country\": \"${4}\",",
    "  \"closingDate\": \"${5}\",",
    "  \"auditionDate\": \"${6}\",",
    "  \"excerpts\": [",
    "  ]",
    "}"
  ],
  "description": "Adds all fields for a jobs object"
}
```
