<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Navigation from "./components/navigation.svelte";
  import Pool from "./components/poolInfo.svelte"
</script>

<Router>
  <main>
  <div class="container mx-auto px-4">
    <Navigation/>

    <Route path="/">
      <Pool/>
    </Route>

    <Route path="blog">
      <p>blog</p>
    </Route>

    <Route path="tools">
      <p>tools</p>
    </Route>

    </div>
  </main>
</Router>