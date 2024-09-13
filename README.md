# Getting Started

1. Create a new unsplash developer account and get your access key
2. Add the access key to the .env file - please refer to .env.example
3. install dependencies
4. Run the app

```bash
npm start
```

5. Enjoy the app

# Issues

1. The data title,description and dateTaken for images are not available in the API, so I've used other information as replacement, which comes close to it.
2. The virtualized list is not implemented because of time constraints and either the virtualized is not correctly implemented or the masonry layout breaks.

# Features I have added

1. Followed a modular approach by creating custom hooks for fetching photos and implementing a custom masonry grid layout.
2. Created a masonry grid layout.
3. Implemented an infinite scroll feature.
4. On the list view, I am using images small url and on the detail view, I am using the full url.
5. Memoized the photos array to prevent unnecessary re-renders.
6. Created a feature to search for photos.
7. Used debounce to prevent unnecessary API calls.
8. Used lazy loading for the photo detail view.
9. Used react router for navigation.
10. Used styled components for styling.
11. Used dayjs for date formatting.
12. Added error handling for the API calls.
