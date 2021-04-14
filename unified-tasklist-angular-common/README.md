# Common

This Angular library holds shared components. It is referenced by `unified-tasklist-angular-frontend` as a dependency and can be referenced as a peer-dependency in a Camunda microservice's Angular library holding Angular code for its user tasks.

In this showcase it consists of only one interface used by the user tasks list but it may also be extended by shared UI components.

## Developer information

### How this package was built

```
unified-tasklist-angular$ ./node_modules/@angular/cli/bin/ng new common --create-application=false --verbose=true --skipGit=true --directory=./unified-tasklist-angular-common/
unified-tasklist-angular$ cd unified-tasklist-angular-common
unified-tasklist-angular-common$ ./node_modules/@angular/cli/bin/ng generate library usertask
unified-tasklist-angular-common$ vi projects/common/
```

Remove this line in `tsconfig.lib.prod.json`:
```
  "enableIvy": false
```

Change this line in `projects/common/package.json`:
```
  "name": "@unified-tasklist-angular/common",
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
