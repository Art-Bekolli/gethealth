<footer class="content-info">
  <div class="container">
    @group('footer')
   <div class="top">
    <div class="img">
      <img src="@sub('icon')">
    </div>
    <div class="text">
      <h1>@sub('title')</h1>
      <h2>@sub('subtitle')</h2>
    </div>
   </div>
   <hr>
   <div class="bottom">
    <p>@sub('description')</p>
    <h4>@sub('copyright')</h4>
   </div>
   @endgroup
  </div>
</footer>
