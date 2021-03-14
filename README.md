### Project quick start
```
$ git clone git@github.com:tocchimittsu/ec-site-react.git
$ cd app/src/firebase
$ touch config.ts
$ Paste Firebase SDK snippet.(https://firebase.google.com/docs/web/setup?hl=ja)
$ cd ../../
$ docker-compose up
```

### Deploy Firestore security rules
```
$ firebase deploy --only firestore:rules --project prod
```

### Deploy Firestore index rules
```
$ firebase deploy --only firestore:indexes --project prod
```

### Deploy Firebase project
```
$ firebase deploy --project prod
```

### Generate components file
```
$ yarn hygen generator components {componentName} --action={action(directory)Name}
```

### Generate templates file
```
$ yarn hygen generator templetes {templeteName}
```
