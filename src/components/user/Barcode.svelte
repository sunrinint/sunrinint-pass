<script lang="ts">
  import { onMount } from "svelte";
  import JsBarcode from "jsbarcode";
  import Pass from "../../api/Pass";
  import { isEmpty, userInfo } from "../../stores/info";

  function updateBarcode() {
    JsBarcode(barcode, $userInfo.barcode, {
      format: "CODE128",
      lineColor: "#1C232E",
      height: 48,
      displayValue: false,
      margin: 0,
    });
  }

  onMount(() => {
    if (isEmpty.get()) {
      Pass.Get().then((data) => {
        userInfo.set(data);
        updateBarcode();
      });
    } else {
      updateBarcode();
    }
  });

  let barcode: SVGSVGElement;
</script>

<div class="barcode">
  <svg bind:this={barcode} />
  <p>&nbsp;{$userInfo.barcode ?? ""}&nbsp;</p>
</div>

<style lang="scss">
  .barcode {
    border-radius: 0 0 12px 12px;
    padding: 20px 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background-color: white;

    z-index: 1;

    p {
      color: #1c232e;
      font-size: 15px;
      font-weight: 400;
      line-height: 150%;
    }
  }
</style>
