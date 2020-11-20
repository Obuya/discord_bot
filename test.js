const jsonfile = require('jsonfile');
const fs = require('fs');

var stats = {};
stats = jsonfile.readFileSync('stats.json');








//console.log(stats);









//Comparer Function  
function GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  
  //console.log(array);
stats.sort(GetSortOrder("level")); //Pass the attribute to be sorted on  
console.log("Sorted user level : ");  
for (var guild in stats) {
    

    for(var person in stats[guild]){

        console.log("<br>" + stats[guild][person].xp);
    }
    
}  
  
//array.sort(GetSortOrder("messages_sent")); //Pass the attribute to be sorted on  
console.log("<br><br> sorted messages sent: ");  
//for (var item in array) {  
//    console.log("<br>" + array[item].messages_sent);  
//} 