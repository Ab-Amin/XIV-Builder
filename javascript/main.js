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
import * as gearVar from './numberToName.js'

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
const gearWindow = document.querySelector('.search-window')
const gearWindowX = document.querySelector('.search-window--x')

const jobSelector = document.querySelector('.job-selector') 
const jobSelectorBG = document.querySelector('.dark-bg')
const jobSelectorX = document.querySelector('.job-selector--x')

//! =-=-=-=-=| lists |=-=-=-=-=
let itemData = [];
let choosenJob = [];

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

  //! =-=-=-=-=| Job Selector |=-=-=-=-=-=
  // todo : take job selected into profile 
  // todo : give warning if didn't save, will lose previous 'build'

  //? GPT : Flatten the Array: Since your array contains objects that further contain arrays of job information, you need to flatten this structure to easily search through it. 
  //? --> flatMap(...)

  //! Function that give info from my info.json based on CSVcode
  function findJobByCSVcode(code) {
    //* Flatten the arrays inside jobInfo
    const allJobs = data.jobInfo.flatMap(category => {
      //* Flatten each category's job array
      return Object.values(category).flat();
    })

    //* Find the job with the matching CSVcode
    const job = allJobs.find(job => job.CSVcode === code);

    //* Return an object with both names if found, otherwise return a not found message
    //* return (job ? job.jobicon : 'Job not found')
    if (job) {
      return {
        jobstone: job.jobstone,
        jobicon: job.jobicon,
        shortname: job.shortname
      };
    } else {
      return 'Job not found';
    }
  }

  //* When selection job --> will change profile + stone and short job name
  jobSelector.addEventListener('click', e => {

    //*1st condition to avoid having an error when 'click' on empty zones (on popup)
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
        <span>${jobInfo.shortname}</span>
      `
    }

  })

})
.catch(error => {console.log("Erreur lors de la récup des données :", error)})


//! =-=-=-=-=| CSV fetch |=-=-=-=-=
/* 
  ! for pc version
  todo : quand clique sur case d'equipemment -> lui donne "draggable" et a tout les equipement dans la search window
  todo : quand cloque off le search window, enlever toutes les classe draggeable
*/

async function fetchData() {
  try {
    const [firstResponse, secondResponse] = await Promise.all([
      fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv'),
      fetch('numberToName.json')
    ]);

    //* csv response to text -> then split into rows and columns to convert the CSV ino a .json
    const csvText = await firstResponse.text();
    const rows = csvText.split('\n');
    const csvData = rows.map(row => row.split(','));

    const secondJsonData = await secondResponse.json();

    // console.log('First fetch data:', csvData);
    // console.log('Second fetch data:', secondJsonData);



    //! =-=-=-=-=| Search Window |=-=-=-=-=
    // todo : log every item name to put them in a "search bar" (????)
    // // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
    // todo : if scrolling to the point of not seeing search bar => arrow 'back to top' apprears

    // example : Allegiance set (head, body, hand, etc) => gear exclusif to gnb, 
    // if i only write 'allegiance', should display every gear that contains the  word 'allegiance' 


    //! =-=-=| Gear to Display |=-=-=
    // // todo : condition #1 : get job taken and add it as a condition for gears to appear
    // // todo : condition #2 : get data-geartype
    /*
      todo : display every gear that the job can equip, not only the specified one
      todo ↑ for example : if job is PLD(20) find a way to also have the gear that have PLD in their value (like gla, PLD) to display too
    */

    gearGrid.addEventListener('click', e => {

      if (document.querySelector('.profile-job').firstElementChild.hasAttribute(`data-job`) && e.target.hasAttribute('data-geartype')) {
        
        //* gets data-job from profile instead of choosenjob list
        let Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)
        let gearType = e.target.getAttribute('data-geartype')
        // console.log(`${gearType} Type Gear for ${Number(Job)} `);

        searchResults.innerHTML = ''

        
        for (let i = 0; i < csvData.length; i++) {

          //* will display gear if is equipable by selected job
          if ( csvData[i][gearVar.jobReq] === Job &&  csvData[i][gearVar.equipSlot] === gearType) {

            searchResults.innerHTML += `
            <div class="item">
              <div>
                <img src="https://lds-img.finalfantasyxiv.com/itemicon/66/665f0061dcd3853e6d3ccf315b7629ac8d0fdf32.png?n6.58" alt="">
              </div>
              <div>
                <span>${csvData[i][gearVar.SingItemName]}</span>
                <span>lvl ${csvData[i][gearVar.levelReq]}, Ilvl ${csvData[i][gearVar.itemLevel]}</span>
                <div class="bonuses">
                  <span>class name here : ${csvData[i][44]}</span>
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
            `
          } 

        }

      }

    })


    //! =-=-=| On Search |=-=-= 
    // todo : link itemName with a search bar (addEventListener)
    // todo : add condition that if contains a part of the full gear name, will show every gear that contains that part of the word

    const itemName = `"Auri Gown"`;

    for (let i = 0; i < csvData.length; i++) {

      //* data[i][1] : to skip any undefined or null values
      //* .toLowerCase() to make comparisons case-insensitive
      //* .includes to check if one string is contained within another

      if (csvData[i][10] && csvData[i][gearVar.SingItemName].toLowerCase().includes(itemName.toLowerCase())) {
        itemData.push({ 
          dataInfo : {
            itemId : csvData[i][0],
            row: i,
          },
          "singularName" : csvData[i][gearVar.SingItemName],
          // "iconcode" : data[i][icon],
          // "levelReq" : data[i][levelReq],
          // "itemLevel" : data[i][itemLevel],
          "className" : csvData[i][44],
          "gearType" : csvData[i][18],
        });
        console.log(csvData[i]);
      }
    }
    console.log(`${itemName} info :`, itemData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();







//! =-=-=-=-=| Window Popup |=-=-=-=-=
// todo : job selector popup when clicking on job-stone too

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
  if (e.target.classList.contains('gear-box')) {

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