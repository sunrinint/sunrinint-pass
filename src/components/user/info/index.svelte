<script lang="ts">
  import { onMount } from "svelte";
  import { isEmpty, encryptedUserInfo } from "../../../stores/info";
  import Pass from "../../../api/Pass";
  import Front from "./front.svelte";
  import Back from "./back.svelte";

  let side: "front" | "back" = "front";

  onMount(async () => {
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });
</script>

<div class="flip">
  <div class="shadow" />
  <div class="card">
    <div class="front">
      <Front />
    </div>
    <div class="back">
      <Back />
    </div>
  </div>
</div>

<style lang="scss">
  div {
    height: 100%;
  }

  .flip {
    position: relative;

    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(82, 99, 133, 0.24);
      filter: blur(20px);
    }

    height: 100%;

    &:hover {
      .card {
        transform: rotateY(180deg);
      }
    }
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.4s;
    transform-style: preserve-3d;

    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .back {
      transform: rotateY(180deg);
    }
  }
</style>
