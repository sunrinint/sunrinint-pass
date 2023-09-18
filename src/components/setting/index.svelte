<script lang="ts">
  import { onMount } from "svelte";
  import Preview from "../../assets/images/Preview.png";
  import Logout from "../../assets/logout.svg";
  import Edit from "../../assets/edit.svg";
  import {
    encryptedUserInfo,
    isEmpty,
    resetUserInfo,
    userInfo,
  } from "../../stores/info";
  import User from "../../api/User";
  import Pass from "../../api/Pass";

  onMount(async () => {
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });

  function logout() {
    resetUserInfo();
    User.Logout().then(() => (location.href = "/login"));
  }
</script>

<div class="wrapper">
  <div class="user">
    <img
      src={$userInfo.profile ?? Preview.src}
      alt="Profile"
      referrerpolicy="no-referrer"
    />
    <div class="detail">
      <h2>{$userInfo.name}</h2>
      <p>{$userInfo.email}</p>
    </div>
  </div>
  <div class="buttons">
    <button on:click={() => logout()}
      >로그아웃 <img src={Logout.src} alt="logout" /></button
    >
    <button>사진 수정 <img src={Edit.src} alt="edit" /></button>
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
    padding: 16px 0px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    .user {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      align-self: stretch;

      .detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        align-self: stretch;

        h2 {
          color: var(--Grayscale-50, #1c232e);
          text-align: center;
          font-size: 24px;
          font-weight: 600;
        }

        p {
          color: var(--Grayscale-30, #4f5d70);
          text-align: center;
          font-size: 15px;
          font-weight: 400;
          line-height: 150%; /* 22.5px */
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;

      button {
        display: flex;
        padding: 12px 20px;
        align-items: center;
        gap: 8px;
        border-radius: 30px;
        background: var(--Grayscale-10, #fff);

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
</style>
