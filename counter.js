(function () {
  var clock = document.getElementById("clockdiv");
  var hoursSpan = clock.querySelector(".hours");
  var minutesSpan = clock.querySelector(".minutes");
  var secondsSpan = clock.querySelector(".seconds");
  var userTimeZone = document.getElementById("userTimeZone");
  var userTime = new Date();
  var offset = -240;
  var centraloffset = -300;
  var mountainoffset = -360;
  var pacificoffset = -420;
  var currentDate = new Date();

  currentDate.setTime(
    currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000
  );
  // setting time for 2pm
  var deadLine = new Date(currentDate.getTime() + offset * 60 * 1000);
  deadLine.setHours(14, 0, 0);

  // for central
  if (currentDate.getTimezoneOffset() === 300) {
    userTime = new Date(currentDate.getTime() + centraloffset * 60 * 1000);
    userTime.setHours(13, 0, 0);
    // offset = -300;
    // for mountain
  } else if (currentDate.getTimezoneOffset() === 360) {
    userTime = new Date(currentDate.getTime() + mountainoffset * 60 * 1000);
    userTime.setHours(12, 0, 0);
    // offset = -360;

    // for pacific
  } else if (currentDate.getTimezoneOffset() === 420) {
    // userTime = new Date(currentDate.getTime() + pacificoffset * 60 * 1000);
    // console.log(userTime.toLocaleString());
    // // userTime.setHours(11, 0, 0);
    // offset = -420;
    // for eastern
  } else {
    userTime = new Date(currentDate.getTime() + offset * 60 * 1000);
    userTime.setHours(14, 0, 0);
    // offset = -240;
  }

  function formatAMPM(date) {
    const strinDate = `${date}`;
    var tZone = strinDate.replace(strinDate.slice(0, 34), "");
    var day = date.toDateString();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = `${day} ${hours}:${minutes} ${ampm} ${tZone}`;
    return strTime;
  }
  userTimeZone.innerText = formatAMPM(userTime);

  function pad(num) {
    return ("0" + parseInt(num)).substr(-2);
  }
  function tick() {
    var now = new Date();
    now.setTime(now.getTime() + now.getTimezoneOffset() * 60 * 1000);
    now = new Date(now.getTime() + offset * 60 * 1000);
    // displaying according to Time zone
    if (now > deadLine) {
      // too late, go to tomorrow
      userTime.setDate(userTime.getDate() + 1);
      userTimeZone.innerText = formatAMPM(userTime);
      deadLine.setDate(deadLine.getDate() + 1);
    }
    var remain = (deadLine - now) / 1000;
    var hh = pad((remain / 60 / 60) % 60);
    var mm = pad((remain / 60) % 60);
    var ss = pad(remain % 60);
    hoursSpan.innerHTML = hh;
    minutesSpan.innerHTML = mm;
    secondsSpan.innerHTML = ss;

    setTimeout(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", tick);
})();
