<script lang="ts">
  import { onMount } from "svelte";
  import { isEmpty, encryptedUserInfo } from "../../../stores/info";
  import Pass from "../../../api/Pass";
  import Front from "./front.svelte";
  import Back from "./back.svelte";
  import { register } from "swiper/element/bundle";
  import Flip from "../../../assets/flip.svg";
  import { slide } from "svelte/transition";

  let cardRef: HTMLDivElement;

  let side: "front" | "back" = "back";

  onMount(async () => {
    register();
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });

  const onProgress = (e: any) => {
    flip();
  };

  const flip = () => {
    side = side === "front" ? "back" : "front";

    if (side === "front") {
      cardRef.style.transform = "rotateY(0deg)";
    } else {
      cardRef.style.transform = "rotateY(180deg)";
    }
  };
</script>

<div class="flip">
  <div class="shadow" />
  <swiper-container
    class="swiper"
    on:progress={onProgress}
    speed="0"
    slides-per-view="1"
    follow-finger={false}
  >
    <swiper-slide />
    <swiper-slide />
  </swiper-container>
  <div class="card" bind:this={cardRef}>
    <div class="front">
      <Front />
    </div>
    <div class="back">
      <Back />
    </div>
  </div>
  <button class="flip-button" on:click={flip}>
    <p>학생증 {side === "back" ? "앞면" : "뒷면"} 보기</p>
    <img src={Flip.src} alt="logout" width={16} height={16} />
  </button>
</div>

<style lang="scss">
  .swiper {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

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

    &-button {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 100%);
      bottom: -40px;

      padding: 12px 20px;
      gap: 4px;
      border-radius: 30px;

      display: flex;
      align-items: center;
      gap: 4px;
      background-color: var(--Grayscale-10);

      p {
        color: var(--Grayscale-30);
        font-size: 15px;
        font-weight: 400;
      }
    }
  }

  .card {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.4s;
    transform-style: preserve-3d;
    border-radius: 12px;
    .front,
    .back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 12px;
    }

    .back {
      transform: rotateY(180deg);
    }
  }
</style>
