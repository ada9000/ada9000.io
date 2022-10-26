<script lang="ts">
  function handleDelegate(){
    var pool_id = '4f3410f074e7363091a1cc1c21b128ae423d1cce897bd19478e534bb'
    var blockfrost_project_id = 'sfqtak81tszucYd8SPcKjEJMzmEs0CIl'
    var link = 'https://armada-alliance.com/delegation-widget?pool_id=' + pool_id + '&blockfrost_project_id=' + blockfrost_project_id
    var width = 600
    var height = Math.min(800, window.outerHeight)
    var left = (window.outerWidth / 2) - (width / 2)
    var top = (window.outerHeight - height) / 2
    window.open(link, 'Delegate', 'width=' + width + ',height=' + height + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=1,resizable=1,left=' + left + ',top=' + top);
  }
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <a href="/">
      <p class="text text-4xl">9000</p>
    </a>
  </div>
  <div class="p-1">
    <button class="btn" on:click={handleDelegate}>Join</button>
  </div>
</div>

<style>
</style>
