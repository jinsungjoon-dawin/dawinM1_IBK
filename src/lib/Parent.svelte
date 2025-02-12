<script>
    import Child from "./Child.svelte";
    let childMessage = "";
  
    function handleChildEvent(event) {
      childMessage = event.detail; // 자식에서 전달된 값 저장
    }
  </script>
  
  <Child on:message={handleChildEvent} />
  
  <p>자식이 보낸 메시지: {childMessage}</p>


  <Child on:message={handleChildEvent} ></Child>