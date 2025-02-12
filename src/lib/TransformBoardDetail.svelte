<script>
  import DashBoard from "./DashBoard.svelte";
  import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
  import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
  import { onMount } from "svelte";
  import * as XLSX from "xlsx";
  import DonutChart from '../lib/DonutChart.svelte';
  import {rooturl, intlMs } from '../aqtstore';
    import TransformBoard from "./TransformBoard.svelte";
  let pageNm = "시나리오";
  let cnm = DashBoard;
  let searchQuery = "";
  let searchInput = "";
  let selected = true;
  
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

  $: filteredUsers = users.filter(user =>
    user.Id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.host.toLowerCase().includes(searchQuery.toLowerCase())
  );


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
  let showAddUserForm = false; // 사용자 추가 폼 표시 여부
  function addUser() {
    showAddUserForm =true;
    //alert(showAddUserForm);
      const newUser = {
          num: users.length + 1,
          Id:"",
          Host: " % ",
          name: "",
          role: "user",
          AccessibleWork: "All",
          RegDT: new Date().toISOString().split("T")[0],
      };
      users = [newUser, ...users];
      currentPage = 1;
  }

  function applySearch() { 
     if(applySearch.length == 0){
        alert("검색어를 입력해주세요");
     }
    searchQuery = searchInput;
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
{#if selected}
  상세화면

{:else}
<TransformBoard></TransformBoard>
{/if}
