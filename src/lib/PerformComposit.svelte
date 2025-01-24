<script>
    import PerformDetail from "./PerformDetail.svelte";
    import BarChart from "./BarChart.svelte";
    import PieChart from "./PieChart.svelte";
    import { onMount } from "svelte";
    import {rooturl} from '../aqtstore';
    
    let selected = true;
    let selectedValue = '';
    let conds = {
      asisDt: "",
      lastDt: ""
    };

    let dates = [];
    let datas = [];
    
    //차수, ASIS 일자, TOBE 일자 조회
    async function getPerformcomposit() {
      const res = await fetch($rooturl + "/performcomposit" );
      if (res.ok){
      
        return await res.json();
      }else
        throw new Error(res.statusText);
    }

    async function getPerformcompositTitle() {
      console.log("asisDt:"+conds.asisDt +" lastDt:"+conds.lastDt);
      const res = await fetch($rooturl + "/performcomposit/perfcomp_title?asisDt=" + conds.asisDt + "&lastDt=" + conds.lastDt);
      console.log(res);
      if (res.ok){
        datas = await res.json();
        return await res.json();
      }
      else
        throw new Error(res.statusText);
    }
    onMount(async () => {
      dates = await getPerformcomposit();
      console.log("dates:" + JSON.stringify(dates));
      
      //[{"seq":"1차","asisDt":"2025-01-02","lastDt":"2025-01-20"}]
      if(dates.length > 0){
        conds.asisDt = dates[0].asisDt;
        conds.lastDt = dates[0].tobeDt;
        datas = await getPerformcompositTitle();
      }
      //[{"tname":"성능1차 테스트 결과","lastDt":"2025-01-20"}]
      console.log("datas:" + JSON.stringify(datas));
    });
   
</script>
<style>
  
  .width-19 { width: 15%;}
  .width-29 { width: 29%;}
  .width-24 { width: 24%;}
  .width-49 { width: 49%;}
  .width-35 { width: 35%;}
  .width-69 { width: 69%;}
  .width-74 { width: 74%;}
  .width-79 { width: 79%;}
  .width-85 { width: 85%;}
  .width-100 { width: 100%;}
  
</style>
{#if selected}
  <div class="flex h-full justify-between width-100">
    <div class="width-24 bg-gray-700 rounded-lg flex-wrap" >
        <div class="p-3">
      {#if dates.length !== 0}
        {#each dates as item, idx}
            <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 ">
              <label class="px-3 w-1/4 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600">{item.seq}</label>
              <input type="text" class="w-2/6 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600" value="{item.asisDt}">
              <input type="text" class="w-2/6 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600" value="{item.tobeDt}">
              <button class="w-1/6 bx bx-search-alt-2" on:click={() => { conds.asisDt=item.asisDt; conds.lastDt=item.tobeDt; getPerformcompositTitle();}}>조회</button>
          </div>
        {/each}
      {/if}
      </div>
    </div>
      <div class="flex flex-wrap flex-row items-center width-74 ">
        <!-- {#await datas then rows} -->
        {#if datas.length !== 0}
            {#each datas as item, idx}
            <div class="flex-col bg-gray-700 rounded-lg w-full" >
              <div class="flex w-full  border-b-2 border-gray-500 items-center">
                <div class="flex w-3/5 items-center">
                  <h1 class="text-2xl  tracking-tight text-yellow-100 p-3">{item.tname}</h1>
                </div>
                <div class="w-2/5 flex justify-end">
                  <h1 class="text-1xl  tracking-tight text-yellow-100 p-3" on:click={() => { selected = false; selectedValue = item}}>{item.tobeDt}</h1>
                </div>
              </div>
              <div class="flex-col rounded-lg">
                <div class="flex flex-wrap justify-between w-full p-3">
                  <div class="flex p-2 bg-gray-800 p-3 rounded-lg w-full justify-center justify-items-center align-center">
                    <div class="flex items-center width-85" style="width: 64%;">
                      <BarChart page={'P'} date={item.tobeDt}></BarChart>
                    </div>
                  </div>
                  <div class="flex p-2 bg-gray-800 p-3 rounded-lg w-full justify-center justify-items-center mt-3">
                    <div class="fle width-39"  style="width: 32%;">
                      <PieChart page={'P'} date={item.tobeDt}></PieChart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        {/each}
      {/if}
    </div>
  </div>
{:else}
    <PerformDetail {selectedValue}></PerformDetail>
{/if}