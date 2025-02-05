<script lang="ts">
  import DonutChart from '../lib/DonutChart.svelte';
  // 박스 데이터 타입 정의
  interface BoxData {
    title: string;
    value: string;
  }

  // 박스 데이터 배열
  const boxData: BoxData[] = [
    { title: "Box 1", value: "100" },
    { title: "Box 2", value: "200" },
    { title: "Box 3", value: "300" },
    { title: "Box 4", value: "400" }
  ];
  // 동기화 시간 상태
  let chartSyncTime: string | null = null;
  let newtime = false; 
  // 동기화 버튼 클릭 이벤트 처리
  const handleSyncClick = () => {
    const currentTime = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit',}); // 현재 시간 가져오기
    chartSyncTime = ` ${currentTime}`; // 동기화 시간 상태 업데이트
    newtime=true;
  };
</script>

<style>
  .box {
    @apply bg-gray-800 text-white p-4 rounded-lg text-center;
  }
  .sync-time {
    font-size: 14;
    font-weight: bold;
    color: white;
    background-color: #333;
    /* padding: 10px; */
    border-radius: 5px;
    margin: 10px;
    text-align: center;
  }
</style>
<div class="flex justify-between h-screen">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3 h-max" >
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
            <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">차수별 이행 상황판</label>
            
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">이행 리허설</label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 "disabled value="20240120">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">2차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 "disabled value="20240120">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">3차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 "disabled value="20240120">
        </div>
        <br>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">본 이행</label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 "disabled value="20240120">
        </div>
        
   </div>

   <div class="w-11/12 bg-gray-700 rounded-lg flex-wrap h-max p-3 mx-2" >
    <label class="px-3  py-2 font-bold mx-3 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">이행 리허설   전광판</label>
    
    <input type="text" class=" pl-3 mx-14  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="20240120">

    <!-- 동기화 시간 표시 -->
    {#if newtime == true}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 "disabled value="{chartSyncTime}">
    {:else}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 " disabled value=" 08:13:33">
    {/if} 
      
    <!-- 동기화 버튼과 시간 표시 -->
    <button
      class="bg-gray-500 hover:bg-gray-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={handleSyncClick}>동기화 </button>

    <!-- 첫 번째 줄: 하나의 차트 -->
    <div class="flex bg-gray-800 px-12 rounded-lg mx-1 justify-center my-2 ">
      <div>
        <DonutChart/>
        </div>
    </div>
  
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
</div>
</div>