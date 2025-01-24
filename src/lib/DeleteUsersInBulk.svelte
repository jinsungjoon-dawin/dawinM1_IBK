
<script>
    import DashBoard  from "./DashBoard.svelte";
    import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
    import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
    import { onMount } from "svelte";

    
    let pageNm = "일괄 삭제";
  
    let cnm = DashBoard ;
  
      export let tcode ;
      let conds = {
        tcode: "",
        rcode: '',
        page: 0,
        psize: 20,
        cond: "",
        uri: "",
        task:""
      };
      /*
      let sv_row;
      let promise = Promise.resolve([]);
      async function getdata() {
          const res = await fetch( "/dashboard/list/"+$authApps);
          promise = await res.json();
    //      console.log(" call dashboard end", promise) ;
      }
    */
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
   

  /**관리id/사용자id/pswd/부서/직급/권한 
     * @type {any[]}
     */
  let rdata = [];
  let curRow = {};
  let cols = [true,0, "User","Host", "사용자명",false,"",(new Date()).toLocaleDateString()];
  let newRow = [...cols];
  const columns = [" ", "UserId ", "Host", "사용자명", "Admin", "접근가능업무", "등록일",  ];

  // function updService() {
  //   const upds = rdata.filter((r) => ( r[0] && r[1] != 0) ).map((r) => [...(r.slice(2,7)),r[1] ]);
  //   const inss = rdata.filter((r) => ( r[0] && r[1] == 0) ).map((r) => r.slice(2,7) );
  // console.log(inss)     ;
  //   fetch("/tuser", {
  //     method: "POST" ,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       upd: upds,
  //       ins: inss
  //     }),
  //   })
  //     .then(async (res) => {
  //       let rmsg = await res.json();
  //       alert(rmsg.message);
  //       if (res.status < 300) {
  //         getdata();
  //       }
  //     })
  //     .catch((err) => {
  //       alert("error:" + err.message);
  //     });
  // }

  // function delService() {
  //   const delcodes = rdata.filter((r) => (r[0] && r[1] > 0) ).map((r) => r[1]);

  //   if (delcodes.length == 0) return;
  //   // console.log("del code:", delcodes) ;
  //   fetch("/tuser", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       pkeys: delcodes,
  //     }),
  //   })
  //     .then(async (res) => {
  //       let rmsg = await res.json();
  //       if (res.status < 400) {
  //         alert("정상 삭제되었습니다");
  //         getdata();
  //       }
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }
  // async function getdata() {
  //   const res = await fetch("/tuser");
  //   if (res.status === 200) {
  //     rdata = await res.json();
  //   } else {
  //     throw new Error(res.statusText);
  //   }
  // }

  // onMount(getdata);    
</script>   
<style>
    .tcode-status {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow-y: auto;
    border: 1px solid black;
    }
    .table-title {
    /* background-color: #a9c8ff; */
    border-bottom-style: solid;
    }

    html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden; /* 스크롤 제거 */
  }
  .width-29 { width: 29%;}
  .width-49 { width: 49%;}
  .width-35 { width: 35%;}
  .width-69 { width: 69%;}
  .width-85 { width: 85%;}
  .bb1gray{ border-bottom: 1px solid gray;}
  .bl1gray{ border-left: 1px solid gray;}
  .br1gray{ border-right: 1px solid gray;}
  .bt1gray{ border-top: 1px solid gray;}

  a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 96vw;
  height: 100%;

  color: #333;
	padding: 8px;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

.card {
  padding: 2em;
}

#app {
  max-width: 100vw;
  width: 98vw;
  height: 92vh;
  margin: 0 ;
  padding: 2px;
  text-align: center;
}

a {
	color: rgb(0,100,200);
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

a:visited {
	color: rgb(0,80,160);
}

label {
	display: block;
}

input, button, select, textarea {
	font-family: inherit;
	font-size: 18px;
	-webkit-padding: 0.4em 0;
	padding: 0.4em;
	margin: 0 0 0.5em 0;
	box-sizing: border-box;
	border: 1px solid #ccc;
	border-radius: 2px;
	outline: none;
}

input:disabled {
	color: #ccc;
}

/* button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
} */

button {
	color: #333;
	background-color: #f4f4f4;
	outline: 2px;
	cursor: pointer ;
	font-size: 1rem;
	padding: 3px 0.8rem ;
	margin: 0 0.3rem ;
  border-radius: 6px;
}

button:disabled {
	color: #999;
}

button:not(:disabled):active {
	background-color: #ddd;
}

button:focus {
	border-color: #666;
}
button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
 }

 table {
	border-collapse: collapse;
	overflow: auto;
  overflow-x: scroll;
  width: 100%;
}

td, th {
    border: 1px solid rgb(214, 214, 230);
    padding: 5px;
}

td {
	overflow:hidden;
	white-space : wrap;
	text-overflow: clip;
	font-size: 0.9rem;
  vertical-align: top;
}

thead {
	background-color: var(--th_bgcolor);
	color: var(--th_color);
  position: sticky;
  top: 0;
}

tbody tr:nth-child(odd) td {
	background-color: #fafbff;
}

thead th:first-child {
	border-top-left-radius: 5px;
}

thead th:last-child {
	border-top-right-radius: 5px;
}
</style>
    <div class="flex-col bg-gray-700 rounded-lg scroll-m-14">
        <div class="flex-col rounded-lg br1gray" style="height: 300px;">
          <!-- <div class="flex justify-between w-full  p-3"> -->
            <div class="fle width-39">             
                
              <!-- <div id="btns" style="display:flex; justify-content: flex-start; ">
              <button on:click={() => {rdata = [[...newRow], ...rdata]; newRow = cols; }}>추가</button>
              <button on:click={delService}>선택삭제</button>
              <button on:click={updService}>적용</button>
              <button on:click={getdata}>적용취소</button>
            </div> -->
            <hr />
            <div class="tList">
              <table >
                <!-- <thead>
                  <tr>
                    {#each columns as column}
                      <th>
                        {column}
                      </th>
                    {/each}
                  </tr>
                </thead> -->
                <!-- <tbody>
                    {#each rdata as row }
                      <tr on:click={() => (curRow = row)} >
                        <td><input type="checkbox" bind:checked={row[0]} /></td>
                        {#if row[1] === 0}
                        <td class="usrid" contenteditable="true" style="width:10rem" bind:textContent={row[2]}/>
                        {:else}
                        <td class="usrid" style="width:10rem">{row[2]}</td>
                        {/if}
                        <td class="host" contenteditable="true" style="width:15rem" bind:textContent={row[3]}/>
                        <td contenteditable="true" class="usrdesc" style="width:20%" bind:textContent={row[4]}/>
                        <td><input type="checkbox" bind:checked={row[5]}/></td> 
                        <td contenteditable="true" class="apps" bind:textContent={row[6]}/>
                        <td>{row[7]}</td>
                        {#if curRow === row}
                          <td>◀</td>
                        {/if}
                      </tr>
                    {/each}
                </tbody> -->
              </table>
            </div>
               
            </div>
        <!-- </div>  -->
    </div>
</div>

