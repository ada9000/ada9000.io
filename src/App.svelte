<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import Navigation from "./components/navigation.svelte";
  import Pool from "./components/poolInfo.svelte"
  import Footer from "./components/footer.svelte"
  import EpochInfo from "./components/epochInfo.svelte";
  import Cheveron from "./assets/icons/cheveron.svelte"
  import Delegators from "./components/delegators.svelte";
</script>

<Router>
  <main>
    <div class="container mx-auto px-4 flex flex-col h-screen">
      <Navigation/>

      <Route path="/">
        <Pool/>
        <div class="flex-grow"/>
        <a href="/#epoch" class="p-1 mx-auto"><Cheveron/></a>
        <div class="flex-grow"/>
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