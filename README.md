# Nomadika
   Nomadika is a travel companion for users to find the most recommended venues in any city on the globe! A user can access a feed tied to that specific city and interact with other users anonymously through creating and commenting on posts! Users can get the name and address of recommended landmarks, restaurants, hotels, bars, and nightlife venues for a specific city. Using the Google Maps URL API, all venues are linked to google maps allowing users to know where the location is physically. Users have their own profile where all the venues for a specific city are rendered in lists, this way a user can keep track of their "GoTo's" or places they would like to visit in that city. 
  hosted here https://nomadika.herokuapp.com/
   
# Technologies 
   Nomadika uses the foursqaure external api to tie venues to specific locations. Leveraging the power of Google Maps URLs all venues are linked to Google Maps. The backend was created using Python/flask with SQLAlchemy ORM. For the frontend Nomadika uses Javascript and React/Redux to handle state. 
   
# Design 
   Nomadika was inspired by the current styling trends, specifically Neumorphism and Glassmorphism.
   
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/landing-img.PNG)

# Components 
## Search & App State 
  With the use of the Foursquare Places API, users can search any city on the globe!  
  - Each city has its own feed, users can get venue information pertaining specifically to that location. 
  - The 'My Places' tab or buckelist venues also change according to the city ie applications state.
  - Only feed posts and comments made by the authenticated user have CRUD functionality.
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/user-crud.gif)
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/state-change-location.gif)

## Venues Modal & My Places 
   By manipulating the query and response to the Foursquare API, users can see venues from 5 popular queries such as: landmarks, restaurants, hotels, bars, and nightlife.
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/read-venues.gif)
   From the list of venues users can add them to their 'My Places' tab.
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/add-venues.gif)
   From My Places users may delete a venue they no longer wish to have on their list. 
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/delete-venues.gif)
   
<!-- ## Login
 ![image](https://github.com/David7Mejia/Nomadika/blob/master/Login.PNG)
## Signup
 ![image](https://github.com/David7Mejia/Nomadika/blob/master/Signup.PNG) -->
 
<!-- ## Posts/Comments
   Users can post to the cities feed and comment on other's posts once authenticated.
   Users can choose to edit and delete said comments and posts.
 ![image](https://github.com/David7Mejia/Nomadika/blob/master/Location.PNG) -->

