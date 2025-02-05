<script>
  import TestDetail from "./TestDetail.svelte";
  import BarChart from "./BarChart.svelte";
  import PieChart from "./PieChart.svelte";
  import { onMount } from "svelte";
  import {rooturl} from '../aqtstore';
  let selectedValue = '';

  let selected = true;
  let conds = {
    asisdt: "",
    lastDt: "",
    idx:0
  };

  let dates = [];
  let datas = [];
  let childBarRef;
  let childPieRef;
  
  //차수, ASIS 일자, TOBE 일자 조회
  async function getTestcomposit() {
    const res = await fetch($rooturl + "/testcomposit");
    if (res.ok){
      return await res.json();
    }else
      throw new Error(res.statusText);
  }

  onMount(async () => {
    dates = await getTestcomposit();
    if(dates.length > 0){
      conds.asisdt = dates[0].asisdt;
      conds.lastDt = dates[0].tobedt;
      datas = dates[selectedRow];
      console.log(datas);
    }
  });
  let selectedRow = 0;

  const handleRowClick = (idx) => {
    selectedRow = idx; // 현재 클릭된 row의 seq를 기준으로 선택 상태 설정
    datas = dates[idx];
  };
</script>
{#if selected}
<div class="flex justify-between">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
    <div class="flex  border border-gray-100 rounded border-zinc-600  text-zinc-100 ">
      <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">차수 </label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">Asis</label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">Tobe</label>
    </div>
    {#if dates.length !== 0}
      {#each dates as item, idx}
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisdt=item.asisdt; conds.lastDt=item.tobedt; conds.idx=idx; handleRowClick(idx);}}>
            <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisdt}" disabled>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobedt}" disabled>
          </div>
      {/each}
    {/if}
  </div>
    <div class="flex flex-wrap flex-row items-center mx-2 w-9/12">
        {#if datas}
        <div class="flex-col bg-gray-700 rounded-lg w-full" >
          <div class="flex w-full  border-b-2 border-gray-500 items-center">
              <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{datas?.tname}</h1>
              <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" on:click={() => { selected = false; }}>수행 일자: {datas.tobedt}</h1>
          </div>
            <div class="flex flex-wrap w-full p-3 justify-center">
              <div class="flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center">
                <div class="flex w-2/6  justify-center items-center">
                  <PieChart page={'T'} date={datas} bind:this={childPieRef} title={datas.tname} ></PieChart>
                </div>
              </div>
              <div class="flex justify-center bg-gray-800 p-3 rounded-lg w-11/12 ">
                <div class="w-9/12">
                  <BarChart page={'T'} date={datas} bind:this={childBarRef} ></BarChart>
                </div>
              </div>
              
            </div>
        </div>
        {/if}
  </div>
</div>
{:else}
  <TestDetail {selectedValue}></TestDetail>
{/if}