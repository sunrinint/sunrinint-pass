<script>
  import Background from "../../assets/images/pass_background.svg";
  import { userInfo, isEmpty } from "../../stores/info";
  import Loading from "../Loading.svelte";
</script>

<div class="info">
  <img src={Background.src} alt="pass" width={200} height={242} />

  {#if !$isEmpty}
    <p>선린인터넷고등학교 모바일 학생증</p>
    <div class="detail">
      <h1>{$userInfo.name}</h1>
      <h2>{$userInfo.division}</h2>
      <p>{$userInfo.email}</p>
    </div>

    <p>{$userInfo.date}</p>
  {:else}
    <div class="loading">
      <Loading />
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    width: 100%;
    height: 247px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    background: #1c232e;
    border-radius: 12px 12px 0 0;
    padding: 20px;

    display: flex;
    flex-direction: column;
    gap: 48px;
    position: relative;

    img {
      position: absolute;
      right: 0;
    }

    p {
      font-weight: 400;
      line-height: 150%;
      color: var(--Blue-ish);
      font-size: 15px;
      z-index: 1;
    }

    h1 {
      color: #fff;
      font-size: 33px;
      font-weight: 600;
      line-height: 150%;
      z-index: 1;
    }

    h2 {
      color: #d7e4f5;
      font-size: 17px;
      font-weight: 600;
      line-height: 150%;
      z-index: 1;
    }

    .detail {
      display: flex;
      gap: 4px;
      flex-direction: column;
    }
  }
</style>
