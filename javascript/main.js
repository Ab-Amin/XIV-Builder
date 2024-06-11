// xivapi private_key=0be9dad833724e1ebab95b987f3c0166155d12ff1a2f4adc9ee0d7a5ddd9c4d0

//! Fetch test...

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
//     console.log(data);
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

// fetch("https://api.kalilistic.io/v1/lodestone/player?playerName=Nima%20Min&worldName=Twintania")
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(console.info(data));
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// todo : can save equiped set (by jobs) if logged in (firebase of smthing ?)


//! =-=-=-=-=| Variables |=-=-=-=-=
import * as gearVar from './numberToName.js'

// html variables

const tankDiv = document.querySelector('.tanks');
const healerDiv = document.querySelector('.healers');
const meleDiv = document.querySelector('.meles');
const phyDiv = document.querySelector('.phys');
const mageDiv = document.querySelector('.mages');

const mainJobLogo = document.querySelector('.job-change')

const profile = document.querySelector('.profile');

const jobSelector = document.querySelector('.job-selector') 
const jobSelectorBG = document.querySelector('.dark-bg')
const jobSelectorX = document.querySelector('.job-selector--x')

const gearGrid = document.querySelector('.gear-grid')
const gearWindow = document.querySelector('.search-window')
const gearWindowX = document.querySelector('.search-window--x')
const searchResults = document.querySelector('.search-results');

//! =-=-=-=-=| lists |=-=-=-=-=
let itemData = [];
let choosenJob = [];

let searchedGear = [];

//! =-=-=-=-=| my .json file |=-=-=-=-=

fetch("info.json")
.then(response => response.json())
.then(data => {
  // console.log(data);

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

  //* dans div "mage"
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

  //! Job Selector
  //? GPT : Flatten the Array: Since your array contains objects that further contain arrays of job information, you need to flatten this structure to easily search through it. 
  //? --> flatMap(...)

  //! Function that give info from my info.json based on CSVcode
  function findJobByCSVcode(code) {
    //- Flatten the arrays inside jobInfo
    const allJobs = data.jobInfo.flatMap(category => {
      //- Flatten each category's job array
      return Object.values(category).flat();
    })

    //- Find the job with the matching CSVcode
    const job = allJobs.find(job => job.CSVcode === code);

    //- Return an object with both names if found, otherwise return a not found message
    //- return (job ? job.jobicon : 'Job not found')
    if (job) {
      return {
        jobstone: job.jobstone,
        jobicon: job.jobicon,
        shortname: job.shortname,
        fullname: job.fullname
      };
    } else {
      return 'Job not found';
    }
  }

  //* When selection job --> will change profile + stone and short job name
  jobSelector.addEventListener('click', e => {

    //* 1st condition to avoid having an error when 'click' on empty zones (on popup)
    if (e.target.closest('.job').hasAttribute('data-job')){
      
      var datajob = e.target.closest('.job').getAttribute('data-job')
      const jobInfo = findJobByCSVcode(Number(datajob));

      console.log(`You choose ${jobInfo.shortname} (${datajob})`);

      if (Number(datajob)) {
        choosenJob.push({
          "choosenjob" : datajob,
        });
      }

      // console.log(jobIcon);

      document.querySelector('.profile-job').innerHTML= `
      <div
        class="job-change gear-box" 
        style="background: url('${jobInfo.jobicon}') center/cover" 
        data-job="${datajob}"
        data-effect="gear-box--anim" 
        >
      </div>
      `
      document.querySelector('.job-stone').innerHTML= `
        <img src="${jobInfo.jobstone}" alt="">
        <span data-jobname="${jobInfo.fullname}">${jobInfo.shortname}</span>
      `

    }

  })

})
.catch(error => {console.log("Erreur lors de la récup des données :", error)})



//! =-=-=|> ToDo Notes : (with 'better Comments' plugin on vsCode)
/* 
  ! For Pc Version
  todo : (idea) quand clique sur case d'equipemment -> lui donne "draggable" et a tout les equipement dans la search window
  todo : (idea) quand cloque off le search window, enlever toutes les classe draggeable

  ! --> Job Selector
  // todo : take job selected into profile 
  // todo : job selector popup when clicking on job-stone too
  todo : give warning if didn't save, will lose previous 'build' if no -> empty build, if yes -> save + change job
  todo : redo first fetch to display diff jobs and fuse with build save

  ! --> On Search
  todo : link itemName with a search bar (addEventListener)
  todo : able to search for gear name on search bar (even if only writting half the name)
  
  ! --> Gear to Display
  // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
  // todo : condition #1 : get job taken and add it as a condition for gears to appear
  // todo : condition #2 : get data-geartype
  // todo : display every gear that the job can equip, not only the specified one
  // todo ↑ for example : if job is PLD(20) find a way to also have the gear that have PLD in their value (like gla, PLD) to display too
  // todo : if job is paladin, switch equipslot from main hand (13) to main hand (1)
  // todo : translate icon codes into images with xiv icon api
  todo [shortened from ~10s to ~4s] : optimisation (don't display all items at once, only when is about to enter(scroll) the viewport add more item) 
  todo : add a loading while waiting for item to appear
  todo : if scrolling to the point of not seeing search bar => arrow 'back to top' apprears

  ! --> (test) to get accessories gear to appear on search window 
  // todo : Need to get the shortname of job with the number (should do with firstJsonData) 
  // todo : Then take the shortname and search through secondJsonData all the number that contains that shortname (ex : 23 -> DRG; 47 -> lnc, DRG)
  // todo : Return those number and innerHTML in clicked accessory gear all of the gear
  
  ! --> Gear Stats
  todo : find way to translate numbers to name and asign them to the right stats ... (BaseParam[0,1,2,3] -> BaseParamValue[0,1,2,3])
    - BaseParam[0, 1, 2, 3] (don't do 4 & 5 yet)
    - 1 = strength
    - 2 = dexterity
    - 3 = vitality
    - 4 = intelligence
    - 5 = mind
    - 6 = piety
    - 22 = direct hit rate
    - 27 = critical hit
    - 44 = determination
    - 45 = skill speed
    - 46 = spell speed
    - 184 = tenacity
  * more stats :
    -  62 = "BlockRate",
    -  63 = "Block",
    -  64 = "Defense{Phys}",
    -  65 = "Defense{Mag}",
    -  66 = "BaseParam[0]",
    -  67 = "BaseParamValue[0]",
    -  68 = "BaseParam[1]",
    -  69 = "BaseParamValue[1]",
    -  70 = "BaseParam[2]",
    -  71 = "BaseParamValue[2]",
    -  72 = "BaseParam[3]",
    -  73 = "BaseParamValue[3]",
    x  74 = "BaseParam[4]",
    x  75 = "BaseParamValue[4]",
    x  76 = "BaseParam[5]",
    x  77 = "BaseParamValue[5]" 
  
*/

//! On Job Change
// todo : redo first fetch to display diff jobs and fuse with build save
function onJobChange() {
  // too lazy for now 
  //-> if changes Job 
  //  -> offer to save current set (window with warning 'gear will del, do you want to save ? y/n)
  //    -> if (yes) 
  //      -> save (how ? idk yet ¯\_(ツ)_/¯, should learn firebase maybe)
  //    -> if (no)
  //      -> empty current equiped gear
  //      -> and equip the new job selected
}

//! Fetch and Main JavaScript
async function fetchData() {
  try {
    const [csvResponse, infoResponse, numberToNameResponse] = await Promise.all([
      fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv'),
      fetch('info.json'), // Example URL for second fetch
      fetch('numberToName.json')
    ]);

    //* csv response to text -> then split into rows and columns to convert the CSV ino a .json
    const csvText = await csvResponse.text();
    const rows = csvText.split('\n');
    const csvData = rows.map(row => row.split(','));

    const infoData = await infoResponse.json();
    const numberToNameData = await numberToNameResponse.json();

    return { csvData, infoData, numberToNameData }; // Return an object containing all data
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const { csvData, infoData, numberToNameData } = await fetchData();
  const gearGrid = document.querySelector('.gear-grid');
  const searchResults = document.querySelector('.search-results');

  let filteredData = [];
  let currentIndex = 0;
  const itemsPerBatch = 20;

  //! Getting All Number The Chosen Job Is A Part Of
  //* fullJobNbrList() -> Function that will return array of string number related to choosen job 
  //* (ex for 23 (aka DRG) --> ["23", "47", "84", "76"] (aka ["DRG", "lnc, DRG", "pgl lnc, MNK DRG SAM RPR", "lnc, DRG RPR"])
  function fullJobNbrList() { 

    function findJobShortname(jobNbr) {
      //- Flatten the arrays inside jobInfo
      const allJobs = infoData.jobInfo.flatMap(category => {
        //- Flatten each category's job array
        return Object.values(category).flat();
      })

      //- Find the job with the matching CSVcode
      const findJob = allJobs.find(job => job.CSVcode === jobNbr);

      //- Return an object with shortname
      if (findJob) {
        // console.log('Job name is : ' + findJob.shortname);
        return (findJob.shortname) 
      }
    } //* ex : will return for "23" (main job only) --> "DRG"

    //- numberToName.json list
    const numToName = numberToNameData.numToName[0];

    //- Function to find numbers that include shortname of job
    function findNumbersWithshortname(obj) {
      const result = [];
      for (const key in obj) {
        if (obj[key].includes( findJobShortname(Number(document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`))) )) {
          result.push(key);
        }
      }
      return result; 
    } //* ex : will return for DRG --> '["23", "47", "84", "76"]'   

    //- Use the function to get the numbers
    //* findNumbersWithshortname( secondJsonData.numToName[0] --> findJobShortname( findJobShortname( Job ) ) )
    return findNumbersWithshortname(numToName);
  }

  //! Item Icons (from XIVAPI) 
  //* link to icon is : https://xivapi.com/i/[folder_id]/[icon_id].png
  function iconFunction(iconNbr) {
    let icon_id = iconNbr
    let folder_id;

    //- first we need to add padding to the icon_id
    if (icon_id.length >= 6){
      // icon_id = pad(5, "0", pad_left)
      icon_id.padStart(5, "0")
    } else{
      // icon_id = '0' + pad(5, "0", pad_left)
      icon_id = '0' + icon_id.padStart(5, "0")
    }

    //- Now we can build the folder from the padded icon_id
    if (icon_id.length >= 6){
      // folder_id = icon_id[0] + icon_id[1] + icon_id[2] + '000'
      folder_id = icon_id[0] + icon_id[1] + icon_id[2] + '000'
    } else{
      // folder_id = 0 + icon_id[1] + icon_id[2] + '000'
      folder_id = 0 + icon_id[1] + icon_id[2] + '000'
    }

    return `${folder_id}/${icon_id}`
  }

  gearGrid.addEventListener('click', e => {

    let gearType = e.target.closest('.gear-box').getAttribute('data-geartype');
    let gearType1 = e.target.closest('.gear-box').getAttribute('data-geartype1')
    const Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)

    //* Will display gear if has selected a job and has clicked on a gear slot
    if (Job && gearType || gearType1) {

      searchResults.innerHTML = ''; // Reset
      currentIndex = 0;
      // console.log(Job);

      if (gearType1 && fullJobNbrList().includes(('20')) ) {
        //* Condition only for PLD's main weapon (since his main-hand number is 1 instead of 13 like everyone else ._.)
        // console.log('on PLD weapon');

        //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
        filteredData = csvData.filter(item => fullJobNbrList().includes(item[gearVar.jobReq]) && item[gearVar.equipSlot] === gearType1);

        console.log(`Found ${filteredData.length} Items for '${Job}' on '${gearType1}'`);
        loadMoreItems();
      } else if (gearType && fullJobNbrList().includes(Job)) {
        // console.log('Other');

        //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
        filteredData = csvData.filter(item => fullJobNbrList().includes(item[gearVar.jobReq]) && item[gearVar.equipSlot] === gearType);

        console.log(`Found ${filteredData.length} Items for '${Job}' to equip on '${gearType}'`);
        loadMoreItems();

        //* In case they click on 'off-hand' gear slot (no shields)
        if (filteredData.length === 0) {
          searchResults.innerHTML = `
            <div class="item">
              <div style="color:white;font-size:14px;width:100%;display:flex;justify-content:center;align-items:center;">
                No Item Found In Here For Your chosen Job
              </div>
            </div>
          `
        }

      } 
      
    }

  });

  function loadMoreItems() {
    const itemsToLoad = filteredData.slice(currentIndex, currentIndex + itemsPerBatch);
    itemsToLoad.forEach(item => {

      // console.log(item);

      searchResults.innerHTML += `
        <div class="item" data-itemid="${item[gearVar.itemId]}" data-geartype="${item[gearVar.equipSlot]}">
          <div data-iconId="${iconFunction(item[gearVar.icons])}">
            <img src="https://xivapi.com/i/${iconFunction(item[gearVar.icons])}.png" alt="">
          </div>
          <div>
            <span>${item[gearVar.SingItemName]}</span>
            <span>lvl ${item[gearVar.levelReq]}, Ilvl ${item[gearVar.itemLevel]}</span>
            <div class="bonuses">
              <span>class name here : ${item[44]}</span>
              <hr>
              <div class="stats">
                <p><span>dexterity</span> +98</p>
                <p><span>critical hit</span> +96</p>
                <p><span>vitality</span> +103</p>
                <p><span>determination</span> +67</p>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    currentIndex += itemsPerBatch;
    observeLastItem();
  }

  //! Equiping Gear
  searchResults.addEventListener('click', e => {

    if (e.target.classList.contains('item') || e.target.closest('.item')){
    
      let dataItemId = e.target.closest('.item').getAttribute('data-itemid')
      let dataGearSlot = e.target.closest('.item').getAttribute('data-geartype')
      let dataIconId = e.target.closest('.item').firstElementChild.getAttribute('data-iconId')
    
      let nameOfItem;
      for (let i = 0; i < csvData.length; i++) {
        if ( Number(csvData[i][gearVar.itemId]) === Number(dataItemId) ) {
          console.log(csvData[i]);
        }
      }
    
      console.log(`Item Id : ${dataItemId} | Gear Slot : ${dataGearSlot} | Icon Id : ${dataIconId}`);
      closeGearWindow()
  
      if ( gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`) ) {
        gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`).innerHTML = `
          <img src="https://xivapi.com/i/${dataIconId}.png" alt="" title="043088">
        `
      }
  
    }
  })

  // - Functions to observe the last item in searchResults so when it comes close to viewport 
  //* -> will lauch loadMoreItems() and add 20 more items in searchResults
  //* reduced waiting time from ~10s to ~4s with that (async functions etc, but mainly that I think) 
  function observeLastItem() {
    // - 'observeLastItem' is called after items are appended, setting the observer on the newly last item.
    const lastItem = searchResults.lastElementChild;
    if (lastItem) {
      observer.observe(lastItem);
    }
  }
  const observer = new IntersectionObserver((entries) => {
    // - Each entry represents an observed element (last item in this case) so use 'entries[0]' (?)
    // - is entries[0].isIntersecting = true, means that last item has come to vue -> so loadMoreItems()
    if (entries[0].isIntersecting) {
      loadMoreItems();
    }
  }, { rootMargin: '0px 0px 200px 0px' });
  //* option 'rootMargin' adds a margin to observer so it doesn't wait to exactly come into view of last item
  //* -> will load more item a bit before actually reaching the end (more 'fluid' when scrolling at the end)

});

fetchData()

//! =-=-=| On Search |=-=-= 
// todo : link itemName with a search bar (addEventListener)
// todo : add condition that if contains a part of the full gear name, will show every gear that contains that part of the word
// const itemName = `"Drachen Armet"`;
// for (let i = 0; i < csvData.length; i++) {
//   //* data[i][1] : to skip undefined or null values
//   //* .toLowerCase() to make comparisons case-insensitive
//   //* .includes to check if one string is contained within another
//   if (csvData[i][10] && csvData[i][gearVar.SingItemName].toLowerCase().includes(itemName.toLowerCase())) {
//     itemData.push({ 
//       dataInfo : {
//         itemId : csvData[i][0],
//         row: i,
//       },
//       "singularName" : csvData[i][gearVar.SingItemName],
      
//       //! Stats here ?

//     });
//   }
// }
// console.log(`${itemName} info :`, itemData);


//! Style Js (open/closing popups, etc)

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

    //* if target is not in the popupwindow and not the close-button either --> then closes the popup
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
  if (e.target.classList.contains('gear-box') || e.target.closest('.gear-box').hasAttribute('data-geartype')) {

    //? Stops event propagation to prevent the document click listener from being immediately triggered
    e.stopPropagation();
    openGearWindow()
  }
})
outsideClickClose(gearWindow, gearWindowX)
gearWindowX.addEventListener('click', closeGearWindow)

//* open job selector when click on profile 'job'
// // todo : add way to store name of job clicked before it closes
profile.addEventListener('click', e => {
  // // todo : if clicked on a 'job' => takes name of job and then closes

  if (e.target.classList.contains('job-change')) {
    e.stopPropagation();
    openJobSelector()
  } 
})
outsideClickClose(jobSelectorBG, jobSelectorX)
jobSelectorX.addEventListener('click', closeJobSelector)

// * open job selector when click on gear 'job-stone'
document.querySelector('.job-save').addEventListener('click', e => {

  if (e.target.tagName === 'IMG') {
    e.stopPropagation();
    openJobSelector();
  }
})
outsideClickClose(jobSelectorBG, jobSelectorX)
jobSelectorX.addEventListener('click', closeJobSelector)