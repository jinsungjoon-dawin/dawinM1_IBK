<script lang='ts'>
import DashBoard  from "./lib/DashBoard.svelte";
import Project  from "./lib/Project.svelte";
import BarChart from "./lib/BarChart.svelte";
import PerformComposit from "./lib/PerformComposit.svelte";
import LoadDataVerifyResult from "./lib/LoadDataVerifyResult.svelte";
import LoadDataVerifyResultPage from "./lib/LoadDataVerifyResultPage.svelte";
import Login from "./lib/Login.svelte";
import HelpManagement from "./lib/HelpManagement.svelte";
import BulkRegistrationOfUsers from "./lib/BulkRegistrationOfUsers.svelte";
import IndividualUserManagement from "./lib/IndividualUserManagement.svelte";
import DeleteUsersInBulk from "./lib/DeleteUsersInBulk.svelte";//성능 Data 관리
import UserUploadManagement from "./lib/UserUploadManagement.svelte";
import TransformBoard from "./lib/TransformBoard.svelte"
import { isLogged, userid } from "./aqtstore";
import { onMount } from "svelte";

let cnm = DashBoard ;
let pageNm = "모니터링 종합";
let menuIdx = 0;
let menus = [{pageNm:"모니터링 종합",cnm:DashBoard},
             {pageNm:"테스트",cnm:PerformComposit},
             {pageNm:"성능",cnm:PerformComposit},
             {pageNm:"적재Data검증",cnm:LoadDataVerifyResultPage},
             {pageNm:"이행",cnm:TransformBoard},
             {pageNm:"관리자",cnm:UserUploadManagement},
             {pageNm:"도움말",cnm:HelpManagement}
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
    <div class="mx-auto w-11/12 px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0 text-white font-bold">
            <img src="src/img/logo.png">
            <!-- <img class="size-8" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> -->
             <!-- DAWIN -->
          </div>
          <div class="hidden md:block">
            <ul class="ml-10 flex items-baseline space-x-4">
              {#each menus as item, idx}
                <li class="py-1">
                  {#if idx === menuIdx && item.pageNm === "관리자"}
                    <div class="group relative dropdown px-4 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      <a>관리자</a>
                      <div class="group-hover:block dropdown-menu absolute hidden h-auto">
                        <ul class="top-0 w-48 bg-gray-900 shadow px-6 py-1">
                          <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=BulkRegistrationOfUsers;pageNm = "사용자 관리"}}>사용자 관리</a></li>
                          <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=DeleteUsersInBulk;pageNm = "성능 Data 관리"}}>성능 Data 관리</a></li>
                          <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=IndividualUserManagement;pageNm = "Data 검증 관리"}}>Data 검증 관리</a></li>
                          <li class="py-1"><a href="#" class="menu-item" on:click|preventDefault={ _=> {cnm=UploadManagement;pageNm = "시나리오 관리"}}>시나리오 관리</a></li>
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
        <span class="text-yellow-100 text-lg">현재 일자: {today}</span>
      </div>
    </div>





  </nav>
  <main class="bg-gray-800">
    <!-- <div class="mx-auto max-w-7xl p-3 "> -->
    <div class="mx-auto p-3 w-10/12 h-5/6">
      <svelte:component this={cnm}></svelte:component>
    </div>
  </main>
</div>
{/if}



