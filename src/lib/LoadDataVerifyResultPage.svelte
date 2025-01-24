<script>
  import PerformDetail from "./PerformDetail.svelte";
  import { onMount } from "svelte";
  import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
  

  let list = [];

  async function getData() {
    const res = await fetch("/performComposit" );
    if (res.ok)
      return await res.json();
    else
      throw new Error(res.statusText);
  }
  
  
  onMount(async () => {
    list = await getData() ;
    list = list.data;
  });
</script>

        
<div class="flex h-screen h-full p-4 ">
  <div class="flex-1 w-1/5 p-5" >
    {#if list.length !== 0}
        {#each list as item, idx}
            <div class="flex items-center space-x-4 max-w-lg mx-auto">
                <!-- Label -->
                <label for="date-from" class="text-sm font-medium text-gray-700 whitespace-nowrap">
                    {item.name}
                </label>
                <!-- Date From -->
                <div class="flex-1">
                    <input type="text" id="date-from" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value="{item.fromDate}"/>
                </div>
                
                <!-- Date To -->
                <div class="flex-1">
                    <input type="text" id="date-to" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value="{item.toDate}"/>
                </div>
            </div>
        {/each}
      {/if}
  </div>
  <div class="flex flex-wrap flex-row items-center w-4/5 bg-gray-50" >
    <LoadDataVerifyResult/>
    
  </div>
</div>