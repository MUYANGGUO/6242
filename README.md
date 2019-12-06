# Residense Recommendation System based on Personal Interests and Geo-info

## Project <"Hood---Mate"> V1

The project is aimed to build a local social network product powered by a recommendation algorithm that helps users to locate the best residency in the city and match their profile and personal interests with potential roommates.

It is also an academic study project of big data analysis and visualization, conducted by a group of students from Georgia Institute of Technology.  

## Authors

* **Muyang Guo**
* **Changxuan Zhao**
* **Xingjian Wang**
* **Rui Jia**
* **Xiaoxun Liu**
* **Xufan Song**

## Documentations

Direct to project wiki page to download progress documentations in PDF. 

- [Project Wiki](https://github.com/MUYANGGUO/6242/wiki)
 


## Datasets

- [Uber Movements](https://movement.uber.com/cities?lang=en-US)

- [Yelp Open Dataset](https://www.yelp.com/dataset)

- [Zillow Dataset](https://www.zillow.com/howto/api/APIOverview.htm)

- [SFPD Historical Crime Data](https://data.sfgov.org/Public-Safety/Police-Department-Incident-Reports-2018-to-Present/wg3w-h783)

## Visulization

- HTML,CSS, JS

- [Deck.gl](https://deck.gl/#/)

> All deck.gl layers are made to allow zoom, pan, rotate, focus. 
> All Props are made to be clickable/hoverable for different interactive purpose or exploratory data stats display.
 
  - Base Map Layer, mapbox tiles layer
  - Cleaned and reformatted Zillow geoJSON data as base layer, as subregions partitions
  - Systematically Sampled Uber Movements Trips Data, scaled to street level with color scheme for speed.
  - Icon Layers:
    - Red Icons : Hosts/Landlords, location as host location
    - Green Icons: Visitors/Tenants, location as destination location
    - Blue Icons: User "My Location"
  - Profile images layers, showing up with Icon Layers, display the users profile avatar image.
  - SFPD safety 3D extruded hexagon layers, show selected props surrounding incidents history since 2019, projected to hexagons and sort, rank by occurences for each sub hexagon. Extruded height is the incident density, with color scheme. 
    - on Hover: show the stats.
  - Yelp location icon layers, display selected props surrounding POIs, based on the keyword inputs, showing up in black to red linearly scaled color, color indicating the ratings. 
    - on Hover: show the yelp essential infos.

## Map Service

- [Mapbox](http://mapbox.com/)

## License

This project is licensed under the GPL_3.0 License - see the [LICENSE.md](/LICENSE) file for details

## Acknowledgments

To be updated ... ...

## Demo
[V1 Demo](https://www.youtube.com/watch?v=lmKRxIYy7Eo)
