//Declare variables
var currentLayer;
var compLayer;
var displayingSupporters = true;
var supporters = [];
var displayingOpponents = true;
var opponents = [];
var layersSelected = [];
var cox2018Percentages = [];
cox2018Percentages.push(0);
var newsom2018Percentages = [];
newsom2018Percentages.push(0);
var cox2018Votes = [];
cox2018Votes.push(0);
var newsom2018Votes = [];
newsom2018Votes.push(0);
var govStats = [];
govStats.push(7721410);
govStats.push(61.9);
govStats.push(4742825);
govStats.push(38.1);
var presStats = [];
presStats.push(8753788);
presStats.push(61.7);
presStats.push(4483810);
presStats.push(31.6);
var prop32018YP = [];
prop32018YP.push(0);
var prop32018YV = [];
prop32018YV.push(0);
var prop32018NP = [];
prop32018NP.push(0);
var prop32018NV = [];
prop32018NV.push(0);
var prop62018YP = [];
prop62018YP.push(0);
var prop62018YV = [];
prop62018YV.push(0);
var prop62018NP = [];
prop62018NP.push(0);
var prop62018NV = [];
prop62018NV.push(0);
var prop102018YP = [];
prop102018YP.push(0);
var prop102018YV = [];
prop102018YV.push(0);
var prop102018NP = [];
prop102018NP.push(0);
var prop102018NV = [];
prop102018NV.push(0);
/*var prop12014YP = [];
prop12014YP.push(0);
var prop12014YV = [];
prop12014YV.push(0);
var prop12014NP = [];
prop12014NP.push(0);
var prop12014NV = [];
prop12014NV.push(0);*/
var houseC12018 = [];
var houseC22018 = [];
houseC12018.push(0);
houseC22018.push(0);
var houseC12016 = [];
var houseC22016 = [];
houseC12016.push(0);
houseC22016.push(0);
var popChange = [];
popChange.push(0);
var eligible2016 = [];
eligible2016.push(0);
var registered2016 = [];
registered2016.push(0);
var percents2016 = [];
percents2016.push(0);
var eligible2018 = [];
eligible2018.push(0);
var registered2018 = [];
registered2018.push(0);
var percents2018 = [];
percents2018.push(0);
var eligible2019 = [];
eligible2019.push(0);
var registered2019 = [];
registered2019.push(0);
var percents2019 = [];
percents2019.push(0);
var presDV2016 = [];
presDV2016.push(0);
var presRV2016 = [];
presRV2016.push(0);
var senate16KV = [];
senate16KV.push(0);
var senate16LV = [];
senate16LV.push(0);
var senate18DV = [];
senate18DV.push(0);
var senate18LV = [];
senate18LV.push(0);


//Set up external d3.json call to get the governor election data, as well as the proposition election data
d3.json("local/counties.json", function(a) {
	a.features.forEach(function(b){
		var govURL2018 = "https://api.sos.ca.gov/returns/governor/county/" + b.properties.name;
		var propURL2018 = "https://api.sos.ca.gov/returns/ballot-measures/county/" + b.properties.name;
		govURL2018 = govURL2018.replace(/ /g, "-");
		propURL2018 = propURL2018.replace(/ /g, "-");
		//Internal d3.json call to get the governor election data
		d3.json(govURL2018, function(c){
			cox2018Percentages[b.properties.cartodb_id] = c.candidates[1].Percent;
			cox2018Votes[b.properties.cartodb_id] = c.candidates[1].Votes;
			newsom2018Percentages[b.properties.cartodb_id] = c.candidates[0].Percent;
			newsom2018Votes[b.properties.cartodb_id] = c.candidates[0].Votes;
		});
		//Internal d3.json call to get the proposition election data; data is formatted as dataType(yes or no, votes or percentages)[county#][prop#]
		d3.json(propURL2018, function(d){
			prop32018YP[b.properties.cartodb_id] = (d["ballot-measures"][2].yesPercent);
			prop32018YV[b.properties.cartodb_id] = (d["ballot-measures"][2].yesVotes);
			prop32018NP[b.properties.cartodb_id] = (d["ballot-measures"][2].noPercent);
			prop32018NV[b.properties.cartodb_id] = (d["ballot-measures"][2].noVotes);
			prop62018YP[b.properties.cartodb_id] = (d["ballot-measures"][5].yesPercent);
			prop62018YV[b.properties.cartodb_id] = (d["ballot-measures"][5].yesVotes);
			prop62018NP[b.properties.cartodb_id] = (d["ballot-measures"][5].noPercent);
			prop62018NV[b.properties.cartodb_id] = (d["ballot-measures"][5].noVotes);
			prop102018YP[b.properties.cartodb_id] = (d["ballot-measures"][8].yesPercent);
			prop102018YV[b.properties.cartodb_id] = (d["ballot-measures"][8].yesVotes);
			prop102018NP[b.properties.cartodb_id] = (d["ballot-measures"][8].noPercent);
			prop102018NV[b.properties.cartodb_id] = (d["ballot-measures"][8].noVotes);
		});
		/*prop12014YP[b.properties.cartodb_id] = b.properties.P114YP;
		prop12014YV[b.properties.cartodb_id] = b.properties.P114YV;
		prop12014NP[b.properties.cartodb_id] = b.properties.P114NP;
		prop12014NV[b.properties.cartodb_id] = b.properties.P114NV;*/
		//Get other data in counties.json; senate, presidential, registration, population
		popChange[b.properties.cartodb_id] = b.properties.population2017 - b.properties.population2010;
		eligible2016[b.properties.cartodb_id] = b.properties.Eligible2016;
		registered2016[b.properties.cartodb_id] = b.properties.Registered2016;
		percents2016[b.properties.cartodb_id] = (b.properties.Registered2016/b.properties.Eligible2016)*1000;
		percents2016[b.properties.cartodb_id] = Math.round(percents2016[b.properties.cartodb_id]);
		percents2016[b.properties.cartodb_id] = percents2016[b.properties.cartodb_id]/10;
		eligible2018[b.properties.cartodb_id] = b.properties.Eligible2018;
		registered2018[b.properties.cartodb_id] = b.properties.Registered2018;
		percents2018[b.properties.cartodb_id] = (b.properties.Registered2018/b.properties.Eligible2018)*1000;
		percents2018[b.properties.cartodb_id] = Math.round(percents2018[b.properties.cartodb_id]);
		percents2018[b.properties.cartodb_id] = percents2018[b.properties.cartodb_id]/10;
		eligible2019[b.properties.cartodb_id] = b.properties.Eligible2019;
		registered2019[b.properties.cartodb_id] = b.properties.Registered2019;
		percents2019[b.properties.cartodb_id] = (b.properties.Registered2019/b.properties.Eligible2019)*1000;
		percents2019[b.properties.cartodb_id] = Math.round(percents2019[b.properties.cartodb_id]);
		percents2019[b.properties.cartodb_id] = percents2019[b.properties.cartodb_id]/10;
		presDV2016[b.properties.cartodb_id] = b.properties.Dem2016;
		presRV2016[b.properties.cartodb_id] = b.properties.Rep2016;
		senate16KV[b.properties.cartodb_id] = b.properties.Senate16K;
		senate16LV[b.properties.cartodb_id] = b.properties.Senate16L;
		senate18DV[b.properties.cartodb_id] = b.properties.Senate18D;
		senate18LV[b.properties.cartodb_id] = b.properties.Senate18L;
	});
});

//Do an addition d3.json call, this one only for congressional districts
d3.json("local/congressionalDistricts.json", function(a) {
	a.features.forEach(function(b){
		houseC12018[b.properties.CD113FP] = parseInt(b.properties.C1V18);
		houseC22018[b.properties.CD113FP] = parseInt(b.properties.C2V18);
		houseC12016[b.properties.CD113FP] = parseInt(b.properties.C1V16);
		houseC22016[b.properties.CD113FP] = parseInt(b.properties.C2V16);
	});
});

//Initialize map from openstreetmap
var map = L.map('map').setView([35.951, -120.088], 7);
    mapLink = 
        '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
}).addTo(map);

//Let JSON load for a solid 4 seconds before making the various layers
setTimeout(function(){
	countyInfo.update();
	gov2018 = new voteLayer(2018, newsom2018Votes, newsom2018Percentages, cox2018Votes, cox2018Percentages, "partisan", "normal", "counties", "2018 Governor Election: Gavin Newsom vs. John Cox");
	prop32018 = new voteLayer(2018, prop32018YV, prop32018YP, prop32018NV, prop32018NP, "proposition", "normal", "counties", "Proposition 3 (2018): $8.877 Billion Water Funding");
	prop62018 = new voteLayer(2018, prop62018YV, prop62018YP, prop62018NV, prop62018NP, "proposition", "normal", "counties", "Proposition 6 (2018): Gas Tax Repeal");
	prop102018 = new voteLayer(2018, prop102018YV, prop102018YP, prop102018NV, prop102018NP, "proposition", "normal", "counties", "Proposition 10 (2018): Local Rent Control Initiative");
	//prop12014 = new voteLayer(prop12014YV, prop12014YP, prop12014NV, prop12014NP, "proposition", "counties", "Proposition 1 (2014): $7.12 Billion Water Funding");
	house2018 = new voteLayer(2018, houseC12018, makePercentages1(houseC12018, houseC22018), houseC22018, makePercentages2(houseC12018, houseC22018), "partisan", "normal", "congressional districts", "2018 House of Representatives Election");
	house2016 = new voteLayer(2016, houseC12016, makePercentages1(houseC12016, houseC22016), houseC22016, makePercentages2(houseC12016, houseC22016), "partisan", "normal", "congressional districts", "2016 House of Representatives Election");
	populationChange = new voteLayer(2017, popChange, popChange, popChange, popChange, "population", "normal", "counties", "Population Trends from 2010 to 2017");
	registration2016 = new voteLayer(2016, registered2016, percents2016, eligible2016, registered2016, "registration", "normal", "counties", "Registration Statistics from 2016");
	registration2018 = new voteLayer(2018, registered2018, percents2018, eligible2018, registered2018, "registration", "normal", "counties", "Registration Statistics from 2018");
	registration2019 = new voteLayer(2019, registered2019, percents2019, eligible2019, registered2019, "registration", "normal", "counties", "Registration Statistics from 2019");
	pres2016 = new voteLayer(2016, presDV2016, makePercentages1(presDV2016, presRV2016), presRV2016, makePercentages2(presDV2016, presRV2016), "partisan", "normal", "counties", "2016 Presidential Election: Hillary R. Clinton vs. Donald J. Trump");
	senate2016 = new voteLayer(2016, senate16KV, makePercentages1(senate16KV, senate16LV), senate16LV, makePercentages2(senate16KV, senate16LV), "senate", "normal", "counties", "2016 Senate Election: Kamala Harris vs. Loretta Sanchez");
	senate2018 = new voteLayer(2016, senate18DV, makePercentages1(senate18DV, senate18LV), senate18LV, makePercentages2(senate18DV, senate18LV), "senate", "normal", "counties", "2018 Senate Election: Dianne Feinstein vs. Kevin de Leon");
	house2018.displayLayer();
	currentLayer = house2018;
	layersSelected[0] = house2018;
	gov2018.setStatewideStats(govStats);
	pres2016.setStatewideStats(presStats);
}, 4000);

//Create the countyInfo box, place at top left corner
var countyInfo = L.control({
	position: 'topright'
});

//Displays "loading" when first loaded (before the layers are added in the delayed function)
countyInfo.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'countyInfo');
	this._div.innerHTML = "Loading";
	return this._div;
};

//Update the text within the countyInfo box
countyInfo.update = function (county) {
	if(county){
		this._div.innerHTML = currentLayer.getCountyInfo(county);
	} else {
		this._div.innerHTML = 'No county selected';
	}
};
//Add countyInfo box to map
countyInfo.addTo(map);
//Create layer information box, pass initial state of the box to the map
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'info legend'),
	this._div.innerHTML = "<b>Democrat Gains in California's 2018 Election</b><br />In November 2018, Democrats in California accomplished several major victories, gaining seats in the House of Representatives, the State Assembly, and the State Senate. In the governor race, Republican John H. Cox conceded defeat to Gavin Newsom, who won by a massive 61.9%. Senator Dianne Feinstein won reelection against another Democrat, facing no Republican resistance after a dismal Republican turnout in the June primaries.<br />These victories were preceded by middling success in the 2016 election, and Republican gains in the 2014 election. What allowed for these Democratic victories, and what does this mean for the 2020 election?";
	return this._div;
};
legend.update = function(){
	//Depending on the current layer, display a different message
	switch(currentLayer){
		case senate2016:
			var part1 = "<b>California 2016 Senate Election: Kamala Harris vs. Loretta Sanchez</b>";
			var part2 = "<br />In the California system of the general election ballot, the top two candidates, regardless of party, advance to the primary in November. Hence, for both the 2016 and 2018 Senate elections, the final election was between two Democrats.";
			var part3 = "<br />In the general election, the Republicans only managed to get 27.9% of the total vote. Kamala ended up with a decisive victory of 61.6%.";
			this._div.innerHTML = part1 + part2 + part3;
			break;
		case senate2018:
			var part1 = "<b>California 2018 Senate Election: Dianne Feinstein vs. Kevin de Leon</b>";
			var part2 = "<br />Like the 2016 Senate election, the general election narrowed the choice down to two democratic candidates. The Republicans collectively received 31.2% of the general vote.";
			var part3 = "<br />There were 1.3 million fewer votes for this election than for the gubernatorial election, most likely by Republicans or independents who chose to abstain rather than be forced to choose between two Democrats. Spite-voting proved powerful; Kevin de Leon won many Republican-leaning counties, no doubt an act of protest against five-time incumbent Dianne Feinstein.";
			this._div.innerHTML = part1 + part2 + part3;
			break;
		case registration2016:
			var part1 = "<b>California 2016 Voter Registration Data</b>";
			var part2 = "<br />2016 saw very strong voter registration and participation numbers, mostly due to the presidential election; 75% of registered voters cast their ballots. These numbers followed a tepid 2014 turnout, where less than 42% of registered voters participated in the midterms.";
			this._div.innerHTML = part1 + part2;
			break;
		case registration2018:
			var part1 = "<b>California 2018 Voter Registration Data</b>";
			var part2 = "<br />Contrary to the sluggish results we usually see in midterms, California voters were unexpectedly galvanized in 2018. There was a turnout of nearly 65%, far higher than 2014's 42%, and the highest in a gubernatorial election since Schwarzenegger's reelection in 2006. Counties across the state reported higher rates of voter registration.";
			var part3 = "<br />In late 2016, the government initiated a program to pre-register kids to vote; when these 16 and 17-year-olds reached 18, they were automatically registered to vote. Although the majority of them registered as having 'no party preference', they contributed greatly to the Democratic victories in 2018.";
			this._div.innerHTML = part1 + part2 + part3;
			break;
		case registration2019:
			var part1 = "<b>The Future: What's In It for the 2020 Election?</b>";
			var part2 = "<br />Overall, the success of the Democrats in the 2018 race was due to voter galvanization. Democrats were able to harness recent trends and events in politics - some of which, like the southern border wall, strike quite close to home - and translate them into local gains, such as the House results and gubernatorial results. So, what does this mean for the 2020 election?";
			var part3 = "<br /><br /><i>1: Expect Extreme Contention</i>";
			var part4 = "<br />Midterms are always a prelude to their following presidential election; the sluggish midterms of 2014 still led into the incumbent victories of 2016 election. Meanwhile, the vastly increased voter participation of the 2018 midterms promises even greater participation in 2020; California recently reached over 20 million registered voters, more than the entire population of New York. Additionally, both parties have placed importance upon 2020 as a landmark election; Democrats view it as the opportunity to end Trump's presidency and make extensive progressive gains, and Republicans view it as the time to affirm Trump's presidency and further solidify his population mandate. When it comes time for reelection, the current presidential party typically does well. Although Democrats made significant gains in the 2018 election, there's more incentive for Republicans to fight back in 2020.";
			var part5 = "<br /><br /><i>2: Presidential Candidates Will Be a Doozy</i>";
			var part6 = "<br />California, being the state with the most electoral votes, is an object of major attention for any presidential candidate. However, with the Democrats' goals of ousting Trump, California is elevated to an even higher level of importance. Junior Senator Kamala Harris has already announced her presidential run, Senator Cory Booker's campaign manager ran Gavin Newsom's successful gubernatorial campaign, and Bernie Sanders spent weeks in California, leading up to the 2016 primary election. They had best be careful; California politicians have had limited luck in presidential races, with the notable exception of Ronald Reagan.<br />Also, the primary this year is much earlier than usual; held in March instead of June, California will be joining New Hampshire and Iowa as states with early primaries, further increasing California's importance.";
			var part7 = "<br /><br /><i>3: Local Governments Won't Be Afraid To Throw The Curveball</i>";
			var part8 = "<br />The State Senate recently considered Bill 27, which would require presidential candidates to disclose their last five years of tax returns. Former Governor Jerry Brown vetoed an identical bill in 2017, disputing its constitutionality, but Senator Mike McGuire reintroduced it with the hopes that Gavin Newsom would approve. Although the vast majority of voters agree that Trump's tax returns should be publically released, it is likely that the bill would be disputed and struck down before it could have the chance to prevent Trump's name from appearing on the 2020 ballot.";
			var part9 = "<br />Meanwhile, the California Republican Party, reeling from its 2018 defeat and the souring public opinion against Trump, must learn how to reassert itself. To this end, it has focused on center-right policies, distanced itself from overt racists like Steve King (a remarkable and commendable achievement, I know), and hired with greater diversity: Jessica Patterson as the first Latino and the first woman as the California GOP chair, Taiwanese immigrant Peter Kuo as the vice chair, and openly gay Greg Gandrud as their Treasurer. (How long before someone accuses <i>them</i> of tokenism and identity politics...)";
			var part10 = "<br />Fresno and Orange County have adopted new voting systems; Fresno will automatically mail the ballot to every registered voter in the county, and Orange County will consolidate their ~1,200 polling stations into a handful of voting centers, with earlier voting permitted.";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5 + part6 + part7 + part8 + part9 + part10;
			break;
		case pres2016:
			var part1 = "<b>California 2016 Presidential Election</b><br />";
			var part2 = "In 2016, 61.73% of California voters chose Hillary Clinton, the second highest of the nation, winning her 55 votes in the electoral college. This marked the largest ratio of votes in a Presidential race since Franklin D. Roosevelt in 1936, as well as the first time Orange County has voted for a Democrat since the same year.";
			var part3 = "<br />Despite her massive success (statewise, that is), the vote was not without contention; during the June primary, both the Democratic delegates and the population were split nearly evenly between Hillary and Bernie Sanders, with Bernie taking much of Northern California. Meanwhile, Donald Trump won every single delegate vote, due to the fact that all other Republican candidates had withdrawn at this point.";
			this._div.innerHTML = part1 + part2 + part3;
			break;
		case prop32018:
			var part1 = "<b>California Proposition 3 (2018)</b><br />Proposition 3's $8.877 billion in bonds was estimated to have a final cost of $17.3 billion dollars over a 40-year period. Despite its widespread endorsements from politicians, local environmental organizations, and water districts, as well as an advocacy campaign that raised $4.9 million dollars in support, it was defeated by 1.3% (50.65% Against vs. 49.35% For).<br />Compared to Proposition 1 in 2014, only one county voted more positively to Proposition 3. However, the traditionally conservative areas of California were not much more negative to Proposition 3 (2018) as they were towards Proposition 1 (2014); rather, the vast majority of the discrepancy between the two propositions came from the high-population, traditionally liberal coastal areas, Los Angeles, Santa Clara County, and San Diego especially. This is likely because these areas were not directly benefitted by the proposition, and the citizens there were less than enthusiastic about paying for the development and maintenance of rural areas.";
			var part2 = "<br />Something to keep in mind about the proposition's failure is its sheer size and percieved corruption; at $8.877 billion, it was the largest cost on the ballot, and the most expensive water bond yet proposed. Additionally, it was placed on the ballot surreptitiously; the normal process of gathering votes to approve of a proposition's placement on the ballot is not typically used for bills of this size. Combine this with the growing concerns over the California economic position (partially due to the recent conflicts about immigration), and you have a pill that's tough for fiscal conservatives to swallow.<br />(However, this massive cost didn't stop Trump-endorsed gubernatorial candidate John Cox from supporting the proposition.)";
			var part3 = "<br />Additionally, the actual intended use of the money might have given people pause. The proposition professed to help water-related things as a whole, but large parts of the budget went towards areas that A: were widely considered to not need current aid, and B: were not the solution for California's water problems. For example, $10 million would be devoted towards 'making water information interoperable', $20 million towards 'providing river access for non-motorized recreation', and hundreds of millions for preserving freshwater watersheds, of which more than fifty percent of the water flows to the sea. Many editorials claimed that this money would simply be pocketed. Even the Sierra Club, one of America's most dedicated and long-standing conservation organizations, opposed the proposition.";
			var part4 = "<br />We must not oversell the enthusiasm that California voters have for water bonds. Proposition 1 in 2014 was an anomaly with its 67.1% approval rating; before that, Proposition 84 in 2006 won by a mere 53.8%, and Proposition 50 in 2002 won by 55.3%. With the drought passed, and decades of water bonds already passed through the ballots, California voters likely feel little reason to approve another one, especially one that would benefit distant areas at your expense; unless the next water bond comes during another drought or is fundamentally different from its predecessors, it will likely be defeated by a much larger margin.";
			this._div.innerHTML = part1 + part2 + part3 + part4;
			break;
		case prop62018:
			var part1 = "<b>California Proposition 6 (2018): Repeal the Tax on Fuel and Vehicles</b><br />";
			var part2 = "Proposition 6 was an initiative to repeal the taxes to fuel and vehicles enacted in 2017, as well as require voter approval before future fuel and vehicle taxes could be imposed. As expected, this proposition was supported by numerous Republicans, including the House Majority (now minority) Leader Kevin McCarthy, House Minority Whip Steven Scalise, and walking embodiment of sycophantry Devin Nunes.";
			var part3 = "<br />The opposition, however, was nothing to sneeze at; in addition to Governor Jerry Brown, many labor organizations and businesses soundly opposed Proposition 6. Numerous cities passed local resolutions to oppose the proposition, whether through official statements or legislative action to safeguard its effects in case it was passed.";
			var part4 = "<br />Where the supporters of Proposition 6 tried to cast the fuel tax as a massive overstepping of government finances and authority, the opponents cast it as a necessary burden to improve infrastructure. Jerry Brown said, 'I can’t believe the proponents of this ballot measure really want Californians to keep driving on lousy roads and dangerous bridges'.";
			var part5 = "<br />The proposition was repealed; 6,952,081 (56.8%) to 5283222 (43.2%).";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5;
			break;
		case prop102018:
			var part1 = "<b>California Proposition 10 (2018): Allow Local Rent Control</b>";
			var part2 = "<br />Proposition 10 was an initiative to allow local governments to impose rent control. This would directly repeal the 1995 Costa-Hawkins Rental Housing Act, which forbade rent controls of any kind, and allowed landlords to increase rent prices when tenants moved out.";
			var part3 = "<br />Housing is one of California's most urgent, yet contentious issues. Numerous places throughout the state are currently under housing crisis, including the Bay Area and our very own Santa Cruz. Throughout all this, the Costa-Hawkins act remains under constant fire; representative Richard Bloom introduced a bill to repeal Costa-Hawkins. The bill was rejected, due to the two Republicans who voted against passing. Representative David Chiu remarked that 'this will not be the end of the conversation; it's just the beginning'.";
			var part4 = "<br />Although both of the gubernatorial candidates, Gavin Newsom and John Cox, believed that legislative action should be taken to improve the availability of affordable housing, neither of them fully supported Proposition 10; while John Cox affirmed his suspicions towards the efficacy of rent controls, Gavin Newsom believed that a repeal of Costa-Hawkins would have 'unintended and profoundly problematic' consequences.";
			var part5 = "<br />Opponents of Proposition 10 spent over $72 million dollars, almost three times as much as the $25.6 million the supporters spent. Ultimately their spending proved successful; Proposition 10 was repealed with a decisive 59.4% of the vote.";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5;
			break;
		/*case prop12014:
			var part1 = "<b>California Proposition 1 (2014)</b><br />In 2010, a massive $11.14 billion dollar water bond was placed on the state ballot. It was removed by the state legislature and placed on the 2012 ballot, before being removed again and placed on the 2014 ballot. In the time between inception and voting, Governor Jerry Brown initiated plans to refine the proposition by cutting its size down to $7.12 billion and refocusing its budget on the specific issue of the drought, creating a measure that was passed with a resounding 67.1% of the vote, the highest ever seen in a water bond.";
			var part2 = "<br />Proposition 1 achieved widespread support; both the California Democratic Party and the California Republican Party endorsed the proposition, as well as the two California senators Dianne Feinstein and Barbara Boxer. Governor Jerry Brown wrote the official argument in favor of Proposition 1, printed in the voter information guide. Advocacy groups raised over $21 million dollars to promote the proposition, with many of them emphasizing the bipartisan nature of the proposition's support.";
			var part3 = "<br /><br />It's easy to accredit the great success of Proposition 1 to the leadership of Jerry Brown in cutting down the proposition to an amenable size for fiscal conservatives without compromising its appeal to liberals, but one cannot help but wonder if the proposition would have achieved its heights if California were not in a drought. 2014 in the 2011-2017 California drought is seen as the nadir of the entire ordeal, with the NOAA declaring it 'the worst drought year in 1200 years'. Mandatory water restrictions were imposed, and many areas were closed to fishing due to the danger of extinction. Unlike many political issues, the problem of water had immediacy and universal impact.";
			var part4 = "<br />Indeed, it was likely a combination of the two; the extensive revision and review of the proposition by the state legislature, and the fortunate (unfortunate?) timing of the drought's most harsh period to create population-wide concern. Proposition 3 in 2018 had neither of these luxuries, thus sealing its fate.";
			var part5 = "<br /><br /><b>From 2014 to 2018</b><br />Santa Clara County went from 74.8% approving of Proposition 1 in 2014 to only 53% approving of Proposition 3 in 2018, a 21.8% difference; San Diego County dropped from 68.6% to 49.0. Meanwhile, Sierra County, which already disapproved of Proposition 1, only saw their approval drop by 9.1% for Proposition 3.";
			var part6 = " Fresno, which approved of Proposition 1 by a massive 76.2% and housed a U.S. Representative who endorsed Proposition 3, only managed to get 53.6% approval.";
			var part7 = "<br />An outlier of note is Glenn County, which saw a 71.3% Proposition 1 approval rate drop to 40.6%; a 30.6% drop, the biggest out of all the counties. This was <i>despite</i> the Glenn Groundwater Authority endorsing the proposition.";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5 + part6 + part7;
			break;*/
		case gov2018:
			var part1 = "<b>2018 California Governor Election: John H. Cox vs. Gavin Newsom</b><br />In 2018, Gavin Newsom decisively defeated his opponent John H. Cox, who conceded defeat before the official results were in. The final tally was 61.9% to Cox's 38.1%, the largest margin since Earl Warren won in 1950 and the first time that California will be governed by three Democrats in a row.";
			var part2 = "<br />Cox received endorsements from President Donald Trump, while former President Barack Obama endorsed Newsom. Across the board, Cox reflects common American conservative beliefs; opposition of single payer healthcare, support of the Southern border wall, and fiscal conservatism. He believes that environmental regulations have driven up the cost of living, and made the repeal of the gas tax an important part of his campaign image.";
			var part3 = "<br />Gavin Newsom has been a progressive leaderhead for decades, since his time as the Mayor of San Francisco in 2004-2010. While Cox ran on repealing the gas tax, Newsom ran on a platform of universal healthcare, declaring that 'we will have universal healthcare in the state of California'. He also supports the high-speed rail, famously clapping back against Donald Trump when the President claimed that it was 'going nowhere'.";
			var part4 = "<br /><br />There was basically no chance at all of John Cox winning. Cox suffered from extreme name unrecognition, having held no political office whatsoever; only a string of unsuccessful campaigns in Illinois. Every single prediction put it as either 'Safe Democratic' or 'Solid Democratic', and Cox received no high-profile endorsements from any politician or publication aside from Trump. Meanwhile, many new voters who had known Gavin Newsom for years, whose liberal identity had been shaped by watching him rise through the California government, finally had the chance to vote for him. I was one of these voters, and it was a moment of California pride.";
			var part5 = "<br />Thus, Gavin Newsom's remarkable victory was a result of both Gavin Newsom's meteoric recognition throughout the state, and John Cox's complete lack of clout.";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5;
			break;
		case house2018:
			var part1 = "<b>California House of Representatives  - 2018 Election</b>";
			var part2 = "<br />In 2018, every single seat in the House of Representatives was up for election. There were 435 contending positions, and if the Democrats could gain 23 seats, they could gain the majority and end the Republican trifecta of House, Senate, and Presidency.";
			var part3 = "<br />These were good odds; in the last 100 years, the President's party has lost an average of 29 seats in the midterms, placing a Democratic majority well within their reach. Ultimately, Democrats gained 40 seats, outgunning the margin of majority by 17 seats, and electing the youngest Congress ever seen.";
			var part4 = "<br />California contributed to 7 of these Democratic gains, in the 10th, 21st, 25th, 39th, 45th, 48th, and 49th Districts. Most of these victories were very close; the farthest one was in the 49th District, where Mike Levin beat Diane Harkey with 56.4% of the vote. New Democratic challengers were able to beat incumbents in five of these districts. In the 10th district, TJ Cox won by a mere 50.4% of the vote, following David G. Valadao, a 6-year incumbent who had beaten three Democratic challengers before in the 2012, 2014, and 2016 elections.";
			var part5 = "<br />Despite the closeness of the Democratic victories, Republicans were left with their fewest California seats since 1946";
			var part6 = "<br />Compared to the 2016 elections, the 2018 House election had far less participation (expected when comparing a midterm election to a Presidential election), but while there were 978,587 less votes cast for Republicans, there were only 220,964 less votes cast for Democrats. Looking at the Democratic seat gains actually paints a skewed image of the victory; youth activism brought the coast districts massive leaps in the number of Democrat votes, with the South Bay being a particular location of interest. Meanwhile, other places in the Bay (districts 13 and 14) saw Republican staying power.";
			this._div.innerHTML = part1 + part2 + part3 + part4 + part5 + part6;
			break;
		case house2016:
			var part1 = "<b>California House of Representatives - 2016 Election</b>";
			var part2 = "<br />The 2016 House Election, following the disaster of the 2014 House election, was not expected to remedy its faults. It would take 30 seats to regain control of the House; Democrats gained a mere six, barely making a dent on the Republican house majority.";
			var part3 = "<br />Across the nation, 380 of the 393 incumbents seeking reelection were victorious; an astonishing 96.7% incumbent reelection rate, far higher than the usual 37.1%. This stagnancy is also seen in the California results; not a single seat changed parties.";
			var part4 = "<br /><br />Frustration with existing Democratic leadership led to increased activism; mostly seen in the 2018 election, but some of it can be seen here. In the 17th district, incumbent Mike Honda was defeated by newcomer Ro Khanna, one of only ten Congress members who refuses all money from PACs. Recently, he was named a co-chair of Bernie Sanders' 2020 presidential campaign.";
			this._div.innerHTML = part1 + part2 + part3 + part4;
			break;
		case populationChange:
			var part1 = "<b>California Population Trends from 2010 to 2017</b>";
			var part2 = "<br />California has had the highest population out of all the states since 1970, but its population growth is not evenly distributed. Many counties along the eastern border are actually seeing declining populations, while the Bay Area, the Capital Corridor, and the Los Angeles metropolitan area continue to grow.";
			var part3 = "<br />This growth rate has also been declining, however; a combination of slowed immigration, housing crises, and domestic migration (also known as white flight) have tempered it to nearly the level of the national average growth rate.";
			var part4 = "<br />There are suspicions that 2020 could be the peak year for California's population. From this arises the issue of house seats; 2020 is a census year, and congressional districts are restructured based on census data. If our current trends continue, California could drop to 52 seats instead of 53, further weakening Democratic power in the House of Representatives.";
			this._div.innerHTML = part1 + part2 + part3 + part4;
			break;
		case compLayer:
			var part1 = "<b>Comparison from </b>" + layersSelected[0].getName() + "<b> to </b>" + layersSelected[1].getName() + "<br /> ";
			var part2 = "<br /><b>" + layersSelected[0].getName() + " Statewide Votes: </b>" + layersSelected[0].getYesString() + layersSelected[0].getStatewideYesV() + " (" + layersSelected[0].getStatewideYesP() + "%) " + layersSelected[0].getNoString() + layersSelected[0].getStatewideNoV() + " (" + layersSelected[0].getStatewideNoP() + "%)";
			var part3 = "<br /><b>" + layersSelected[1].getName() + " Statewide Votes: </b>" + layersSelected[1].getYesString() + layersSelected[1].getStatewideYesV() + " (" + layersSelected[1].getStatewideYesP() + "%) " + layersSelected[1].getNoString() + layersSelected[1].getStatewideNoV() + " (" + layersSelected[1].getStatewideNoP() + "%)";
			this._div.innerHTML = part1 + part2 + part3;
			break;
		//Otherwise, there is no layer currently displayed; this should not be possible!
		default:
			this._div.innerHTML = "No layer currently displayed!";
	}
}

//Function that erases the this._div.innerHTML text
legend.undo = function(){
	this._div.innerHTML = "";
}
legend.addTo(map);

//Creates a text box that displays the two currently selected layers.
var selection = L.control({position: 'topleft'});
selection.onAdd = function (map){
	this._div = L.DomUtil.create('div', 'selection box'),
	this._div.innerHTML = "No layers currently selected.";
	return this._div;
};
selection.update = function(newLayer){
	if(!newLayer){
		this._div.innerHTML = "No layers currently selected.";
	}
	if(layersSelected[0]==null){
		layersSelected[0] = newLayer;
	} else {
		if(layersSelected[1]!=null){
			layersSelected[0] = layersSelected[1];
		}
		layersSelected[1] = newLayer;
	}
	this._div.innerHTML = "<b>Layers currently selected:</b><br />" + layersSelected[0].getName() + "<br />" + layersSelected[1].getName() + " ";
}
selection.addTo(map);

/*L.easyButton('<big>Proposition 1 - 2014</big>', function(btn, map){
	if(currentLayer!=prop12014){
		currentLayer.setHidden();
		currentLayer = prop12014;
		prop12014.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);*/

//Button for executing legend.undo();
L.easyButton('<tiny>Erase layer information text</small>', function(btn, map){
	legend.undo();
}).addTo(map);

//Button that parses the two layers in layersSelected and creates a comparison layer between them
L.easyButton('<small>Generate Comparison Layer from selected layers</small>', function(btn, map){
	if(layersSelected[0]!=layersSelected[1]){
		if(layersSelected[0].getTerrainType()!=layersSelected[1].getTerrainType()){
			alert("Must select two layers of the same feature type (counties, congressional districts)");
			return;
		}
		changeYV = changeArray(layersSelected[0].getYesVotes(), layersSelected[1].getYesVotes());
		changeYP = changeArray(layersSelected[0].getYesPercents(), layersSelected[1].getYesPercents());
		changeNV = changeArray(layersSelected[0].getNoVotes(), layersSelected[1].getNoVotes());
		changeNP = changeArray(layersSelected[0].getNoPercents(), layersSelected[1].getNoPercents());
		var layerName = "Comparison from " + layersSelected[0].getName() + " to " + layersSelected[1].getName() + " ";
		compLayer = new voteLayer(layersSelected[0].getYear(), changeYV, changeYP, changeNV, changeNP, layersSelected[0].getVoteType(), "comparison", layersSelected[0].getTerrainType(), layerName);
		currentLayer = compLayer;
		compLayer.displayLayer();
		legend.update();
	} else {
		alert("Must select two different layers for comparison.");
	}
}).addTo(map);

//Various buttons of map layers added to map
L.easyButton('<small>Presidential Election - 2016</small>', function(btn, map){
	if(currentLayer!=pres2016){
		currentLayer.setHidden();
		currentLayer = pres2016;
		pres2016.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Senate Election - 2016</small>', function(btn, map){
	if(currentLayer!=senate2016){
		currentLayer.setHidden();
		currentLayer = senate2016;
		senate2016.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Voter Registration Data - 2016</small>', function(btn, map){
	if(currentLayer!=registration2016){
		currentLayer.setHidden();
		currentLayer = registration2016;
		registration2016.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>House Election - 2016</small>', function(btn, map){
	if(currentLayer!=house2016){
		currentLayer.setHidden();
		currentLayer = house2016;
		house2016.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<big>The Present - 2018 Election</big>', function(btn, map){
	if(currentLayer!=house2018){
		currentLayer.setHidden();
		currentLayer = house2018;
		house2018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Senate Election - 2018</small>', function(btn, map){
	if(currentLayer!=senate2018){
		currentLayer.setHidden();
		currentLayer = senate2018;
		senate2018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>House Election - 2018</small>', function(btn, map){
	if(currentLayer!=house2018){
		currentLayer.setHidden();
		currentLayer = house2018;
		house2018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Governor Election - 2018</small>', function(btn, map){
	if(currentLayer!=gov2018){
		currentLayer.setHidden();
		currentLayer = gov2018;
		gov2018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Proposition 3 - 2018</small>', function(btn, map){
	if(currentLayer!=prop32018){
		currentLayer.setHidden();
		currentLayer = prop32018;
		prop32018.displayLayer();
		legend.update();
		selection.update(currentLayer);
		supporters.forEach(function(element) {
			element.addTo(map);
		});
		displayingSupporters = true;
		opponents.forEach(function(element) {
			element.addTo(map);
		});
		displayingOpponents = true;
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Proposition 6 - 2018</small>', function(btn, map){
	if(currentLayer!=prop62018){
		currentLayer.setHidden();
		currentLayer = prop62018;
		prop62018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Proposition 10 - 2018</small>', function(btn, map){
	if(currentLayer!=prop102018){
		currentLayer.setHidden();
		currentLayer = prop102018;
		prop102018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Population Change from 2010 - 2017</small>', function(btn, map){
	if(currentLayer!=populationChange){
		currentLayer.setHidden();
		currentLayer = populationChange;
		populationChange.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Voter Registration Data - 2018</small>', function(btn, map){
	if(currentLayer!=registration2018){
		currentLayer.setHidden();
		currentLayer = registration2018;
		registration2018.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<big>The Future - 2020 Election</big>', function(btn, map){
	if(currentLayer!=registration2019){
		currentLayer.setHidden();
		currentLayer = registration2019;
		registration2019.displayLayer();
		legend.update();
		selection.update(currentLayer);
	} else {
		return;
	}
}).addTo(map);

L.easyButton('<small>Unselect all layers</small>', function(btn, map){
	layersSelected[1] = null;
	layersSelected[0] = null;
	selection.update();
}).addTo(map);