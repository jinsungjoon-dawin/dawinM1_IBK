<script>
    import LoadDataVerifyDetail from "./LoadDataVerifyDetail.svelte";
    import LoadingOverlay from "./LoadingOverlay.svelte";
    import { onMount } from "svelte";
    import { rooturl, t } from "../aqtstore";
    import * as XLSX from 'xlsx';
    
    let leftDates = [];
    let selData;
    let result;
    let list = [];
    let etc = [];
    let selectedRow = 0;
    let selected = true;
    let currentPage = 1;
    let itemsPerPage = 10;
    let showModal = false;
    let tableHeader = $t.fileData.tableHeader;
    let comment = "";
    let loading = true;
    
    async function getData() {
      loading = true;
      const res = await fetch(`${$rooturl}/file/file_search?wdate=${selData.wdate}`);
      
      if (res.ok) {
        result = await res.json();
        console.log("result",result)
        // list = result.rdata;
        // etc = result.etcdata;
        loading = false;
        // return list;
        return result;
      } else {
        throw new Error(res.statusText);
      }
    }
    
    async function getLeftData() {
      const res = await fetch(`${$rooturl}/file`);
      if (res.ok) {
        return await res.json();
      } else {
        throw new Error(res.statusText);
      }
    }
    
    function getSum(column) {
      return list.reduce((sum, item) => sum + (item[column] || 0), 0);
    }
    
    onMount(async () => {
      leftDates = await getLeftData();
      console.log(leftDates)
      if (leftDates.length > 0) {
        selData = leftDates[selectedRow];
        result = await getData();
        list = result.rdata;
        etc = result.etcData;
      }
    });
    
    function formatNumber(value) {
      return value != null && typeof value === "number" ? value.toLocaleString() : "0";
    }
    
    function parseNewlines(str) {
      return str.replace(/\n/g, "<br>");
    }
    
    function getDetail(value) {
      selected = value > 0 ? false : true;
    }
    
    function getModalFlag() {
      showModal = !showModal;
    }
    
    function goToPage(page) {
      if (page > 0 && page <= totalPages) {
        currentPage = page;
      }
    }
    
    function updateContent(event) {
      comment = event.target.innerHTML;
    }
    
    async function save() {
      if (!confirm($t.user.saveConfirm)) return;
      let serviceUrl = `${$rooturl}/file/save`;
      etc[0].comment = comment;
      etc[0].sdate = selData.wdate;
      fetch(serviceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(etc)
      })
        .then(async (res) => {
          let rmsg = await res.json();
          if (res.status === 200 && rmsg.rdata === 1) {
            alert($t.user.saveSuccess);
            getData();
          }
        })
        .catch((err) => {
          alert("error: " + err.message);
        });
    }
    
    function handleRowClick(idx) {
      selectedRow = idx;
      selData = leftDates[idx];
    }
    
    async function excelDown() {
      let header = $t.fileData.excelTitles;
      let worksheetData = [
        header,
        ...list.map(obj => [
          obj.directory,
          formatNumber(obj.total_cnt),
          formatNumber(obj.copy_cnt),
          formatNumber(obj.diff_cnt),
          formatNumber(obj.rate_percent),
          formatNumber(obj.size_diff_cnt)
        ])
      ];
      let ws = XLSX.utils.aoa_to_sheet(worksheetData);
      ws["!cols"] = header.map(h => ({ wch: h.length + 5 }));
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${$t.fileData.schemaTitle}.xlsx`);
    }
    
    $: paginatedList = list.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    $: totalPages = Math.ceil(list.length / itemsPerPage);
    </script>
    
    {#if selected}
      {#if loading}
        <LoadingOverlay />
      {:else}
        <div class="mx-auto p-2 w-10/12 h-5/6">
          <div class="flex justify-between">
            <div class="w-3/12 bg-gray-700 rounded-lg flex-wrap p-2">
              <div class="flex mb-3 border rounded border-zinc-600 text-zinc-100 bg-lime-600">
                <label class="px-3 w-full py-2 border-r border-l border-zinc-600">{$t.fileData.leftMainTitle}</label>
              </div>
              <div class="flex border rounded border-zinc-600 text-zinc-100">
                <label class="px-3 py-2 border-zinc-600">{$t.fileData.leftDatel}</label>
              </div>
              {#if leftDates.length !== 0}
                {#each leftDates as item, idx}
                  <div class="flex mb-3 border rounded border-zinc-600 text-zinc-100" on:click={() => { handleRowClick(idx); getData(); }}>
                    <input type="text" class="w-full pl-3 py-2 border-r bg-zinc-700 border-zinc-600 {selectedRow === idx ? 'text-yellow-100' : ''}" value={item.wdate} readonly>
                  </div>
                {/each}
              {/if}
            </div>
    
            <div class="flex flex-wrap flex-row flex-start mx-2 w-9/12">
              <div class="flex-col bg-gray-700 rounded-lg w-full">
                <div class="flex w-full border-b-2 border-gray-500 items-center">
                  {#if etc.length > 0}
                    <h1 class="text-2xl w-3/5 tracking-tight text-yellow-100 p-3">{$t.fileData.mainTopTitle} {etc[0].file_dt}</h1>
                  {/if}
                </div>
    
                <div class="flex flex-wrap w-full p-3 justify-center">
                  <div class="w-full overflow-auto bg-gray-800 p-3 rounded-lg">
                    <div class="w-full border-gray-500 py-3 text-end">
                      <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded" on:click={excelDown}>{$t.com.btn.excelDown}</button>
                      <button class="bg-gray-500 hover:bg-sky-500 text-yellow-100 py-2 px-4 rounded" on:click={save}>{$t.com.btn.save}</button>
                    </div>
    
                    <table class="w-full text-md text-nowrap bg-gray-800 text-white shadow-md rounded mb-4">
                      <thead>
                        <tr>
                          {#each $t.fileData.tableHeader as item}
                            <th class="text-center p-3 border border-zinc-700 bg-zinc-600">{item}</th>
                          {/each}
                        </tr>
                      </thead>
                      <tbody>
                        {#if list.length > 0}
                          {#each paginatedList as item, index}
                            <tr class="border-b hover:bg-gray-700">
                              <td class="text-left border border-zinc-700 p-3 px-5">{item.directory}</td>
                              <td class="text-right border border-zinc-700 p-3 px-5">{formatNumber(item.total_cnt)}</td>
                              <td class="text-right border border-zinc-700 p-3 px-5">{formatNumber(item.copy_cnt)}</td>
                              <td class="text-right border border-zinc-700 p-3 px-5">{formatNumber(item.diff_cnt)}</td>
                              <td class="text-right border border-zinc-700 p-3 px-5">{formatNumber(item.rate_percent)}</td>
                              <td class="text-right border border-zinc-700 p-3 px-5">{formatNumber(item.size_diff_cnt)}</td>
                            </tr>
                          {/each}
                          <tr>
                            <th class="text-center bg-zinc-600 border border-zinc-700 p-3 px-5" rowspan="2">{$t.fileData.etc}</th>
                            <th class="text-left border border-zinc-700 p-3 px-5 h-32" colspan="5" contenteditable="true" on:input={updateContent} id="comment">
                              <!-- {#if etc.length > 0} -->
                                <!-- {@html etc[0].comment} -->
                              <!-- {/if} -->
                            </th>
                          </tr>
                        {:else}
                          <tr>
                            <td colspan="6" class="text-center border border-zinc-700 p-3 px-5">{$t.com.paging.noData}</td>
                          </tr>
                        {/if}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
    {:else}
      <LoadDataVerifyDetail {selData} {selectedRow} />
    {/if}
    