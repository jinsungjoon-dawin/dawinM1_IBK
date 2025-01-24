<script>
  import BarChart from "./BarChart.svelte";
  import PieChart from "./PieChart.svelte";
  import { onMount } from "svelte";
  import { rooturl } from '../aqtstore';

  let isLoading = true;
  let rdata = [];

  async function getData() {
    try{
    const res = await fetch($rooturl + "/dashboard");
    if (res.ok)
      return await res.json();
    else
      throw new Error(res.statusText);
    }catch(error){
      alert(error)
    }finally{
      isLoading = false;
    }
  }
  onMount(async () => {
     rdata = await getData();
  });
</script>
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden; /* 스크롤 제거 */
  }
  .width-29 { width: 29%;}
  .width-49 { width: 45%;}
  .width-35 { width: 35%;}
  .width-69 { width: 69%;}
  .width-85 { width: 85%;}
</style>
<div class="flex flex-col justify-between max-h-svh">
  <div class="flex-col bg-gray-700 rounded-lg">
    <div class="flex w-full justify-between  border-b-2 border-gray-500 items-center">
        <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">성능 테스트 (최종) {rdata[0]?.performnm}</h1>
        <h1 class="text-1xl w-2/5 tracking-tight text-end text-yellow-100 p-3">{rdata[0]?.performdt}</h1>
    </div>
      <div class="flex justify-between w-full p-3 rounded-lg">
        <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 mx-1 justify-center ">
          <div >
            <PieChart page={'S'} date={''}></PieChart>
          </div>
        </div>
        <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 mx-1 justify-center ">
          <BarChart page={'S'} date={''}></BarChart>
        </div>
      </div>
  </div>
  <div class="flex-col bg-gray-700 mt-3 rounded-lg">
    <div class="flex w-full  border-b-2 border-gray-500 items-center">
      <div class="flex w-3/5 items-center">
        <h1 class="text-2xl tracking-tight text-yellow-100 p-3">적재 Data 검증 (최종) {rdata[0]?.dataverifynm}</h1>
      </div>
      <div  class="w-2/5 flex justify-end">
      <h1 class="text-1xl tracking-tight text-yellow-100 p-3">{rdata[0]?.dataverifydt}</h1>
      </div>
    </div>
    
    <div class="flex justify-between w-full rounded-lg">
      <!-- <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 m-1 justify-center ">
        <div class="w-11/12">
          <BarChart page={'D'} date={''}></BarChart>
        </div>
      </div>
      <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 m-1 justify-center ">
        <BarChart page={'M'} date={''}></BarChart>
      </div> -->
      <div class="flex justify-between w-full p-3 rounded-lg">
        <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 mx-1 justify-center ">
          <div class="w-11/12">
            <BarChart page={'D'} date={''}></BarChart>
          </div>
        </div>
        <div class="flex bg-gray-800 px-3 rounded-lg w-1/2 mx-1 justify-center ">
          <BarChart page={'M'} date={''}></BarChart>
        </div>
      </div>
    </div>
  </div>
</div>
