# How to use

## Frontend Details

Before accessing the website, api keys are needed for respective servieces ->

1. Google Maps API
2. ImageKit

Create a `.env` file in /frontend_infinite_loop/ directory and put the following contents:

```
NEXT_PUBLIC_PUBLIC_KEY="public_NzSRiEU4ALXmWmhYr27mbe2lgqE="
NEXT_PUBLIC_URL_ENDPOINT="https://ik.imagekit.io/dp5r64coi/"
PRIVATE_KEY="private_7BBhM3oeH0sZLlIcsxALNcSb1kI="

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="AIzaSyAT4TBVLGRAvNUq8O177-JGiWuQadk3Pb0"
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID="2e0ddee4c610d77b"
NEXT_PUBLIC_COLLAB_PUBLIC_URL="https://e55b-34-125-17-227.ngrok-free.app"
```

Note that the COLLAB_PUBLIC_URL might change due to lack of gpu and session timeouts, therefore backend requests will get CORS errors.
The Restricted Area Mode route is working though.

Go into the /frontend_infinite_loop/ directiory, and perform
`npm install`
`npm run dev`

### Backend Details

Our backend is built in Google Collab, therefore it won't be directly showcaseable in github, however we assure you it works perfectly.
Code snippets provided in /backend_py/
