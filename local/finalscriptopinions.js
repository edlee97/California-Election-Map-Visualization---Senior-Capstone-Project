//Create the markers for the supporters; the ones clustered around Sacramento are the government officials who don't represent a specific area
/*var supporterString = "<b>US Senator Dianne Feinstein<br />Superintendent of Public Instruction Tony Thurmond<br />Gubernatorial Candidate John Cox<br />Treasurer Fiona Ma<br />Former Treasurer Phil Angelides<br />California State Senator Toni Atkins</b><br /><i>Endorsed Proposition 3</i>";
var supporterMarker = L.marker([38.57, -121.48]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>Congressman Jim Costa</b><br /><i>Endorsed Proposition 3</i>";
var supporterMarker = L.marker([36.80, -119.57]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>Congressman John Garamendi</b><br /><i>Endorsed Proposition 3</i>";
var supporterMarker = L.marker([39.22, -121.77]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>The California Labor Federation</b><br /><i>Endorsed Proposition 3</i>";
var supporterMarker = L.marker([37.75, -122.47]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>The California Wildlife Foundation</b><br /><i>Endorsed Proposition 3</i>";
var supporterMarker = L.marker([37.77, -122.22]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

//If the supporter has a written statement, add it as well as a source
var supporterString = "<b>Californians for Safe Drinking Water and a Clean and Reliable Water Supply in Support of Proposition 3</b><br /><i>Raised $4,895,534.66 in support of Proposition 3</i>";
var supporterMarker = L.marker([38.57, -121.40]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>The Bakersfield Californian</b><br /><i>'Proposition 3 is a citizen’s initiative bond to continue the investments in the state’s water supply and water quality. Remarkably, in this partisan environment, valley support for this $8.9 billion bond initiative is crossing party lines. Money from the sale of the bonds will be spent on many critical valley water projects and to provide clean drinking water in communities that now have unsafe water.'<br />https://www.bakersfield.com/opinion/our-view-we-recommend-fix-our-roads-deliver-clean-abundant/article_9b7aca0a-c1f5-11e8-8f8d-3b251413f381.html</i>";
var supporterMarker = L.marker([35.34, -119.06]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

var supporterString = "<b>The Fresno Bee</b><br /><i>'Certainly there is no more complicated topic in California than water. Prudent voters should take time to study the proposition.The Bee strongly recommends approval because of how Proposition 3 would directly benefit the Valley.'<br />https://www.fresnobee.com/opinion/editorials/article217097890.html</i>";
var supporterMarker = L.marker([36.74, -119.81]).addTo(map).bindPopup(supporterString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
supporters.push(supporterMarker);

//Add the opponents markers to the map; again, if there is a specific statement, print it and add the source
var opponentString = "<b>The Los Angeles Times</b><br /><i>'Many of those projects are important components of the state’s complex water capture, storage and delivery network. Eventually they will have to be built, which means someone will have to pay for them.<br />But like many California water schemes, Proposition 3 is not merely a request for money, but an effort to force taxpayers all across the state to pay costs that ought to be borne by the private or regional interests that will benefit. That kind of cost-shifting isn’t always easy to spot in a bond measure. In this case it is.<br />https://www.latimes.com/opinion/endorsements/la-ed-proposition-3-water-20181012-story.html</i>";
var opponentMarker = L.marker([33.96, -118.16], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The Marin Independent Journal</b><br /><i>'The proposition is largely funded by organizations — nonprofit and corporate and large and small — that want taxpayers’ dollars to pay for their projects. These are priorities that should be culled by lawmakers, not by those paying to get the signatures needed to get the bond measure on the ballot and then running a multi-million-dollar campaign for it. This measure has strong local support, but we don’t think this is the right way to further their plans.'<br />https://www.marinij.com/2018/10/17/editorial-ijs-recommendations-on-state-propositions/</i>";
var opponentMarker = L.marker([38.07, -122.68], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The San Francisco Chronicle</b><br /><i>'This scheme was devised as an initiative that is being funded, in part, by individuals and entities that are going to be receiving a share of the bond money.'<br />https://www.sfchronicle.com/opinion/article/Chronicle-recommendations-for-Califonia-s-13285873.php</i>";
var opponentMarker = L.marker([37.82, -122.41], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The Santa Cruz Sentinel</b><br /><i>'But, unlike the bond approved in June, which was placed on the ballot by state lawmakers in part to discourage outside groups from asking voters for even more money in November, with Proposition 3 which did not go through the legislative process, that’s exactly what has happened.'<br />https://www.santacruzsentinel.com/2018/09/18/editorial-vote-no-on-water-bond-prop-3-yes-on-prop-4-childrens-hospitals/</i>";
var opponentMarker = L.marker([36.98, -122.02], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The San Jose Mercury News</b><br /><i>'Proposition 3 is a classic “pay-to-play” initiative that California voters should soundly defeat on Nov. 6. The $8.9 billion water bond package points to some serious water issues that demand the Legislature’s attention. But loading up an initiative with giveaways to special interests and local public agencies is no way for the state to conduct its business.'<br />https://www.mercurynews.com/2018/09/19/editorial-reject-prop-3-8-9-billion-pay-to-play-water-bond/</i>";
var opponentMarker = L.marker([37.34, -121.94], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The Orange County Register</b><br /><i>'Proposition 68, a $4 billion bond, at least went through a legislative process. In contrast, Prop. 3 is a product of special interests, seeking to take advantage of Californians’ apparent willingness to consistently vote for water bonds.'<br />https://www.ocregister.com/2018/09/20/no-on-proposition-3-another-water-bond/</i>";
var opponentMarker = L.marker([37.34, -121.94], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The Sacramento Bee</b><br /><i>'The measure promises money for quite a few local agencies, nonprofits, private water companies and others, which is great for them. It’s not clear, however, that these are the projects that California needs most right now, or that they couldn’t get the money elsewhere.'<br />https://www.sfchronicle.com/opinion/article/Chronicle-recommendations-for-Califonia-s-13285873.php</i>";
var opponentMarker = L.marker([38.67, -121.32], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The San Diego Union-Tribune</b><br /><i>'Passing a third water bond in just four years feels like throwing money at a problem. Given the poor condition of water infrastructure in California, it might be justifiable. But that only holds for a bond that was crafted in an impartial way by lawmakers or citizen committees — not by groups that would benefit from it.'<br />https://www.sandiegouniontribune.com/opinion/endorsements/sd-proposition-3-water-bond-20180911-story.html</i>";
var opponentMarker = L.marker([32.96, -117.19], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The San Luis Obispo Tribune</b><br /><i>'This would be the largest water bond in state history, and while it would be a boon for the Central Valley and other pockets of California, there’s not that much in it for the rest of us.'<br />https://www.sanluisobispo.com/opinion/editorials/article220546125.html</i>";
var opponentMarker = L.marker([32.96, -117.19], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);

var opponentString = "<b>The Sierra Club</b><br /><i>Opposed Proposition 3</i>";
var opponentMarker = L.marker([37.80, -122.23], {rotationAngle: 180}).addTo(map).bindPopup(opponentString).on('mouseover', function (e) {
    this.openPopup();
}).on('mouseout', function(ev) {
	map.closePopup();
});
opponents.push(opponentMarker);*/