# Running Instructions

```sh
$ npm install
$ npm run serve
```

# Build Instructions

```sh
$ npm run lint
$ npm run build
```

# Available APIs
`GET /items/:id` - Returns the view count for a desired item

#Notes
- Under env folder there is a default Firestore service account for local development only. For other environment it should be injected from pipeline.
