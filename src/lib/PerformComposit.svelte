<script>
    import PerformDetail from "./PerformDetail.svelte";
    import BarChart from "./BarChart.svelte";
    import PieChart from "./PieChart.svelte";
    import { onMount } from "svelte";
    import {rooturl} from '../aqtstore';
    let selectedValue = '';
  
    let selected = true;
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
        return datas;
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
    let selectedRow = null;

    const handleRowClick = (idx) => {
      selectedRow = idx; // 현재 클릭된 row의 seq를 기준으로 선택 상태 설정
    };
</script>
{#if selected}
  <div class="flex justify-between">
    <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
      {#if dates.length !== 0}
        {#each dates as item, idx}
            <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisDt=item.asisDt; conds.lastDt=item.tobeDt; getPerformcompositTitle(); handleRowClick(idx);}}>
              <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
              <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisDt}">
              <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobeDt}">
              <!-- <button class="w-1/6 bx bx-search-alt-2" on:click={() => { conds.asisDt=item.asisDt; conds.lastDt=item.tobeDt; getPerformcompositTitle();}}>조회</button> -->
          </div>
        {/each}
      {/if}
    </div>
      <div class="flex flex-wrap flex-row items-center mx-2 w-9/12">
        {#if datas.length !== 0}
            {#each datas as item, idx}
            <div class="flex-col bg-gray-700 rounded-lg w-full" >
              <div class="flex w-full  border-b-2 border-gray-500 items-center">
                  <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{item.tname}</h1>
                  <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" on:click={() => { selected = false; selectedValue = item}}>{item.tobeDt}</h1>
              </div>
                <div class="flex flex-wrap w-full p-3 justify-center">
                  <div class="flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center">
                    <div class="flex w-2/6  justify-center items-center">
                      <PieChart page={'P'} date={item.tobeDt}></PieChart>
                    </div>
                  </div>
                  <div class="flex justify-center bg-gray-800 p-3 rounded-lg w-11/12 ">
                    <div class="w-9/12">
                      <BarChart page={'P'} date={item.tobeDt}></BarChart>
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