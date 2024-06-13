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
let equipedGearIds = [];

let searchedGear = [];




//! =-=-=|> ToDo Notes : (with 'better Comments' plugin on vsCode)
/* 
  ! For Pc Version (last)
  todo : (idea) quand clique sur case d'equipemment -> lui donne "draggable" et a tout les equipement dans la search window
  todo : (idea) quand cloque off le search window, enlever toutes les classe draggeable

  ! --> Job Selector + Saving
  // todo : take job selected into profile 
  // todo : job selector popup when clicking on job-stone too
  todo : give warning if didn't save, will lose previous 'build' if no -> empty build, if yes -> save + change job
  todo : redo first fetch to display diff jobs and fuse with build save
  todo : add way to store job chosen, id of gear equiped (as an object in list ?) 


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
  todo : ability to remove gear

  ! --> (test) to get accessories gear to appear on search window 
  // todo : Need to get the shortname of job with the number (should do with firstJsonData) 
  // todo : Then take the shortname and search through secondJsonData all the number that contains that shortname (ex : 23 -> DRG; 47 -> lnc, DRG)
  // todo : Return those number and innerHTML in clicked accessory gear all of the gear
  
  ! --> Gear Stats
  todo : translate numbers to name and asign them to the right stats with respecctive stats 
  * name : BaseParam[0, 1, 2 & 3], stats number : BaseParamValue[0, 1, 2 & 3] 
  * (not 4 & 5, haven't figured out their use yet...)

  ! Useful Stuff
  // // todo : take as param classJobCategory -> look through numberToName.json if exist as proprety -> then takes its value

  
*/

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
  //? [GPT] : Flatten the Array: Since your array contains objects that further contain arrays of job information, you need to flatten this structure to easily search through it. 
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

function startLoading() {
  console.log('Loading --> Start');
  document.getElementById('loading').style.display = 'block';
  document.getElementById('loading').offsetHeight; // - Trigger a reflow, flushing the CSS changes
}
function stopLoading() {
  console.log('Loading --> Stop');
  document.getElementById('loading').style.display = 'none';
}


//! Fetch and Main JavaScript
async function fetchData() {
  try {
    startLoading()

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

  console.log(csvData);

  const fullNames = numberToNameData.numToName;
  // console.log('fullName', fullNames);

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

    const gearType = e.target.closest('.gear-box').getAttribute('data-geartype');
    const gearType1 = e.target.closest('.gear-box').getAttribute('data-geartype1')
    const Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)

    
    //* Will display gear if has selected a job and has clicked on a gear slot
    if (Job && gearType || gearType1) {

      startLoading() //* doesn't appear until the very end... ¯\_(ツ)_/¯
      
      try{
  
        searchResults.innerHTML = ''; // Reset
        currentIndex = 0;
        // console.log(Job);
  
        if (gearType1 && fullJobNbrList().includes(('20')) ) {
          //* Condition only for PLD's main weapon (since his main-hand number is 1 instead of 13 like everyone else ._.)
          // console.log('on PLD weapon');
          
          //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
          filteredData = csvData.filter(item => fullJobNbrList().includes(item[gearVar.jobReq]) && item[gearVar.equipSlot] === gearType1);
  
          // todo : change the log to put it in the DOM so user can see how many results found and for what equip (for fun c:)
          console.log(`Found ${filteredData.length} Items for '${Job}' on '${gearType1}'`);
          loadMoreItems();
        } else if (gearType && fullJobNbrList().includes(Job)) {
          // console.log('Other');
  
          //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
          filteredData = csvData.filter(item => fullJobNbrList().includes(item[gearVar.jobReq]) && item[gearVar.equipSlot] === gearType);
  
          // todo : same ↑
          console.log(`Found ${filteredData.length} Items for '${nbrToNames(String(Job), 0)}' to equip on '${nbrToNames(gearType, 1)}'`);
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
      catch (error) {
        console.error('Error processing data:', error);
      } finally {
        setTimeout(() => {
          stopLoading()
        }, 1);
      }
    }
    removeParentIfZero() //* remove the parent of stats that are +0 (because useless :)


    //! (wip idea) On Search 
    // todo : link itemName with a search bar (addEventListener)
    // todo : add condition that if contains a part of the full gear name, will show every gear that contains that part of the word
    
      // - brouillon

      const itemName = `"Inferno Battleaxe"`;

      for (let i = 0; i < csvData.length; i++) {
        //* data[i][1] : to skip undefined or null values
        //* .toLowerCase() to make comparisons case-insensitive
        //* .includes to check if one string is contained within another
        if (csvData[i][10] && csvData[i][gearVar.SingItemName].toLowerCase().includes(itemName.toLowerCase())) {
          itemData.push({ 
            dataInfo : {
              itemId : csvData[i][0],
              row: i,
            },
            "singularName" : csvData[i][gearVar.SingItemName],
          });
          console.log(csvData[i]);
        }
      }

      console.log(`${itemName} info :`, itemData);
    

    /*
    searchbar addeventlistener ('input', () => {
      
      if ( input !== emptiness (?) ){

        filteredDataSearch = filter and everything so only names that are related to what was written on input will be displayed

        loadMoreSearchedItems()
        
        if (filteredDataSearch.length === 0) {
          searchResults.innerHTML = `nothing to see here :)`
        }

      }
     
    })
    */

  });
  
  // console.log('fullNames : ', fullNames);

  function loadMoreItems() {

    const itemsToLoad = filteredData.slice(currentIndex, currentIndex + itemsPerBatch);
    // console.log(itemsToLoad);
    itemsToLoad.forEach(item => {

      // console.log(item);
      // console.log(`item[44] : ${item[gearVar.jobReq]}, ${typeof(item[gearVar.jobReq])}`);

      searchResults.innerHTML += `
        <div class="item" data-itemid="${item[gearVar.itemId]}" data-geartype="${item[gearVar.equipSlot]}">
          <div data-iconId="${iconFunction(item[gearVar.icons])}">
            <img src="https://xivapi.com/i/${iconFunction(item[gearVar.icons], 0)}.png" alt="">
          </div>
          <div>
            <span>${item[gearVar.SingItemName]}</span>
            <span>lvl ${item[gearVar.levelReq]}, Ilvl ${item[gearVar.itemLevel]}</span>
            <div class="bonuses">
              <span>${nbrToNames(item[gearVar.jobReq], 0)}</span>
              <hr>
              <div class="stats">
                <p>
                  <span>${nbrToNames(item[gearVar.gearStatName0], 2)? nbrToNames(item[gearVar.gearStatName0], 2) : 'Nan'}</span> 
                  +<span class="item-stats">${item[gearVar.gearStat0]}</span>
                </p>
                <p>
                  <span>${nbrToNames(item[gearVar.gearStatName1], 2)}</span> 
                  +<span class="item-stats">${item[gearVar.gearStat1]}</span>
                </p>
                <p>

                  <span>${nbrToNames(item[gearVar.gearStatName2], 2)}</span> 
                  +<span class="item-stats">${item[gearVar.gearStat2]}</span>
                </p>
                <p>
                  <span>${nbrToNames(item[gearVar.gearStatName3], 2)}</span> 
                  +<span class="item-stats">${item[gearVar.gearStat3] }</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      `;

    });
    
    currentIndex += itemsPerBatch;
    removeParentIfZero()
    observeLastItem();
  }


  //! From "Number Naming" to "Full Name"
  //* return value based on number from numberToName.json
  function nbrToNames(number, index = 0) {
    // -> [GPT] for 'index = 0' : default Value in Signature: This approach is cleaner and reduces the amount of code. It automatically sets index to 0 if it is not provided when calling the function. 
    //* this approach is prefered for it simplicity but can use ' if (index === undefined){index = 0;} ', same thing
    // console.log(`number : ${number}, ${typeof(number)}`);
    
    const key = String(number)

    const result = fullNames[index][key]
    // console.log(`result : ${result}`);
    
    return result || undefined;
  }


  //! Remove parent of useless displayed stat (if stat = 0)
  function removeParentIfZero() {
    const elements = document.querySelectorAll('.item-stats');
  
    elements.forEach(element => {
      const statValue = parseInt(element.textContent); // Assuming the stat value is the text content of the element
      if (statValue === 0) {
        element.parentElement.remove();
      }
    });
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
    
      console.log(`You equiped Id:${dataItemId} on ${nbrToNames(dataGearSlot, 1)}.`);
      closeGearWindow()
  
      if ( gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`) ) {
        gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`).innerHTML = `
          <img src="https://xivapi.com/i/${dataIconId}.png" alt="" data-itemid="${dataItemId}" title="Item Name here">
        `
      }
    }    
  })

  // equipedGearIds -> list with all equiped id

  //! Calculate Full Stats and Display On 
  function handleNewImg(imgElement) {
    const dataId = imgElement.getAttribute('data-id');

    if (dataId && !equipedGearIds.includes(dataId)) {
      equipedGearIds.push(dataId);

      console.log(`New data-id found: ${dataId}`);
      console.log('Current data-ids:', equipedGearIds);
    }
  }
  
  //! (idea wip) On Search

  /*
  function loadMoreSearchedItems() {
    const searchedItemsToLoad = filteredDataSearch.slice(currentIndex, currentIndex + itemsPerBatch);
    console.log(searchedItemsToLoad);
    searchedItemsToLoad.forEach(item => {

      searchResults.innerHTML += `...`;
    });
    currentIndex += itemsPerBatch;
    observeLastItem();
  }
  */


  //! Observer Last Item + Load More Items
  //? Functions to observe the last item in searchResults so when it comes close to viewport 
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
    //? Each entry represents an observed element (last item in this case) so use 'entries[0]' (?)
    //* is entries[0].isIntersecting = true, means that last item has come to vue -> so loadMoreItems()
    if (entries[0].isIntersecting) {
      loadMoreItems();
    }
  }, { rootMargin: '0px 0px 200px 0px' });
  //? option 'rootMargin' adds a margin to observer so it doesn't wait to exactly come into view of last item
  //* -> will load more item a bit before actually reaching the end (more 'fluid' when scrolling at the end)

  stopLoading()
})
fetchData()


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


//! Closing Window When 'Click' Outside Of It
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

profile.addEventListener('click', e => {
  // // todo : if clicked on a 'job' => takes name of job and then closes

  if (e.target.classList.contains('job-change')) {
    e.stopPropagation();
    openJobSelector()
  } 
})
outsideClickClose(jobSelectorBG, jobSelectorX)
jobSelectorX.addEventListener('click', closeJobSelector)

document.querySelector('.job-save').addEventListener('click', e => {

  if (e.target.tagName === 'IMG') {
    e.stopPropagation();
    openJobSelector();
  }
})
outsideClickClose(jobSelectorBG, jobSelectorX)
jobSelectorX.addEventListener('click', closeJobSelector)