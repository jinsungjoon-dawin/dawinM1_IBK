<script lang="ts">
  import DonutChart from '../lib/DonutChart.svelte';
  import { onMount, onDestroy } from "svelte";
  import {rooturl, intlMs } from '../aqtstore';
  let rdata;
  let chardata;
  let selectedValues;

//         "mid": 3,
//         "midnm": "3차 본이행",
//         "mgb": 1,
//         "mgbnm": "이행리허설",
//         "startdt": "2025-02-20",
//         "enddt": "2025-02-20",
//         "scenario": 110

  async function getData() {
    let service ="/transformboard";
    const transformboard = await fetch($rooturl+service);
    console.log(transformboard);
    
    if (transformboard.ok)
      return await transformboard.json();
    else
      throw new Error(transformboard.statusText);    
  }
  async function getDataList() {
    let transformboardlist="/transformboard/transbo_list?mid="+rdata[0].mid
    const transformboardList = await fetch($rooturl+transformboardlist);
    console.log(transformboardList);
    
    
    if (transformboardList.ok)
      return await transformboardList.json();
    else
      throw new Error(transformboardList.statusText);    
  }

  
  let clickedText: string = '';  // 클릭한 텍스트를 저장할 변수
  let PageTitle ='';
  // 박스 데이터 타입 정의
  interface BoxData {
    title: string;
    value: string;
  }

 // 초기 시간 상태
 let currentTime: string = new Date().toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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

  const interval =setInterval(() => {
      currentTime = new Date().toLocaleString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    }, $intlMs) // 5초마다 시간 갱신
let count=0;
  clearInterval(currentTime);
  onMount(async () =>  {
     rdata = await getData() ;
     selectedValues = rdata[0];
     console.log(selectedValues)
    //  count=rdata.length;

    // if(rdata.length > 0){
    //   console.log(rdata);
    // }
    chardata =await getDataList();
    console.log(chardata);
    // if(chardata.length > 0){
    //   console.log("chatr==="+chardata[1]);
    // }

    setInterval(() => {
      currentTime = new Date().toLocaleString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
    }, $intlMs) // 5초마다 시간 갱신
  });
 
  //시나리오 버튼 클릭 
  const aaaa  = (date: string) => {
  alert("시나리오")
  }
  // Handle the click event on the date inputs
  const handleDateClick = (date: string) => {
    selectedDate = date;
  };
  // 텍스트 박스를 클릭했을 때 실행되는 함수
  const handleTextClick = (text: string,text2:string) => {
    clickedText = text; // 클릭한 텍스트를 clickedText에 저장
    PageTitle=text2;
    // selectedValues.midnm="";
    // selectedValues.enddt="";
    selectedValues.midnm=PageTitle;
    selectedValues.enddt=clickedText;

     //alert("clickedText="+clickedText+"PageTitle="+PageTitle+"selectedValues.midnm="+selectedValues.midnm+"====="+rdata[0].midnm  )
     

    //clickedText=PageTitle
    // alert(PageTitle);
  };
</script>

<style>
 
</style>
<div class="flex justify-between h-screen">
  <!-- <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3 h-max" > -->
    <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3 h-max" >
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
            <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">차수별 이행 상황판</label>
        </div>

        {#each rdata as item, index }
        {#if index == 0 || (rdata[index].mgb != rdata[index-1].mgb && index != 0) }
        {#if index == 0}
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 bg-lime-600" >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 " >{item.mgbnm} </label>
        </div> 
        {:else} 
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " style="margin-top: 260px;" >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-slate-700 border-zinc-600 " >과거이력 </label>
        </div>
        {/if}
        {/if}
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 "on:click={() => handleTextClick(item.enddt,item.midnm)} >
            <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">{item.midnm}</label>
            <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " readonly value={item.enddt}>
          </div> 
        {/each}   
   </div>

   <div class="w-11/12 bg-gray-700 rounded-lg flex-wrap h-max p-3 mx-1 text-center" >
      {#if selectedValues}
        <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">단계:</label>
        <input type="text" class=" pl-3 mx-2  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{selectedValues.midnm} 전광판">

        <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">차수:</label>
        <input type="text" class=" pl-3 mx-2  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{selectedValues.midnm}">
        
        <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">수행일자:</label>
        <input type="text" class=" pl-3 mx-2  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{selectedValues.enddt}">
      {:else}

        {/if}
      <!-- {#each rdata as item, index }
      {#if index == 0 || (rdata[index].mgb != rdata[index-1].mgb && index != 0) }
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">차수:</label>
      <input type="text" class=" pl-3 mx-2  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{item.midnm}">
      
      <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">수행일자:</label>
      <input type="text" class=" pl-3 mx-2  border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100" disabled value="{item.enddt}">
      {/if}
      {/each} -->
      

    <!-- 동기화 시간 표시 -->
    <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">시간:</label>
    {#if newtime == true}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 mr-10" disabled value={chartSyncTime}>
    {:else}
    <input type="text" class=" pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 text-zinc-100 mr-10" disabled value={currentTime}>
    {/if} 
     
    <!-- 동기화 버튼과 시간 표시 -->
    <!-- <button
      class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={handleSyncClick}>동기화 </button> -->
      
      <button
      class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-17" on:click={aaaa}>전체시나리오 </button> 
    <!-- 첫 번째 줄: 하나의 차트 -->
    {#each chardata as item,idx }
    {#if idx == 0}
    <div class="flex bg-gray-800 px-12 rounded-lg mx-1 w-3/3 justify-center my-2 ">
      <div>
        <DonutChart item={chardata[0]}/>
        </div>
    </div>
    {/if}
    {/each}
    <!--마이데이타-->
    <!-- 두 번째 줄: 두 개의 차트 -->
     
    <div class="w-full flex justify-start mx-1  flex-wrap">
    {#each chardata as item,idx }
    
    {#if idx != 0}
        <div class="flex bg-gray-800  rounded-lg w-1/3 mr-1 justify-center my-2" style="width: 33%">
          <div>
            <DonutChart item={item}/>
          </div>
        </div>
      {/if}
    {/each}
      
    </div>
    <!-- <div class="w-full flex justify-start mx-1  flex-wrap">
      <div class="flex bg-gray-800  rounded-lg w-1/3 mr-1 justify-center my-2" style="width: 33%">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800  rounded-lg w-1/3 mr-1 justify-center my-2"style="width: 33%">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800  rounded-lg w-1/3 mr-1 justify-center my-2"style="width: 33%">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800  rounded-lg w-1/3 mr-1 justify-center my-2"style="width: 33%">
        <div>
          <DonutChart/>
        </div>
      </div>
    </div> -->

     <!-- 세 번째 줄: 두 개의 차트 -->
     <!-- <div class="w-full flex justify-start space-x-4">
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/3 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div> -->
      <!-- <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div>
      <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center my-2">
        <div>
          <DonutChart/>
        </div>
      </div> -->
    <!-- </div> -->
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

     <!-- 세 번째 줄: 두 개의 차트 -->
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