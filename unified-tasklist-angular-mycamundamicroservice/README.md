# My Camunda Microservice

This is a sample of a Camunda microservice running a process which also has a user task to be completed.

In this showcase this microservice also hosts the tasklist GUI. The given implementation of the data provider `UserTaskInstanceDataProviderImpl` uses the Camunda API to load user task details. This is only for the sake of simplicity of this showcase. Usually there is a separate tasklist microservice which receives and collects data user tasks of various Camunda microservices. For more details see README.md of `unified-tasklist-angular-frontend`.

## Developer information

### How this package was built

```
unified-tasklist-angular$ ./node_modules/@angular/cli/bin/ng new mycamundamicroservice --create-application=false --verbose=true --skipGit=true --directory=./unified-tasklist-angular-mycamundamicroservice/ --newProjectRoot=src/main
unified-tasklist-angular$ cd unified-tasklist-angular-mycamundamicroservice/
unified-tasklist-angular-mycamundamicroservice$ ./node_modules/@angular/cli/bin/ng generate library mycamundamicroservice --prefix=mycamundamicroservice
```

Change this line in `src/main/mycamundamicroservice/ng-package.json`:
```
  "dest": "../../../target/classes/static/frontend/mycamundamicroservice",
```

Remove this line in `src/main/mycamundamicroservice/tsconfig.lib.prod.json`:
```
  "enableIvy": false  
```

## Angular generated README.md:

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
