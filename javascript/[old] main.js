//! =-=-=-=-=| CSV fetch |=-=-=-=-=
/* 
  ! for pc version
  todo : (idea) quand clique sur case d'equipemment -> lui donne "draggable" et a tout les equipement dans la search window
  todo : (idea) quand cloque off le search window, enlever toutes les classe draggeable
*/
async function fetchData() {
  try {
    //! Add Icon API fetch
    const [csvResponse, firstResponse, secondResponse ] = await Promise.all([
      fetch('https://raw.githubusercontent.com/xivapi/ffxiv-datamining/master/csv/Item.csv'),
      fetch('info.json'),
      fetch('numberToName.json')
    ]);
    //* csv response to text -> then split into rows and columns to convert the CSV ino a .json
    const csvText = await csvResponse.text();
    const rows = csvText.split('\n');
    const csvData = rows.map(row => row.split(','));
    const firstJsonData = await firstResponse.json();
    const secondJsonData = await secondResponse.json();
    // console.log('CSV fetch:', csvData);
    // console.log('First fetch data:', firstJsonData);
    // console.log('Second fetch data:', secondJsonData);
    //! =-=-=-=-=| Search Window |=-=-=-=-=
    // // todo : sort by equip slot category (if excel[18] == 1/2/3/4/... { => main/off hand,head,body,... })
    // todo : optimisation (don't display all items at once, only when is about to enter(scroll) the viewport add more item)
    // todo : able to search for gear name on search bar (even if only writting half the name)
 
 
    //! =-=-=| Gear to Display |=-=-=
    // // todo : condition #1 : get job taken and add it as a condition for gears to appear
    // // todo : condition #2 : get data-geartype
    // // todo : display every gear that the job can equip, not only the specified one
    // // todo ↑ for example : if job is PLD(20) find a way to also have the gear that have PLD in their value (like gla, PLD) to display too
    // todo : if scrolling to the point of not seeing search bar => arrow 'back to top' apprears
 
    gearGrid.addEventListener('click', e => {
      //* if a job has been choosen + clicked on a gear slot
      if (document.querySelector('.profile-job').firstElementChild.hasAttribute(`data-job`) && e.target.closest('.gear-box').hasAttribute('data-geartype')) {
        //* gets data-job from profile instead of choosenjob list
        let Job = document.querySelector('.profile-job').firstElementChild.getAttribute(`data-job`)
        let gearType = e.target.closest('.gear-box').getAttribute('data-geartype')
        let gearType1 = e.target.closest('.gear-box').getAttribute('data-geartype1')
        console.log(`Gear Type ${gearType} for ${Number(Job)} `);
     
        searchResults.innerHTML = ''
        /*
        ! TEST to get accessory gear to appear on search window 
        // todo : Need to get the shortname of job with the number (should do with firstJsonData) 
        // todo : Then take the shortname and search through secondJsonData all the number that contains that shortname (ex : 23 -> DRG; 47 -> lnc, DRG)
        // todo : Return those number and innerHTML in clicked accessory gear all of the gear
        // * (at least that's the plan :)
        */
        //! Get All gear that job is a part of (ex : DRG(23) is part of 47(lnc, DRG) too) ;-;
        function fullJobNbrList() {
          function findJobShortname(jobNbr) {
            //- Flatten the arrays inside jobInfo
            const allJobs = firstJsonData.jobInfo.flatMap(category => {
              //- Flatten each category's job array
              return Object.values(category).flat();
            })
     
            //- Find the job with the matching CSVcode
            const findJob = allJobs.find(job => job.CSVcode === jobNbr);
     
            //- Return an object with both names if found, otherwise return a not found message
            //- return (job ? job.jobicon : 'Job not found')
            if (findJob) {
              // console.log('Job name is : ' + findJob.shortname);
              return (findJob.shortname) 
            }
          } //* ex : will return for "23" (main job only) --> "DRG"
          //- numberToName.json list
          const numToName = secondJsonData.numToName[0];
          //- Function to find numbers that include shortname of job
          function findNumbersWithshortname(obj) {
            const result = [];
            for (const key in obj) {
              if (obj[key].includes( findJobShortname(Number(Job)) )) {
                result.push(key);
              }
            }
            return result; 
          } //* ex : will return for DRG --> '["23", "47", "84", "76"]'   
          //- Use the function to get the numbers
          //* will get list of job numbers with the number of the main job we have (ex : from "23" to ["23", "47", "84", "76"])
          //* findNumbersWithshortname( secondJsonData.numToName[0] --> findJobShortname( findJobShortname( Job ) ) )
          // console.log(findNumbersWithshortname(numToName));
          return findNumbersWithshortname(numToName); //* ex : ["23", "47"] (--> 'DRG', 'lnc, DRG')
       
        }
        
        function gearItemDisplay() {
       
          for (let i = 0; i < csvData.length; i++) {
            //! Gear Icons (from XIVAPI) 
            function iconFunction() {
              let icon_id = csvData[i][gearVar.icons]
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
              // console.log(csvData[i][gearVar.itemId] + ' ==> ' +  path);
            }
            // todo : here -> if job is paladin, switch equipslot from main hand (13) to main hand (1)
            //* will display gear if is equipable by selected job
            if ( 
              // csvData[i][gearVar.jobReq] === Job && 
              fullJobNbrList().includes(csvData[i][gearVar.jobReq]) &&
              csvData[i][gearVar.equipSlot] === gearType ){
           
              // console.log(typeof(Job));
              console.log(` In All Job condition --> job : ${Job}, gearType : ${gearType}`);
              //! Gear Display on search window
              /*
                todo : find way to translate numbers to name and asign them to the right stats ... (BaseParam[0,1,2,3] -> BaseParamValue[0,1,2,3])
                BaseParam (number to name)
                1 = strength
                2 = dexterity
                3 = vitality
                4 = intelligence
                5 = mind
                6 = piety
                22 = direct hit rate
                27 = critical hit
                44 = determination
                45 = skill speed
                46 = spell speed
                184 = tenacity
              */
              let path = iconFunction()
              // searchedGear.push({
              //   'itemid' :  csvData[i][gearVar.itemId],
              //   'dataGearType' : gearType,
              //   'path' : path,
              //   'itemName' : csvData[i][gearVar.SingItemName],
              //   'levelReq' : csvData[i][gearVar.levelReq],
              //   'ilvl' : csvData[i][gearVar.itemLevel],
              //   'classjob' : csvData[i][44]
              // })
           // searchResults.innerHTML += `
           //   <div class="item" data-itemid="${csvData[i][gearVar.itemId]}" data-geartype="${gearType}">
           //     <div data-iconId="${path}">
           //       <img src="https://xivapi.com/i/${path}.png" alt="">
           //     </div>
           //     <div>
           //       <span>${csvData[i][gearVar.SingItemName]}</span>
           //       <span>lvl ${csvData[i][gearVar.levelReq]}, Ilvl ${csvData[i][gearVar.itemLevel]}</span>
           //       <div class="bonuses">
           //         <span>class name here : ${csvData[i][44]}</span>
           //         <hr>
           //         <div class="stats">
           //           <p><span>dexterity</span> +98</p>
           //           <p><span>critical hit</span> +96</p>
           //           <p><span>vitality</span> +103</p>
           //           <p><span>determination</span> +67</p>
           //         </div>
           //       </div>
           //     </div>
           //   </div>
           // `
            } else if ( gearType1 && csvData[i][gearVar.jobReq] === Job && csvData[i][gearVar.equipSlot] === gearType1 ) {
              console.log('in PLD weapon condition');
              let path = iconFunction()
              searchResults.innerHTML += `
                <div class="item" data-itemid="${csvData[i][gearVar.itemId]}" data-geartype="${gearType1}">
                  <div data-iconId="${path}">
                    <img src="https://xivapi.com/i/${path}.png" alt="">
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
        
            // else if ( 
            //   csvData[i][gearVar.jobReq] === Job &&
            //   ['9', '10', '11', '12'].includes(gearType) &&
            //   csvData[i][gearVar.equipSlot] === '9' ||
            //   csvData[i][gearVar.equipSlot] === '10' ||
            //   csvData[i][gearVar.equipSlot] === '11' ||
            //   csvData[i][gearVar.equipSlot] === '12'
            // ){
            //* can shorten if to 👇 
            // else if (
            //   // fullJobNbrList().includes(csvData[i][gearVar.jobReq]) &&
            //   ['180'].includes(csvData[i][gearVar.jobReq]) &&
            //   ['9', '10', '11', '12'].includes(csvData[i][gearVar.equipSlot]) && 
            //   ['9', '10', '11', '12'].includes(gearType)
            // ) {
            //   //* if has choosen a job and gear is an accessory
            //   console.log('In Accessories');
            //   //- Check if the number is in the nbrWithShortname array
            //   if (nbrWithShortname.includes(Job)) {
            //     // console.log(`${Job} is in the list of numbers with ${findJobShortname(Number(Job))}.`);
             
            //     let path = iconFunction()
            //     searchResults.innerHTML += `
            //       <div class="item" data-itemid="${csvData[i][gearVar.itemId]}" data-geartype="${gearType1}">
            //         <div data-iconId="${path}">
            //           <img src="https://xivapi.com/i/${path}.png" alt="">
            //         </div>
            //         <div>
            //           <span>${csvData[i][gearVar.SingItemName]}</span>
            //           <span>lvl ${csvData[i][gearVar.levelReq]}, Ilvl ${csvData[i][gearVar.itemLevel]}</span>
            //           <div class="bonuses">
            //             <span>class name here : ${csvData[i][44]}</span>
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
            //     `
            //   }
            // }
             /* else {
              console.log('no item found')
              searchResults.innerHTML += `
                <div class="item">
                  <div style="
                    color: white;
                    font-size: 14px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    ">
                    Nothing To See Here o_o
                  </div>
                </div>
              `
            } */
          }
        }
      }
     
    })
    //! =-=-=| On Search |=-=-= 
    // todo : link itemName with a search bar (addEventListener)
    // todo : add condition that if contains a part of the full gear name, will show every gear that contains that part of the word
    const itemName = `"Drachen Armet"`;
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
          // "BlockRate" : csvData[i][62],
          // "Block" : csvData[i][63],
          // "Defense{Phys}" : csvData[i][64],
          // "Defense{Mag}" : csvData[i][65],
          // "BaseParam[0]" : csvData[i][66],
          // "BaseParamValue[0]" : csvData[i][67],
          // "BaseParam[1]" : csvData[i][68],
          // "BaseParamValue[1]" : csvData[i][69],
          // "BaseParam[2]" : csvData[i][70],
          // "BaseParamValue[2]" : csvData[i][71],
          // "BaseParam[3]" : csvData[i][72],
          // "BaseParamValue[3]" : csvData[i][73],
          // "BaseParam[4]" : csvData[i][74],
          // "BaseParamValue[4]" : csvData[i][75],
          // "BaseParam[5]" : csvData[i][76],
          // "BaseParamValue[5]" : csvData[i][77]
        });
        // console.log(csvData[i]);
      }
    }
    console.log(`${itemName} info :`, itemData);
    //! Gearing (click on gear to equip it)
    /*
      todo : if target has class 'item' and 'data-itemid' and 'data-geartype' 
      * --> take id that and add it to the corresponding gear type on equipement (with fetch since i should have the id and gearslot and icon) 
      * --> funciton to close the search popup
    */
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
        // * --> go to gearGrid childelement(or smthg like that ._.) that has 'data-geartype' mathing the 'dataGearSlot' and then innerHtml in it the gear
     
        if ( gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`) ) {
          gearGrid.querySelector(`[data-geartype="${dataGearSlot}"]`).innerHTML = `
            <img src="https://xivapi.com/i/${dataIconId}.png" alt="" title="043088">
          `
        }
 
      }
    })
 
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchData();