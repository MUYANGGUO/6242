import geopandas as gpd
import pandas as pd

speed_data=pd.read_csv('./speed_data/Q2/movement-speeds-quarterly-by-hod-san-francisco-2018-Q2.csv')
segment_osm=pd.read_csv('./speed_data/Q2/movement-segments-to-osm-ways-san-francisco-2018.csv')
junction_osm=pd.read_csv('./speed_data/Q2/movement-junctions-to-osm-nodes-san-francisco-2018.csv')

speed_detail=speed_data[['segment_id','start_junction_id','end_junction_id','osm_way_id','osm_start_node_id','osm_end_node_id','speed_mph_mean']]

road_detail=[]
for i in range(0,len(speed_detail['osm_start_node_id'])):
        mm=[]
        if speed_detail['osm_start_node_id'][i]>speed_detail['osm_end_node_id'][i]:
            mm.append(speed_detail['osm_start_node_id'][i])
            mm.append(speed_detail['osm_end_node_id'][i])
        else:
            mm.append(speed_detail['osm_end_node_id'][i])
            mm.append(speed_detail['osm_start_node_id'][i])
        road_detail.append(mm)

speed_detail['road_junction_detail']=road_detail

res =speed_detail[['osm_way_id','road_junction_detail','speed_mph_mean']]
res['road_junction_detail']=res['road_junction_detail'].apply(tuple)

result_part_t=res.groupby(['osm_way_id','road_junction_detail'])['speed_mph_mean'].count().reset_index().rename(columns={'speed_mph_mean':'junction number'})
junction_number=result_part_t['junction number']

result_part=res.groupby(['osm_way_id','road_junction_detail'])['speed_mph_mean'].mean().reset_index()
result_part['junction number']=junction_number
result_part.to_csv('speed_detail_2018_Q2.csv', sep=',', encoding='utf-8')
