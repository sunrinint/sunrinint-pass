<script lang="ts">
  import { onMount } from "svelte";
  import JsBarcode from "jsbarcode";
  import Pass from "../../api/Pass";
  import { isEmpty, userInfo } from "../../stores/info";

  onMount(() => {
    if (isEmpty.get()) {
      Pass.Get().then((data) => {
        userInfo.set(data);
      });
    }
  });

  console.log($isEmpty);

  $: if (!$isEmpty) {
    console.log($userInfo);
    JsBarcode("#barcode", userInfo.get().barcode, {
      format: "CODE128",
      lineColor: "#0aa",
      width: 4,
      height: 40,
      displayValue: false,
    });
  }
</script>

<div class="wrapper">
  <div id="barcode" />
</div>

<style></style>
