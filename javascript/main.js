//! Fetch test...

// XIVAPI characters :
// fetch("https://xivapi.com/character/search?name=Random+Name&server=Twintania&private_key=", { mode: 'cors' })
// 	.then(response => response.json())
// 	.then(data => {
//     console.log(data);
//   })
//   .catch(error => {console.log("Erreur lors de la récup des données :", error);
// })
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//! =-=-=-=-=| Variables |=-=-=-=-=
import * as gearVar from './numberToName.js'

const tankDiv = document.querySelector('.tanks');
const healerDiv = document.querySelector('.healers');
const meleDiv = document.querySelector('.meles');
const phyDiv = document.querySelector('.phys');
const mageDiv = document.querySelector('.mages');

const mainJobLogo = document.querySelector('.job-change')

const profile = document.querySelector('.profile');
const profileMenu = document.querySelector('.profile-menu')
const burgerX = document.querySelector('.burger-menu')
const rangelvl = document.querySelector('#rangelvl')

const jobSelector = document.querySelector('.job-selector')
const profileJob = document.querySelector('.profile-job')
const jobSelectorBG = document.querySelector('.dark-bg')
const jobSelectorX = document.querySelector('.job-selector--x')

const gearGrid = document.querySelector('.gear-grid')
const gearBoxes = document.querySelectorAll('.gear-box')
const gearWindow = document.querySelector('.search-window')
const gearWindowX = document.querySelector('.search-window--x')
const searchResults = document.querySelector('.search-results')

const loginPopup = document.querySelector('.login-popup') // button to open login
const loginSignin = document.querySelector('.login-signin') // full login popup 
const profileWrapper = document.querySelector('.profile-wrapper') // login window in popup
const fieldText = document.querySelector('#field-text')
const fieldPassword = document.querySelector('#field-password')
const loginIcon = document.getElementById('login-icon')
const saveLoadbtn = document.querySelector('.save-load') // button opening save/load menu
const saveLoadMenu = document.querySelector('.save-load-menu') // div containing save/load menu
const savedJobIconWrapper = document.querySelector('.saved') // wrapper of saved job icons

const gearSearchBar = document.querySelector('#gear-search')

//! =-=-=-=-=| lists |=-=-=-=-=
let equippedGear = [];
let equippedGearIds = [];
let jobBaseStat = [];
let savedGearSets = []



//! other
//* removes " and \
let regex = /["\\]/g;


//! =-=-=|> ToDo Notes : (with 'better Comments' plugin on vsCode)
/* 
  ! --> Job Selector + Saving
  // todo : take job selected into profile 
  // todo : job selector popup when clicking on job-stone too
  // todo : add list and store job, id of gear equiped and on which gear type 
  todo : give warning if didn't save, will lose previous 'build' if no -> empty build, if yes -> save + change job

  ? save equippedGearIds or equippedGear, need to choose (EquipedIds is more accurate)

  ! --> BurgerMenu to filter options :
  // todo : range 0 - 90 ==> link to level of gear displayed on gear window selection


  ! --> On Search
  // todo : able to search for gear name on search bar (even if only writting part of the full name)
  
  ! --> Gear to Display
  // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
  // todo : condition #1 : get job taken and add it as a condition for gears to appear
  // todo : condition #2 : get data-geartype
  // todo : display every gear that the job can equip, not only the specified one
  // todo ↑ for example : if job is PLD(20) find a way to also have the gear that have PLD in their value (like gla, PLD) to display too
  // todo : if job is paladin, switch equipslot from main hand (13) to main hand (1)
  // todo : translate icon codes into images with xiv icon api
  // todo : "optimisation", don't display all items at once, only when is about to enter(scroll) the viewport add more item (for full list :  ~10s to ~4s)
  // todo : add a loading while waiting for items to appear (works only when loading page...)
  todo : if scrolling to the point of not seeing search bar => arrow 'back to top' apprears
  todo : ability to remove gear

  ! --> Get accessories gear to appear on search window 
  // todo : Need to get the shortname of job with the number (should do with firstJsonData) 
  // todo : Then take the shortname and search through secondJsonData all the number that contains that shortname (ex : 23 -> DRG; 47 -> lnc, DRG)
  // todo : Return those number and innerHTML in clicked accessory gear all of the gear
  // todo : 🐛 rings only equip on one || doesn't take stats of second ring ¯\_(ツ)_/¯
  
  ! --> Gear Stats
  // todo : translate numbers to name and asign them to the right stats 
  // todo : Add natural base stats- Add natural base stats
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

  //! Job Selector =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //! Function that give info from info.json based on CSVcode
  function findJobByCSVcode(code) {
    //? [GPT] : Flatten the Array: Since your array contains objects that further contain arrays of job information, you need to flatten this structure to easily search through it. 
    //- Flatten the arrays inside jobInfo
    const allJobs = data.jobInfo.flatMap(category => {
      //- Flatten each category's job array
      return Object.values(category).flat();
    })
    // console.log('jobInfo flatmap : ', allJobs);

    //- Find the job with the matching CSVcode
    const job = allJobs.find(job => job.CSVcode === code);
    if (job) {
      jobBaseStat = []
      //* stats calc from akhmorning.com
      jobBaseStat.push({
        strength : ((job.basestr / 100) * 390).toFixed(0),
        vitality : (job.basevit).toFixed(0),
        dexterity : ((job.basedex / 100) * 390).toFixed(0),
        intelligence : ((job.baseint / 100) * 390).toFixed(0),
        mind : ((job.basemnd / 100) * 390).toFixed(0),
        skillspeed : ((job.skillspeed ? job.skillspeed : 1) * 400).toFixed(0),
        spellspeed : ((job.skillspeed ? job.spellspeed : 1) * 400).toFixed(0),
        tenacity : Number((job.tenacity ? job.tenacity : 1) * 400).toFixed(0),
        piety: (((job.piety ? job.piety : 1)) * 390).toFixed(0),
      })
      return {
        jobstone: job.jobstone,
        jobicon: job.jobicon,
        shortname: job.shortname,
        fullname: job.fullname,
        basehp: job.basehp
      };
    } else {
      return 'Job not found';
    }
  }

  //! Empty the gear boxes in case allready equiped something in previous chosen job
  // todo : must confirm before changing job, if yes -> clear id equiped from list of that job
  // todo2 : if save -> save id equiped of that job then change 
  function emptyGearBox() {
    gearBoxes.forEach(gearBox => {
      gearBox.innerHTML = ''
    });
    // console.log('equipement emptied...');
  }

  //* When selection job --> will change profile + stone and short job name
  jobSelector.addEventListener('click', e => {

    //* 1st condition to avoid having an error when 'click' on empty zones (on popup)
    if (e.target.closest('.job').hasAttribute('data-job')){
      
      var datajob = e.target.closest('.job').getAttribute('data-job')
      const jobInfo = findJobByCSVcode(Number(datajob));

      // console.log(`You choose ${jobInfo.shortname} (${datajob})`);

      emptyGearBox()

      document.querySelector('.profile-job').innerHTML= `
      <div
        class="job-change gear-box" 
        style="background: url('${jobInfo.jobicon}') center/cover" 
        data-job="${datajob}"
        data-hp="${jobInfo.basehp}"
        data-effect="gear-box--anim" 
        >
      </div>
      `
      document.querySelector('.job-stone').innerHTML= `
        <img src="${jobInfo.jobstone}" alt="">
        <span data-jobname="${jobInfo.fullname}">${jobInfo.shortname}</span>
      `

      document.querySelector('.job-name').innerHTML = jobInfo.fullname
      document.querySelector('.job-name').classList.add('job-choosed')

    }

  })

})
.catch(error => {console.log("Erreur lors de la récup des données :", error)})

function startLoading() {
  // console.log('Loading --> Start');
  document.getElementById('loading').style.display = 'block';
}
function stopLoading() {
  // console.log('Loading --> Stop');
  document.getElementById('loading').style.display = 'none';
}

function emptyGearBox() {
  gearBoxes.forEach(gearBox => {
    gearBox.innerHTML = ''
  });
}


//! Fetch and Main JavaScript =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function fetchData() {
  try {
    startLoading()

    const [csvResponse, infoResponse, numberToNameResponse] = await Promise.all([
      fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv'),
      fetch('info.json'),
      fetch('numberToName.json')
    ]);

    const infoData = await infoResponse.json();
    const numberToNameData = await numberToNameResponse.json();

    const numToNameJson = numberToNameData.numToName[0];
    //* function to get a list of only truthy keys of an object (param)
    function numberToNameKeys(obj) {
      const result = [];
      for (const key in obj) {
        if (obj[key]) {
          result.push(key);
        }
      }
      return result;
    }

    //* csv response to text -> then split into rows and columns to convert the CSV ino a .json
    const csvText = await csvResponse.text();
    const rows = csvText.split('\n');
    const csvFullData = rows.map(row => row.split(','));
    //* Array with only gear that are equipable by class/job on numberToName.json [0]
    const csvData = csvFullData.filter(item => numberToNameKeys(numToNameJson).includes(item[gearVar.jobReq]))

    return { csvData, infoData, numberToNameData }; // Return an object containing all data

    } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


document.addEventListener('DOMContentLoaded', async () => {
  // - [gpt] : addEventListener('DOMContentLoaded', ...) ensures the script runs after the DOM has fully loaded.

  const { csvData, infoData, numberToNameData } = await fetchData();
  const gearGrid = document.querySelector('.gear-grid');
  const searchResults = document.querySelector('.search-results');
  console.log(csvData);

  const fullNames = numberToNameData.numToName;
  // console.log('fullName', fullNames);

  let filteredData = [];
  let currentIndex = 0;
  const itemsPerBatch = 20;

  //! Getting All Number The Chosen Job Is A Part Of =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  //* fullJobNbrList() -> Function that will return array of string number related to choosen job 
  //* (ex for 23 (aka DRG) --> ["23", "47", "84", "76"] (aka ["DRG", "lnc, DRG", "pgl lnc, MNK DRG SAM RPR", "lnc, DRG RPR"])
  function findJobShortname(jobNbr) {
    //- Flatten the arrays inside jobInfo
    const allJobs = infoData.jobInfo.flatMap(category => {
      //- Flatten each category's job array
      return Object.values(category).flat();
    })

    const findJob = allJobs.find(job => job.CSVcode === jobNbr);
    if (findJob) {
      // console.log('Job name is : ' + findJob.shortname);
      return findJob.shortname
    } else {
      return '?'
    }
  } //* ex : will return for "23" (main job only) --> "DRG"

  function fullJobNbrList() {
    
    const numToName = numberToNameData.numToName[0];

    //- Function to find numbers that include shortname of job
    function findNumbersWithshortname(obj) {
      const result = [];
      for (const key in obj) {
        if (obj[key].includes( findJobShortname( Number(document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`))) )) {
          result.push(key);
        }
      }
      return result; 
    } //* ex : will return for DRG --> '["23", "47", "84", "76"]'   

    //* tldr; 
    //* findNumbersWithshortname( secondJsonData.numToName[0] --> findJobShortname( all number related to 'Job' ) )
    return findNumbersWithshortname(numToName);
  }


  //! Item Icons (from XIVAPI) =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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


  //! Base Job Stat Calculation
  function baseJobStatCalc(code) {
    // console.log('infoData list : ', infoData);

    const allJobs = infoData.jobInfo.flatMap(category => {
      return Object.values(category).flat();
    })

    console.log('infoData flatmap : ', allJobs);

    //- Find the job with the matching CSVcode
    const job = allJobs.find(job => job.CSVcode === Number(code));
    if (job) {
      jobBaseStat = []
      //* stats calc from akhmorning.com
      jobBaseStat.push({
        strength : ((job.basestr / 100) * 390).toFixed(0),
        vitality : (job.basevit).toFixed(0),
        dexterity : ((job.basedex / 100) * 390).toFixed(0),
        intelligence : ((job.baseint / 100) * 390).toFixed(0),
        mind : ((job.basemnd / 100) * 390).toFixed(0),
        skillspeed : ((job.skillspeed ? job.skillspeed : 1) * 400).toFixed(0),
        spellspeed : ((job.skillspeed ? job.spellspeed : 1) * 400).toFixed(0),
        tenacity : Number((job.tenacity ? job.tenacity : 1) * 400).toFixed(0),
        piety: (((job.piety ? job.piety : 1)) * 390).toFixed(0),
      })
    } else {
      return 'Job not found';
    }
  }

  baseJobStatCalc("23")

  gearGrid.addEventListener('click', e => {

    // - The ?. operator ensures that getAttribute is only called if gearBox is not null
    const gearType = e.target.closest('.gear-box')?.getAttribute('data-geartype');
    const gearType1 = e.target.closest('.gear-box')?.getAttribute('data-geartype1')
    const Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)
    let minLvl;

    if (rangelvl.value === 0) {
      minLvl = 1
    } else {
      minLvl = rangelvl.value--
    }

    
    //* Will display gear if has selected a job and has clicked on a gear slot
    if (Job && (gearType || gearType1)) {
      startLoading() //* doesn't appear until the very end... ¯\_(ツ)_/¯
      
      try{
  
        searchResults.innerHTML = ''; // Reset
        currentIndex = 0;
        // console.log(Job);
  
        if (gearType1 && fullJobNbrList().includes(('20')) ) {
          //* Condition only for PLD's main weapon (since his main-hand number is 1 instead of 13 like everyone else ._.)
          
          //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
          filteredData = csvData.filter(item => 
            fullJobNbrList().includes(item[gearVar.jobReq]) && 
            item[gearVar.equipSlot] === gearType1 && 
            item[gearVar.levelReq] >= minLvl
          );
  
          // todo : change the log to put it in the DOM so user can see how many results found and for what equip (for fun c:)
          console.log(`Found ${filteredData.length} Items for '${Job}' on '${gearType1}'`);
          loadMoreItems(filteredData);
        } else if (gearType && fullJobNbrList().includes(Job)) {
  
          //* Copy csvData but filter it and only takes items that are related to job chosen and to gear slot clicked
          filteredData = csvData.filter(item => 
            fullJobNbrList().includes(item[gearVar.jobReq]) && 
            item[gearVar.equipSlot] === gearType && 
            item[gearVar.levelReq] >= minLvl
          );
  
          // todo : same ↑
          console.log(`Found ${filteredData.length} Items for '${nbrToNames(String(Job), 0)}' to equip on '${nbrToNames(gearType, 1)}'`);
          loadMoreItems(filteredData);
  
          //* In case we click on 'off-hand' gear slot (no shields)
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
  
    //! On Search =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    gearSearchBar.addEventListener('input', () => {
  
      if ( gearSearchBar.value != '' ){
        const searchTerm = gearSearchBar.value.toLowerCase();
        currentIndex = 0;
        
        filteredData = csvData.filter(item => 
          item[gearVar.SingItemName].replace(/["\\]/g, '').toLowerCase().includes(searchTerm) && 
          item[gearVar.equipSlot] === gearType && 
          fullJobNbrList().includes(item[gearVar.jobReq])
        );
        // console.log('filteredData ', filteredData);
  
        if (filteredData.length > 0) {
          searchResults.innerHTML = ''

          loadMoreItems(filteredData)
        } else{
          searchResults.innerHTML = `
            <div class="item">
              <div style="color:white;font-size:14px;width:100%;display:flex;justify-content:center;align-items:center;">
                Sorry, could not find your item ._.
              </div>
            </div>
          `
        }
  
      }
  
    })

    //! Equiping Gear =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    const clickedItem = e.target.closest('.item');
    if (clickedItem) {
      equipItem();
    }

    //* Mark ring slot as clicked to know which ring to change later (since both have same code : '12')
    const clickedRingSlot = e.target.closest(`[data-geartype="12"]`);
    if (clickedRingSlot) {
      gearGrid.querySelectorAll(`[data-geartype="12"]`).forEach(slot => slot.classList.remove('clicked'));
      clickedRingSlot.classList.add('clicked');
    }

    function equipItem() {

      searchResults.addEventListener('click', e => {
    
        if (e.target.classList.contains('item') || e.target.closest('.item')){
    
          const dataItemId = e.target.closest('.item').getAttribute('data-itemid')
          const dataGearSlot = e.target.closest('.item').getAttribute('data-geartype')
          const dataIconId = e.target.closest('.item').firstElementChild.getAttribute('data-iconId')
          
          for (let i = 0; i < csvData.length; i++) {
            if ( Number(csvData[i][gearVar.itemId]) === Number(dataItemId) ) {
              console.log(csvData[i]);
            }
          }
          
          const test = csvData.find(job => job[gearVar.itemId] === dataItemId);
          const itemName = test[gearVar.SingItemName].replace(regex, '')

          closeGearWindow()
    
          //* Check if the gear type is '12' (rings)
          if (dataGearSlot === '12') {
            const clickedRingSlot = gearGrid.querySelector(`[data-geartype="12"].clicked`);
            
            //* Find the ring slot that was clicked and equip new ring on it + add 'occupied' class
            if (clickedRingSlot) {
              // console.log('--> clickedRingSlot');
              clickedRingSlot.innerHTML = `
                <img src="https://xivapi.com/i/${dataIconId}.png" alt="" data-id="${dataItemId}" title="${itemName} : ${dataItemId}">
              `
              clickedRingSlot.classList.add('occupied');
              clickedRingSlot.classList.remove('clicked');

            } else {
              // console.log('--> unoccupiedRingSlot');
              const unoccupiedRingSlot = gearGrid.querySelector(`[data-geartype="12"]:not(.occupied)`);

              if (unoccupiedRingSlot) { 
                unoccupiedRingSlot.innerHTML = `
                  <img src="https://xivapi.com/i/${dataIconId}.png" alt="" data-id="${dataItemId}" title="${itemName} : ${dataItemId}">
                `
                unoccupiedRingSlot.classList.add('occupied');

              }
            }
          } else {
            //* Equiping for all other gear types
            const gearSlot = gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`);

            if (dataGearSlot === '1') {
              gearGrid.querySelector(`[data-geartype1="1"]`).innerHTML = `
                <img class="equipped-item" src="https://xivapi.com/i/${dataIconId}.png" alt="${itemName}" data-id="${dataItemId}" title="${itemName} : ${dataItemId}">
              `
            } else if (gearSlot) {
              gearSlot.innerHTML = `
                <img class="equipped-item" src="https://xivapi.com/i/${dataIconId}.png" alt="${itemName}" data-id="${dataItemId}" title="${itemName} : ${dataItemId}">
              `
            }
          }
          
          //! Get all stats for window-stats
          onGearEquipped()
        }
      })
    }

    if (e.target.closest('.gear-box')) {
      if (document.querySelector('.profile-job').firstElementChild?.hasAttribute(`data-job`)) {
        setTimeout(() => {
          gearSearchBar.focus()
        }, 1000);
      }
    }

  });


  //! Load Items per 20 (or less if array is smaller)
  function loadMoreItems(array) {
    let itemsToLoad;

    if (array.length >= 20) {
      itemsToLoad = array.slice(currentIndex, currentIndex + itemsPerBatch);
    } else {
      itemsToLoad = array
    }

    itemsToLoad.forEach(item => {
      // todo : add jobReq for "1", "30" & "31"

      searchResults.innerHTML += `
        <div class="item" data-itemid="${item[gearVar.itemId]}" data-geartype="${item[gearVar.equipSlot]}">
          <div data-iconId="${iconFunction(item[gearVar.icons])}">
            <img src="https://xivapi.com/i/${iconFunction(item[gearVar.icons], 0)}.png" alt="">
          </div>
          <div>
            <span>${ item[gearVar.SingItemName]}</span>
            <span>lvl ${item[gearVar.levelReq]}, Ilvl ${item[gearVar.itemLevel]}</span>
            <div class="bonuses">
              <span>${nbrToNames(item[gearVar.jobReq], 0)}</span>
              <hr>
              <div class="stats">
                <p>
                  <span>${nbrToNames(item[gearVar.gearStatName0], 2)}</span> 
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
    
    if (array.length >= 20) {
      currentIndex += itemsPerBatch;
    }
    removeParentIfZero()
    observeLastItem();
  }

  //! From "Number Naming" to "Full Name" =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function nbrToNames(number, index = 0) {
    // -> [GPT] for 'index = 0' : default Value in Signature: This approach is cleaner and reduces the amount of code. It automatically sets index to 0 if it is not provided when calling the function. 
    //* this approach is prefered for it simplicity but can use ' if (index === undefined){index = 0;} ', same thing
    // console.log(`number : ${number}, ${typeof(number)}`);
    
    const key = String(number)

    const result = fullNames[index][key]
    // console.log(`result : ${result}`);
    
    return result || undefined;
  }

  //! Remove parent of useless displayed stat (if stat = 0) =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  function removeParentIfZero() {
    const elements = document.querySelectorAll('.item-stats');
  
    elements.forEach(element => {
      const statValue = parseInt(element.textContent);
      if (statValue === 0) {
        element.parentElement.remove();
      }
    });
  }


  //! Full Stats Display =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //* Get Equipped Gear IDs
  function getEquippedGearIds() {
    const gearBoxes = document.querySelectorAll('.gear-box img[data-id]');
    //* Create a list of all equiped Ids so can use them later to get their stats and display on stats-window
    return Array.from(gearBoxes).map(img => img.getAttribute('data-id'));
  }


  //! Gets the stats for a given gear ID
  function getGearStats(gearId) {

    //* Find the row in the CSV data that match the gear ID
    const gearRow = csvData.find(row => row[0] === gearId);

    const gearName = gearRow[10].replace(regex, '')

    //* Create a stats object with stats name & their value
    const stats = {};
    //* from 66 to 72 by +2 jumps because stats name are 66, 68, 70 and 72 
    for (let i = 66; i <= 72; i += 2) {
      const statName = nbrToNames(gearRow[i], 2);
      if (statName) {
        //* + 1 because stats number are one "line" after their name
        stats[statName] = parseInt(gearRow[i + 1]) || 0;
      }
    }
  
    console.log(`${gearName} Stats `, stats);
    return stats;
  }

  function otherStats(equippedGearIds) {
    
    let otherStats = {}
    let def = 0;
    let magicDef = 0;
    let averageIlvl = 0;

    if (equippedGearIds.length > 0) {

      equippedGearIds.forEach(gearId => {
  
        const gearRow = csvData.find(row => row[0] === gearId);

        if (gearRow) {
          def += Number(gearRow[64])
          magicDef += Number(gearRow[65])
          averageIlvl += Number(gearRow[12])
        }
        
      });

      //! divided by 11 or 12 ???
      averageIlvl = (averageIlvl / equippedGearIds.length).toFixed(0)

      otherStats = {
        defense: def,
        magicDefense: magicDef,
        averageItemlvl: averageIlvl
      };
      
      return otherStats
    } else {
     return 'No equipped gear was found.'
    }

  }
  
  function updateStatsWindow(equippedGearIds) {
    //* Receive lists of equiped id
    if (equippedGearIds.length > 0) {
      console.log('Equiped IDs', equippedGearIds);
    }

    const statsWindow = document.querySelector('.stats-window');
    const statElements = statsWindow.querySelectorAll('li[data-stats]');
    const Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)

    console.log(`${findJobShortname(Number(Job))} base stat : `, jobBaseStat[0]);
    const totalStats = {};

    //* Merge baseStat with totalStats
    for (const key in jobBaseStat[0]) {
      if (jobBaseStat[0].hasOwnProperty(key)) {
        if (totalStats.hasOwnProperty(key)) {
          totalStats[key] += Number(jobBaseStat[0][key]);
        } else {
          totalStats[key] = Number(jobBaseStat[0][key]);
        }
      }
    }

    //* Get total stats from all equipped gear
    //* For each id in equippedGeadIds list will get an object with the name of every stat and their value
    equippedGearIds.forEach(gearId => {
      const gearStats = getGearStats(gearId);
      if (gearStats) {
        //* loop to add stat name and value to new list (totalStats) but if name already exist -> add the value to that name in the list so we get a total 
        for (const statName in gearStats) {
          if (!totalStats[statName]) {
            totalStats[statName] = 0;
          }
          totalStats[statName] += gearStats[statName];
        }
      }
    });

    console.log('totalStats ', totalStats);
  
    //! HP calculation (lvl90 only)
    //* 2 variables : base Hp (change depending on jobs) & final multiplicator (if tank -> 35 else 24)
    let baseHp = profileJob.firstElementChild.getAttribute(`data-hp`)
    let dataJob = profile.firstElementChild.getAttribute('data-job')

    //* if job is a tank -> 35 else 24
    let jobFinalMulti = (dataJob === '20' || dataJob === '22' || dataJob === '98' || dataJob === '149') ? 35 : 24;

    // const jobFinalMulti = ;

    //--> lvl90 HP = ( lvlMod,HP * (jobMod,HP / 100 ) ) + ( (Vitality - lvlMod,Main ) * jobFinalMulti )
    console.log(`base Hp : ${baseHp}, total Vit : ${totalStats.vitality}, final Multi : ${jobFinalMulti}`);
    const HP = parseInt(3000 * ( baseHp / 100 )) + (( totalStats.vitality - 390) * jobFinalMulti )

    document.querySelector('.HP').innerHTML = `
      <div>
        <div>HP</div>
        <div>${HP}</div>
      </div>
      <div class="bar"></div>
    `

    //* Update the stats window in the DOM
    statElements.forEach(li => {
      //* with number from data-stats -> convert it to name
      const statType = nbrToNames(li.getAttribute('data-stats'), 2);

      //* change text of span with value of matching data-stats (~names)
      if (statType) {
        //* will get the value of the stat linked to the stat name [statType] from totalStats and updates the dom
        const statValue = totalStats[statType] || 0;
        li.querySelector('span').textContent = statValue;
      }

    });

  }

  function onGearEquipped() {
    //* Get all equipped gear Ids
    const equippedGearIds = getEquippedGearIds();
  
    //* Update the stats window
    updateStatsWindow(equippedGearIds);
 
    const othStats = otherStats(equippedGearIds);
    console.log('Other stats :', othStats);
    
    //* ternary condition to not get 'undefined' right after choosin a job
    document.querySelector('#def span').innerHTML = othStats.defense ? othStats.defense : 0
    document.querySelector('#magic-def span').innerHTML = othStats.magicDefense ? othStats.magicDefense : 0
    document.getElementById('aIlvl').innerHTML = othStats.averageItemlvl ? othStats.averageItemlvl : 0

    return equippedGearIds
  }

  //* To get base stat directly after Job Selection 
  jobSelector.addEventListener('click', e => {
    if (e.target.closest('.job')) {
      onGearEquipped()
    }
  })

  //! Saving/Loading =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  //! saving...
  const saveGearSet = async (jobId, equippedGearIds) => {
    console.log(jobId, equippedGearIds);

    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      console.log("No user is signed in.");
      return;
    }

    const userRef = ref(database, 'users/' + userId + '/gearSets');

    try {
      //- Fetch existing gear sets from Firebase
      const snapshot = await get(userRef);
      let currentGearSets = snapshot.exists() ? snapshot.val() : {};
  
      //- Update or add the new gear set
      currentGearSets[jobId] = equippedGearIds;
  
      //- Save the updated gear sets back to Firebase
      //- Use the set() method to save the merged gear sets back to Firebase.
      await set(userRef, currentGearSets);
  
      console.log("Gear set saved successfully.");
    } catch (error) {
      console.error('Error saving gear set to Firebase:', error);
    }

  };

  function getSavedJobIcon(jobNbr) {
    //- Flatten the arrays inside jobInfo
    const allJobs = infoData.jobInfo.flatMap(category => {
      //- Flatten each category's job array
      return Object.values(category).flat();
    })

    const findJob = allJobs.find(job => job.CSVcode === Number(jobNbr));
    if (findJob) {
      // console.log('Job name is : ' + findJob.shortname);
      return {
        icon : findJob.jobicon,
        fullname : findJob.fullname,
        shortname : findJob.shortname,
        CSVcode : findJob.CSVcode,
        baseHp : findJob.basehp,
        jobstone : findJob.jobstone,

      }
    } else {
      return 'NaN'
    }
  }

  document.querySelector('.profile').addEventListener('click', (e) => {

    //! opening saved/load builds menu =-=-=-=-=-=-=-=

    saveLoadbtn.addEventListener('click', (e) => {
      if (!e.target.closest('.close-save-load')) {
        saveLoadbtn.classList.add('close-save-load')
        e.stopPropagation();
        openProfileMenu(saveLoadMenu)
      } else if (e.target.closest('.close-save-loadr')) {
        saveLoadbtn.classList.remove('close-save-load')
        closeProfileMenu(saveLoadMenu)
      }
    })
    
    console.log('click');

    if (!saveLoadMenu.contains(e.target) && e.target !== burgerX && saveLoadMenu.classList.contains('window-pop')) {
      closeProfileMenu(saveLoadMenu)
      saveLoadbtn.classList.remove('close-save-load')
    }

    const userId = auth.currentUser ? auth.currentUser.uid : null;
    
    const loadUserData = (userId) => {
      console.log('in load User Data');
      if (userId) {
        const userRef = ref(database, 'users/' + userId + '/gearSets');
        get(child(userRef, '/')).then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            displayJobIcons(userData);
          }})
        .catch((error) => {
          console.error('Error fetching user data:', error);
        })
      } else{
        console.log('you must be logged in or signup in order to be able to save/load your builds');
      }
    };
    
    // Function to display job icons
    const displayJobIcons = (gearSets) => {
      savedJobIconWrapper.innerHTML = ''; //* Clear any existing icons

      Object.keys(gearSets).forEach(jobId => {
        savedJobIconWrapper.innerHTML += `
          <div class="job-icon" data-code="${getSavedJobIcon(jobId).CSVcode}" title="${getSavedJobIcon(jobId).fullname}">
            <img src="${getSavedJobIcon(jobId).icon}" alt="final fantasy xiv's ${getSavedJobIcon(jobId).fullname} job icon">
          </div>
        `
      });
    };
    
    if (document.querySelector('.fa-floppy-disk').contains(e.target)) {
    // if (e.target.closest('.save-load')) {
      //! SAVING FUNCTION HERE
      const jobId = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)

      onAuthStateChanged(auth, (user) => {
        if (user) {
          
          console.log(`Saving Build For '${findJobShortname(Number(jobId))} (${jobId})'`);
          saveGearSet(jobId, onGearEquipped())
      
        } else {
            console.log("No user is signed in.");
        }
      });

      closeProfileMenu(saveLoadMenu)
      saveLoadbtn.classList.remove('close-save-load')
    }

    if (document.querySelector('.fa-arrows-rotate').contains(e.target)) {
      //! LOADING FUNCTION HERE
      loadUserData(userId)

      if (document.querySelector('.job-icon').contains(e.target)) {
        closeProfileMenu(saveLoadMenu)
        saveLoadbtn.classList.remove('close-save-load')
      }
    }

  });


  //! On Job Change 
  function onJobChange() {
    //* too lazy for now 
    //-> if changes Job 
    //  -> offer to save current set (window with warning 'gear will del, do you want to save ? y/n)
    //    -> if (yes) 
    //      -> save (how ? idk yet ¯\_(ツ)_/¯, should learn firebase maybe)
    //    -> if (no)
    //      -> empty current equiped gear
    //      -> and equip the new job selected
  }

   
  //! Observer Last Item + Load More Items =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
    //* if entries[0].isIntersecting = true, means that last item has come to v -> so loadMoreItems()
    if (entries[0].isIntersecting) {

      //? would be better to send array as a param to loadMoreItems() so don't have to repeat same funciton for loadMoreSearchedItems() but arrays are defined inside other "functions" so ...
      if (filteredData.length >= 20) {
        //* Will only loadMoreItems is array is bigger than 20 (else would loop and copy past same item in dom indefinitely)
        loadMoreItems(filteredData);
      }
    }
  }, { rootMargin: '0px 0px 200px 0px' });
  //? option 'rootMargin' adds a margin to observer so it doesn't wait to exactly come into view of last item
  //* -> will load more item a bit before actually reaching the end (more 'fluid' when scrolling at the end)

  savedJobIconWrapper.addEventListener('click', async  (e) => {

    if (e.target.closest('.job-icon').hasAttribute('data-code')) {
      
      // // todo : get the jobCode
      const jobCode = e.target.closest('.job-icon').getAttribute('data-code')
      console.log(`job code : ${jobCode}`);
      
      // // todo : get the saved data from firebase
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (!userId) {
        console.log("No user is signed in.");
        return;
      }
      
      const userRef = ref(database, 'users/' + userId + '/gearSets');
      let savedGearSets = {};

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          savedGearSets = snapshot.val();
          console.log('Saved Gear Sets:', savedGearSets);
        } else {
          console.log('No gear sets found for user.');
          return;
        }
      } catch (error) {
        console.error('Error loading gear sets from Firebase:', error);
        return;
      }

      // todo : fill profile & job-stone with right job icon and info
      const gearInfoJson = getSavedJobIcon(jobCode)
      
      document.querySelector('.job-stone').innerHTML = `
        <img src="${gearInfoJson.jobstone}" alt="${gearInfoJson.fullname}'s job stone icon">
        <span>${gearInfoJson.shortname}</span>
      `
      //* profile job icon
      document.querySelector('.profile-job').innerHTML = `
        <div class="job-change gear-box" style="background: url(${gearInfoJson.icon}) center/cover" data-job="${gearInfoJson.CSVcode}" data-hp="${gearInfoJson.baseHp}" data-effect="gear-box--anim">
        </div>
      `
      document.querySelector('.job-name').innerHTML = gearInfoJson.fullname
      document.querySelector('.job-name').classList.add('job-choosed')

      // // todo : get the object in saved data that matches Number(jobCode)
      const gearIdsForJob = savedGearSets[jobCode];
      console.log(`gear Ids for ${findJobShortname(Number(jobCode))} (${jobCode}) : ${gearIdsForJob}`);
      if (!gearIdsForJob) {
        console.log(`No saved gear for job: ${findJobShortname(Number(jobCode))} (${jobCode})`);
        return;
      }

      // // todo : empty all gear slots
      emptyGearBox()

      // // todo : for each Id's in that list
      gearIdsForJob.forEach(gearId  => {

        // // todo : get from cvsData the geartype & iconNbr of each one of those gear Id
        const gearRow = csvData.find(row => row[0] === gearId);
        if (!gearRow) {
          console.log(`No data found for gear ID: ${gearId}`);
          return;
        }

        const gearTypeData = gearRow[gearVar.equipSlot];
        const gearIconData = gearRow[gearVar.icons];
        const gearNameData = gearRow[gearVar.SingItemName].replace(regex, '');
  
       //  // todo : get icon with iconFunction(iconNbr), funciton will return rest of icon image
        const iconUrl = iconFunction(gearIconData);
  
        // // todo : innerHTML those gear icon like when equiping gear (with data etc)
        // const gearSlot = gearGrid.querySelector(`[data-geartype="${gearTypeData}"]`);
        let gearSlot;

        // * Check if the gear type is '12' for rings
        if (gearTypeData === '12') {
          console.log('In Ring conditions');
          const firstRingSlot = gearGrid.querySelector(`[data-geartype="12"]`);
          const secondRingSlot = gearGrid.querySelector(`[data-geartype="12"]:last-of-type`);

          if (firstRingSlot && firstRingSlot.innerHTML.trim() === '') {
            console.log('equiping ring #1');
            gearSlot = firstRingSlot;
          } else if (secondRingSlot) {
            console.log('equiping ring #2');
            gearSlot = secondRingSlot;
          } else {
            console.log('Both ring slots are occupied.');
            return;
          }
        } else {
          //* For other gear types
          gearSlot = gearGrid.querySelector(`[data-geartype="${gearTypeData}"]`);
        }
      


        if (gearTypeData === '1') {
          gearGrid.querySelector(`[data-geartype1="1"]`).innerHTML = `
            <img class="equipped-item" src="https://xivapi.com/i/${iconUrl}.png" alt="${gearNameData}" data-id="${gearId}" title="${gearNameData} : ${gearId}">
          `
        } else if (gearSlot) {
          gearSlot.innerHTML = `
            <img class="equipped-item" src="https://xivapi.com/i/${iconUrl}.png" alt="icon of ${gearNameData}" data-id="${gearId}" title="${gearNameData} : ${gearId}">
          `;
        } else{
          console.log(`no item equiped for ${gearSlot}`);
        }
        
      });
      // // todo : push base stat of job
      baseJobStatCalc(jobCode)

      // // todo : then onGearEquipped(), function that will calculate stats
      onGearEquipped()

      saveLoadbtn.classList.remove('close-save-load')
      saveLoadMenu.classList.remove('window-pop')
      saveLoadMenu.classList.add('window-pop-reverse');
    }
  })

  stopLoading()
})
fetchData()

// todo : can save/load gear sets (by jobs) if logged in
//! Firebase & login stuff =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//! Firebase =-=-=-=-=-=-=
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import {  
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//- Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLqmLm2g5FP6ravQIly18wQ7fjHfwfapQ",
  authDomain: "xiv-builder.firebaseapp.com",
  projectId: "xiv-builder",
  databaseURL : "https://xiv-builder-default-rtdb.europe-west1.firebasedatabase.app/",
  storageBucket: "xiv-builder.appspot.com",
  messagingSenderId: "687875267373",
  appId: "1:687875267373:web:e069e585d07b8e0caf11a4",
  measurementId: "G-28XVZRLPKC"
};

//- Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
//- Initialize Firebase Database
const database = getDatabase();

console.log(app);


//- Sign up function
const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('User signed up:', userCredential.user);

    emptyFormFieldValue()
    closinFormPopUp()
    document.getElementById('signup-error').innerText = '';
  })
  .catch((error) => {
    emptyFormFieldValue()
    const errorCode = error.code;
    const errorMessage = error.message;
    
    //- Display the error message in the DOM
    const signupErrorElement = document.getElementById('signup-error');
    if (errorCode === 'auth/email-already-in-use') {
        signupErrorElement.innerText = 'This Email Is Already In Used';
    } else {
        signupErrorElement.innerText = errorMessage;
    }

    //- Log the error
    console.error('Error signing up:', error);
  });
};

//- Login function
const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log('User logged in:', userCredential.user);

    emptyFormFieldValue()
    closinFormPopUp()

    loginIcon.title = `${email}`
  })
  .catch((error) => {
    emptyFormFieldValue()
    console.error('Error logging in:', error);
  });
};

//- Logout function
const logout = () => {
  signOut(auth)
  .then(() => {
    console.log('User logged out');
    emptyGearBox()
  })
  .catch((error) => {
    console.error('Error logging out:', error);
  });
};

//- Function to update loginIcon based on authentication state
const updateLoginIcon = (user) => {
  if (user) {
    // User is signed in
    loginIcon.style.color = 'green';
    document.querySelector('.name').innerText = user.email
  } else {
    // No user is signed in
    loginIcon.style.color = 'rgb(237, 237, 229)';
  }
};

//- Authentication state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    const userId = user.uid;
    console.log("User is signed in with UID:", userId);
    // document.querySelector('name').innerText = user.email


    updateLoginIcon(user);
    // loadUserData(userId);
  } else {
    console.log("No user logged in in.");
  }
});

//- Function to save gear sets in Firebase
const saveGearSetsToFirebase = (userId, savedGearSets) => {
  if (!userId) {
    console.error("No user ID provided. Cannot save gear sets.");
    return;
  }

  // Check for undefined values in savedGearSets
  const hasUndefined = Object.values(savedGearSets).some(value => value === undefined);
  if (hasUndefined) {
    console.error("Cannot save gear sets with undefined values:", savedGearSets);
    return;
  }

  set(ref(database, 'users/' + userId + '/gearSets'), savedGearSets)
  .then(() => {
      console.log('Gear sets saved to Firebase.');
  })
  .catch((error) => {
      console.error('Error saving gear sets to Firebase:', error);
  });
};


//! Login =-=-=-=-=-=-=-=
document.getElementById('login-button').addEventListener('click', e => {
  const email = document.getElementById('login-field-text').value
  const password = document.getElementById('login-field-password').value

  if (email != '' && password != ''){
    console.log('login in...');
    login(email, password)
  }
})

//! Sign Up =-=-=-=-=-=-=-=
document.getElementById('signup-button').addEventListener('click', e => {
  const email = document.getElementById('signup-field-text').value
  const password = document.getElementById('signup-field-password').value

  if ( email != '' && password != ''){
    console.log('Siging in...');
    signUp(email, password)
  }
})

//! Logout =-=-=-=-=-=-=-=
document.getElementById('logout').addEventListener('click', e => {
  logout()
  updateLoginIcon()
  alert('You Have Been Logged Out')
})

//! Style Js (open/closing popups, etc) =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function openGearWindow() {
  gearWindow.classList.remove('window-pop-reverse');
  gearWindow.classList.add('window-pop')
  //* focus() only if job was chosen, cause otherwise if I close window before timeout -> 🐛😅
  if (document.querySelector('.profile-job').firstElementChild.hasAttribute(`data-job`)) {
    // setTimeout(() => {
    //   gearSearchBar.focus()
    // }, 2000);
  }
}
function closeGearWindow() {
  gearSearchBar.blur() //* 'unfocus' the search bar
  gearWindow.classList.remove('window-pop')
  gearWindow.classList.add('window-pop-reverse');
  gearSearchBar.value = ''
}

function openJobSelector() {
  jobSelectorBG.classList.remove('hidden');
}
function closeJobSelector() {
  jobSelectorBG.classList.add('hidden');
}

function openProfileMenu(elem) {
  elem.classList.remove('window-pop-reverse');
  elem.classList.add('window-pop')
}
function closeProfileMenu(elem) {
  elem.classList.remove('window-pop')
  elem.classList.add('window-pop-reverse');
}

//! Closing Window When 'Click' Outside Of It
function outsideClickClose(windowName, closingWingowButton) {
  document.addEventListener('click', function(e) {

    //* if target is not in the popupwindow and not the close-button either --> then closes the popup
    if (!windowName.contains(e.target) && e.target !== closingWingowButton) {      
      //* kept closing even when not opened, so added condition to only close when it has the class that make it open 
      if (windowName.classList.contains('window-pop')){
        closeGearWindow()
      }
      closeJobSelector()
    }
  });
}

gearGrid.addEventListener('click', e => {
  const closestGearBox = e.target.closest('.gear-box');
  if (e.target.classList.contains('gear-box') || (closestGearBox && closestGearBox.hasAttribute('data-geartype'))) {

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

//! opening filter options menu =-=-=-=-=-=-=-=
burgerX.addEventListener('click', (e) => {
  // burgerX.classList.toggle('.close-burger')
  if (!e.target.closest('.close-burger')) {
    burgerX.classList.add('close-burger')
    e.stopPropagation();
    openProfileMenu(profileMenu)
  } else if (e.target.closest('.close-burger')) {
    burgerX.classList.remove('close-burger')
    closeProfileMenu(profileMenu)
  }
})
function outsideClickCloseProfileMenu() {
  document.addEventListener('click', function(e) {
    if (!profileMenu.contains(e.target) && e.target !== burgerX && profileMenu.classList.contains('window-pop')) {
      closeProfileMenu(profileMenu)
      burgerX.classList.remove('close-burger')
    }
  });
}
outsideClickCloseProfileMenu()

rangelvl.addEventListener('change', () => {
  if (rangelvl.value == 0) {
  document.querySelector('.chosen-lvl').innerHTML = 1
  } else{
    document.querySelector('.chosen-lvl').innerHTML = rangelvl.value
  }
})
console.log('min lvl gear : ', rangelvl.value);




//! bubble stats info =-=-=-=-=-=-=-=-
document.querySelector('.fa-circle-question').addEventListener('click', e => {
  document.querySelector('#bubble').classList.toggle('show')
  setTimeout(() => {
    document.querySelector('#bubble').classList.remove('show')
  }, 1800);
})

//! Forms =-=-=-=-=-=-=-=-=

function openFormLogins() {
  loginSignin.classList.remove('close')
  profileWrapper.classList.remove('window-pop-reverse')
  profileWrapper.classList.add('window-pop')
}
function toSignUpForm() {
  loginSignin.querySelectorAll(`.profile-wrapper`).forEach(elem => elem.classList.remove('close'));
  document.querySelector('.signup').classList.add('close')
}
function toLogInForm() {
  loginSignin.querySelectorAll(`.profile-wrapper`).forEach(elem => elem.classList.remove('close'));
  document.querySelector('.login').classList.add('close')
}
function emptyFormFieldValue() {
  document.querySelector('#login-field-text').value = ''
  document.querySelector('#login-field-password').value = ''
  document.querySelector('#signup-field-text').value = ''
  document.querySelector('#signup-field-password').value = ''
}
function closinFormPopUp() {
  if (profileWrapper.classList.contains('window-pop')){
    profileWrapper.classList.remove('window-pop')
    profileWrapper.classList.add('window-pop-reverse')
    emptyFormFieldValue()
  }
  profileWrapper.classList.add('window-pop-reverse')
  profileWrapper.classList.remove('window-pop')
  loginSignin.classList.add('close')
}

document.addEventListener('click', function(e) {
  //* open
  if (e.target.closest('.login-popup')) {
    openFormLogins()
    e.stopPropagation();
  }

  if(e.target.closest('.login-link')){
    toSignUpForm()
    document.getElementById('signup-error').innerText = '';
  }
  if (e.target.closest('.signup-link')) {
    toLogInForm()
    document.getElementById('signup-error').innerText = '';
  }

  if (document.querySelector('.blur-bg').contains(e.target)) {
    closinFormPopUp()
  }
});