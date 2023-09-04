<script></script>

<div class="loading" />

<style lang="scss">
  .loading {
    display: flex;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;

    &::after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 6px solid var(--Grayscale-10);
      border-color: var(--Grayscale-10) transparent var(--Grayscale-10)
        transparent;
      animation: loading 1.2s linear infinite;
    }
  }
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
