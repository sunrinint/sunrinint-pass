<script lang="ts">
  import { onMount } from "svelte";
  import Pass from "../api/Pass";

  onMount(() => {
    Pass.Get().then((res) => {
      // console.log(res);
    });
  });
</script>

<div />

<style></style>
