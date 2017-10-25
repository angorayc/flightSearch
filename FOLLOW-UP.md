# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
- lodash:
  - set data to nested object
  - get data from nested object
- bpk-component-*:
  _ layout creation
- moment:
  - to manipulate date object
- qs:
  - convert an object to query string
  
### Q) What is the command to start the server?

(Default) `APIKEY=<key> npm run server`

npm run server

---

# General:

### Q) How long, in hours, did you spend on the test?

- about 20 hours on client & server side implementation
- I didn't find there is design mockup provided so spent extra few hours on creating form components: flightsearch / common


### Q) If you had more time, what further improvements or new features would you add?

- could use redux/flux to have good management of state in components
- server-side rendering and prefetch data
- combine start-script for client / server side
- fix build script and separate paths for different usage


### Q) Which parts are you most proud of? And why?

- add middleware, validateFlightSearchQuery for /api/search
  - It pass only params in whitelist to server
  - It filters out <> to prevent SQL injection
  
- use form configs to generate form inputs in flightsearch component although it is not on the provided design mockup.
  - It makes the main component cleaner
  - easier to maintain if we are going to add more inputs to the form

### Q) Which parts did you spend the most time with? What did you find most difficult?

- working with express-validator, it just upgrade and has different ways of implementation, which is different from the way I used it before, confused me for a while.
- understanding data structure and meaning fo each fields also takes me for a while.

### Q) How did you find the test overall? If you have any suggestions on how we can improve the test or our API, we'd love to hear them.

- as I didn't find there is a design spec provided. I spent time creating a form layout and thus read through the document and found there may have something to add
https://docs.google.com/document/d/1SVttEf1DwGsmyukur2gUbMdpxwz3NJchWqWFpiWAH7s/edit?usp=sharing
