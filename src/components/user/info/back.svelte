<script lang="ts">
  import { onMount } from "svelte";
  import Preview from "../../../assets/images/Preview.png";
  import Seal from "../../../assets/seal.svg";
  import { userInfo, isEmpty, encryptedUserInfo } from "../../../stores/info";
  import Loading from "../../Loading.svelte";
  import Pass from "../../../api/Pass";

  onMount(async () => {
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });
</script>

<div class="info info-back">
  {#if !$isEmpty}
    <p>선린인터넷고등학교 모바일 학생증</p>
    <div class="image">
      <img src={Preview.src} alt="profile" />
    </div>
    <div class="detail">
      <h1>나선린</h1>
      <h2>
        <span>생년월일</span>
        <span>2006.01.15</span>
      </h2>
    </div>
    <div class="sign">
      <img src={Seal.src} alt="seal" />
      <div class="text">
        <p>위 사람은 본교 학생임을 증명함.</p>
        <p>{$userInfo.date ?? ""}&nbsp;</p>
      </div>
    </div>
  {:else}
    <div class="loading">
      <Loading />
    </div>
  {/if}
</div>

<style lang="scss">
  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    background: var(--Grayscale-10);
    border-radius: 12px;
    padding: 20px 0;
    height: 100%;
    min-height: 249px;
    max-height: 430px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: relative;

    p {
      font-weight: 400;
      line-height: 150%;
      color: var(--Grayscale-30);
      font-size: 15px;
      z-index: 1;
    }

    .detail {
      display: flex;
      gap: 4px;
      flex-direction: column;

      h1 {
        color: var(--Grayscale-50, #1c232e);
        text-align: center;
        font-size: 32px;
        font-weight: 700;
        line-height: 150%; /* 48px */
        letter-spacing: 6.4px;
      }

      h2 {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;
        align-self: stretch;

        span {
          color: var(--Grayscale-30, #4f5d70);
          text-align: center;
          font-size: 17px;
          line-height: 150%; /* 25.5px */
        }

        span:nth-child(1) {
          font-weight: 600;
        }

        span:nth-child(2) {
          font-weight: 400;
        }
      }
    }

    .sign {
      display: flex;
      padding: 0px 40px;
      justify-content: center;
      align-items: center;
      gap: 12px;
      align-self: stretch;

      .text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 4px;

        p {
          color: var(--Grayscale-30, #4f5d70);
          font-size: 15px;
          line-height: 150%; /* 22.5px */
        }

        p:nth-child(1) {
          font-weight: 600;
        }

        p:nth-child(2) {
          font-weight: 400;
        }
      }
    }
  }
</style>
