<script>
  
  import { onMount } from "svelte";
  import * as XLSX from "xlsx";
  import DonutChart from './DonutChart.svelte';
  import {rooturl, intlMs } from '../aqtstore';
  import TransformBoard from "./TransformBoard.svelte";
  import DashBoard from "./DashBoard.svelte";

  // let { sts  } = $props();
  
  export let getscenariodetaildata;
  export let sts;
  let selected = true;
  let pageNm = "시나리오";
  // let cnm = DashBoard;
  let list = [];

  onMount(async () => {

    //alert("sts="+sts);
    if(getscenariodetaildata.length !=0){
      console.log(getscenariodetaildata)
    }
      //alert("sts="+sts);
  });

  // 이전 페이지로 이동
  function goToPreviousPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }
  function   BeforeScenario() {
      //alert("이전버튼");
      selected=false;
      //alert("selected="+selected);
  }
  let currentPage = 1;
  let itemsPerPage = 10;

  $: paginatedlist = getscenariodetaildata.slice((currentPage - 1) * itemsPerPage,currentPage * itemsPerPage);
  $: totalPages = Math.ceil(getscenariodetaildata.length / itemsPerPage);
    // alert( paginatedlist.length);
  
   function goToPage(page) {
       if (page > 0 && page <= totalPages) {
          currentPage = page;
      }
  }
</script>

<style>
  
    
  .input-boder {
    
    padding: 8px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    border-radius: 4px;
  }
 



th {
    background-color: #333; /* 헤더 배경 색상 */
    color: yellow; /* 헤더 텍스트 색상 */
    text-align: center;
}

td {
    padding: 8px; /* 패딩 추가 */
    text-align: center; /* 중앙 정렬 */
}

tr:hover {
    background-color: #7dfc06; /* 호버 시 배경 색상 */
}
</style>
{#if selected}
<div class="mx-auto p-3 w-12/12 h-5/6">
  <div class="flex justify-between">
    <!-- <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" > -->
      <!-- <div class="flex  border  border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { handleRowClick(idx); getPerformcompositList(); }}>
        <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">{$t("performDetail.leftTitle")}</label>
        <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">{$t("performDetail.leftDate1")}</label>
        <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">{$t("performDetail.leftDate2")}</label>
      </div>
      {#if leftDates.length !== 0}
        {#each leftDates as item, idx}
            <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { handleRowClick(idx); getPerformcompositList(); }}>
              <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
              <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisdt}" readonly>
              <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobedt}" readonly>
          </div>
        {/each}
      {/if} -->
    <!-- </div> -->
      
    <div class="flex flex-wrap flex-row items-center mx-2 w-full ">
      <!-- {#if leftDates.length !== 0} -->
          <div class="flex-col bg-gray-700 rounded-lg w-full" >
            <div class="flex w-full  border-b-2 border-gray-500 items-center">
                <!-- <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{leftDates[selectedRow].tname} {$t("performDetail.title")}</h1>
                <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" >{$t("performDetail.date")} {leftDates[selectedRow].tobedt}</h1>
                <div class="w-36 px-4 text-end">
                  <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"  on:click={() => { selected = false; }}>{$t("com.btn.prePage")}</button>
                </div>   -->
              </div>
              <div class="flex justify-end items-center w-full mt-3">
                <!-- <label class="text-gray-300">{$t("performDetail.search1")}</label> -->
                <!-- <select on:change={currentPage = 1} bind:value={selectedStatus}  class="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-10">
                  {#each $t("com.sel.status.perform") as item}
                  <option value={item.key}>{item.value}</option>
                  {/each}
                </select> -->
                <!-- <button class="bg-green-500 hover:bg-green-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3  ml-10" on:click={excelDown}>{$t("com.btn.excelDown")}</button> -->
                <div class="px-4 text-start ">
                  <!-- <label class="text-gray-300">이행 상세페이지</label> -->
                </div> 
                <!-- <div class="flex gap-4 justify-end mr-14 input-boder">
                    <div class="w-36 px-4 text-end ">
                      <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"  on:click={() => {  BeforeScenario() }}>이전보기</button>
                    </div> 
                </div> -->
                <div class="flex gap-4 justify-end mr-14 mt-2">
                  {#if sts !=5}
                  <label class="text-gray-300">상태</label>
                  <select  class="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-10">
                    <option  value="user">수행중</option>
                    <option value="admin">미진행</option>
                    <option value="user">지연</option>
                  </select>
                  {:else}
                  
                  {/if}
                  <button class="bg-green-500 hover:bg-green-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Excel download
                  </button>
                  <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline text-end"  on:click={() => {  BeforeScenario() }}>이전보기</button>
                </div>
              </div>
              
              <div class="flex flex-wrap w-full p-3 justify-center " >
                <!-- <div class="flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center overflow-auto"> -->
                  <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg "  >
                  <table class="w-full text-md bg-gray-800 text-white text-nowrap shadow-md rounded mb-4" style="border: 1px solid #ccc">
                    <thead>
                    <tr class="border-b text-sm w-full">
                      <th class="text-left p-3 px-5  border border-white" style="text-align: center;" colspan="4">구분</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" colspan="6">작업 TASK</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" colspan="3">본이행 예상소요시간</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" colspan="3">실제 소요시간</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" colspan="2">등록자(작업자)</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" colspan="4">작업 방법 및 원복방안</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" rowspan="2">진행상태</th>
                      <th class="text-left p-3 px-5 border border-white" style="text-align: center;" rowspan="2">비고</th>
                  </tr>
                  <tr class="border-b text-sm">
                      <th class="text-left p-3 px-5 border border-white">TASKID</th>
                      <th class="text-left p-3 px-5 border border-white">주제영역</th>
                      <th class="text-left p-3 px-5 border border-white">위치</th>
                      <th class="text-left p-3 px-5 border border-white">파트/작업 위치</th>
                      <th class="text-left p-3 px-  border border-white">Level1(단계)</th>
                      <th class="text-left p-3 px-  border border-white">Level2</th>
                      <th class="text-left p-3 px-  border border-white">Level3(TASK)</th>
                      <th class="text-left p-3 px-  border border-white">TaskDetail</th>
                      <th class="text-left p-3 px-  border border-white">선행ID</th>
                      <th class="text-left p-3 px-  border border-white">병행ID</th>
                      <th class="text-left p-3 px-  border border-white">소요</th>
                      <th class="text-left p-3 px-  border border-white">시작</th>
                      <th class="text-left p-3 px-  border border-white">종료</th>
                      <th class="text-left p-3 px-  border border-white">소요</th>
                      <th class="text-left p-3 px-  border border-white">시작</th>
                      <th class="text-left p-3 px-  border border-white">종료</th>
                      <th class="text-left p-3 px-  border border-white">SI</th>
                      <th class="text-left p-3 px-  border border-white">SM</th>
                      <th class="text-left p-3 px-  border border-white">수행서버</th>
                      <th class="text-left p-3 px-  border border-white">작업 방안(Commandlevel)</th>
                      <th class="text-left p-3 px-  border border-white">첨부화일(Checklist,점검목록 등)</th>
                  </tr> 
              </thead> 

                      <tbody>

                      {#if paginatedlist.length > 0}
                        {#if sts !=5}
                          {#each paginatedlist as item, index}
                                  <tr class="border-b hover:bg-orange-100 border-spacing-4 {index % 2 === 0 ? '' : ''}">
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.pkey} class="bg-transparent text-center"/> 
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.mid} class="bg-transparent text-center"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.scno} class="bg-transparent w-4"/> 
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.scgrp} class="bg-transparent "/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.midnm} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.worknm} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.planStdt} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.planEndt} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.wstatnm} class="bg-transparent "/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.ActStdt} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.ActEndt} class="bg-transparent"/> 
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.esttime} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.acttime} class="bg-transparent"/> 
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.wstat} class="bg-transparent"/> 
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.scenario} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.tmignm} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.mgb} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.startdt} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                          <input type="text" bind:value={item.endDt} class="bg-transparent"/>
                                      </td>
                                      <td class="p-3 px-5 border border-white">
                                        <input type="text" bind:value={item.mclass} class="bg-transparent"/>
                                      </td>
                                  </tr>
                              {/each}
                        {:else}
                            {#each paginatedlist as item, index}
                            <tr class="border-b hover:bg-orange-100 border-spacing-4 {index % 2 === 0 ? '' : ''}">
                              <td class="p-3 px-5  border border-white">
                                  <input type="text" bind:value={item.pkey} class="bg-transparent text-center" disabled /> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.mid} class="bg-transparent text-center" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.scno} class="bg-transparent w-4" disabled/> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.scgrp} class="bg-transparent" disabled/> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.midnm} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.worknm} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.planStdt} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.planEndt} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.wstatnm} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5  border border-white">
                                <input type="text" bind:value={item.ActStdt} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.ActEndt} class="bg-transparent" disabled> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.esttime} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.acttime} class="bg-transparent" disabled/> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.wstat} class="bg-transparent" disabled/> 
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.scenario} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.tmignm} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5  border border-white">
                                <input type="text" bind:value={item.mgb} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                <input type="text" bind:value={item.startdt} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5 border border-white">
                                  <input type="text" bind:value={item.endDt} class="bg-transparent" disabled/>
                              </td>
                              <td class="p-3 px-5  border border-white">
                                <input type="text" bind:value={item.mclass} class="bg-transparent" disabled/>
                              </td>
                          </tr>
                            {/each} 
                        {/if}
                        {:else}
                            <tr>
                                <td colspan="24" class="p-3 px-5 text-center text-yellow-100">시나리오가 없습니다.</td>
                            </tr>
                      {/if}
                      </tbody>
                  </table>
                  </div>
                  <div class="flex w-full justify-center mt-4">
                    <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                      <!-- {$t("com.paging.previous")} -->
                      Previous
                    </button>
                    {#each Array(totalPages).fill() as _, pageIndex}
                        <button class="px-3 py-1 bg-gray-300 text-black rounded mx-1 hover:bg-gray-500" class:bg-gray-700={pageIndex + 1 === currentPage} on:click={() => goToPage(pageIndex + 1)}>
                            {pageIndex + 1}
                        </button>
                    {/each}
                    <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      <!-- {$t("com.paging.next")} -->
                       Next
                    </button>
                </div>
              </div>
          </div>
      </div>
    </div>
</div>
{:else}
<TransformBoard></TransformBoard>
{/if}
