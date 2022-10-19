<a name="v0.2.1"></a>

## [v0.2.1](https://github.com/odu-emse/emseAPI/compare/v0.2.0...v0.2.1) (2022-09-26)

### Features

-   :sparkles: Add some login endpoints
-   :sparkles: Add login error handling and cookie storage on login
-   :sparkles: Remove the cookie setting and send the token
-   :sparkles: Add auth guard for user queries
-   :sparkles: Add auth guard to remaining resolvers

### Build

-   :zap: Removed duplicate commands from docker for better performance

### Ci

-   :green_heart: Run version checks and dep installs
-   :green_heart: Fixing unknown commands error
-   :green_heart: Added dep install command
-   :green_heart: Added hard dependency between jobs
-   :green_heart: Testing more CI configs
-   :green_heart: Added dependency between jobs
-   :green_heart: Added Docker container to circleci job
-   :green_heart: Fixed cirlceci orb version

### Docs

-   :memo: Updated README file

### Feat

-   :sparkles: Added single course query

### Fix

-   :bug: Updating user DOBs bug fixed
-   :bug: Removed redundant include in instructor profile query
-   :green_heart: Fixed Apollo introspection
-   :green_heart: Working on CI deploy
-   :construction_worker: Worked on CI and deploy configs

### Refactor

-   :recycle: Removed duplicate error throws and catches from resolvers
-   :heavy_minus_sign: Removed unused GQL dependencies
-   :heavy_plus_sign: Added GQL helper libs and moment for Date conversion

### Test

-   :white_check_mark: Worked on test cases for the program services/resolver
-   :test_tube: Removed empty controller and service spec files
-   :test_tube: Started creating unit tests for program & POS queries

### Pull Requests

-   Merge pull request [#392](https://github.com/odu-emse/emseAPI/issues/392) from odu-emse/ALMP-286
-   Merge pull request [#391](https://github.com/odu-emse/emseAPI/issues/391) from odu-emse/ALMP-309
-   Merge pull request [#389](https://github.com/odu-emse/emseAPI/issues/389) from odu-emse/ALMP-227
-   Merge pull request [#253](https://github.com/odu-emse/emseAPI/issues/253) from odu-emse/dependabot/add-v2-config-file
-   Merge pull request [#390](https://github.com/odu-emse/emseAPI/issues/390) from odu-emse/ALMP-277
-   Merge pull request [#388](https://github.com/odu-emse/emseAPI/issues/388) from odu-emse/ALMP-255
-   Merge pull request [#387](https://github.com/odu-emse/emseAPI/issues/387) from odu-emse/0.2.1
-   Merge pull request [#386](https://github.com/odu-emse/emseAPI/issues/386) from odu-emse/ALMP-259
-   Merge pull request [#383](https://github.com/odu-emse/emseAPI/issues/383) from odu-emse/ALMP-254
-   Merge pull request [#384](https://github.com/odu-emse/emseAPI/issues/384) from odu-emse/ALMP-253
-   Merge pull request [#385](https://github.com/odu-emse/emseAPI/issues/385) from odu-emse/ALMP-224
-   Merge pull request [#382](https://github.com/odu-emse/emseAPI/issues/382) from odu-emse/ALMP-244

<a name="v0.2.0"></a>

## v0.2.0 (2022-07-06)

### Chore

-   :art: Fixed spellcheck suggestions and white space timmings
-   :fire: Removed old Sentry initializer code

### Feat

-   :sparkles: Added support for instructor profiles
-   :bug: Modified queries to populate deep relationships

### Fix

-   :rocket: Worked on deploy scripts
-   :bug: Fixed resolver <-> schema connection
-   :bug: Fixed UnhandledPromiseRejectionWarning in Query.planByID

### Pull Requests

-   Merge pull request [#377](https://github.com/odu-emse/emseAPI/issues/377) from odu-emse/quickfix-deploy
-   Merge pull request [#381](https://github.com/odu-emse/emseAPI/issues/381) from odu-emse/ALMP-155
-   Merge pull request [#379](https://github.com/odu-emse/emseAPI/issues/379) from odu-emse/ALMP-213
-   Merge pull request [#378](https://github.com/odu-emse/emseAPI/issues/378) from odu-emse/ALMP-218
-   Merge pull request [#376](https://github.com/odu-emse/emseAPI/issues/376) from odu-emse/gqlALMP195
-   Merge pull request [#373](https://github.com/odu-emse/emseAPI/issues/373) from ALMP-196
-   Merge pull request [#371](https://github.com/odu-emse/emseAPI/issues/371) from odu-emse/ALMP-195
-   Merge pull request [#370](https://github.com/odu-emse/emseAPI/issues/370) from odu-emse/ALMP-192
-   Merge pull request [#369](https://github.com/odu-emse/emseAPI/issues/369) from odu-emse/schema-refactor
-   Merge pull request [#368](https://github.com/odu-emse/emseAPI/issues/368) from odu-emse/userchecks
-   Merge pull request [#366](https://github.com/odu-emse/emseAPI/issues/366) from odu-emse/sentry
-   Merge pull request [#365](https://github.com/odu-emse/emseAPI/issues/365) from odu-emse/dockerintegrate
-   Merge pull request [#364](https://github.com/odu-emse/emseAPI/issues/364) from odu-emse/circleci-project-setup
-   Merge pull request [#363](https://github.com/odu-emse/emseAPI/issues/363) from odu-emse/ALMP-190
-   Merge pull request [#1](https://github.com/odu-emse/emseAPI/issues/1) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/express-4.17.1
-   Merge pull request [#2](https://github.com/odu-emse/emseAPI/issues/2) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/bl-2.2.1
-   Merge pull request [#3](https://github.com/odu-emse/emseAPI/issues/3) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/mongoose-5.10.7
-   Merge pull request [#4](https://github.com/odu-emse/emseAPI/issues/4) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/kill-port-1.6.1
-   Merge pull request [#6](https://github.com/odu-emse/emseAPI/issues/6) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/babel/register-7.11.5
-   Merge pull request [#7](https://github.com/odu-emse/emseAPI/issues/7) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/lodash-4.17.20
-   Merge pull request [#8](https://github.com/odu-emse/emseAPI/issues/8) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/standard-version-8.0.1
-   Merge pull request [#9](https://github.com/odu-emse/emseAPI/issues/9) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/http-errors-1.8.0
-   Merge pull request [#10](https://github.com/odu-emse/emseAPI/issues/10) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/nodemon-2.0.4
-   Merge pull request [#11](https://github.com/odu-emse/emseAPI/issues/11) from chef-danny-d/dependabot/npm_and_yarn/0.1.3/aws-sdk-2.761.0
-   Merge pull request [#12](https://github.com/odu-emse/emseAPI/issues/12) from chef-danny-d/feature/ALMP-109-create-program-db-design

### BREAKING CHANGE

Worked on ALMP-224
Worked on ALMP-225

Worked on ALMP-225 Introduced ALMP-227

Fixed ALMP-199
