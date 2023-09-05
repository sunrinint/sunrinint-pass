<script lang="ts">
  import { onMount } from "svelte";
  import { isEmpty, encryptedUserInfo } from "../../../stores/info";
  import Pass from "../../../api/Pass";
  import Front from "./front.svelte";
  import Back from "./back.svelte";
  import { register } from "swiper/element/bundle";
  import Flip from "../../../assets/flip.svg";
  import { slide } from "svelte/transition";
  import type Swiper from "swiper";

  let cardRef: HTMLDivElement;
  let swiperRef: { swiper: Swiper };

  let side: "front" | "back" = "front";

  onMount(async () => {
    register();
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });

  function onSlideChange(e: any) {
    side = e.detail[0].activeIndex === 0 ? "front" : "back";
  }

  $: if (cardRef) {
    if (side === "front") {
      cardRef.style.transform = "rotateY(0deg)";
      swiperRef.swiper.slideTo(0);
    } else {
      cardRef.style.transform = "rotateY(180deg)";
      swiperRef.swiper.slideTo(1);
    }
  }

  const flip = () => {
    side = side === "front" ? "back" : "front";
  };
</script>

<div class="flip">
  <swiper-container
    class="swiper"
    on:slidechange={onSlideChange}
    speed="0"
    follow-finger={false}
    bind:this={swiperRef}
  >
    <swiper-slide />
    <swiper-slide />
  </swiper-container>
  <div class="card" bind:this={cardRef}>
    <div class="shadow" />
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
    /* opacity: 0; */
    color: white;
  }

  div {
    height: 100%;
  }

  .flip {
    position: relative;
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

    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(82, 99, 133, 0.24);
      filter: blur(20px);
    }

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
