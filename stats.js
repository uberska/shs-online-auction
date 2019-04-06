const fs = require('fs');

const bidders = JSON.parse(fs.readFileSync('./bidders.json', 'utf8'));
const multipliers = JSON.parse(fs.readFileSync('./multipliers.json', 'utf8'));

const items = Object.keys(bidders);
items.sort();

console.log(items);
console.log(">>>>> ITEMS");
items.forEach(item => { console.log(item); });


const itemToNumTotalBids = {};
let totalBidCount = 0;
Object.entries(bidders).forEach(([item, bidArray]) => {
	itemToNumTotalBids[item] = bidArray.length;
	totalBidCount += bidArray.length;
});
console.log('itemToNumTotalBids');
console.log(itemToNumTotalBids);

console.log(">>>>> TOTALBIDS");
items.forEach(item => { console.log(itemToNumTotalBids[item]); });




console.log('totalBidCount');
console.log(totalBidCount);




const itemToNumUniqueBids = {};
Object.entries(bidders).forEach(([item, bidArray]) => {
	itemToNumUniqueBids[item] = new Set(bidArray).size;
});
console.log('itemToNumUniqueBids');
console.log(itemToNumUniqueBids);

console.log(">>>>> UNIQUEBIDS");
items.forEach(item => { console.log(itemToNumUniqueBids[item]); });

const personToNumBids = {};
Object.values(bidders).forEach(bidderArray => {
	bidderArray.forEach(bidder => {
		if (personToNumBids[bidder] === undefined) {
			personToNumBids[bidder] = 0;
		}

		personToNumBids[bidder] = personToNumBids[bidder] + 1;
	});
});
console.log('personToNumBids');
console.log(personToNumBids);
const persons = Object.keys(personToNumBids);
persons.sort();
console.log(">>>>> PERSONS");
persons.forEach(person => { console.log(person); });
console.log(">>>>> PERSONS BID COUNT");
persons.forEach(person => { console.log(personToNumBids[person]); });



const numBidders = Object.keys(personToNumBids).length;
console.log('numBidders');
console.log(numBidders);


let raffleNames = [];
Object.entries(bidders).forEach(([item, bidArray]) => {
	const multiplier = multipliers[item] || 1;
	for (let index = 0; index < multiplier; index++) {
		raffleNames = raffleNames.concat(bidArray);
	}
});
console.log(`raffleNames (total ${raffleNames.length})`);
raffleNames.forEach(name => { console.log(name); });
