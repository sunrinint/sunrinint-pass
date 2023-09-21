<script lang="ts">
  export let close: () => void;
</script>

<div class="wrapper">
  <div class="modal">
    <h1 class="header">이미지가 너무 큽니다</h1>
    <div class="content">
      <p>테스트</p>
    </div>
    <button class="close" on:click={() => close()}> 시도해볼게요! </button>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1001;

    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    width: 100%;
    max-width: 480px;
    max-height: 80%;
    margin: 0 20px;

    display: flex;
    flex-direction: column;
    gap: 20px;

    padding: 16px;
    border-radius: 8px;
    background-color: var(--Grayscale-10);

    animation: scaleIn 0.3s cubic-bezier(0, 0, 0, 1);

    h1 {
      margin-bottom: 12px;
      color: var(--Grayscale-50);
      font-size: 20px;
      font-weight: 600;
    }

    p {
      color: var(--Grayscale-30);
      font-size: 15px;
      font-weight: 400;

      &:before {
        content: "•";
        margin-right: 8px;
      }
    }

    button {
      padding: 16px 0px;
      color: var(--Grayscale-10);
      border-radius: 4px;
      background: var(--Grayscale-50);
      font-size: 17px;
      font-weight: 600;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(1.08);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
