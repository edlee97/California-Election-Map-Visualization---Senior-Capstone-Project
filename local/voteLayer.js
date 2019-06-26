//voteLayer: Defines the methods to create a JSON layer with the specified data, and the methods to redefine its inner text for the county info popup box
class voteLayer {
	constructor(election, yesVotes, yesPercents, noVotes, noPercents, voteType, layerForm, terrainType, layerName){
		this.year = election;
		this.yesV = yesVotes;
		this.yesP = yesPercents;
		this.noV = noVotes;
		this.noP = noPercents;
		this.statewideYesV = sumArray(yesVotes);
		this.statewideNoV = sumArray(noVotes);
		//Calculate percentages for statewide values, and round to the nearest 0.1
		this.statewideYesP = (this.statewideYesV/(this.statewideYesV + this.statewideNoV))*1000;
		this.statewideYesP = Math.round(this.statewideYesP);
		this.statewideYesP = this.statewideYesP/10;
		this.statewideNoP = (100 - this.statewideYesP)*10;
		this.statewideNoP = Math.round(this.statewideNoP);
		this.statewideNoP = this.statewideNoP/10;
		this.type = voteType;
		this.layerType = layerForm;
		this.terrain = terrainType;
		this.displaying = false;
		this.name = layerName;
		this.yesString = "Yes: ";
		this.noString = "No: ";
		if(layerName=="2018 Governor Election: Gavin Newsom vs. John Cox"){
			this.yesString = "Gavin Newsom (D): ";
			this.noString = "John H. Cox (R): ";
		}
		if(terrainType=="congressional districts"){
			this.yesString = "Democrat votes: ";
			this.noString = "Republican votes: ";
		}
		if(layerName=="2016 Presidential Election: Hillary R. Clinton vs. Donald J. Trump"){
			this.yesString = "Hillary R. Clinton (D): ";
			this.noString = "Donald J. Trump (R): ";
		}
		if(layerName=="2016 Senate Election: Kamala Harris vs. Loretta Sanchez"){
			this.yesString = "Kamala Harris (D): ";
			this.noString = "Loretta Sanchez (D): ";
		}
		if(layerName=="2018 Senate Election: Dianne Feinstein vs. Kevin de Leon"){
			this.yesString = "Dianne Feinstein (D): ";
			this.noString = "Kevin de Leon (D): ";
		}
		//If making a layer of Counties, load counties.json
		if(terrainType=="counties"){
			this.mapLayer = new L.GeoJSON.AJAX("local/counties.json",
				{style: function(feature){
					var maxYes = maxArray(yesPercents);
					var maxNo = maxArray(noPercents);
					var minYes = minArray(yesPercents);
					//County with maximum change has the most saturated color
					if (layerForm=="comparison"){
						var change = yesPercents[feature.properties.cartodb_id];
						var spectrum = 255 - ((Math.abs(change)/Math.abs(maxYes))*255);
						if(change>0){
							var color = "rgb(255,"+spectrum+","+spectrum+")";
						} else {
							var color = "rgb("+spectrum+","+spectrum+",255)";
						}
					//Create mushed colors; all of these races are statewide and population-based
					} else if (voteType=="senate"){
						var g = 255 * noPercents[feature.properties.cartodb_id]/maxNo;
						var b = 255 * yesPercents[feature.properties.cartodb_id]/maxYes;
						var color = "rgb(0,"+g+","+b+")";
					} else if(voteType=="partisan"){
						var r = 255 * noPercents[feature.properties.cartodb_id]/maxNo;
						var b = 255 * yesPercents[feature.properties.cartodb_id]/maxYes;
						var color = "rgb("+r+",0,"+b+")";
					} else if (voteType=="proposition") {
						var r = 255 * noPercents[feature.properties.cartodb_id]/maxNo;
						var b = 255 * yesPercents[feature.properties.cartodb_id]/maxYes;
						var color = "rgb("+r+","+b+",0)";
					} else if (voteType=="population"){
						if(yesVotes[feature.properties.cartodb_id]>0){
							var color = "rgb(160,160,255)";
						} else {
							var color = "rgb(255,160,160)";
						}
					} else if (voteType=="registration"){
						var range = maxYes - minYes;
						var local = yesPercents[feature.properties.cartodb_id] - minYes;
						var spectrum = 255 - ((local/range)*255);
						var color = "rgb("+spectrum+",255,"+spectrum+")";
					}
					return{
						weight: 1,
						opacity: 1,
						color: "white",
						dashArray: '3',
						fillOpacity: 0.7,
						fillColor: color,
					};
				},
				onEachFeature: layerInfo
			});
		//Otherwise, load congressionalDistricts.json
		} else if ((terrainType=="congressional districts") && (layerForm=="comparison")){
			this.mapLayer = new L.GeoJSON.AJAX("local/congressionalDistricts.json",
				{style: function(feature){
					//If Democrats/Republicans gained votes while the other lost votes, set color to dark blue / dark red
					if((yesVotes[feature.properties.CD113FP] < 0) && (noVotes[feature.properties.CD113FP] > 0)){
						var color = "rgb(80,80,255)";
					} else if ((noVotes[feature.properties.CD113FP] < 0) && (yesVotes[feature.properties.CD113FP] > 0)){
						var color = "rgb(255,80,80)";
					//If one side lost less votes than the other, set color to light blue / light red
					} else if ((yesVotes[feature.properties.CD113FP] > 0) && (noVotes[feature.properties.CD113FP] > 0) && (yesVotes[feature.properties.CD113FP] < noVotes[feature.properties.CD113FP])){
						var color = "rgb(160,160,255)";
					} else {
						var color = "rgb(255,160,160)";
					}
					return{
						weight: 1,
						opacity: 1,
						color: "white",
						dashArray: '3',
						fillOpacity: 0.7,
						fillColor: color,
					};
				},
				onEachFeature: layerInfo
			});
		//Otherwise, color congressional districts in a first-past-the-post fashion
		} else if (terrainType=="congressional districts") {
			this.mapLayer = new L.GeoJSON.AJAX("local/congressionalDistricts.json",
				{style: function(feature){
					if(yesVotes[feature.properties.CD113FP] > noVotes[feature.properties.CD113FP]){
						var spectrum = (255 - (((yesPercents[feature.properties.CD113FP])/100) * 255));
						var color = "rgb("+spectrum+","+spectrum+",255)";
					} else {
						var spectrum = (255 - (((noPercents[feature.properties.CD113FP])/100) * 255));
						var color = "rgb(255,"+spectrum+","+spectrum+")";
					}
					return{
						weight: 1,
						opacity: 1,
						color: "white",
						dashArray: '3',
						fillOpacity: 0.7,
						fillColor: color,
					};
				},
				onEachFeature: layerInfo
			});
		}
	}
	//Show layer on map
	displayLayer(){
		this.mapLayer.addTo(map);
		this.displaying = true;
	}
	//Hide layer on map
	setHidden(){
		map.removeLayer(this.mapLayer);
		this.displaying = false;
	}
	//Manually set statewide stats (only used for troublesome string-int conversions)
	setStatewideStats(arr){
		this.statewideYesV = arr[0];
		this.statewideYesP = arr[1];
		this.statewideNoV = arr[2];
		this.statewideNoP = arr[3];
	}
	//Returns the string printed on the countyInfo box.
	getCountyInfo(county){
		if((this.type=="registration") && (this.layerType!="comparison")){
			var infoString = "<b>" + county.name + " County</b><br />Population: " + county.population2017 + " (2017 estimate)<br />Eligible voting population: " + this.noV[county.cartodb_id] + "<br />Registered to vote: " + this.yesV[county.cartodb_id] + " (" + this.yesP[county.cartodb_id] + "%)";
			return infoString;
		}
		if(this.type=="population"){
			var infoString = "<b>" + county.name + " County</b><br /><i> 2010 Population: " + county.population2010 + "<br />2017 Estimate: " + county.population2017 + "";
			return infoString;
		}
		if((this.terrain=="counties") && (this.layerType!="comparison")){
			var infoString = "<b>" + county.name + " County</b><i> Population: " + county.population2017 + " (2017 estimate)</i><br /><i>"+this.yesString+"</i>" + this.yesV[county.cartodb_id] + " (" + this.yesP[county.cartodb_id] + "%)<br /><i>"+this.noString+"</i>" + this.noV[county.cartodb_id] + " (" + this.noP[county.cartodb_id] +  "%)";
			return infoString;
		//Return county comparison data; drop or increase of a specific stat
		} else if ((this.layerType=="comparison") && (this.terrain=="counties")) {
			if(this.yesP[county.cartodb_id]>0){
				var preposition = "drop";
			} else {
				var preposition = "increase";
			}
			var round = (Math.abs(this.yesP[county.cartodb_id])) * 10;
			round = Math.round(round);
			round = round/10;
			var infoString = "<b>" + county.name + " County</b><i> Population: " + county.population2017 + " (2017 estimate)</i><br />" + round + "% " + preposition + " in support";
			if(this.type=="partisan"){
				var addendum = " for the Democrat candidate";
			} else {
				var addendum = ".";
			}
			return infoString + addendum;
		//Return congressional district voting data
		} else if ((this.terrain=="congressional districts") && (this.layerType!="comparison")) {
			if(this.year==2018){
				var candidate1 = county.C118;
				var candidate2 = county.C218;
				var party1 = county.C1P18;
				var party2 = county.C2P18;
			} else if (this.year==2016){
				var candidate1 = county.C116;
				var candidate2 = county.C216;
				var party1 = county.C1P16;
				var party2 = county.C2P16;
			}
			var infoString = "<b>California " + county.NAMELSAD + "</b><br />" + candidate1 + " (" + party1 + "): " + this.yesV[county.CD113FP] + " (" + this.yesP[county.CD113FP] + "%)<br />"  + candidate2 + " (" + party2 + "): " + this.noV[county.CD113FP] + " (" + this.noP[county.CD113FP] + "%)";
			return infoString;
		//When comparing congressional districts, add "in Democrat/Republican votes" to the string
		} else if ((this.terrain=="congressional districts") && (this.layerType=="comparison")) {
			if(this.yesV[county.CD113FP]>0){
				var Dpreposition = "drop";
			} else {
				var Dpreposition = "increase";
			}
			if(this.noV[county.CD113FP]>0){
				var Rpreposition = "drop";
			} else {
				var Rpreposition = "increase";
			}
			var infoString = "<b>California " + county.NAMELSAD + "</b><br />" + Math.abs(this.yesV[county.CD113FP]) + " " + Dpreposition + " in Democrat votes<br />" + Math.abs(this.noV[county.CD113FP]) + " " + Rpreposition + " in Republican votes";
			return infoString;
		}
	}
	//Get various stats of this layer
	getName(){
		return this.name;
	}
	getYesVotes(){
		return this.yesV;
	}
	getYesPercents(){
		return this.yesP;
	}
	getNoVotes(){
		return this.noV;
	}
	getNoPercents(){
		return this.noP;
	}
	getStatewideYesP(){
		return this.statewideYesP;
	}
	getStatewideNoP(){
		return this.statewideNoP;
	}
	getStatewideYesV(){
		return this.statewideYesV;
	}
	getStatewideNoV(){
		return this.statewideNoV;
	}
	getYesString(){
		return this.yesString;
	}
	getNoString(){
		return this.noString;
	}
	getTerrainType(){
		return this.terrain;
	}
	getYear(){
		return this.year;
	}
	getVoteType(){
		return this.type;
	}
}