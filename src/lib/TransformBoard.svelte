<script lang="ts">
  import DonutChart from '../lib/DonutChart.svelte';
  import { onMount, onDestroy } from "svelte";
  import {rooturl, intlMs } from '../aqtstore';

  let clickedText: string = '20240123';  // 클릭한 텍스트를 저장할 변수
  let PageTitle ='1차도상';
  // 박스 데이터 타입 정의
  interface BoxData {
    title: string;
    value: string;
  }
  // The state for the selected date
  let selectedDate: string = "20240120";
  // 박스 데이터 배열
  const boxData: BoxData[] = [
    { title: "Box 1", value: "100" },
    { title: "Box 2", value: "200" },
    { title: "Box 3", value: "300" },
    { title: "Box 4", value: "400" }
  ];
  // 차트 데이터 배열을 생성합니다.
  const chartData = [
    { title: "마이데이타 1", id: 1 },
    { title: "마이데이타 2", id: 2 },
    { title: "마이데이타 3", id: 3 },
    { title: "마이데이타 4", id: 4 },
    { title: "자산관리 1", id: 5 },
    { title: "자산관리 2", id: 6 },
    { title: "자산관리 3", id: 7 },
    { title: "자산관리 4", id: 8 },
  ];
 
  // 동기화 시간 상태
  let chartSyncTime: string | null = null;
  let newtime = false; 
  // 동기화 버튼 클릭 이벤트 처리
  const handleSyncClick = () => {
    const currentTime = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // 현재 시간 가져오기
    chartSyncTime =  currentTime; // 동기화 시간 상태 업데이트
    newtime = true;

    // 5초 후에 시간을 다시 갱신하도록 설정
    setTimeout(() => {
      const updatedTime = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      chartSyncTime = updatedTime; // 5초 후 갱신된 시간 업데이트
      newtime = false; // 시간이 갱신되었으므로, `newtime`을 다시 false로 설정
    }, $intlMs); // 5초 뒤에 실행
  };

  // 초기 시간 상태
  let currentTime: string = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  onMount(() => {
    setInterval(() => {
      currentTime = new Date().toLocaleString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    }, $intlMs) // 5초마다 시간 갱신
  });
  // Handle the click event on the date inputs
  const handleDateClick = (date: string) => {
    selectedDate = date;
  };
  // 텍스트 박스를 클릭했을 때 실행되는 함수
  const handleTextClick = (text: string,text2:string) => {
    clickedText = text; // 클릭한 텍스트를 clickedText에 저장
    PageTitle=text2;
    // alert(PageTitle);
  };
</script>

<style>

</style>
<div class="flex justify-between h-screen">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3 h-max" >
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
            <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">차수별 이행 상황판</label>
            
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 " >이행 리허설 </label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 "on:click={() => handleTextClick('20240120','3차도상')} >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">3차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " readonly value="20240123">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 "on:click={() => handleTextClick('20240121','2차도상')} >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">2차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " readonly  value="20240121">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => handleTextClick('20240123','1차도상')}>
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " readonly value="20240120">
        </div>
        <br>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">본 이행</label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100"  on:click={() => handleTextClick('20240124','1차도상')}>
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 " >1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " readonly  value="20240124">
        </div>
         
   </div>

   <div class="w-11/12 bg-gray-700 rounded-lg flex-wrap h-max p-3 mx-2" >
    <label class="px-3  py-2 font-bold mx-3 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 text-white">이행 리허설 {PageTitle} 전광판</label>
    <input type="text" class=" pl-3 mx-14  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{clickedText}">

    <!-- 동기화 시간 표시 -->
    {#if newtime == true}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 " disabled value={chartSyncTime}>
    {:else}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 " disabled value={currentTime}>
    {/if} 
     
    <!-- 동기화 버튼과 시간 표시 -->
    <button
      class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={handleSyncClick}>동기화 </button>

    <!-- 첫 번째 줄: 하나의 차트 -->
    <div class="flex bg-gray-800 px-12 rounded-lg mx-1 justify-center my-2 ">
      <div>
        <DonutChart/>
        </div>
    </div>
    <!--마이데이타-->
    <!-- 두 번째 줄: 두 개의 차트 -->
    <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div>

     <!-- 세 번째 줄: 두 개의 차트 -->
     <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div>
    <!-- 네 번째 줄: 두 개의 차트 -->
    <!-- <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div> -->
    
    <!--자산관리-->
    <!-- 두 번째 줄: 두 개의 차트 -->
    <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div>

     <!-- 세 번째 줄: 두 개의 차트 -->
     <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div>
    <!-- 네 번째 줄: 두 개의 차트 -->
    <!-- <div class="w-full flex justify-center space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div> -->
    
</div>
</div>