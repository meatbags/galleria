# Closed On Monday Gallery
[Closed On Monday](http://closedonmondaygallery.com/) is a virtual, interactive 3d gallery which runs monthly exhibitions. An experimental take on the Artist Run Initiative, COM Gallery features work from emerging artists based in Sydney, Australia. The site also contains an archive, allowing users to revisit previous COM exhibitions.

# Technology
Closed On Monday is realised with THREE.js, the Web Audio API, and Collider - a simple physics library. We work with artists one-on-one to extend their work into the third dimension, often employing custom GLSL to bring the presentations to life.

# JS/SCSS Development
- install libraries: `npm install`
- development: `npm run watch`
- build: `npm run pack`

# Wordpress Setup
1. Install the theme in `[root]/wp-content/themes` and activate

# Plugin Setup
1. Copy the folders `plaugins/advanced-custom-fields-pro` and `plugins/simple-custom-post-order` into the Wordpress plugins directory `[root]/wp-content/plugins/`
2. Activate the plugins in the Wordpress admin area
3. [ACF] In the menu Custom Fields > Tools import the fields file `plugins/acf-export-2020-05-19.json`
4. [SCPOrder] In the menu Settings > SCPOrder check the box `galleries` in `Check to Sort Post Types`, save

# Create An Exhibition
1. Galleries > Add New 
2. Fill out the fields, update images, etc.
3. Use `floorplan.jpg` as a reference for placing images (`Location` dropdown)
