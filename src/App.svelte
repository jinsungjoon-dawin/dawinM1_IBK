<script lang='ts'>
  import DashBoard  from "./lib/DashBoard.svelte";
  import Project  from "./lib/Project.svelte";
  import BarChart from "./lib/BarChart.svelte";
  import PerformComposit from "./lib/PerformComposit.svelte";
  import LoadDataVerifyResult from "./lib/LoadDataVerifyResult.svelte";
  import Login from "./lib/Login.svelte";
  import HelpManagement from "./lib/HelpManagement.svelte";
  import UserUploadManagement from "./lib/UserUploadManagement.svelte";
  import IndividualUserManagement from "./lib/PerformUploadManagement.svelte";
  import TransformBoard from "./lib/TransformBoard.svelte"
  import TestComposit from "./lib/TestComposit.svelte";
  import LoadDataUploadManagement from "./lib/LoadDataUploadManagement.svelte";//성능 Data 관리
  import ScenarioUploadManagement from "./lib/ScenarioUploadManagement.svelte";
  import PerformUploadManagement from "./lib/PerformUploadManagement.svelte";
  import LoadFileVerifyResult from "./lib/LoadFileVerifyResult.svelte";
  import { isLogged, userid, t} from "./aqtstore";
  import { onMount } from "svelte";
  import Parent from "./lib/Parent.svelte";
  let cnm = DashBoard ;
  let pageNm = "모니터링 종합";
  let menuIdx = 0;
  let menus = [{pageNm:"홈",cnm:DashBoard},
               {pageNm:"테스트",cnm:TestComposit},
               {pageNm:"성능",cnm:PerformComposit},
               {pageNm:"데이터",cnm:LoadDataVerifyResult},
               {pageNm:"이행",cnm:TransformBoard},
              //  {pageNm:"관리자",cnm:UserUploadManagement},
              //  {pageNm:"도움말",cnm:HelpManagement}
              //  ,{pageNm:"임시",cnm:Parent}
  ]
  
  
  function getToDate(){
      var today = new Date();
  
      var year = today.getFullYear();
      var month = ('0' + (today.getMonth() + 1)).slice(-2);
      var day = ('0' + today.getDate()).slice(-2);
  
      return year + '-' + month  + '-' + day;
      
    }
  
    let today = '';
    onMount(async () => {
      today = getToDate();
    });
  </script>
  
  
  <style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
    .bb1gray{ border-bottom: 1px solid gray;}
  </style>
  
  <!-- {#if !$isLogged} -->
  {#if !$isLogged}
    <Login></Login>
  {:else}
  <div class="min-h-full">
    <nav class="bg-gray-800 bb1gray">
      <!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> -->
      <div class="mx-auto w-10/12 px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0 text-white font-bold text-2xl italic font-serif">
              <!-- <img src="/src/img/top2.png" class="object-contain"> -->
               T&T Board
            </div>
            <div class="hidden md:block">
              <ul class="ml-10 flex items-baseline space-x-4">
                {#each menus as item, idx}
                  <li class="py-1">
                      {#if item.pageNm === "관리자"}
                      <div class="group relative dropdown px-4 rounded-md px-3 py-2 text-sm font-medium text-gray-300 ">
                        <a class="rounded-md px-3 py-2 text-sm font-medium {idx === menuIdx ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">관리자</a>
                        <div class="group-hover:block dropdown-menu absolute hidden h-auto">
                          <ul class="top-0 w-48 bg-gray-900 shadow px-6 py-1">
                            <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=UserUploadManagement;pageNm = "사용자 관리";menuIdx = idx}}>사용자 관리</a></li>
                            <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=PerformUploadManagement;pageNm = "성능 Data 관리";menuIdx = idx}}>성능 Data 관리</a></li>
                            <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=LoadDataUploadManagement;pageNm = "Data 검증 관리";menuIdx = idx}}>Data 검증 관리</a></li>
                            <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=ScenarioUploadManagement;pageNm = "시나리오 관리";menuIdx = idx}}>시나리오 관리</a></li>
                          </ul>
                        </div>
                      </div>
                      {:else if item.pageNm === "데이터"}
                      <div class="group relative dropdown px-4 rounded-md px-3 py-2 text-sm font-medium text-gray-300">
                        <a class="rounded-md px-3 py-2 text-sm font-medium {idx === menuIdx ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}">데이터</a>
                        <div class="group-hover:block dropdown-menu absolute hidden h-auto">
                          <ul class="top-0 w-48 bg-gray-900 shadow px-6 py-1">
                            <li class="py-1">
                              <a href="#" class="menu-item" on:click|preventDefault={_ => {cnm=LoadDataVerifyResult; pageNm = "데이터 관리"; menuIdx = idx}}>데이터 관리</a>
                            </li>
                            <li class="py-1">
                              <a href="#" class="menu-item" on:click|preventDefault={_ => {cnm=LoadFileVerifyResult; pageNm = "파일 관리"; menuIdx = idx}}>파일 관리</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    {:else}
                      <a href="#" class="rounded-md px-3 py-2 text-sm font-medium {idx === menuIdx ? 'text-white bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}" on:click|preventDefault={ _=> {cnm=item.cnm;pageNm = item.pageNm; menuIdx = idx}}>{item.pageNm}</a>
                      {/if}
                  </li>
                {/each}
              </ul>
              
            </div>
          </div>
          <span class="text-yellow-100 text-lg">{$t.com.nowDate} {today}</span>
        </div>
      </div>
  
  
  
  
  
    </nav>
    <main class="bg-gray-800">
      <!-- <div class="mx-auto p-3 w-10/12 h-5/6"> -->
        <svelte:component this={cnm}></svelte:component>
      <!-- </div> -->
    </main>
  </div>
  {/if}
  
  
  
  