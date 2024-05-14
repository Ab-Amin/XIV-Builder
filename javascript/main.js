// fetch(`https://api.rawg.io/api/games?key=09715d2ec4fa4c6cb8fc1d6196daaa30`)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

// private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0

// fetch("https://xivapi.com/item/1675?columns=ID,Name,Description,Lv,LevelItem,ClassJobCategory.Name&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(console.info(data));
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

fetch("https://xivapi.com/character/search?name=Nima+Min&server=Twintania&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
	.then(response => response.json())
	.then(data => {
    console.log(console.info(data));
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
})

fetch("https://xivapi.com/character/36077235&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
	.then(response => response.json())
	.then(data => {
    console.log(console.info(data));
  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
})


// =-=-=| Variables :
const itemId = 0;
const SingItemName = 10;
const itemLevel = 12;
const levelReq = 41;

// todo : translate icon code into images
const icon = 11;

// todo : gear category => translate num into class name 



// =-=-=| CSV fetch :
fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data into an array of arrays
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));

    // Print the parsed data to the console
    console.log(data);

    // Search for "item" in the entire CSV data
    // ex :
    // Panthean Wimple of Scouting
    // dated bronze spatha
    // dated sheepskin calot
    
    // todo : link itemName with a search bar (addEventListener) 
    // todo : add condition that if contains a part of the full name, will show every gear that contains it

    const itemName = '"ascension turban of healing"';
    let itemData = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i][1] === itemName) {
        itemData.push({ 
          dataInfo : {
            itemId : data[i][0],
            row: i, 
            column: 0, 
          },
          "singularName" : data[i][SingItemName],
          "iconcode" : data[i][icon],
          "levelReq" : data[i][levelReq],
          "itemLevel" : data[i][itemLevel],
          "gearCategory" : data[i][18],
        });
      }
    }

    // test data
    // console.log(data[53429]);


    // =-=-=| search bar
    // todo : log every item name to put them in a "search bar"
    // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
    // for (let i = 0; i < array.length; i++) {
      // console.log(data[i][SingItemName]);
    // }

    // forgot what i wanted to do ._. ...
    console.log(itemData);
    let rowNum = itemData.findIndex(item => item.singularName === itemName);
    // console.log(itemData[rowNum].dataPosition.row);
    // console.log(rowNum);

  })
.catch(err => console.error('Error fetching CSV:', err));











