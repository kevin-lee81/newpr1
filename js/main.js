// 웹 문서가 모두 로드된 후에 코드 실행
document.addEventListener('DOMContentLoaded', function() {

  // 필요한 요소(element)들을 변수에 저장
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('header');
  const headerHeight = header.offsetHeight;

  // 1. 모바일 메뉴 토글 기능
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active'); 
    });
  }

  // 2. 부드러운 스크롤 기능 및 메뉴 클릭 시 메뉴 닫기
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // 헤더의 높이만큼 스크롤 위치를 조정
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // 모바일 메뉴에서 링크 클릭 시 메뉴를 닫아줌
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });
  });

  // 3. 스크롤 위치에 따라 현재 메뉴 활성화 (Scroll Spy)
  const activateMenuOnScroll = () => {
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - headerHeight - 50) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', activateMenuOnScroll);
  // 페이지 로드 시 한 번 실행하여 초기 위치의 메뉴를 활성화
  activateMenuOnScroll();
});
