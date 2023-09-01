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

<div class="wrapper">
  <svg bind:this={barcode} />
</div>

<style></style>
