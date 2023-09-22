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
  let error: { title: string; content: string[] } | undefined;

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
              error = {
                title: "이미지가 너무 큽니다",
                content: [
                  "1MB 이하 크기의 사진으로 다시 시도해보세요.",
                  "권장되는 규격은 512 x 640입니다.",
                ],
              };
              break;

            default:
              break;
          }
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
</div>
<input
  id="upload"
  type="file"
  accept="image/*"
  bind:this={uploadRef}
  on:change={fileChange}
/>
{#if error}
  <Alert close={() => (error = undefined)} {...error} />
{/if}

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
          aspect-ratio: 5/6;
          object-fit: cover;
          max-height: 160px;
          border-radius: 4px;
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
  }
</style>
