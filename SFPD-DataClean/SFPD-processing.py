
import numpy as np
import geopandas as gpd
SFPD = gpd.read_file('/Users/muyangguo/Desktop/6242_MUYANG/SFPD_2018_present.geojson')
Neighborhood = gpd.read_file('/Users/muyangguo/Desktop/zillow-neighborhoods.geojson')
print(SFPD.head())