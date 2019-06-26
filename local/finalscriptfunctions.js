//Define methods for highlighting and un-highlighting the counties. Every county in every layer points to this.
function layerInfo(feature, layer){
	layer.on({
		mouseover: selectCounty,
		mouseout: unselectCounty
	});
}

//Highlight the current mouseover county by changing its style tag, update countyInfo to reflect it
function selectCounty(e){
	var layer = e.target;
	layer.setStyle({
		weight: 3,
		color: "white",
		dashArray: '',
		fillOpacity: 1.0,
	});
	countyInfo.update(layer.feature.properties);
}

//Undo the highlight by resetting the highlight tag, reset countyInfo back to normal
function unselectCounty(e){
	var layer = e.target;
	layer.setStyle({
		weight: 1,
		opacity: 1,
		color: "white",
		dashArray: '3',
		fillOpacity: 0.7,
	});
	countyInfo.update();
}

//Find difference between two elements of array
function changeArray(array1, array2){
	var diff = [];
	for(var i=0; i<59; i++){
		diff[i] = array1[i] - array2[i];
	}
	return diff;
}

//Find sum of all elements in array
function sumArray(arr){
	var sum = 0;
	var i = 1;
	while(arr[i]!=null){
		var num = arr[i]*1;
		sum = sum + num;
		i++;
	}
	return Math.round(sum);
}

//Find maximum of array
function maxArray(arr){
	var max = arr[1];
	var i = 1;
	while(arr[i]!=null){
		if(arr[i]>max){
			max = arr[i];
		}
		i++;
	}
	return max;
}

//Find minimum of array
function minArray(arr){
	var min = arr[1];
	var i = 1;
	while(arr[i]!=null){
		if(arr[i]<min){
			min = arr[i];
		}
		i++;
	}
	return min;
}

//Convert integer ratios to percentages and return the first array results
function makePercentages1(arr1, arr2){
	var percent1 = [];
	var percent2 = [];
	var i = 1;
	while(arr1[i]!=null){
		var total = parseInt(arr1[i]) + parseInt(arr2[i]);
		var p1 = (arr1[i]/total)*1000;
		p1 = Math.round(p1);
		p1 = p1/10;
		var p2 = (100 - p1)*10;
		p2 = Math.round(p2);
		p2 = p2/10;
		percent1[i] = p1;
		percent2[i] = p2;
		i++;
	}
	return percent1;
}

//Convert integer ratios to percentages and return the second array results
function makePercentages2(arr1, arr2){
	var percent1 = [];
	var percent2 = [];
	var i = 1;
	while(arr1[i]!=null){
		var total = parseInt(arr1[i]) + parseInt(arr2[i]);
		var p1 = (arr1[i]/total)*1000;
		p1 = Math.round(p1);
		p1 = p1/10;
		var p2 = (100 - p1)*10;
		p2 = Math.round(p2);
		p2 = p2/10;
		percent1[i] = p1;
		percent2[i] = p2;
		i++;
	}
	return percent2;
}