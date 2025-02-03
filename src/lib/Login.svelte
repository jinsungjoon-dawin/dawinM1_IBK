<script>
  import { authApps, isLogged, userid, isLogin } from "../aqtstore";
  const imgUrl = new URL("/images/Logo.png", import.meta.url).href;
  import { Buffer } from 'buffer';
  import {rooturl} from "../aqtstore";
  import { onMount } from "svelte";
	let showModal = false;
	let usrid = "";
  let usridInput;
	let password = "";
  let passwordInput;
	let error = "";
  let chkUsrid = "";
  let chkUsridInput;
  let chkPassword = "";
  let chkPasswordInput;
  let chkPassword2 = "";
  let chkPassword2Input;
  let usridChk = ""; 

  async function login() {
  // const chk = await getCheckPass(password);
  const res = await fetch($rooturl + "/logonchk?pass=" + password);
  let data = await res.json();

		if (data.chk) {
			$isLogged = 2;
			if (error) error = "";
		} else {
			error = "비밀번호가 맞지않습니다.";
		}
	}

	async function login3() {
    if(usrid === ""){
      alert("아이디를 입력하세요.");
      usridInput.focus();
      return;
    }else if(password === ""){
      alert("비밀번호를 입력하세요.");
      passwordInput.focus();
      return;
    }
		if (password === "aqtuser") {
			showModal = true;
			return;
		}
		fetch($rooturl + "/logonchk", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pass:
					Math.floor(Math.random() * 100)
						.toString()
						.padStart(2, "0") +
					Buffer.from(password, "utf8").toString("base64"),
				usrid:
					Math.floor(Math.random() * 10) +
					Buffer.from(usrid, "utf8").toString("base64"),
			}),
		})
    .then(async (res) => {
				const data = await res.json();
        if (!res.ok) {
          alert(data.message || 'API Error');
        }
				if (data.hg == 0) error = "허가되지않은 IP.";
				else if (data.chk) {
					$isLogged = data.admin == "1" ? 2 : 1;
					$authApps = data.apps;
					$userid = usrid;
					//					getTcodelist() ;
					if (error) error = "";
				} else {
					error = "비밀번호가 맞지않습니다.";
				}
			})
			.catch((err) => {
				error = err.message;
			});
	}

	async function login2() {
		// $isLogged = 1;
    localStorage.setItem('usrid', usrid);
    localStorage.setItem('usridChk', usridChk);
    isLogin.set(true);
	}

  async function changPassword() {
    if(chkUsrid === ""){
      alert("아이디를 입력하세요.");
      chkUsridInput.focus();
      return;
    }else if(chkPassword === ""){
      alert("비밀번호를 입력하세요.");
      chkPasswordInput.focus();
      return;
    }else if(chkPassword2 === ""){
      alert("확인 비밀번호를 입력하세요.");
      chkPassword2Input.focus();
      return;
    }
		
		fetch($rooturl + "/비밀번호 변경 Url", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pass:
					Math.floor(Math.random() * 100)
						.toString()
						.padStart(2, "0") +
					Buffer.from(password, "utf8").toString("base64"),
				usrid:
					Math.floor(Math.random() * 10) +
					Buffer.from(usrid, "utf8").toString("base64"),
			}),
		})
    .then(async (res) => {
				const data = await res.json();
        if (!res.ok) {
          alert(data.message || 'API Error');
        }
				if (data.hg == 0) error = "허가되지않은 IP.";
				else if (data.chk) {
					$isLogged = data.admin == "1" ? 2 : 1;
					$authApps = data.apps;
					$userid = usrid;
					//					getTcodelist() ;
					if (error) error = "";
				} else {
					error = "비밀번호가 맞지않습니다.";
				}
			})
			.catch((err) => {
				error = err.message;
			});
	}
  function toggleModal() {
    showModal = !showModal;
  }

  onMount(() => {
    if(localStorage.getItem('usridChk') === "true"){
      usridChk = true;
      usrid = localStorage.getItem('usrid');
    }
  })
  </script>
  
  <style>
    /* 추가적인 커스터마이징이 필요하면 여기 추가 */
  </style>
    <div class="min-h-screen bg-gray-100 flex items-center flex-start  justify-center" >
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 class="text-3xl font-semibold text-center text-gray-700 mb-6">IBK 기업은행 EDW 시스템 인프라 재구축</h2>
      
      <!-- 로그인 폼 -->
      <form on:submit|preventDefault={() => {}} >
        <!-- 이메일 입력 -->
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">아이디</label>
          <input
            type="text"
            id="id"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="아이디를 입력하세요."
            bind:value={usrid}
            bind:this={usridInput}
          />
        </div>
        
        <!-- 비밀번호 입력 -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
          <input
            type="password"
            id="password"
            class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="비밀번호를 입력하세요."
            bind:value={password}
            bind:this={passwordInput}
          />
        </div>
        
        <!-- 로그인 버튼 -->
        <button class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none" on:click={login2} >
          로그인
        </button>
      </form>
      <!-- 비밀번호 재설정 링크 -->
      <div class="mt-4 flex justify-between">
        <div><label for="usridChk">계정저장</label> <input type="checkbox" id="usridChk" bind:checked={usridChk}></div>
        <a href="#" class="text-sm text-blue-500 hover:underline" on:click={toggleModal}>비밀번호 변경</a>
      </div>
  
     
      <div class="flex justify-center">
        <img src="assets/src/img/DAWINICT_logo.png" alt="Logo" class="w-32 h-32 object-contain" />
      </div>
      <!-- <img src="../img/DAWINICT_logo.png" alt="Logo" class="w-72 h-72 object-contain" /> -->
    </div>
  </div>
  {#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 class="text-xl font-semibold mb-4">비밀번호 변경</h3>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-600">아이디</label>
        <input
          type="text"
          id="id"
          class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="아이디를 입력하세요."
          bind:value={chkUsrid}
          bind:this={chkUsridInput}
        />
      </div>
      
      <!-- 비밀번호 입력 -->
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600">비밀번호</label>
        <input
          type="password"
          id="password"
          class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="비밀번호를 입력하세요."
          bind:value={chkPassword} 
          bind:this={chkPasswordInput}/>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600">확인 비밀번호</label>
        <input
          type="password"
          id="password"
          class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="확인 비밀번호를 입력하세요."
          bind:value={chkPassword2} 
          bind:this={chkPassword2Input}/>
      </div>
      <div class="mt-4 flex justify-between">
        <button
          on:click={toggleModal}
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          취소
        </button>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" on:click={changPassword}>
          비밀번호 재설정
        </button>
      </div>
    </div>
  </div>
{/if}