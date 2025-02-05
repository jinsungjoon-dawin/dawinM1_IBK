<script>
  import TestComposit from "./TestComposit.svelte";
  import BarChart from "./BarChart.svelte";
  import PieChart from "./PieChart.svelte";
  import { onMount } from "svelte";
  import {rooturl} from '../aqtstore';
  export let selectedValue = '';
  import * as XLSX from 'xlsx';

  let selected = true;
  let conds = {
    asisdt: "",
    tobedt: ""
  };

  let dates = [];
  let datas = [];
  let list = [];
  
  //차수, ASIS 일자, TOBE 일자 조회
  async function getPerformcomposit() {
    const res = await fetch($rooturl + "/performcomposit" );
    if (res.ok){
    
      return await res.json();
    }else
      throw new Error(res.statusText);
  }


  async function getPerformcompositList() {
    
    const res = await fetch($rooturl + "/performdetail/perfde_list?asisdt=" + conds.asisdt + "&tobedt=" + conds.tobedt);
    if (res.ok){
      list = await res.json();
      return list;
    }
    else
      throw new Error(res.statusText);
  }

  onMount(async () => {
    dates = await getPerformcomposit();
    
    //[{"seq":"1차","asisdt":"2025-01-02","tobedt":"2025-01-20"}]
    if(dates.length > 0){
      conds.asisdt = dates[0].asisdt;
      conds.tobedt = dates[0].tobedt;
      list = await getPerformcompositList();
    }
    //[{"tname":"성능1차 테스트 결과","tobedt":"2025-01-20"}]
  });

  function exportToExcel() {
    // JSON 데이터를 Worksheet로 변환
    // const worksheet = XLSX.utils.json_to_sheet(list);
    // 기본 데이터를 엑셀 시트로 변환 (헤더 없음)
    const worksheet = XLSX.utils.json_to_sheet(list, { skipHeader: true });
    // ✅ 사용자 정의 헤더 추가 (A1 행에 직접 추가)
    XLSX.utils.sheet_add_aoa(worksheet, [["업무명", "구분", "테스트일시","시작시간","종료시간","소요시간","ASIS시작시간","ASIS종료시간","ASIS소요시간","등록시간"]], { origin: "A1" });

    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 엑셀 파일 생성
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    
    // Blob을 사용하여 파일 다운로드
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "테스트결과.xlsx";
    document.body.appendChild(a);
    a.click();
    
    // 정리
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  let selectedRow = 0;

  const handleRowClick = (idx) => {
    selectedRow = idx; // 현재 클릭된 row의 seq를 기준으로 선택 상태 설정
  };

  
  

  let currentPage = 1;
  let itemsPerPage = 10;

  $: paginatedlist = list.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  $: totalPages = Math.ceil(list.length / itemsPerPage);

  function goToPage(page) {
      if (page > 0 && page <= totalPages) {
          currentPage = page;
      }
  }

  function printTable() {
      window.print();
  }
</script>
{#if selected}
<div class="flex justify-between">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
    <div class="flex  border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; getPerformcompositList(); handleRowClick(idx);}}>
      <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">차수 </label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">Asis</label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">Tobe</label>
    </div>
    {#if dates.length !== 0}
      {#each dates as item, idx}
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; ; getPerformcompositList(); handleRowClick(idx);}}>
            <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisdt}">
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobedt}">
            <!-- <button class="w-1/6 bx bx-search-alt-2" on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; }}>조회</button> -->
        </div>
      {/each}
    {/if}
  </div>
    
  <div class="flex flex-wrap flex-row items-center mx-2 w-9/12">
    {#if dates.length !== 0}
        <!-- {#each datas as item, idx} -->
        <div class="flex-col bg-gray-700 rounded-lg w-full" >
          <div class="flex w-full  border-b-2 border-gray-500 items-center">
              <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{dates[selectedRow].tname}</h1>
              <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" on:click={() => { selected = false; selectedValue = dates[selectedRow]}}>수행 일자: {dates[selectedRow].tobedt}</h1>
          </div>
            <div class="text-end w-full ">
              <button class="bg-green-500 hover:bg-green-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3 mr-3" on:click={exportToExcel}>엑셀 다운로드</button>
              
            </div>    
            <div class="flex flex-wrap w-full p-3 justify-center">
              <!-- <div class="flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center overflow-auto"> -->
                <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
                
                <table class="w-max text-md bg-gray-800 text-yellow-100  shadow-md rounded mb-4">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left p-3 px-5 ">업무명</th>
                            <th class="text-left p-3 px-5 ">구분</th>
                            <th class="text-left p-3 px-5 ">테스트일시</th>
                            <th class="text-left p-3 px-5 ">시작시간</th>
                            <th class="text-left p-3 px-5 ">종료시간</th>
                            <th class="text-left p-3 px-5 ">소요시간</th>
                            <th class="text-left p-3 px-5 ">ASIS시작시간</th>
                            <th class="text-left p-3 px-5 ">ASIS종료시간</th>
                            <th class="text-left p-3 px-5 ">ASIS소요시간</th>
                            <th class="text-left p-3 px-5 ">등록시간</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {#if paginatedlist.length > 0}
                            {#each paginatedlist as item, index}
                                <tr class="border-b hover:bg-orange-100 {index % 2 === 0 ? '' : ''}">
                                    <td class="p-3 px-5 ">
                                        <!-- <input type="text" bind:value={item.apnm} class="bg-transparent" /> -->
                                        {item.apnm} 
                                    </td>
                                    <td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.gubun} class="bg-transparent" /> -->
                                      {item.gubun}
                                  </td>
                                   
                                    <td class="p-3 px-5  ">
                                        <!-- <input type="text" bind:value={item.tstime} class="bg-transparent" /> -->
                                        {item.tstime}
                                    </td>
                                    <td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.stime} class="bg-transparent" /> -->
                                      {item.stime}
                                    </td>

                                    <td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.etime} class="bg-transparent" /> -->
                                      {item.etime}
                                    </td>
                                    <td class="p-3 px-5 ">
                                      <!-- <input type="text" bind:value={item.svctime} class="bg-transparent" /> -->
                                      {item.svctime}
                                    </td><td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.stimeasis} class="bg-transparent" /> -->
                                      {item.stimeasis}
                                    </td><td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.etimeasis} class="bg-transparent" /> -->
                                      {item.etimeasis}
                                    </td><td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.svctimeasis} class="bg-transparent" /> -->
                                      {item.svctimeasis}
                                    </td><td class="p-3 px-5  ">
                                      <!-- <input type="text" bind:value={item.regdt} class="bg-transparent" /> -->
                                      {item.regdt}
                                    </td>
                                </tr>
                            {/each}
                        {:else}
                            <tr>
                                <td colspan="7" class="p-3 px-5 text-center text-yellow-100">사용자가 없습니다.</td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
                </div>
                <div class="flex w-full justify-center mt-4">
                  <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                  </button>
                  {#each Array(totalPages).fill() as _, pageIndex}
                      <button class="px-3 py-1 bg-gray-300 text-black rounded mx-1 hover:bg-gray-500" class:bg-gray-700={pageIndex + 1 === currentPage} on:click={() => goToPage(pageIndex + 1)}>
                          {pageIndex + 1}
                      </button>
                  {/each}
                  <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                  </button>
              </div>
              
            </div>
        </div>
    <!-- {/each} -->
  {/if}
</div>
</div>
{:else}
  <PerformComposit></PerformComposit>
{/if}