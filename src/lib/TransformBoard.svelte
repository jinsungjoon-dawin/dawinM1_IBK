<script>
  import DonutChart from '../lib/DonutChart.svelte';
</script>
<div class="flex justify-between h-screen">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
            <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">차수별 이행 상황판</label>
            
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">이행 리허설</label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " value="20240120">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">2차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " value="20240120">
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">3차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " value="20240120">
        </div>
        <br>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-full py-2 border-gray-100 border-r border-l bg-lime-600 border-zinc-600 ">본 이행</label>
        </div>
        <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " >
          <label class="px-3 w-2/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 ">1차도상</label>
          <input type="text" class="w-3/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 " value="20240120">
        </div>
   </div>
    <div class="flex flex-wrap  items-center mx-2 w-9/12">
      <div class="border-zinc-600 w-1/6">
        <DonutChart></DonutChart>
      </div>
      <div class="border-zinc-600 w-1/6 flex flex-col mx-2">
        <DonutChart></DonutChart>
        <DonutChart></DonutChart>
      </div>
      <div class="border-zinc-600 w-1/6 flex flex-col mx-2">
        <DonutChart></DonutChart>
        <DonutChart></DonutChart>
      </div>
      <div class="border-zinc-600 w-1/6 flex flex-col mx-2">
        <DonutChart></DonutChart>
        <DonutChart></DonutChart>
      </div>
      <div class="border-zinc-600 w-1/6 flex flex-col mx-2">
        <DonutChart></DonutChart>
        <DonutChart></DonutChart>
      </div>
    </div>
</div>