# Provision a docker

Add app to a dockerfile to run it

# Notes
Original idea was to run a live server inside docker with a mounted volume, so when local files change, the live server will be reloaded.
Because is not feasible communicate with browser process inside the image, is better to serve the files inside docker and use a worker that reload that server, to update the files
some investagation with nodemon was made, but for this small app is overkill serve the project with express and then use nodemon.
Other option are npm run dev:watch, i must investigate a little  further about it.
