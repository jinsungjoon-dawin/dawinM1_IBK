<script>
  import PerformComposit from "./PerformComposit.svelte";
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

  let selectedRow = 0;
  let leftDates = [];
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
    leftDates = await getPerformcomposit();
    
    //[{"seq":"1차","asisdt":"2025-01-02","tobedt":"2025-01-20"}]
    if(leftDates.length > 0){
      conds.asisdt = leftDates[0].asisdt;
      conds.tobedt = leftDates[0].tobedt;
      list = await getPerformcompositList();
    }
  });

  function exportToExcel() {
    // JSON 데이터를 Worksheet로 변환
    // const worksheet = XLSX.utils.json_to_sheet(list);
    // 기본 데이터를 엑셀 시트로 변환 (헤더 없음)
    const worksheet = XLSX.utils.json_to_sheet(list.map(({ regdt, ...rest }) => rest), { skipHeader: true });
    // ✅ 사용자 정의 헤더 추가 (A1 행에 직접 추가)
    XLSX.utils.sheet_add_aoa(worksheet, [["주재", "구분", "테스트일시","시작시간","종료시간","수행시간","ASIS시작시간","ASIS종료시간","ASIS수행시간"]], { origin: "A1" });

    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // 엑셀 파일 생성
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    
    // Blob을 사용하여 파일 다운로드
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = leftDates[selectedRow].tname +"_테스트결과.xlsx";
    document.body.appendChild(a);
    a.click();
    
    // 정리
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  const handleRowClick = (idx) => {
    selectedRow = idx; // 현재 클릭된 row의 seq를 기준으로 선택 상태 설정
  };

  
  
  let selectedStatus = "ALL";
  let currentPage = 1;
  let itemsPerPage = 10;

  $: paginatedlist = selectedStatus === "ALL" ? 
      list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) 
    : list.filter(list => list.gubun === selectedStatus).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); 
  
  $: totalPages = Math.ceil((selectedStatus === "ALL" ? list.length : list.filter(item => item.gubun === selectedStatus).length) / itemsPerPage);


  function goToPage(page) {
      if (page > 0 && page <= totalPages) {
          currentPage = page;
      }
  }

  function printTable() {
      window.print();
  }
</script>
<style>
  .hover\:bg-orange-100:hover {
      background-color: darkgrey 
  }
</style>
{#if selected}
<div class="flex justify-between">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
    <div class="flex  border  border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; getPerformcompositList(); handleRowClick(idx);}}>
      <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">차수 </label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">Asis</label>
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l  border-zinc-600 ">Tobe</label>
    </div>
    {#if leftDates.length !== 0}
      {#each leftDates as item, idx}
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; ; getPerformcompositList(); handleRowClick(idx);}}>
            <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisdt}" readonly>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobedt}" readonly>
            <!-- <button class="w-1/6 bx bx-search-alt-2" on:click={() => { conds.asisdt=item.asisdt; conds.tobedt=item.tobedt; }}>조회</button> -->
        </div>
      {/each}
    {/if}
  </div>
    
  <div class="flex flex-wrap flex-row items-center mx-2 w-9/12">
    {#if leftDates.length !== 0}
        <!-- {#each datas as item, idx} -->
        <div class="flex-col bg-gray-700 rounded-lg w-full" >
          <div class="flex w-full  border-b-2 border-gray-500 items-center">
              <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{leftDates[selectedRow].tname} 테스트</h1>
              <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" >수행 일자: {leftDates[selectedRow].tobedt}</h1>
              <div class="w-36 px-4 text-end">
                <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline"  on:click={() => { selected = false; }}>이전보기</button>
              </div>  
            </div>
            <div class="flex justify-end items-center w-full mt-3">
              <label class="text-gray-300">조회조건 상태:</label>
              <select on:change={currentPage = 1} bind:value={selectedStatus}  class="bg-gray-800 text-white border border-gray-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-10">
                <option value="ALL">전체</option>
                <option value="대상">대상</option>
                <!-- <option value="수행">수행</option> -->
                <option value="성공">성공</option>
                <option value="실패">실패</option>
                <option value="미수행">미수행</option>
              </select>
              <button class="bg-green-500 hover:bg-green-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3  ml-10" on:click={exportToExcel}>엑셀 다운로드</button>
            </div>
            
            <div class="flex flex-wrap w-full p-3 justify-center">
              <!-- <div class="flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center overflow-auto"> -->
                <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
                <table class="w-full text-md bg-gray-800 text-yellow-100  shadow-md rounded mb-4">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left p-3 px-5 ">주제</th>
                            <th class="text-left p-3 px-5 ">구분</th>
                            <th class="text-left p-3 px-5 ">테스트일시</th>
                            <th class="text-left p-3 px-5 ">시작시간</th>
                            <th class="text-left p-3 px-5 ">종료시간</th>
                            <th class="text-left p-3 px-5 ">수행시간</th>
                            <th class="text-left p-3 px-5 ">ASIS시작시간</th>
                            <th class="text-left p-3 px-5 ">ASIS종료시간</th>
                            <th class="text-left p-3 px-5 ">ASIS수행시간</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        {#if paginatedlist.length > 0}
                            {#each paginatedlist as item, index}
                                <tr class="border-b hover:bg-orange-100 {index % 2 === 0 ? '' : ''}">
                                    <td class="p-3 px-5 ">
                                        {item.apnm} 
                                    </td>
                                    <td class="p-3 px-5  ">
                                      {item.gubun}
                                  </td>
                                   
                                    <td class="p-3 px-5  ">
                                        {item.tstime}
                                    </td>
                                    <td class="p-3 px-5  ">
                                      {item.stime}
                                    </td>
                                    <td class="p-3 px-5  ">
                                      {item.etime}
                                    </td>
                                    <td class="p-3 px-5 ">
                                      {item.svctime}
                                    </td><td class="p-3 px-5  ">
                                      {item.stimeasis}
                                    </td><td class="p-3 px-5  ">
                                      {item.etimeasis}
                                    </td><td class="p-3 px-5  ">
                                      {item.svctimeasis}
                                    <!-- </td><td class="p-3 px-5  ">
                                      {item.regdt}
                                    </td> -->
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