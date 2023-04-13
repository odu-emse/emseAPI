
<a name="v0.3.1"></a>
## [v0.3.1](https://github.com/odu-emse/emseAPI/compare/v0.3.0...v0.3.1) (2023-04-11)

### Feat

* **community:** Created add user to watchers list mutation
* **community:** Added topics property and CRUD operation logic
* **community:** Created add user to watchers list mutation
* **community:** Added topics property and CRUD operation logic
* **instructor:** Changed publications data type and create update mutation
* **lesson:** Created query for getting lessons by planID and enrollmentID
* **lesson:** Create model to track lesson progress
* **module:** Created add objectives mutation and service
* **user:** Added biography and phone number fields

### Fix

* **community:** Add upvoted user includes on comments
* **community:** Fixed schema issues that broke comment addition Because of mismatching argument names, comments got added to the first thread in the DB since it never got any appropriate parameters to search by.
* **community:** Removed all references to lessons from threads
* **community:** Fixed schema issues that broke comment addition Because of mismatching argument names, comments got added to the first thread in the DB since it never got any appropriate parameters to search by.
* **community:** Removed all references to lessons from threads
* **content:** Rolled back schema change Making the primary argument required will force us to change the value every time we update the content, regardless of what field we initially wanted to update.
* **content:** Updated resolver logic to handle validation Completely overhauled the resolver logic as it wasn't working properly.
* **enrollment:** Added includes to match FE requirements
* **includes:** Updated includes required by the client-side
* **includes:** Updated relation population as requested
* **module:** Objectives are now updatable
* **module:** Changed objectives data structure
* **social:** Resolved issue with updating service
* **test:** Reverted updated made to file
* **threads:** Fixed author relation not populating in comments Alongside the fix, I created a test case to make sure the includes was created successfully. Made some modifications to the upvote thread test case as well but that needs to be addressed in ALMP-633
* **user:** Fixed selected papers field update

### Test

* **community:** Created test case for topic based param search
* **community:** Created test case for topic based param search
* **content:** Modified test cases to pass
* **content:** Fixed broken test cases

### Pull Requests

* Merge pull request [#457](https://github.com/odu-emse/emseAPI/issues/457) from odu-emse/dev
* Merge pull request [#479](https://github.com/odu-emse/emseAPI/issues/479) from odu-emse/ALMP-756
* Merge pull request [#478](https://github.com/odu-emse/emseAPI/issues/478) from odu-emse/ALMP-674
* Merge pull request [#477](https://github.com/odu-emse/emseAPI/issues/477) from odu-emse/ALMP-658
* Merge pull request [#476](https://github.com/odu-emse/emseAPI/issues/476) from odu-emse/ALMP-668
* Merge pull request [#474](https://github.com/odu-emse/emseAPI/issues/474) from odu-emse/ALMP-631
* Merge pull request [#459](https://github.com/odu-emse/emseAPI/issues/459) from odu-emse/ALMP-588
* Merge pull request [#475](https://github.com/odu-emse/emseAPI/issues/475) from odu-emse/ALMP-666
* Merge pull request [#472](https://github.com/odu-emse/emseAPI/issues/472) from odu-emse/ALMP-640
* Merge pull request [#473](https://github.com/odu-emse/emseAPI/issues/473) from odu-emse/ALMP-656
* Merge pull request [#471](https://github.com/odu-emse/emseAPI/issues/471) from odu-emse/ALMP-639
* Merge pull request [#470](https://github.com/odu-emse/emseAPI/issues/470) from odu-emse/ALMP-612
* Merge pull request [#465](https://github.com/odu-emse/emseAPI/issues/465) from odu-emse/ALMP-594
* Merge pull request [#462](https://github.com/odu-emse/emseAPI/issues/462) from odu-emse/ALMP-632
* Merge pull request [#463](https://github.com/odu-emse/emseAPI/issues/463) from odu-emse/ALMP-633
* Merge pull request [#458](https://github.com/odu-emse/emseAPI/issues/458) from odu-emse/ALMP-602
* Merge pull request [#456](https://github.com/odu-emse/emseAPI/issues/456) from odu-emse/ALMP-586
* Merge pull request [#454](https://github.com/odu-emse/emseAPI/issues/454) from odu-emse/ALMP-600


<a name="v0.3.0"></a>
## [v0.3.0](https://github.com/odu-emse/emseAPI/compare/v0.2.4...v0.3.0) (2023-03-01)

### Bug

* **module:** Added default value to courseIDs array
* **program:** Updated service includes and return values upon Error
* **progress:** Worked on module waiver logic
* **progress:** Added await to db calls in service
* **progress:** Fixed import not being recognized by ts-jest This is a temporary fix, should be investigated further before merging
* **progress:** Finished module waiver resolver logic
* **progress:** Added cascading delete to enrollment field
* **progress:** Added opposite relation to GraphQL schema Since most times we will pull progress through the module query, I added the include property to the module service.
* **test:** Fixed create PoS util function fails

### Build

* **docker:** Added mongoDB as a service

### Chore

* **build:** Added Apollo as an optional playground provider
* **progress:** Created a main export file for feature

### Ci

* **general:** Cut down on duplicate jobs
* **general:** Updated formatter github user
* **general:** Updated formatter cmd
* **general:** Changed workflow trigger on ticket branches
* **general:** Refactored jobs to run for each branch
* **test:** Updated workflow triggers
* **test:** Updated testing command to use
* **test:** Changed command to use Jest instead of Vite

### Feat

* **community:** Timestamps update on comment addition
* **dm:** Worked on group messaging sub-feature
* **dm:** Messages can be sent to groups
* **dm:** Created a reusable microservice initializer function
* **dm:** Resolver responds with cached or fresh version
* **dm:** Created module and service to handle Redis & ws The pub sub service will be used to publish and subscribe to web-socket events, while the Redis module is used for connecting to the Redis store
* **dm:** Set-up redis communication through Docker
* **dm:** Started adding Redis to the stack
* **dm:** Added persistence to messages
* **dm:** Filtered messages to go to receiver only
* **dm:** Created sender and listener Both services and resolvers were created for each of these functionalities. `send` is a mutation that distributes the message and `listenForMessage` is the subscription that receives the messages on event trigger.
* **dm:** Set-up subscriptions at entrypoint
* **dm:** Installed required dependencies
* **dm:** Debugged web socket Error on connection
* **progress:** Added updated service & resolver

### Fix

* **build:** Addressed broken main.ts after rebase
* **build:** Addressed broken files after rebase
* **community:** Addressed broken test cases due to lack of import
* **community:** Thread query now has null as default input
* **docker:** Updated start command for studio service
* **general:** Updated gitignore
* **main:** Fixed & tested CORS issue
* **program:** Added import statement for arg type
* **test:** Changed cases to use vitest
* **test:** Added vitest imports

### Perf

* **test:** Swapped out jest for vitest

### Refactor

* **graphql:** Added Apollo as the playground provider
* **pos:** Added Error return to plans query
* **program:** Reduced duplicate functions with reusable scripts
* **program:** Changed includes to be public member
* **progress:** Modified the arguments expected by the update service
* **test:** Removed jest types and improved SWC config
* **test:** Updated test cases to use vitest

### Test

* **community:** Created case to validate timestamp updating
* **community:** Created cases to verify thread query bug fix
* **general:** Removed unused imports
* **general:** Moved class instantiation outside of beforeAll function to improve coverage
* **program:** Updated test cases according to service refactor
* **progress:** Cleaned up test cases
* **progress:** Created fake data providers for all db models
* **progress:** Created additional test cases
* **progress:** Fixed failing test suite
* **progress:** Extended code coverage of services & resolvers
* **progress:** Created mock data initialization and cleanup logic
* **progress:** Achieved full coverage for progress query
* **utils:** Started testing utility functions

### Pull Requests

* Merge pull request [#436](https://github.com/odu-emse/emseAPI/issues/436) from odu-emse/dev
* Merge pull request [#451](https://github.com/odu-emse/emseAPI/issues/451) from odu-emse/ALMP-589
* Merge pull request [#452](https://github.com/odu-emse/emseAPI/issues/452) from odu-emse/ALMP-593
* Merge pull request [#453](https://github.com/odu-emse/emseAPI/issues/453) from odu-emse/ALMP-541
* Merge pull request [#446](https://github.com/odu-emse/emseAPI/issues/446) from odu-emse/ALMP-561
* Merge pull request [#450](https://github.com/odu-emse/emseAPI/issues/450) from odu-emse/ALMP-585
* Merge pull request [#449](https://github.com/odu-emse/emseAPI/issues/449) from odu-emse/ALMP-569
* Merge pull request [#447](https://github.com/odu-emse/emseAPI/issues/447) from odu-emse/ALMP-514
* Merge pull request [#448](https://github.com/odu-emse/emseAPI/issues/448) from odu-emse/ALMP-570
* Merge pull request [#441](https://github.com/odu-emse/emseAPI/issues/441) from odu-emse/ALMP-523
* Merge pull request [#438](https://github.com/odu-emse/emseAPI/issues/438) from odu-emse/ALMP-528
* Merge pull request [#444](https://github.com/odu-emse/emseAPI/issues/444) from odu-emse/ALMP-560
* Merge pull request [#443](https://github.com/odu-emse/emseAPI/issues/443) from odu-emse/ALMP-555
* Merge pull request [#440](https://github.com/odu-emse/emseAPI/issues/440) from odu-emse/ALMP-532
* Merge pull request [#439](https://github.com/odu-emse/emseAPI/issues/439) from odu-emse/ALMP-519
* Merge pull request [#435](https://github.com/odu-emse/emseAPI/issues/435) from odu-emse/ALMP-476


<a name="v0.2.4"></a>
## [v0.2.4](https://github.com/odu-emse/emseAPI/compare/v0.2.3...v0.2.4) (2023-01-31)

### Pull Requests

* Merge pull request [#420](https://github.com/odu-emse/emseAPI/issues/420) from odu-emse/dev
* Merge pull request [#431](https://github.com/odu-emse/emseAPI/issues/431) from odu-emse/ALMP-521
* Merge pull request [#434](https://github.com/odu-emse/emseAPI/issues/434) from odu-emse/ALMP-489
* Merge pull request [#433](https://github.com/odu-emse/emseAPI/issues/433) from odu-emse/ALMP-522
* Merge pull request [#430](https://github.com/odu-emse/emseAPI/issues/430) from odu-emse/ALMP-520
* Merge pull request [#432](https://github.com/odu-emse/emseAPI/issues/432) from odu-emse/ALMP-505
* Merge pull request [#428](https://github.com/odu-emse/emseAPI/issues/428) from odu-emse/ALMP-512
* Merge pull request [#429](https://github.com/odu-emse/emseAPI/issues/429) from odu-emse/ALMP-510
* Merge pull request [#427](https://github.com/odu-emse/emseAPI/issues/427) from odu-emse/ALMP-500
* Merge pull request [#426](https://github.com/odu-emse/emseAPI/issues/426) from odu-emse/ALMP-513
* Merge pull request [#424](https://github.com/odu-emse/emseAPI/issues/424) from odu-emse/ALMP-501
* Merge pull request [#425](https://github.com/odu-emse/emseAPI/issues/425) from odu-emse/ALMP-499
* Merge pull request [#417](https://github.com/odu-emse/emseAPI/issues/417) from odu-emse/ALMP-494
* Merge pull request [#421](https://github.com/odu-emse/emseAPI/issues/421) from odu-emse/ALMP-497
* Merge pull request [#423](https://github.com/odu-emse/emseAPI/issues/423) from odu-emse/ALMP-502
* Merge pull request [#422](https://github.com/odu-emse/emseAPI/issues/422) from odu-emse/ALMP-498
* Merge pull request [#419](https://github.com/odu-emse/emseAPI/issues/419) from odu-emse/ALMP-410
* Merge pull request [#418](https://github.com/odu-emse/emseAPI/issues/418) from odu-emse/ALMP-496
* Merge pull request [#416](https://github.com/odu-emse/emseAPI/issues/416) from odu-emse/ALMP-483
* Merge pull request [#415](https://github.com/odu-emse/emseAPI/issues/415) from odu-emse/ALMP-443
* Merge pull request [#414](https://github.com/odu-emse/emseAPI/issues/414) from odu-emse/ALMP-485


<a name="v0.2.3"></a>
## [v0.2.3](https://github.com/odu-emse/emseAPI/compare/v0.2.2...v0.2.3) (2023-01-13)

### Bug Fixes :bug:
* **enrollment**: Added active / inactive flag to schema [#413](https://github.com/odu-emse/emseAPI/issues/413)
* **community**: Changed parent to be a Lesson from Module [#407](https://github.com/odu-emse/emseAPI/issues/407)

### Test :test_tube:
* **community**: Improved test coverage of the services and resolvers [#411](https://github.com/odu-emse/emseAPI/issues/411)
* **program**: Created passing test cases to improve coverage [#403](https://github.com/odu-emse/emseAPI/issues/403)

### Refactor :recycle:
* **program**: Removed linkages between Modules and Courses [#412](https://github.com/odu-emse/emseAPI/issues/412)

### Features :sparkles:
* **program**: Created collections model, and it's CRUD operations  [#410](https://github.com/odu-emse/emseAPI/issues/410)
* **community**: Created services, resolvers and model to support feature  [#405](https://github.com/odu-emse/emseAPI/issues/405)
* **program**: Created parameter based search service  [#402](https://github.com/odu-emse/emseAPI/issues/402)

### Tools :wrench:
* **types**: Improved the type generation dev experience [#404](https://github.com/odu-emse/emseAPI/issues/404)

### Pull Requests

* Merge pull request [#409](https://github.com/odu-emse/emseAPI/issues/409) from odu-emse/dev

### Tickets
* ALMP-434
* ALMP-482
* ALMP-407
* ALMP-440
* ALMP-475
* ALMP-455
* ALMP-435
* ALMP-325
* ALMP-367


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
