// Minimal JS for testimonial carousel and simple interactions
document.addEventListener('DOMContentLoaded', function(){
  // testimonial carousel
  const carousel = document.getElementById('testimonialCarousel');
  if(carousel){
    const slides = carousel.querySelector('.slides');
    const total = slides.children.length;
    let idx = 0;
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    function show(i){
      if(i < 0) i = total -1;
      if(i >= total) i = 0;
      idx = i;
      slides.style.transform = `translateX(-${idx * 100}%)`;
    }
    prevBtn && prevBtn.addEventListener('click', ()=> show(idx -1));
    nextBtn && nextBtn.addEventListener('click', ()=> show(idx +1));
    // auto rotate
    setInterval(()=> show(idx +1), 6000);
  }
});
