<script lang="ts">
  import ArrowBack from "../../assets/arrow_back.svg";
  import { onMount } from "svelte";
  import User from "../../api/User";
  import { encryptedUserInfo, userInfo } from "../../stores/info";
  import Pass from "../../api/Pass";

  const PLACEHOLDER_COLOR = "var(--Grayscale-25, #9098A3)";

  let yearRef: HTMLSelectElement;
  let monthRef: HTMLSelectElement;
  let dayRef: HTMLSelectElement;

  $: _year = $userInfo.birth?.split("-")[0]
    ? parseInt($userInfo.birth?.split("-")[0])
    : undefined;
  $: _month = $userInfo.birth?.split("-")[1]
    ? parseInt($userInfo.birth?.split("-")[1])
    : undefined;
  $: _day = $userInfo.birth?.split("-")[2]
    ? parseInt($userInfo.birth?.split("-")[2])
    : undefined;

  function onChange(event: Event) {
    setColor(event);
    const birth = getBirth();
    if (birth) {
      User.UpdateMe({ birthday: birth }).then(() => {
        Pass.GetEncrypted().then((data) => {
          encryptedUserInfo.set(data);
        });
      });
    }
  }

  function setColor(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target.selectedIndex !== 0) {
      target.style.color = "";
    } else {
      target.style.color = PLACEHOLDER_COLOR;
      // target.style.color = "var(--Grayscale-50, #1c232e)";
    }
  }

  function getBirth() {
    const year = yearRef.value.trim();
    const month = monthRef.value.trim();
    const day = dayRef.value.trim();

    if (year === "년" || month === "월" || day === "일") {
      return;
    }

    return `${year}-${month}-${day}`;
  }

  onMount(() => {
    if (!$userInfo.birth) {
      yearRef.style.color = PLACEHOLDER_COLOR;
      monthRef.style.color = PLACEHOLDER_COLOR;
      dayRef.style.color = PLACEHOLDER_COLOR;
    }
  });
</script>

<div class="wrapper">
  <div class="header">
    <button class="back" on:click={() => history.back()}>
      <img src={ArrowBack.src} alt="Back" />
    </button>
    <p>생년월일</p>
  </div>
  <div class="container">
    <div class="content">
      <div class="date-picker">
        <select name="year" id="year" bind:this={yearRef} on:change={onChange}>
          <option disabled selected={!$userInfo.birth}> 년 </option>
          {#each Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i) as year}
            <option value={year} selected={year === _year}>{year}</option>
          {/each}
        </select>
        <select
          name="month"
          id="month"
          bind:this={monthRef}
          on:change={onChange}
        >
          <option disabled selected={!$userInfo.birth}> 월 </option>
          {#each Array.from({ length: 12 }, (_, i) => i + 1) as month}
            <option value={month} selected={month === _month}>{month}</option>
          {/each}
        </select>
        <select name="day" id="day" bind:this={dayRef} on:change={onChange}>
          <option disabled selected={!$userInfo.birth}> 일 </option>
          {#each Array.from({ length: 31 }, (_, i) => i + 1) as day}
            <option value={day} selected={day === _day}>{day}</option>
          {/each}
        </select>
      </div>
      <p class="info">
        생년월일은 학생증 뒷면 표시를 위해 입력할 수 있으며, 다른 용도로
        사용되지 않습니다.
      </p>
    </div>
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

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    padding: 56px 20px 0px 20px;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    align-content: center;
    gap: 24px;
    flex-shrink: 0;
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

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    max-width: 480px;
    padding-top: 8px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    flex: 1 0 0;
    align-self: stretch;

    .date-picker {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 8px;
      align-self: stretch;

      select {
        display: flex;
        height: 44px;
        padding: 0px 16px;
        justify-content: space-between;
        align-items: center;
        flex: 1 0 0;
        border-radius: 8px;
        background: var(--Grayscale-10, #fff);

        color: var(--Grayscale-30, #4f5d70);
        font-family: SUIT;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 22.5px */

        option:nth-child(1) {
          display: none;
        }
      }
    }

    .info {
      width: 100%;
      padding: 0px 4px;
      color: var(--Grayscale-30, #4f5d70);

      /* Caption */
      font-size: 13px;
      font-weight: 400;
      line-height: 20px; /* 153.846% */
    }
  }
</style>
