<script lang="ts">
  import { onMount } from "svelte";
  import JsBarcode from "jsbarcode";
  import Pass from "../../api/Pass";
  import { isEmpty, userInfo } from "../../stores/info";

  function updateBarcode() {
    JsBarcode(barcode, $userInfo.barcode, {
      format: "CODE128",
      lineColor: "#0aa",
      width: 4,
      height: 40,
      displayValue: false,
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
