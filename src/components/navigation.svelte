<script lang="ts">
  let logo = "ada9000_logo.png"
  import MenuSvg from "../assets/icons/menu.svelte"
  import HomeSvg from "../assets/icons/home.svelte"
  import InfoSvg from "../assets/icons/info.svelte"
  import { Link } from "svelte-navigator";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <img src={logo} alt="Ada9000's pool logo. A pastel blue and pink doughnut with embedded ghost." class="w-20 h-20"/>
    <p class="px-2 normal-case text-xl">9000</p>
  </div>

  <div class="p-1">
    <button class="btn">Join</button>
  </div>
</div>

<style>
</style>
