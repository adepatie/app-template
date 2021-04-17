# Palmetto Weather App

Weather application for Palmetto coding test

[Live Example](https://palmetto-test-kkbdrovwja-uc.a.run.app)

## Features

- Displays current weather, +4 hours weather, and a 5-day forecast
- React application using custom hooks
- [styled-components](https://styled-components.com) based components
- [react-query](https://react-query.tanstack.com) based API querying/data handling
- [react-spring](https://www.react-spring.io) animations
- Jest and [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) based unit tests
- CI/CD pipeline using Github Actions

## Notes

I took this opportunity to show both my skills as a developer and my eagerness to learn better ways of making software. There are multiple technologies here that I have used sparringly or haven't used at all.

- This is about my third time using [styled-components](https://styled-components.com) so it took a bit of learning and adjustment to get started. Once I got started I really enjoyed how it altered my thinking around code/component organization. Everything is a component now. It gave me many ideas around design systems and style abstractions that I had to refrain from doing in order to complete this in a timely manner.

- One of the biggest things I learned in doing this was the use of [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) in my unit tests. It provides a philosophy on how to write good React unit tests while providing tools that feel familiar and simplify the process. It was overall much simpler to get tests going than it has been in the past with other solutions. [msw](https://mswjs.io/) also made things much easier than previously having to use puppeteer to handle request interception.

- other new-to-me things include [react-query](https://react-query.tanstack.com), [Github Actions](https://github.com/features/actions), and [Luxon](https://moment.github.io/luxon/)

## Areas of Improvement

This was a quickly made test app so there are plenty of areas for improvement. Here are a few of them:

- Error / Loading Handling
  - I chose not to handle issues with the API or the loading spinner to save time. In a real-world case I would definitely not skip this part. For handling errors, different errors can result in a message, a retry, or in some cases a navigation change ( i.e missing auth). For handling loading, I like to use loading skeletons instead of spinners wherever I can.
- Component organization
  - While there is a logical organization to the basic components, there are parts of the WeatherChart that could be better organized into more tailored components instead of overuse of the 'Box' component. I would also have a separate package that would contain all of my base 'framework' components.
- Design Improvements / Responsive styling
  - Even though the app works on widescreen and mobile, with more time I would create more device specific styles that represent how the app is to be used on different devices. For example, in widescreen it would behave more like a screensaver and on mobile would be more concise and useful for quickly finding information. I would also improve the contrast between today's weather and the forecast so that it is more apparent what the user is supposed to be reading.
- Google Places Autocomplete
  - This widget made it very easy to wire up the services it provides but also removed a lot of functionality from the app itself and added its own blackbox of frontend code. This made it very difficult to write automated tests for. I would build my own react component to handle the showing of suggestions and hook that up to Google's API.
- Testing
  - I wrote the minimal amount of tests to ensure that the app is working. In a real-world scenario there would be many more tests and many more cases to cover. I would also add Puppeteer and create a series of e2e test.

## Local Development

Create a `.env.local` file based on `.env.local-template` and add the corresponding [Google Maps API key](https://developers.google.com/maps/documentation/javascript/overview) and an [Open Weather API](https://openweathermap.org/api/one-call-api) keys

`npm install`

`npm run start`

## Thank you

For reading through my code and giving me another reason to try new things. I had a lot of fun making this.
