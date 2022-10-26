<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Navigation from "./lib/navigation.svelte";
  import Pool from "./lib/poolInfo.svelte"
  import Footer from "./lib/footer.svelte"
  import EpochInfo from "./lib/epochInfo/epochInfo.svelte";
  import Cheveron from "./assets/icons/cheveron.svelte"
  import Delegators from "./lib/delegators.svelte";
</script>

<Router>
  <main>
    <div class="container mx-auto px-4 flex flex-col h-screen">
      <Navigation/>

      <Route path="/">
        <Pool/>
        <EpochInfo/>
        <div class="flex-grow"/>
        <a href="/#delegators" class="p-1 mx-auto"><Cheveron/></a>
        <div class="flex-grow"/>
        <Delegators/>
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