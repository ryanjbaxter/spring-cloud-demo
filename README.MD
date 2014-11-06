# Sample Spring Cloud App

* Contains 3 separate apps
  * Eureka server for service discovery
  * A status service which provides a CRUD REST API for interfacing with status messages (stored in an h2 DB)
  * A web app with Zuul proxy

To run any of the apps just cd into the top level project and run `mvn -P run`.  The will build and run the app.