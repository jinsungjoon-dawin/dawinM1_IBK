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
<header
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
</header>

<table
  class="w-full text-md text-nowrap bg-gray-800 text-white shadow-md rounded mb-4 s-cIWfhNj-D1MY"
>
  <thead class="s-cIWfhNj-D1MY"
    ><tr class=" s-cIWfhNj-D1MY">
      <th
        class="text-center border border-zinc-700 bg-zinc-600 order p-3 px-5 s-cIWfhNj-D1MY"
        colspan="10">스키마 검증 결과</th
      >
    </tr>
    <tr class=" s-cIWfhNj-D1MY">
      <th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        rowspan="2"
      >
      </th><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        rowspan="2">DB 계정명</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="2">Table 수량</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="2">Index 수량</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="2">Object 수량</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="2">Invalid Object 수량</th
      ></tr
    ><tr class=" s-cIWfhNj-D1MY"
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >As-Is</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >To-Be</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >As-Is</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >To-Be</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >As-Is</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >To-Be</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >As-Is</th
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >To-Be</th
      ></tr
    ></thead
  ><tbody class="s-cIWfhNj-D1MY"
    ><tr
      class="hover:ring-1 hover:ring-blue-500  hover:bg-zinc-500 s-cIWfhNj-D1MY"
      ><td class="text-center border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >MONDB</td
      ><td class="text-center border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >XUSR</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >2,200</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >2,150</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >3,000</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >3,000</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1,000</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1,000</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1</td
      ></tr
    ><tr
      class="border-b hover:bg-sky-500"
      ><td class="text-center border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >MONDB</td
      ><td class="text-center border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >YUSR</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >500</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >500</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >990</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >980</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >500</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >500</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >0</td
      ><td class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >0</td
      ></tr
    >
    <tr class="s-cIWfhNj-D1MY"
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="2">총 수량</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >2,700</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >2,650</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >3,990</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >3,980</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1,500</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1,500</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1</th
      ><th class="text-right border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >1</th
      ></tr
    >
    <tr class="s-cIWfhNj-D1MY"
      ><th
        class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        >특이사항</th
      ><th
        class="text-left border border-zinc-700 p-3 px-5 s-cIWfhNj-D1MY"
        colspan="9"
        >1. Table 수량 및 Object 수량은 AS-Is 와 To-Be 동일함.<br />2. Index
        수량은 As-Is 대시 To-Be에서 증가(성능 향상 및 사용자 요청)<br />3.
        As-Is의 Invalid Object는 To-Be에서 발견되지 않음.</th
      ></tr
    ></tbody
  >
</table>
