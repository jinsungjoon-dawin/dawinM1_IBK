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
 
</style>
<div class="flex flex-col  max-h-svh">
  {#if rdata}
  <div class=" bg-gray-700 rounded-lg">
    <div class="flex w-full border-b-2 border-gray-500 items-center text-yellow-100">
        <h1 class="w-3/5 text-2xl tracking-tight p-3">최신 {rdata[0]?.performnm} </h1>
        <h1 class="w-2/5 text-1xl tracking-tight text-end p-3">수행 일자: {rdata[0]?.performdt}</h1>
    </div>
      <div class="flex justify-between w-full p-3">
        <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center ">
          <div>
            <PieChart page={'S'} date={''} title={rdata[0]?.performnm}></PieChart>
          </div>
        </div>
        <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 mx-1 justify-center ">
          <BarChart page={'S'} date={''}></BarChart>
        </div>
      </div>
  </div>
  <div class="bg-gray-700 mt-3 rounded-lg">
    <div class="flex w-full border-b-2 border-gray-500 items-center text-yellow-100 ">
      <h1 class="w-3/5 text-2xl tracking-tight p-3"> 적재 Data 검증 최신 {rdata[0]?.dataverifynm}</h1>
      <h1 class="text-1xl w-full text-end tracking-tight p-3">수행 일자: {rdata[0]?.dataverifydt} </h1>
    </div>
      <div class="flex justify-between w-full p-3">
        <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 justify-center mx-1">
          <BarChart page={'D'} date={''}></BarChart>
        </div>
        <div class="flex bg-gray-800 px-12 rounded-lg w-1/2 justify-center mx-1">
          <BarChart page={'M'} date={''}></BarChart>
        </div>
      </div>
  </div>
  
    
  {/if}
</div>