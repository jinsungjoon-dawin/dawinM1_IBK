
<script>
    import DashBoard  from "./DashBoard.svelte";
    import LoadDataVerifyResult from "./LoadDataVerifyResult.svelte";
    import LoadDataVerifyResultPage from "./LoadDataVerifyResultPage.svelte";
    import { onMount } from "svelte";
    import Tabs from "./Tabs.svelte";
    // 사용자 관리
    import User_Tab1 from "./BulkRegistrationOfUsers.svelte";
    import User_Tab2 from "./DeleteUsersInBulk.svelte";
    import User_Tab3 from "./IndividualUserManagement.svelte";
    
    //upload 관리 
    import Upload_Tab1 from "./UploadManagement.svelte";
    //import Upload_Tab2 from "./DeleteUsersInBulk.svelte";
    //import Upload_Tab3 from "./IndividualUserManagement.svelte"; 
    
    let pageNm = "사용자 및 Upload 관리";
  
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
      /* IndividualUserManagement
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
   // List of tab items with labels, values and assigned components
  let items = [
    { label: "사용자관리",
      value: 1,
      component: User_Tab1,       
		},
    { label: "성능 Data Upload",
      value: 2,
      component: User_Tab2
	  },
    { label: "Data 검증 Upload",
      value: 3,
      component: User_Tab3
		},
    { label: "시나리오 Upload",
      value: 4,
      component: Upload_Tab1,       
		}
  ];        
  let items1 = [
    { label: "성능 Data Upload",
      value: 1,
      component: Upload_Tab1,       
		}
    // { label: "Data 검증 Upload",
    //   value: 2,
    //   component: Upload_Tab2
	  // },
    // { label: "개별 관리",
    //   value: 3,
    //   component: Upload_Tab3
		// }
  ];  
        
</script>   
<style>
  .table-title {
        background-color: #a9c8ff;
        border-bottom-style: solid;
    }
    /* Styling for the Tabs component */
    :global(.tab-menu .tab-item) {
        color: yellow; /* Set tab text color to yellow */
        font-size: 16px;
        font-weight: bold;
    }

    :global(.tab-menu .tab-item:hover) {
        color: orange; /* Optional: Set hover color to orange */
    }

    :global(.tab-menu .tab-item.active) {
        color: yellow; /* Keep active tab text yellow */
        text-decoration: underline; /* Optional: Add underline to active tab */
    }
    .tcode-status {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    overflow-y: auto;
    border: 1px solid black;
    }
    .table-title {
    background-color: #a9c8ff;
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
  

</style>
<div>
  <label for="date-from" class="text-sm font-medium text-white  font-bold whitespace-nowrap" style="font-size: 25px;">
  관리자 페이지
  </label>
  <Tabs {items}  />
</div>
<!-- <div>
  <label for="date-from" class="text-sm font-medium text-white mt-10 font-bold whitespace-nowrap" style="font-size: 25px;">
    2. Upload 관리
    </label>
  <Tabs {items1} />
</div> -->
