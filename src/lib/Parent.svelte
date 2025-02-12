<script>
  import Child from "./Child.svelte";
  let childMessage = "";

  function handleChildEvent(event) {
    childMessage = event.detail; // 자식에서 전달된 값 저장
  }
  let value;
</script>

<!--   
  <Child on:message={handleChildEvent} />
  <p>자식이 보낸 메시지: {childMessage}</p>
  <Child on:message={handleChildEvent} ></Child> -->
<!-- <header
  class="h-[calc(100vh-70px)] flex items-center justify-center bg-gray-800 text-white"
>
  <h1 class="text-4xl">Full Screen Header</h1>
  <br /><input type="datetime" />
  <br /><input type="datetime-local" />
  <br /><input
    type="datetime-local"
    class="bg-transparent text-center"
    bind:value
  />
  <br /><button
    class="bg-gray-50"
    on:click={() => {
      alert(value);
    }}>버튼이다</button
  >
</header> -->

<div class="flex flex-wrap w-full p-3 justify-center">
  <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
    <table class="w-full text-md bg-gray-800 text-white text-nowrap shadow-md rounded mb-4">
      <thead>
        <tr class="border-b">
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header1</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header2</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header3</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header4</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header5</th>
        </tr>  
      </thead>
      <tbody>
        <tr class="border-b hover:bg-gray-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
        <tr class="border-b hover:bg-gray-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
      </tbody>  
  </div>
  <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
    <table class="w-full text-md bg-gray-800 text-white text-nowrap shadow-md rounded mb-4">
      <thead>
        <tr class="border-b">
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header1</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header2</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header3</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header4</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header5</th>
        </tr>  
      </thead>
      <tbody>
        <tr class="border-b hover:bg-blue-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
        <tr class="border-b hover:bg-blue-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
      </tbody>  
  </div>
  <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
    <table class="w-full text-md bg-gray-800 text-white text-nowrap shadow-md rounded mb-4">
      <thead>
        <tr class="border-b">
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header1</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header2</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header3</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header4</th>
          <th class="text-left p-3 px-10 border border-zinc-700 bg-zinc-600">header5</th>
        </tr>  
      </thead>
      <tbody>
        <tr class="border-b hover:bg-cyan-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
        <tr class="border-b hover:bg-cyan-700">
          <td class="p-3 px-5 border border-zinc-600">item1</td>
          <td class="p-3 px-5 border border-zinc-600">item2</td>
          <td class="p-3 px-5 border border-zinc-600">item3</td>
          <td class="p-3 px-5 border border-zinc-600">item4</td>
          <td class="p-3 px-5 border border-zinc-600">item5</td>
        </tr> 
      </tbody>  
  </div>
</div>