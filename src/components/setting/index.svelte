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
  import File from "../../api/File";
  import { fade } from "svelte/transition";
  import Alert from "./alert.svelte";

  let uploadRef: HTMLInputElement;
  let error: string | undefined;
  let timer: NodeJS.Timeout;

  function clearError() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      error = undefined;
    }, 3000);
  }

  onMount(async () => {
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    }
  });

  function fileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      console.log(file);
      File.Upload(file)
        .then(({ location }) => {
          User.UpdateMe({ profileImage: location }).then(() => {
            Pass.GetEncrypted().then((data) => {
              encryptedUserInfo.set(data);
            });
          });
        })
        .catch((err) => {
          switch (err.response.status) {
            case 413:
              error = "파일의 크기가 너무 큽니다.";
              break;

            default:
              break;
          }
          clearError();
        });
    }
  }

  function logout() {
    resetUserInfo();
    User.Logout().then(() => (location.href = "/login"));
  }

  function upload() {
    uploadRef.click();
  }

  function remove() {
    User.UpdateMe({ profileImage: null }).then(() => {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    });
  }
</script>

<div class="wrapper">
  <div class="user">
    <div class="profile">
      <img
        src={$userInfo.profile ?? Preview.src}
        alt="Profile"
        referrerpolicy="no-referrer"
      />
      {#if $userInfo.profile}
        <button on:click={() => remove()}> x </button>
      {/if}
    </div>
    <div class="detail">
      <h2>{$userInfo.name}</h2>
      <p>{$userInfo.email}</p>
    </div>
  </div>
  <div class="buttons">
    <button on:click={() => logout()}>
      로그아웃 <img src={Logout.src} alt="logout" />
    </button>
    <button on:click={() => upload()}>
      사진 수정 <img src={Edit.src} alt="edit" />
    </button>
  </div>
  {#if error}
    <p class="error" transition:fade>{error}</p>
  {/if}
</div>
<input
  id="upload"
  type="file"
  accept="image/*"
  bind:this={uploadRef}
  on:change={fileChange}
/>
<Alert close={() => {}} />

<style lang="scss">
  #upload {
    display: none;
  }

  .wrapper {
    display: flex;
    padding: 12px 0px;
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

      .profile {
        position: relative;
        img {
          max-height: 160px;
        }

        button {
          position: absolute;
          top: 0;
          right: 0;

          transform: rotate(180deg);

          visibility: hidden;
        }

        &:hover {
          button {
            visibility: visible;
            color: var(--Grayscale-25);
          }
        }
      }

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
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;

      button {
        flex: 1;
        display: flex;
        height: 44px;
        padding: 12px 20px;
        justify-content: center;
        align-items: center;
        gap: 8px;
        border-radius: 30px;
        background: var(--Grayscale-10, #fff);

        font-size: 15px;
        color: var(--Grayscale-30);

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .error {
      color: #ff0000;
      font-size: 15px;
      font-weight: 400;
      line-height: 150%; /* 22.5px */
    }
  }
</style>
