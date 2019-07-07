<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
      var orderHeight=document.documentElement.clientHeight || document.body.clientHeight;
      document.getElementById("app").style.height=orderHeight+'px';
  },
}
</script>

<style>
*{
  margin:0;
  padding:0;
}

</style>
