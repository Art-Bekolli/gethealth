@group('hero_section')
    <div class="hero_section" style="background-color: @sub('hero_background_color');">

        <div id="hero" class="container">
            <h1>@sub('hero_title')</h1>
            <h2>@sub('hero_description')</h2>
            <h3>@sub('hero_subtitle')</h3>
            <button onclick="show()">@sub('button_text')</button>

            <div class="images">
                @fields('hero_images')
                    <img src="@sub('image')">
                @endfields
            </div>
        </div>

        @fields('qualifications')
            @php
                $countq++;
                ${'question' . $countq} = get_sub_field('question');
            @endphp

            <div id="qCard{{ $countq }}" class="qCard container">
                <h1>@sub('question')</h1>

                @fields('options')
                    @php
                        $countb++;
                        $option = get_sub_field('correct');
                        echo '<script>
                            var option' . $countb . ' = "' . $option . '";
                        </script>';
                        echo '<script>
                            var qCard' . $countb . ' = "' . $countq . '";
                        </script>';
                    @endphp
                    <button
                        @php echo "onclick='next(option" . $countb . ", qCard" . $countb . ")'" @endphp>@sub('option')</button>
                @endfields
            </div>
        @endfields
        <div id="zip" class="container CCard">
            <h1>What's Your Zipcode?</h1>
            <select name="zipcode" id="zipcode">
                @fields('zipcode_c')
                    <option value="@sub('zipcode')">@sub('zipcode')</option>
                @endfields
            </select>
            <button onclick="finish()">Continue</button>
        </div>
        <div id="loading" class="container CCard">
          <div class="messages">
            <div id="accepted">
                <div class="title">Congratulations!</div>
                <h1>Based on your answers, you pre-qualify for <span style="color:rgb(0, 182, 122)">Health Insurance plans starting at $0/month in premiums.</span> Tap below to claim your benefits now!</h1>
                <a href="tel:@field('phone')">@field('phone')</a>
                <h1>Your spot is being held for <span id="timer"></span></h1>
            </div>
            <div id="rejected">
                <h1>Sorry, we can't help you.</h1>
                <h2>The questions you answered have helped us determine that we are not able to help you at this time.</h2>
            </div>
            <h1 id="title"></h1>
            <h2 id="subtitle"></h2>
          </div>
        </div>

    </div>

@endgroup

@group('reviews_section')
    <div class="reviews_section container">
        <div class="title">
            <h1>@sub('title')</h1>
            <h3>@sub('subtitle')</h3>
        </div>
        <div class="card">
            <img src="@sub('rating_image')">
            <h1>@sub('card_title')</h1>
            <p>@sub('card_description')</p>
            <p>@sub('card_subtitle')</p>
        </div>
        <div class="ratings">
            <h1>@sub('review_pre-text')</h1>
            <img src="@sub('rating_image')">
            <h2>@sub('review_post-text')</h2>
            <img src="@sub('platform_image')">
        </div>
    </div>
@endgroup

@php
    echo '<script>
        var countq = "'. $countq . '";
    </script>';
@endphp
<script>
      document.getElementById('timer').innerHTML =
  04 + ":" + 50;
    var Ccounter = 0;

    function show() {
        document.getElementById("qCard1").classList.add("active");
        document.getElementById("hero").classList.add("inactive");
    }

    function next(o, q) {
        var qc = +q + 1;
        if (o == 'Correct') {
            Ccounter++;
            if (q == countq) {
                document.getElementById("qCard" + q).classList.remove("active");
                document.getElementById("zip").classList.add("active");
            }
            document.getElementById("qCard" + q).classList.remove("active");
            document.getElementById("qCard" + qc).classList.add("active");

        } else if (o == 'Incorrect') {
            if (q == countq) {
                document.getElementById("qCard" + q).classList.remove("active");
                document.getElementById("zip").classList.add("active");
            }
            document.getElementById("qCard" + q).classList.remove("active");
            document.getElementById("qCard" + qc).classList.add("active");
        }

    }

    function finish(){
        
      Ccounter++
      document.getElementById("zip").classList.remove("active");
      document.getElementById("loading").classList.add("active");
      document.getElementById('title').innerHTML = 'Reviewing your answers';
      setTimeout(() => {
        document.getElementById('title').innerHTML = 'Searching your state coverage';
      }, 1000);

    setTimeout(() => {
        document.getElementById('title').innerHTML = 'Confirming eligibility';
    }, 2000);
    
if(Ccounter < 2){


    setTimeout(() => {
        document.getElementById('title').innerHTML = "";
        document.getElementById('subtitle').innerHTML = "";
        document.getElementById('rejected').style.display = "block";
    }, 3000);


    }else if(Ccounter >= 2){

        setTimeout(() => {
            document.getElementById('title').innerHTML = "";
        document.getElementById('accepted').style.display = "block";
        startTimer();
    }, 3000);

    }
  }




function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
    return
  }
  
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(startTimer, 1000);
  
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
</script>
