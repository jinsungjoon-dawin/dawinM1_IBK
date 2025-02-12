<script>
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher();
  
    function sendMessage() {
      dispatch("message", "자식이 보낸 데이터!");
    }
  </script>
  
  <button on:click={sendMessage}>부모에게 메시지 보내기</button>