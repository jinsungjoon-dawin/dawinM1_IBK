<script>
  import PerformComposit from "./PerformComposit.svelte";
  import BarChart from "./BarChart.svelte";
  import PieChart from "./PieChart.svelte";
  import { onMount } from "svelte";
  import {rooturl} from '../aqtstore';
  export let selectedValue = '';

  let selected = true;
  let conds = {
    asisDt: "",
    lastDt: ""
  };

  let dates = [];
  let datas = [];
  
  //차수, ASIS 일자, TOBE 일자 조회
  async function getPerformcomposit() {
    const res = await fetch($rooturl + "/performcomposit" );
    if (res.ok){
    
      return await res.json();
    }else
      throw new Error(res.statusText);
  }

  async function getPerformcompositTitle() {
    console.log("asisDt:"+conds.asisDt +" lastDt:"+conds.lastDt);
    const res = await fetch($rooturl + "/performcomposit/perfcomp_title?asisDt=" + conds.asisDt + "&lastDt=" + conds.lastDt);
    console.log(res);
    if (res.ok){
      datas = await res.json();
      return datas;
    }
    else
      throw new Error(res.statusText);
  }
  onMount(async () => {
    dates = await getPerformcomposit();
    console.log("dates:" + JSON.stringify(dates));
    
    //[{"seq":"1차","asisDt":"2025-01-02","lastDt":"2025-01-20"}]
    if(dates.length > 0){
      conds.asisDt = dates[0].asisDt;
      conds.lastDt = dates[0].tobeDt;
      datas = await getPerformcompositTitle();
    }
    //[{"tname":"성능1차 테스트 결과","lastDt":"2025-01-20"}]
    console.log("datas:" + JSON.stringify(datas));
  });
  let selectedRow = null;

  const handleRowClick = (idx) => {
    selectedRow = idx; // 현재 클릭된 row의 seq를 기준으로 선택 상태 설정
  };

  
  let users = [
      { id: 1, Id:"test1", host:"172.172.0.1",name: "David McHenry",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 2, Id:"test2", host:"172.172.0.2",name: "Frank Kirk",  role: "user", AccessibleWork:"All", RegDT:"2024-08-29 09:20:50" },
      { id: 3, Id:"test3", host:"172.172.0.3",name: "Rafael Morales",  role: "user", AccessibleWork:"All", RegDT:"2024-01-29 09:20:50" },
      { id: 4, Id:"test4", host:"172.172.0.4",name: "Minnie Walter",  role: "admin", AccessibleWork:"All", RegDT:"2025-01-22 09:20:50" },
      { id: 5, Id:"test5", host:"172.172.0.5",name: "John Doe",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 6, Id:"test6", host:"172.172.0.6",name: "Jane Smith",  role: "user", AccessibleWork:"All", RegDT:"2024-12-29 09:20:50" },
      { id: 7, Id:"test7", host:"172.172.0.7",name: "Alice Johnson",  role: "admin", AccessibleWork:"All", RegDT:"2024-09-29 09:20:50" },
      { id: 8, Id:"test8", host:"172.172.0.8",name: "Bob Brown",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 9, Id:"test9", host:"172.172.0.9",name: "Charlie White",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 10, Id:"test10", host:"172.172.0.10",name: "Eve Black",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 11, Id:"test11", host:"172.172.0.11",name: "David McHenry1",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      { id: 12, Id:"test12", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
  ];

  let currentPage = 1;
  let itemsPerPage = 10;

  $: paginatedUsers = users.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  $: totalPages = Math.ceil(users.length / itemsPerPage);

  function goToPage(page) {
      if (page > 0 && page <= totalPages) {
          currentPage = page;
      }
  }

  function addUser() {
      const newUser = {
          id: users.length + 1,
          Host: " % ",
          name: "",
          role: "user",
          AccessibleWork: "",
          RegDT: new Date().toISOString().split("T")[0],
      };
      users = [newUser, ...users];
      currentPage = 1;
  }

  function saveUser(index) {
      console.log("Saved user:", paginatedUsers[index]);
  }

  function deleteUser(index) {
      const userToDelete = paginatedUsers[index];
      users = users.filter((user) => user.id !== userToDelete.id);
  }

  function handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);

          users = [...users, ...parsedData];
          currentPage = 1;
      };

      reader.readAsArrayBuffer(file);
  }

  function printTable() {
      window.print();
  }
</script>
{#if selected}
<div class="flex justify-between">
  <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-3" >
    {#if dates.length !== 0}
      {#each dates as item, idx}
          <div class="flex mb-3 border border-gray-100 rounded border-zinc-600 text-zinc-100 " on:click={() => { conds.asisDt=item.asisDt; conds.lastDt=item.tobeDt; getPerformcompositTitle(); handleRowClick(idx);}}>
            <label class="px-3 w-1/5 py-2 border-gray-100 border-r border-l bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}">{item.seq}</label>
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.asisDt}">
            <input type="text" class="w-2/5 pl-3 border-gray-100 border-r  bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value="{item.tobeDt}">
            <!-- <button class="w-1/6 bx bx-search-alt-2" on:click={() => { conds.asisDt=item.asisDt; conds.lastDt=item.tobeDt; getPerformcompositTitle();}}>조회</button> -->
        </div>
      {/each}
    {/if}
  </div>
    <div class="flex flex-wrap flex-row items-center mx-2 w-9/12">
      <!-- {#if datas.length !== 0}
          {#each datas as item, idx} -->
          <div class="flex-col bg-gray-700 rounded-lg w-full" >
            <!-- <div class="flex w-full  border-b-2 border-gray-500 items-center">
                <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{item.tname}</h1>
                <h1 class="text-1xl w-2/5 text-end tracking-tight text-yellow-100 p-3" on:click={() => { selected = false; selectedValue = item}}>{item.tobeDt}</h1>
            </div> -->
              <div class="flex flex-wrap w-full p-3 justify-center">
                  <div class="table-container flex bg-gray-800 p-3 rounded-lg my-3 w-11/12 justify-center items-center">
                        <table class="w-full text-md bg-gray-800 text-yellow-100  shadow-md rounded mb-4">
                            <thead>
                                <tr class="border-b">
                                    <th class="text-left p-3 px-5">UserId</th>
                                    <th class="text-left p-3 px-5">Host</th>
                                    <th class="text-left p-3 px-5">사용자명</th>
                                    <th class="text-left p-3 px-5">권한</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {#if paginatedUsers.length > 0}
                                    {#each paginatedUsers as user, index}
                                        <tr class="border-b hover:bg-orange-100 {index % 2 === 0 ? '' : ''}">
                                            <td class="p-3 px-5">
                                                <input type="text" bind:value={user.Id} class="bg-transparent" />
                                            </td>
                                            <td class="p-3 px-5">
                                                <input type="text" bind:value={user.host} class="bg-transparent" />
                                            </td>
                                            <td class="p-3 px-5">
                                                <input type="text" bind:value={user.name} class="bg-transparent" />
                                            </td>
                                            <td class="p-3 px-5">
                                                <select bind:value={user.role} class="bg-transparent">
                                                    <option value="user">user</option>
                                                    <option value="admin">admin</option>
                                                </select>
                                            </td>
                                            
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
              </div>
          </div>
      <!-- {/each}
    {/if} -->
  </div>
</div>
{:else}
  <PerformComposit></PerformComposit>
{/if}