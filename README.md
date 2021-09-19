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
  [externalApi_routes.py](https://github.com/David7Mejia/Nomadika/blob/ccdd4b07d4271fb1dea2b6df5545f9c6c3749eda/app/api/externalAPI_routes.py#L12-L25):
  ```python
  @externalAPI_routes.route('/<string:id>')
   def location(id):
    url = 'https://api.foursquare.com/v2/venues/search'


    params = dict(
        client_id=client_id,
        client_secret=client_secret,
        v='20180323',
        near=f'{id}',
        limit=1
    )
    resp = requests.get(url=url, params=params)
    data = json.loads(resp.text)
    return data
  ```
  - Each city has its own feed, users can get venue information pertaining specifically to that location. 
  - The 'My Places' tab or buckelist venues also change according to the city ie applications state.
  - Only feed posts and comments made by the authenticated user have CRUD functionality.
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/user-crud.gif)
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/state-change-location.gif)
## Feed, Posts and Comments
   Only authorized users may post and comment on a destinations feed and posts. 
   Posts and comments have been left anonymized for the moment, this concept was inspired by the app Yik-Yak, in the future randomization of usernames on posts may be possible. 
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/auth-post-comment.gif)
   ### Post, Edit and Delete from Feed
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/post-feed.gif)
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/edit-feed.gif)
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/delete-feed.gif)
   ### Post, Edit and Delete from Comments
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/add-comment.gif)
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/edit-comment.gif)
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/delete-comment.gif)
## Venues Modal & My Places 
   By manipulating the query and response to the Foursquare API, users can see venues from 5 popular queries such as: landmarks, restaurants, hotels, bars, and nightlife.
     [externalApi_routes.py](https://github.com/David7Mejia/Nomadika/blob/ccdd4b07d4271fb1dea2b6df5545f9c6c3749eda/app/api/externalAPI_routes.py#L28-L42):
  ```python
  @externalAPI_routes.route('/venue/<string:place>/<string:venue>')
def venue(venue, place):
    url = 'https://api.foursquare.com/v2/venues/explore'


    params = dict(
        client_id=client_id,
        client_secret=client_secret,
        v='20180323',
        near=f'{place}',
        query=f'{venue}',
        limit=20
    )
    resp = requests.get(url=url, params=params)
    data = json.loads(resp.text)
    return data
  ```
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/read-venues.gif)
   From the list of venues users can add them to their 'My Places' tab.
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/add-venues.gif)
   From My Places users may delete a venue they no longer wish to have on their list. 
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/delete-venues.gif)
   Using Google Maps URL API places can be checked out on Google Maps to know the exact physical location of the venue.   
    [Profile.js](https://github.com/David7Mejia/Nomadika/blob/ccdd4b07d4271fb1dea2b6df5545f9c6c3749eda/react-app/src/components/Profile/index.js#L10-L17)
   ```javascript
  const baseURL = `https://www.google.com/maps/search/?api=1&query=`;

  const googleMapUrl = (loc, ven, address) => {
    let str = `${loc} ${ven} ${address}`;
    let newURL = str.split(" ").join("+");
    return `${baseURL}${newURL}`;
  };
   ```
   [Modal.js](https://github.com/David7Mejia/Nomadika/blob/ccdd4b07d4271fb1dea2b6df5545f9c6c3749eda/react-app/src/components/Feed/Modal.js#L9-L20):
   ```javascript
  const baseURL = `https://www.google.com/maps/search/?api=1&query=`

  const googleMapUrl = (ven) => {
    let venueName = ven.venue.name;
    let address = ven.venue.location.formattedAddress
    let str = `${venueName}`;
    address.forEach(el => {
      str += ` ${el}`
    })
    let newURL = str.split(' ').join('+')
    return `${baseURL}${newURL}`
  }
   ```
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/google-url.gif)
   
   
## Profile 
   The user profile tab on the navbar redirects the user to their own list of places they have added to their 'My Places' tab for all cities. 
   From this profile route users may: 
   - Redirect to the city of the list that contains the venues.
   - Delete venues from their lists.
   - Checkout the venues location using Google Maps URL API.
   # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/user-profile.gif)

## Login, Signup, Demo
   Using a hash function from BCrypt users can rest assured knowing that no text based passwords are stored in the database, only hashed passwords for security purposes.
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/login-img.PNG)
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/sign-up-img.PNG)
 # ![image](https://github.com/David7Mejia/Nomadika/blob/master/readme-src/demo.gif)

## Future & Next Steps
   - Randomization of anonymous usernames on posts and comments.
   - Add images of places both for destinations, venues, and profiles.
   - Modal exit on click for editing comments and feed. 
