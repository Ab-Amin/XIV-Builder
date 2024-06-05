// xivapi private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0

// fetch("https://xivapi.com/item/1675?columns=ID,Name,Description,Lv,LevelItem,ClassJobCategory.Name&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(console.info(data));
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

// =-=-=-=-=| XIVAPI : charachters |=-=-=-=-=

// fetch("https://xivapi.com/character/search?name=Nima+Min&server=Twintania&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(console.info(data));
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

// fetch("https://xivapi.com/character/36077235&private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0", { mode: 'cors' })
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(console.info(data));
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// https://docs.google.com/spreadsheets/d/1KtWCELA7ggvYXYumxIib-n3ZbD1UKlnaXyQiy-6LiTI/edit?usp=sharing


//! =-=-=-=-=| Variables |=-=-=-=-=
import * as gearName from './numberToName.js'

// html variables
const searchResults = document.querySelector('.search-results');

//* div in the job selector window
const tankDiv = document.querySelector('.tanks');
const healerDiv = document.querySelector('.healers');
const meleDiv = document.querySelector('.meles');
const phyDiv = document.querySelector('.phys');
const mageDiv = document.querySelector('.mages');

const mainJobLogo = document.querySelector('.job-change')

const profile = document.querySelector('.profile');

const gearGrid = document.querySelector('.gear-grid')
let gearWindow = document.querySelector('.search-window')
const gearWindowX = document.querySelector('.search-window--x')

const jobSelector = document.querySelector('.job-selector') 
const jobSelectorBG = document.querySelector('.dark-bg')
const jobSelectorX = document.querySelector('.job-selector--x')

//! =-=-=-=-=| lists |=-=-=-=-=
let itemData = [];


//! =-=-=-=-=| CSV fetch |=-=-=-=-=
fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv')
  .then(response => response.text())
  .then(csvData => {
    // Parse the CSV data into an array of arrays
    const rows = csvData.split('\n');
    const data = rows.map(row => row.split(','));

    // console.log(data);

    // todo : link itemName with a search bar (addEventListener)

    // todo : add condition that if contains a part of the full name, will show every gear that contains that part of the word
    // example : Allegiance set (head, body, hand, etc) => gear exclusif to gnb, 
    // if i only write 'allegiance', should display every gear that contains the  word 'allegiance' 

    const itemName = `"Augmented Shire Longbow"`;

    for (let i = 0; i < data.length; i++) {

      // data[i][1] : to skip any undefined or null values
      // .toLowerCase() to make comparisons case-insensitive
      // .includes to check if one string is contained within another
      if (data[i][10] && data[i][10].toLowerCase().includes(itemName.toLowerCase())) {
        itemData.push({ 
          dataInfo : {
            itemId : data[i][0],
            row: i, 
            column: 0,
          },
          "singularName" : data[i][gearName.SingItemName],
          // "iconcode" : data[i][icon],
          // "levelReq" : data[i][levelReq],
          // "itemLevel" : data[i][itemLevel],
          "className" : data[i][44],
          "gearType" : data[i][18],
        });
        // console.log(data[i]);
      }
    }
    console.log(itemData);




    //! =-=-=| search bar |=-=-=
    // todo : log every item name to put them in a "search bar"
    // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
    // for (let i = 0; i < array.length; i++) {
      // console.log(data[i][SingItemName]);
    // }



    //! =-=-=| search results |=-=-=
    // for (let i = 0; i < data.length; i++) {
    
    // condition #1 : get job taken and add it as a conition for gears to appear
    // condition #2 : get data-geartype and same

    //   // if the item has a name (not undefined or null) & is equipable (item need to be between lvl 1 and 90)
    //   if (data[i][SingItemName]) {
    //     if (1 < data[i][levelReq] < 90) {

    //       searchResults.innerHTML += `
    //       <div class="item">
    //         <div>
    //           <img src="https://lds-img.finalfantasyxiv.com/itemicon/66/665f0061dcd3853e6d3ccf315b7629ac8d0fdf32.png?n6.58" alt="">
    //         </div>
    //         <div>
    //           <span>${data[i][SingItemName]}</span>
    //           <span>lvl ${data[i][levelReq]}, Ilvl ${data[i][itemLevel]}</span>
    //           <div class="bonuses">
    //             <span>${data[i][44]}</span>
    //             <hr>
    //             <div class="stats">
    //               <p><span>dexterity</span> +98</p>
    //               <p><span>critical hit</span> +96</p>
    //               <p><span>vitality</span> +103</p>
    //               <p><span>determination</span> +67</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       `

    //     }
    //   }
    // }


}).catch(err => console.error('Error fetching CSV:', err));


//! =-=-=-=-=| my .json file |=-=-=-=-=
fetch("info.json")
	.then(response => response.json())
	.then(data => {
    console.log(data);

    //* dans div 'tank'
    for (let i = 0; i < data.jobInfo[0].tanks.length; i++) {
      
      tankDiv.innerHTML += `
      <div class="job ${data.jobInfo[0].tanks[i].shortname}" data-job="${data.jobInfo[0].tanks[i].CSVcode}">
        <div class="job-icon">
          <img src="${data.jobInfo[0].tanks[i].jobicon}" alt="">
        </div>
        <div class="job-name">${data.jobInfo[0].tanks[i].fullname}</div>
      </div>
      `
    }

    //* dans div "healer"
    for (let i = 0; i < data.jobInfo[1].healers.length; i++) {
      
      healerDiv.innerHTML += `
      <div class="job ${data.jobInfo[1].healers[i].shortname}" data-job="${data.jobInfo[1].healers[i].CSVcode}">
        <div class="job-icon">
          <img src="${data.jobInfo[1].healers[i].jobicon}" alt="">
        </div>
        <div class="job-name">${data.jobInfo[1].healers[i].fullname}</div>
      </div>
      `
    }

    //* dans div "mele"
    for (let i = 0; i < data.jobInfo[2].meles.length; i++) {
      
      meleDiv.innerHTML += `
      <div class="job ${data.jobInfo[2].meles[i].shortname}" data-job="${data.jobInfo[2].meles[i].CSVcode}">
        <div class="job-icon">
          <img src="${data.jobInfo[2].meles[i].jobicon}" alt="">
        </div>
        <div class="job-name">${data.jobInfo[2].meles[i].fullname}</div>
      </div>
      `
    }

    //* dans div "ranged"
    for (let i = 0; i < data.jobInfo[3].phys.length; i++) {
      
      phyDiv.innerHTML += `
      <div class="job ${data.jobInfo[3].phys[i].shortname}" data-job="${data.jobInfo[3].phys[i].CSVcode}">
        <div class="job-icon">
          <img src="${data.jobInfo[3].phys[i].jobicon}" alt="">
        </div>
        <div class="job-name">${data.jobInfo[3].phys[i].fullname}</div>
      </div>
      `
    }

    // dans div "mage"
    for (let i = 0; i < data.jobInfo[4].mages.length; i++) {
      
      mageDiv.innerHTML += `
      <div class="job ${data.jobInfo[4].mages[i].shortname}" data-job="${data.jobInfo[4].mages[i].CSVcode}">
        <div class="job-icon">
          <img src="${data.jobInfo[4].mages[i].jobicon}" alt="">
        </div>
        <div class="job-name">${data.jobInfo[4].mages[i].fullname}</div>
      </div>
      `
    }


    
    //! =-=-=-=-=| Job Selector |=-=-=-=-=-=
    // todo : take job selected into profile 

    //? GPT : Flatten the Array: Since your array contains objects that further contain arrays of job information, you need to flatten this structure to easily search through it. 
    //? --> flatMap(...)

    function findJobByCSVcode(code) {
      // Flatten the arrays inside jobInfo
      const allJobs = data.jobInfo.flatMap(category => {
        // Flatten each category's job array
        return Object.values(category).flat();
      });
      console.log(allJobs);
    
      // Find the job with the matching CSVcode
      const job = allJobs.find(job => job.CSVcode === code);

      console.log(job);

      // Return the job name if found, otherwise return a not found message
      return (job ? job.jobicon : 'Job not found')
    }


    jobSelector.addEventListener('click', e => {

      if (e.target.closest('.job').hasAttribute('data-job')){
    
        let datajob = e.target.closest('.job').getAttribute('data-job')
        // console.log(typeOf(datajob));

        const jobIcon = findJobByCSVcode(Number(datajob));
        // console.log(jobIcon);

        document.querySelector('.profile-job').innerHTML=`
        <div
          class="job-change gear-box" 
          style="background: url('${jobIcon}') center/cover" 
          data-job="${datajob}"
          data-effect="gear-box--anim" 
          >
        </div>
        `
      }
    })

  })
  .catch(error => {console.log("Erreur lors de la récup des données :", error);
})




//! =-=-=-=-=| Gear window popup |=-=-=-=-=

function openGearWindow() {
  gearWindow.classList.remove('gear-window-pop-reverse');
  gearWindow.classList.add('gear-window-pop')
}
function closeGearWindow() {
  gearWindow.classList.remove('gear-window-pop')
  gearWindow.classList.add('gear-window-pop-reverse');
}

function openJobSelector() {
  jobSelectorBG.classList.remove('hidden');
}
function closeJobSelector() {
  jobSelectorBG.classList.add('hidden');
}


//* closing popup when clicking outside of it
function outsideClickClose(windowName, closingWingowButton) {
  document.addEventListener('click', function(e) {

    //* if target is not in the popupwindow and click is not the closing button of popup
    if (!windowName.contains(e.target) && e.target !== closingWingowButton) {

      //* kept closing even when not opened, so added condition to only close when it has the class that make it open 
      if (windowName.classList.contains('gear-window-pop')){
        closeGearWindow()
      }

      closeJobSelector()
    }
  });
}

gearGrid.addEventListener('click', e => {
  if (e.target.classList.contains('gear-box')) {

    //* Stop event propagation to prevent the document click listener from being immediately triggered
    e.stopPropagation();
    openGearWindow()
  }
})
outsideClickClose(gearWindow, gearWindowX)
gearWindowX.addEventListener('click', closeGearWindow)


// todo : add way to store name of job clicked before it closes
profile.addEventListener('click', e => {
  // todo : if clicked on a 'job' => takes name of job and then closes

  if (e.target.classList.contains('job-change')) {
    e.stopPropagation();
    openJobSelector()
  }
})
outsideClickClose(jobSelectorBG, jobSelectorX)

jobSelectorX.addEventListener('click', closeJobSelector)
