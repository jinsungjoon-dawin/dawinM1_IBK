<script>
  import DashBoard from "./DashBoard.svelte";
  import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
  import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
  import { onMount } from "svelte";
  import * as XLSX from "xlsx";

  let pageNm = "적재 Data검증증";
  let cnm = DashBoard;
  // let searchQuery = "";
  // let searchInput = "";
  //export let tcode;
  
  let conds = {
      tcode: "",
      rcode: '',
      page: 0,
      psize: 20,
      cond: "",
      uri: "",
      task:""
  };

  let list = [];

  async function getData() {
      const res = await fetch("/performComposit");
      if (res.ok) return await res.json();
      else throw new Error(res.statusText);
  }

  onMount(async () => {
      list = await getData();
      list = list.data;
  });

  let users = [
        // { num: 1, division:"ADW", DBId:"ETMSADM1",TableNumAsIs: "3,126",TableNumTobe: "3,126",  IndexNumAsIs: "4,266",IndexNumToBe: "4,266", ObjectAsIs:"34",ObjectToBe:"34", InvalidObjectAsIs:"1",InvalidObjectToBe:"0"},
      // { id: 1, Id:"test1", host:"172.172.0.1",name: "David McHenry",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50"},
      // { id: 2, Id:"test2", host:"172.172.0.2",name: "Frank Kirk",  role: "user", AccessibleWork:"All", RegDT:"2024-08-29 09:20:50"},
      // { id: 3, Id:"test3", host:"172.172.0.3",name: "Rafael Morales",  role: "user", AccessibleWork:"All", RegDT:"2024-01-29 09:20:50"},
      // { id: 4, Id:"test4", host:"172.172.0.4",name: "Minnie Walter",  role: "admin", AccessibleWork:"All", RegDT:"2025-01-22 09:20:50"},
      // { id: 5, Id:"test5", host:"172.172.0.5",name: "John Doe",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50"},
      // { id: 6, Id:"test6", host:"172.172.0.6",name: "Jane Smith",  role: "user", AccessibleWork:"All", RegDT:"2024-12-29 09:20:50"},
      // { id: 7, Id:"test7", host:"172.172.0.7",name: "Alice Johnson",  role: "admin", AccessibleWork:"All", RegDT:"2024-09-29 09:20:50"},
      // { id: 8, Id:"test8", host:"172.172.0.8",name: "Bob Brown",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 9, Id:"test9", host:"172.172.0.9",name: "Charlie White",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 10, Id:"test10", host:"172.172.0.10",name: "Eve Black",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 11, Id:"test11", host:"172.172.0.11",name: "David McHenry1",  role: "admin", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 12, Id:"test12", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 13, Id:"test13", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 14, Id:"test14", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 15, Id:"test15", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 16, Id:"test16", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 17, Id:"test17", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 18, Id:"test18", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 19, Id:"test19", host:"172.172.0.12",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 20, Id:"test20", host:"172.172.0.20",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
      // { id: 21, Id:"test21", host:"172.172.0.21",name: "David McHenry2",  role: "user", AccessibleWork:"All", RegDT:"2023-08-29 09:20:50" },
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
  // let showAddUserForm = false; // 사용자 추가 폼 표시 여부
  // function addUser() {
  //   showAddUserForm =true;
  //   //alert(showAddUserForm);
  //     const newUser = {
  //         num: users.length + 1,
  //         Id:"",
  //         Host: " % ",
  //         name: "",
  //         role: "user",
  //         AccessibleWork: "All",
  //         RegDT: new Date().toISOString().split("T")[0],
  //     };
  //     users = [newUser, ...users];
  //     currentPage = 1;
  // }

  // function applySearch() { 
  //    if(applySearch.length == 0){
  //       alert("검색어를 입력해주세요");
  //    }
  //   searchQuery = searchInput;
  //   currentPage = 1;
  // }

  // function saveUser(index) {
  //     console.log("Saved user:", paginatedUsers[index]);
  // }

  // function deleteUser(index) {
  //     const userToDelete = paginatedUsers[index];
  //     users = users.filter((user) => user.id !== userToDelete.id);
  // }

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

<style>
    .search-button {
    padding: 8px;
    margin-left: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
    .search-input {
    width: 40%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
    .scroll-container {
    max-height: 610px; /* 원하는 높이를 지정 */
    overflow-y: auto;
  }
  .input-boder {
    width: 40%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  

  table {
      width: 100%;
      height: 100%;
      table-layout: fixed; /* 열 너비 고정 */
  }

  th, td {
      word-wrap: break-word; /* 텍스트 줄바꿈 허용 */
  }

  .hover\:bg-orange-100:hover {
      background-color: darkgrey 
  }
  
</style>

<div class="flex-col bg-gray-700 rounded-lg" style="height: 820px;">
  <div class="flex-col rounded-lg br1gray ">
      <div class="flex justify-between w-full p-3" style="height: 800px;">
          <div class="fle width-39">             
                <div class="flex gap-4 justify-end mr-14">
                    <!-- <input type="text"    placeholder="Search users..." class="search-input"    bind:value={searchQuery}/>
                    <button class="search-button" on:click={(applySearch)}>Search</button> -->
                    <label for="file-upload" class="bg-blue-500 hover:bg-blue-700 text-yellow-100 py-2 px-4 rounded cursor-pointer ">
                      Upload Excel
                    <input id="file-upload" type="file" accept=".xlsx, .xls" on:change={handleFileUpload} class="hidden" />
                    </label>
                    <button class="bg-gray-500 hover:bg-gray-700 text-yellow-100 py-2 px-4 rounded focus:outline-none focus:shadow-outline" on:click={printTable}>
                      Print
                    </button>
                </div>
                
                <div class="px-3 py-4 flex justify-center">
                  <div class="scroll-container">
                      <table class="w-full text-md bg-gray-800 text-yellow-100  shadow-md rounded mb-4 ">
                          <thead>
                            <tr>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"  rowspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  구분
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"rowspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  DB계정명
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title" colspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  Table 수량
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  Idexx 수량
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  Object
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title"colspan="2" align="center">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  Invalid Object
                                </p>
                              </th>
                            </tr>
                            <tr>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title" >
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  As-Is
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  To-Be
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  As-Is
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  To-Be
                                </p>
                              </th>
                              
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  As-Is
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  To-Be
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  As-Is
                                </p>
                              </th>
                              <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50 table-title">
                                <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                  To-Be
                                </p>
                              </th>
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
                                          <td class="p-3 px-5">
                                              <input type="text" bind:value={user.AccessibleWork} class="bg-transparent" />
                                          </td>
                                          <td class="p-3 px-5">
                                              <input type="text" bind:value={user.RegDT} class="bg-transparent" />
                                          </td>
                                          <td class="p-3 px-5 flex justify-end">
                                              <button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-yellow-100 py-1 px-2 rounded focus:outline-none focus:shadow-outline" on:click={() => saveUser(index)}>
                                                  Save
                                              </button>
                                              <button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-yellow-100 py-1 px-2 rounded focus:outline-none focus:shadow-outline" on:click={() => deleteUser(index)}>
                                                  Delete
                                              </button>
                                          </td>
                                      </tr>
                                  {/each}
                              {:else}
                                  <tr>
                                      <td colspan="10" class="p-3 px-5 text-center text-yellow-100">데이타가  없습니다.</td>
                                  </tr>
                            {/if}
                          </tbody>
                      </table>
                  </div>
              </div>
              <div class="flex justify-center mt-4">
                  <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                  </button>
                  {#each Array(totalPages).fill() as _, pageIndex}
                      <button class="px-3 py-1 bg-gray-300 text-black rounded mx-1 hover:bg-gray-500" class:bg-gray-700={pageIndex + 1 === currentPage} on:click={() => goToPage(pageIndex + 1)}>
                          {pageIndex + 1}
                      </button>
                  {/each}
                  <button class="px-3 py-1 bg-gray-500 text-yellow-100 rounded mx-1 hover:bg-gray-700" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                  </button>
              </div>
          </div>
      </div>
  </div>
</div>
