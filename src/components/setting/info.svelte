<script lang="ts">
  import RightArrow from "../../assets/right_arrow.svg";
  import { userInfo } from "../../stores/info";
  import BirthModal from "./birth-modal.svelte";

  let modal = false;
</script>

<div class="wrapper">
  <div class="header">
    <p>내 정보</p>
  </div>
  <button class="content" on:click={() => (modal = true)}>
    <p class="label">생년월일</p>
    <div class="item">
      <p>{$userInfo.birth ?? "설정되지 않음"}</p>
      <img src={RightArrow.src} alt="go" />
    </div>
  </button>
</div>
{#if modal}
  <BirthModal close={() => (modal = false)} />
{/if}

<style lang="scss">
  .wrapper {
    width: 100%;
    display: flex;
    padding: 8px;
    max-width: 480px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-self: stretch;
    border-radius: 8px;
    background: var(--Grayscale-10, #fff);
  }

  img {
    width: 16px;
    height: 16px;
  }

  .header {
    display: flex;
    padding: 12px;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;

    p {
      flex: 1;
      color: var(--Grayscale-50, #1c232e);
      font-size: 17px;
      font-weight: 600;
    }
  }

  .content {
    display: flex;
    padding: 12px 8px 12px 12px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    border-radius: 4px;

    .label {
      color: var(--Grayscale-50, #1c232e);
      font-size: 15px;
      font-weight: 400;
      line-height: 150%; /* 22.5px */
    }

    .item {
      display: flex;
      align-items: center;
      gap: 8px;

      p {
        color: var(--Grayscale-25, #9098a3);
        text-align: right;
        font-size: 15px;
        font-weight: 400;
        line-height: 150%; /* 22.5px */
      }
    }
  }
</style>
