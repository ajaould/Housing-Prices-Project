# Project 2 - Showing Access to Emergency and Public Green Space based on Housing Prices in the Richmond, Virginia area

* **Team Members**:
    - Aja Ould
    - Althea McMillian


* **Project Description/Outline**: We used 2017 Richmond parks, emergency services and Richmond housing prices data to determine Richmonder's accessibility to green space and basic emergency services.

We have made a heat map of the Richmond housing prices as our base, with the ability to layer on top the locations of public parks, and the different types of emergency services available within an area to show the accessibility differences in Richmond.   

* **Datasets Used**: 
1.	ALFRED Archival Economic Data for housing data: - https://alfred.stlouisfed.org/series?seid=ATNHPIUS40060Q&utm_source=series_page&utm_medium=related_content&utm_term=related_resources&utm_campaign=alfred
2.	Virginia Department of Conservation and Recreation for parks data: - https://richmond-geo-hub-cor.hub.arcgis.com/datasets/parks-2
3.	Google API for emergency services data: - https://maps.googleapis.com/maps/api/place/nearbysearch/json

* **Project Approach**:
1.	Locate data needed for visualization
2.	Data manipulations
    -	We utilized jupiter notebooks to create dataframes and pgAdmin with PostgreSQL to condense the data to the Richmond area
    -	We also worked with D3, Json and GeoJson files along with and Leafleaf JS to build our final visulizations
3.	Finally, we deployed our site to the web using Heroku


* **Conclusion**:
1. Housing prices is more of a prediction of access to emergency services than access to public green space.
2. However we did detect a disparity in the size of the public green spaces
3. Futher research could be done to determine if housing price is a predictor of the size of the public green space near the home.
- - -


