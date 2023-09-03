<script lang="ts">
  import { onMount } from "svelte";
  import Barcode from "svelte-barcode";
  import Pass from "../../api/Pass";
  import { encryptedUserInfo, isEmpty, userInfo } from "../../stores/info";

  let barcode: string;

  userInfo.subscribe((data) => {
    if (data) {
      barcode = data.barcode;
    }
  });

  onMount(() => {
    if (isEmpty.get()) {
      Pass.GetEncrypted().then((data) => {
        encryptedUserInfo.set(data);
      });
    } else {
      barcode = $userInfo.barcode;
    }
  });
</script>

<div class="barcode">
  <Barcode
    value={barcode}
    elementTag={"svg"}
    options={{
      format: "CODE128",
      lineColor: "var(--Grayscale-50)",
      height: 48,
      displayValue: false,
      margin: 0,
    }}
  />
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
      color: var(--Grayscale-50);
      font-size: 15px;
      font-weight: 400;
      line-height: 150%;
    }
  }
</style>
