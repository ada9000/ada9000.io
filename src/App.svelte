<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Navigation from "./components/navigation.svelte";
  import Pool from "./components/poolInfo.svelte"
  import Footer from "./components/footer.svelte"
  import EpochInfo from "./components/epochInfo.svelte";
</script>

<Router>
  <main>
    <div class="container mx-auto px-4 flex flex-col h-screen">
      <Navigation/>

      <Route path="/">
        <Pool/>
        <EpochInfo/>
      </Route>

      <Route path="blog">
        <p>blog</p>
      </Route>

      <Route path="tools">
        <p>tools</p>
      </Route>
      <div class="flex-grow"/>
      <Footer/>
    </div>
  </main>
</Router>