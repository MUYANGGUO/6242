In this part, we analyse the uber movement speed data in San Francisco.

First step: We preprocess the speed data from uber https://movement.uber.com/?lang=en-US. 
            After processing, we get the mean speed from every road junction. 
            Based on this processsing, we decrease data size from 780MB to 12 MB.

Secondly, We map the uber data. 
          In this step, we use OSM api to get segment detail and junction detail based on segment id, junction id, osm_id from uber.
