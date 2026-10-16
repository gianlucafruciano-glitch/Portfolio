document.addEventListener("DOMContentLoaded", function () {
  let btnS = document.getElementById('Ho1');
  let HTML1 = document.getElementById('HTML1');
  let CSS1 = document.getElementById('CSS1');
  let JS1 = document.getElementById('JS1');

  var interval1 = null;
  var interval2 = null;
  var interval3 = null;

  let skills = [
    { id: 'c1', skill: 'HTML', percentage: 0.75, color: 'red' },
    { id: 'c2', skill: 'CSS', percentage: 0.85, color: 'midnightblue' },
    { id: 'c3', skill: 'JS', percentage: 0.60, color: 'forestgreen' }
  ]

  window.addEventListener('scroll', function () {
    var scrollTop = window.scrollY;
    var docHeight = document.body.scrollHeight - window.innerHeight;
    var progress = (scrollTop / docHeight) * 100;
    document.querySelector('.slideBarFill').style.height = progress + '%';
  });

  var animated = false;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;

        HTML1.innerHTML = `${skills[0].skill} <br> ${skills[0].percentage * 100}%`;
        CSS1.innerHTML = `${skills[1].skill} <br> ${skills[1].percentage * 100}%`;
        JS1.innerHTML = `${skills[2].skill}  <br> ${skills[2].percentage * 100}%`;

        skills.forEach((s) => {
          animateCircle(s.id, s.percentage, s.color);
        })
      }

      if (!entry.isIntersecting) {
        animated = false;

        document.getElementById('c1').getContext('2d').clearRect(0, 0, 200, 200);
        document.getElementById('c2').getContext('2d').clearRect(0, 0, 200, 200);
        document.getElementById('c3').getContext('2d').clearRect(0, 0, 200, 200);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('skills'));

  btnS.addEventListener('click', function () {
    HTML1.innerHTML = 'HTML <br> 75%';
    CSS1.innerHTML = 'CSS <br> 85%';
    JS1.innerHTML = 'JS <br> 60%';

    skills.forEach((s) => {
      animateCircle(s.id, s.percentage, s.color);
    })
  });

  let intervals = [];

  function animateCircle(id, end, color) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext("2d");
    var progress = 0;

    clearInterval(intervals[id]);

    intervals[id] = setInterval(function () {
      ctx.clearRect(0, 0, 200, 200);
      ctx.beginPath();
      ctx.arc(100, 100, 80, -Math.PI / 2, Math.PI * 2 * progress - Math.PI / 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.stroke();

      if (progress < end) progress += 0.01;
      else clearInterval(intervals[id]);
    }, 16);
  }

});