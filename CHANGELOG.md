
<a name="v0.2.3"></a>
## [v0.2.3](https://github.com/odu-emse/emseAPI/compare/v0.2.2...v0.2.3) (2023-01-13)

### Bug Fixes :bug:
* **enrollment**: Added active / inactive flag to schema #413
* **community**: Changed parent to be a Lesson from Module #407

### Test :test_tube:
* **community**: Improved test coverage of the services and resolvers #411
* **program**: Created passing test cases to improve coverage #403

### Refactor :recycle:
* **program**: Removed linkages between Modules and Courses #412

### Features :sparkles:
* **program**: Created collections model, and it's CRUD operations  #410
* **community**: Created services, resolvers and model to support feature  #405

### Tools :wrench:
* **types**: Improved the type generation dev experience #404

### Pull Requests

* Merge pull request [#409](https://github.com/odu-emse/emseAPI/issues/409) from odu-emse/dev
* Merge pull request [#413](https://github.com/odu-emse/emseAPI/issues/413) from odu-emse/ALMP-434
* Merge pull request [#411](https://github.com/odu-emse/emseAPI/issues/411) from odu-emse/ALMP-482
* Merge pull request [#412](https://github.com/odu-emse/emseAPI/issues/412) from odu-emse/ALMP-407
* Merge pull request [#410](https://github.com/odu-emse/emseAPI/issues/410) from odu-emse/ALMP-440
* Merge pull request [#407](https://github.com/odu-emse/emseAPI/issues/407) from odu-emse/ALMP-475
* Merge pull request [#405](https://github.com/odu-emse/emseAPI/issues/405) from odu-emse/ALMP-455
* Merge pull request [#404](https://github.com/odu-emse/emseAPI/issues/404) from odu-emse/ALMP-435
* Merge pull request [#403](https://github.com/odu-emse/emseAPI/issues/403) from odu-emse/ALMP-325
* Merge pull request [#402](https://github.com/odu-emse/emseAPI/issues/402) from odu-emse/ALMP-367


<a name="v0.2.2"></a>
## [v0.2.2](https://github.com/odu-emse/emseAPI/compare/v0.2.1...v0.2.2) (2022-11-02)

### Chore

* :memo: Updated the changelog for the project

### Fix

* :label: Updated the DataScaler methods' return types
* :arrow_up: Updated graphQL dependency version to match peer-dep requirements

### Pull Requests

* Merge pull request [#401](https://github.com/odu-emse/emseAPI/issues/401) from odu-emse/ALMP-234
* Merge pull request [#400](https://github.com/odu-emse/emseAPI/issues/400) from odu-emse/ALMP-232
* Merge pull request [#399](https://github.com/odu-emse/emseAPI/issues/399) from odu-emse/ALMP-298
* Merge pull request [#396](https://github.com/odu-emse/emseAPI/issues/396) from odu-emse/ALMP-339
* Merge pull request [#395](https://github.com/odu-emse/emseAPI/issues/395) from odu-emse/ALMP-338
* Merge pull request [#393](https://github.com/odu-emse/emseAPI/issues/393) from odu-emse/ALMP-340
* Merge pull request [#398](https://github.com/odu-emse/emseAPI/issues/398) from odu-emse/ALMP-348b
* Merge pull request [#397](https://github.com/odu-emse/emseAPI/issues/397) from odu-emse/ALMP-348
* Merge pull request [#394](https://github.com/odu-emse/emseAPI/issues/394) from odu-emse/ALMP-335


<a name="v0.2.1"></a>
## [v0.2.1](https://github.com/odu-emse/emseAPI/compare/v0.2.0...v0.2.1) (2022-09-26)

### Build

* :zap: Removed duplicate commands from docker for better performance

### Ci

* :green_heart: Run version checks and dep installs
* :green_heart: Fixing unknown commands error
* :green_heart: Added dep install command
* :green_heart: Added hard dependency between jobs
* :green_heart: Testing more CI configs
* :green_heart: Added dependency between jobs
* :green_heart: Added Docker container to circleci job
* :green_heart: Fixed cirlceci orb version

### Docs

* :memo: Updated README file

### Feat

* :sparkles: Added single course query

### Fix

* :bug: Updating user DOBs bug fixed
* :green_heart: Fixed Apollo introspection
* :green_heart: Working on CI deploy
* :construction_worker: Worked on CI and deploy configs
* **auth:** :bug: Fixed issue and expiration dates in JWT payload
* **user:** :bug: Instructor profiles can now be upadted and also fetched through user/users/updateUser queries/mutations

### Refactor

* Removed duplicate error throws and catches from resolvers
* :heavy_minus_sign: Removed unused GQL dependencies
* :heavy_plus_sign: Added GQL helper libs and moment for Date conversion

### Test

* :white_check_mark: Worked on test cases for the program services/resolver
* :test_tube: Removed empty controller and service spec files
* :test_tube: Started creating unit tests for program & POS queries

### Pull Requests

* Merge pull request [#392](https://github.com/odu-emse/emseAPI/issues/392) from odu-emse/ALMP-286
* Merge pull request [#391](https://github.com/odu-emse/emseAPI/issues/391) from odu-emse/ALMP-309
* Merge pull request [#389](https://github.com/odu-emse/emseAPI/issues/389) from odu-emse/ALMP-227
* Merge pull request [#253](https://github.com/odu-emse/emseAPI/issues/253) from odu-emse/dependabot/add-v2-config-file
* Merge pull request [#390](https://github.com/odu-emse/emseAPI/issues/390) from odu-emse/ALMP-277
* Merge pull request [#388](https://github.com/odu-emse/emseAPI/issues/388) from odu-emse/ALMP-255
* Merge pull request [#387](https://github.com/odu-emse/emseAPI/issues/387) from odu-emse/0.2.1
* Merge pull request [#386](https://github.com/odu-emse/emseAPI/issues/386) from odu-emse/ALMP-259
* Merge pull request [#383](https://github.com/odu-emse/emseAPI/issues/383) from odu-emse/ALMP-254
* Merge pull request [#384](https://github.com/odu-emse/emseAPI/issues/384) from odu-emse/ALMP-253
* Merge pull request [#385](https://github.com/odu-emse/emseAPI/issues/385) from odu-emse/ALMP-224
* Merge pull request [#382](https://github.com/odu-emse/emseAPI/issues/382) from odu-emse/ALMP-244


<a name="v0.2.0"></a>
## v0.2.0 (2022-07-06)

### Bug

* **cors:** added cors middleware
* **error handling:** we now catch module addition errors
* **registration:** middle names fix
* **search:** separated server error from search error

### Chore

* :art: Fixed spellcheck suggestions and white space timmings
* :fire: Removed old Sentry initializer code
* **clean-up:** deprecated Apollo based API
* **general:** prettier cleaned up whitespaces
* **schema:** removed code first schemas

### Feat

* :sparkles: Added support for instructor profiles
* :bug: Modified queries to populate deep relationships
* **user:** :sparkles: Added ability to update instructor profile
* **user:** ✨ Added Instructor Profile schema

### Feature

* **api:** committed schemas
* **courses:** courses store containing modules
* **db:** added prisma support
* **modules:** modules store enrolled users
* **prisma:** added prisma binary target
* **program:** created plan of study schema and endpoints
* **program:** added Plan of Study routes and models
* **program:** added digital-ocean s3 fetch
* **search:** combined search functionality
* **search:** created endpoint for course search
* **system:** Transitioned API to GQL using TS
* **system:** transitioned from type-goose to nestJS
* **system:** created testing spec files
* **users:** users now store enrolled modules

### Fix

* :rocket: Worked on deploy scripts
* :bug: Fixed resolver <-> schema connection
* **PoS:** :bug: Fixed plan based relation linking
* **program:** :bug: Assignment and Course queries now populate relations
* **user:** Fixed error message getting returned
* **user:** :bug: Update user dob implemented

### UnhandledPromiseRejectionWarning

* Error: Query.planByID defined in resolvers, but not in schema

### Pull Requests

* Merge pull request [#377](https://github.com/odu-emse/emseAPI/issues/377) from odu-emse/quickfix-deploy
* Merge pull request [#381](https://github.com/odu-emse/emseAPI/issues/381) from odu-emse/ALMP-155
* Merge pull request [#379](https://github.com/odu-emse/emseAPI/issues/379) from odu-emse/ALMP-213
* Merge pull request [#378](https://github.com/odu-emse/emseAPI/issues/378) from odu-emse/ALMP-218
* Merge pull request [#376](https://github.com/odu-emse/emseAPI/issues/376) from odu-emse/gqlALMP195
* Merge pull request [#373](https://github.com/odu-emse/emseAPI/issues/373) from ALMP-196
* Merge pull request [#371](https://github.com/odu-emse/emseAPI/issues/371) from odu-emse/ALMP-195
* Merge pull request [#370](https://github.com/odu-emse/emseAPI/issues/370) from odu-emse/ALMP-192
* Merge pull request [#369](https://github.com/odu-emse/emseAPI/issues/369) from odu-emse/schema-refactor
* Merge pull request [#368](https://github.com/odu-emse/emseAPI/issues/368) from odu-emse/userchecks
* Merge pull request [#366](https://github.com/odu-emse/emseAPI/issues/366) from odu-emse/sentry
* Merge pull request [#365](https://github.com/odu-emse/emseAPI/issues/365) from odu-emse/dockerintegrate
* Merge pull request [#364](https://github.com/odu-emse/emseAPI/issues/364) from odu-emse/circleci-project-setup
* Merge pull request [#363](https://github.com/odu-emse/emseAPI/issues/363) from odu-emse/ALMP-190
* Merge pull request [#1](https://github.com/odu-emse/emseAPI/issues/1) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/express-4.17.1
* Merge pull request [#2](https://github.com/odu-emse/emseAPI/issues/2) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/bl-2.2.1
* Merge pull request [#3](https://github.com/odu-emse/emseAPI/issues/3) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/mongoose-5.10.7
* Merge pull request [#4](https://github.com/odu-emse/emseAPI/issues/4) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/kill-port-1.6.1
* Merge pull request [#6](https://github.com/odu-emse/emseAPI/issues/6) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/babel/register-7.11.5
* Merge pull request [#7](https://github.com/odu-emse/emseAPI/issues/7) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/lodash-4.17.20
* Merge pull request [#8](https://github.com/odu-emse/emseAPI/issues/8) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/standard-version-8.0.1
* Merge pull request [#9](https://github.com/odu-emse/emseAPI/issues/9) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/http-errors-1.8.0
* Merge pull request [#10](https://github.com/odu-emse/emseAPI/issues/10) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/nodemon-2.0.4
* Merge pull request [#11](https://github.com/odu-emse/emseAPI/issues/11) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/aws-sdk-2.761.0
* Merge pull request [#12](https://github.com/odu-emse/emseAPI/issues/12) from chef-danny-d/feature/ALMP-109-create-program-db-design

### BREAKING CHANGE


Worked on ALMP-224
  Worked on ALMP-225

Worked on ALMP-225 Introduced ALMP-227

Fixed ALMP-199

