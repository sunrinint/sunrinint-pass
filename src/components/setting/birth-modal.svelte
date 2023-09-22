<script lang="ts">
  import { slide } from "svelte/transition";
  import ArrowBack from "../../assets/arrow_back.svg";
  import { cubicOut } from "svelte/easing";

  export let close: () => void;
</script>

<div class="wrapper" transition:slide={{ axis: "x" }}>
  <div class="header">
    <button class="back" on:click={close}>
      <img src={ArrowBack.src} alt="Back" />
    </button>
    <p>생년월일</p>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: var(--Grayscale-20, #f0f2f5);

    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  }

  .header {
    width: 100%;
    height: 56px;
    padding: 0 16px;

    position: fixed;
    top: 0;

    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--Grayscale-20);

    button.back {
      display: flex;
      width: 44px;
      height: 44px;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;

      img {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
      }
    }

    p {
      color: var(--Grayscale-50, #1c232e);
      text-align: center;

      /* Label */
      font-size: 17px;
      font-weight: 400;
      line-height: 24px; /* 141.176% */
    }
  }
</style>
