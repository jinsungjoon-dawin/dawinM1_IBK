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
import UserUploadManagement from "./lib/UserUploadManagement.svelte";
import { isLogged, userid, isLogin } from "./aqtstore";

let cnm = DashBoard ;
let pageNm = "모니터링 종합";
let menuIdx = 0;
let menus = [{pageNm:"모니터링 종합",cnm:DashBoard},
             {pageNm:"성능",cnm:PerformComposit},
             {pageNm:"적재Data검증",cnm:LoadDataVerifyResultPage},
             {pageNm:"이행",cnm:PerformComposit},
             {pageNm:"관리자",cnm:UserUploadManagement},
             {pageNm:"도움말말",cnm:HelpManagement}
]

</script>


<style lang="postcss">
  :global(html) {
    background-color: theme(colors.gray.100);
  }
  .bb1gray{ border-bottom: 1px solid gray;}
</style>

<!-- {#if !$isLogged} -->
{#if !$isLogin}
	<Login></Login>
{:else}
<div class="min-h-full">
  <nav class="bg-gray-800 bb1gray">
    <!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> -->
    <div class="mx-auto w-11/12 px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0 text-white font-bold">
            <!-- <img class="size-8" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company"> -->
             DAWIN
          </div>
          <div class="hidden md:block">
            <ul class="ml-10 flex items-baseline space-x-4">
              {#each menus as item, idx}
                <li class="py-1">
                {#if idx === menuIdx}
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-white bg-gray-900   " on:click|preventDefault={ _=> {cnm=item.cnm;pageNm = item.pageNm; menuIdx = idx}}>{item.pageNm}</a>
                {:else}  
                <a href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" on:click|preventDefault={ _=> {cnm=item.cnm;pageNm = item.pageNm; menuIdx = idx}}>{item.pageNm}</a>
                {/if}
                </li>
                {/each}
            </ul>
          </div>
        </div>
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



