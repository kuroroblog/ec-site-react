### Project quick start
```
$ git clone git@github.com:tocchimittsu/ec-site-react.git
$ cd ec-site-react/app/src/firebase
$ touch config.ts
$ Paste Firebase SDK snippet.(https://firebase.google.com/docs/web/setup?hl=ja)
$ cd ../../
$ yarn install
$ cd ..
$ docker-compose up (※初回は時間がかかります。)
$ Access page at http://localhost:3000
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

## DEMO
Site URL : https://kuro-blog-49a2a.web.app
