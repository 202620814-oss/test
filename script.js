const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? '메뉴 열기' : '메뉴 닫기');
  mainNav.classList.toggle('open', !isOpen);
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '메뉴 열기');
  });
});

const noticeTabs = document.querySelectorAll('.notice-tab');
const noticeItems = document.querySelectorAll('.notice-item');

noticeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const selectedCategory = tab.dataset.tab;

    noticeTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle('active', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });

    noticeItems.forEach((item) => {
      item.hidden = selectedCategory !== 'all' && item.dataset.category !== selectedCategory;
    });
  });
});

const mealTabs = document.querySelectorAll('.meal-tab');
const mealPeriodTabs = document.querySelectorAll('.meal-period-tab');
const mealDayLabel = document.querySelector('.meal-day');
const mealTitle = document.querySelector('.meal-info h4');
const mealMenu = document.querySelector('.meal-menu');
const weekdayMenus = {
  mon: {
    breakfast: ['흰밥', '달걀국', '소시지구이', '김자반', '우유'],
    lunch: ['흑미밥', '미역국', '간장닭볶음', '두부구이', '깍두기'],
    dinner: ['보리밥', '콩나물국', '돈육불고기', '상추겉절이', '배추김치'],
  },
  tue: {
    breakfast: ['현미밥', '누룽지탕', '메추리알장조림', '오이무침', '사과'],
    lunch: ['차조밥', '소고기뭇국', '고등어구이', '시금치나물', '배추김치'],
    dinner: ['흰밥', '얼큰어묵국', '닭갈비', '콘샐러드', '깍두기'],
  },
  wed: {
    breakfast: ['토스트', '크림수프', '스크램블에그', '그린샐러드', '바나나'],
    lunch: ['카레라이스', '유부장국', '새우튀김', '그린샐러드', '깍두기'],
    dinner: ['기장밥', '순두부찌개', '떡갈비구이', '숙주나물', '배추김치'],
  },
  thu: {
    breakfast: ['흑미밥', '북엇국', '두부조림', '멸치볶음', '요구르트'],
    lunch: ['보리밥', '된장찌개', '제육볶음', '양배추쌈', '배추김치'],
    dinner: ['현미밥', '감자수제비국', '삼치구이', '브로콜리무침', '깍두기'],
  },
  fri: {
    breakfast: ['김가루밥', '미소장국', '군만두', '단무지', '우유'],
    lunch: ['곤드레밥', '달걀국', '떡갈비', '오이무침', '배추김치'],
    dinner: ['흰밥', '육개장', '생선까스', '양배추샐러드', '배추김치'],
  },
};
const weekdayNames = { mon: '월요일', tue: '화요일', wed: '수요일', thu: '목요일', fri: '금요일' };
const mealNames = { breakfast: '조식', lunch: '중식', dinner: '석식' };
const mealPeriods = { breakfast: 'BREAKFAST', lunch: 'LUNCH', dinner: 'DINNER' };
let selectedDay = 'mon';
let selectedPeriod = 'lunch';

function renderMeal() {
  const dayName = weekdayNames[selectedDay];
  const periodName = mealNames[selectedPeriod];
  mealDayLabel.textContent = `${selectedDay.toUpperCase()}DAY · ${mealPeriods[selectedPeriod]}`;
  mealTitle.textContent = `${dayName} ${periodName}`;
  mealMenu.replaceChildren(...weekdayMenus[selectedDay][selectedPeriod].map((dish) => {
    const item = document.createElement('span');
    item.textContent = dish;
    return item;
  }));
}

mealTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    mealTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle('active', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });

    selectedDay = tab.dataset.day;
    renderMeal();
  });
});

mealPeriodTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    mealPeriodTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle('active', isSelected);
      item.setAttribute('aria-selected', String(isSelected));
    });

    selectedPeriod = tab.dataset.period;
    renderMeal();
  });
});

const calendarDays = document.querySelector('#calendar-days');
const calendarMonthLabel = document.querySelector('#calendar-month-label');
const agendaSelectedDate = document.querySelector('#agenda-selected-date');
const agendaEvents = document.querySelector('#agenda-events');
const today = new Date();
let calendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedCalendarDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
let showSelectedDayOnly = false;

const academicEvents = {
  '2026-03-02': ['입학식 · 시업식'],
  '2026-03-04': ['신입생 오리엔테이션'],
  '2026-04-13': ['1학기 중간고사'],
  '2026-04-14': ['1학기 중간고사'],
  '2026-04-15': ['1학기 중간고사'],
  '2026-05-14': ['학교 체육 한마당'],
  '2026-06-29': ['1학기 기말고사'],
  '2026-06-30': ['1학기 기말고사'],
  '2026-07-01': ['1학기 기말고사'],
  '2026-07-17': ['여름방학식'],
  '2026-08-18': ['개학식'],
  '2026-09-21': ['2학기 상담 주간'],
  '2026-09-22': ['2학기 상담 주간'],
  '2026-09-23': ['2학기 상담 주간'],
  '2026-10-13': ['3학년 중간고사'],
  '2026-10-14': ['중간고사'],
  '2026-10-15': ['중간고사'],
  '2026-10-16': ['중간고사'],
  '2026-10-23': ['기능축전'],
  '2026-11-19': ['진로·직업 체험의 날'],
  '2026-12-14': ['2학기 기말고사'],
  '2026-12-15': ['2학기 기말고사'],
  '2026-12-16': ['2학기 기말고사'],
  '2026-12-24': ['겨울방학식'],
  '2027-02-05': ['졸업식 · 종업식'],
};

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function renderAgenda() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}-`;
  const eventDates = Object.keys(academicEvents).filter((key) => key.startsWith(monthPrefix)).sort();
  const datesToShow = showSelectedDayOnly
    ? eventDates.filter((key) => key === dateKey(selectedCalendarDate))
    : eventDates;

  agendaSelectedDate.textContent = showSelectedDayOnly
    ? `${formatDate(selectedCalendarDate)} 일정`
    : `${year}년 ${month + 1}월 전체 일정`;
  agendaEvents.replaceChildren();

  if (datesToShow.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'agenda-empty';
    emptyMessage.textContent = showSelectedDayOnly ? '선택한 날짜에 등록된 일정이 없습니다.' : '이번 달에 등록된 일정이 없습니다.';
    agendaEvents.append(emptyMessage);
    return;
  }

  datesToShow.forEach((key) => {
    const [eventYear, eventMonth, eventDay] = key.split('-').map(Number);
    const eventDate = new Date(eventYear, eventMonth - 1, eventDay);
    academicEvents[key].forEach((eventName) => {
      const eventItem = document.createElement('button');
      eventItem.type = 'button';
      eventItem.className = 'agenda-event';
      eventItem.setAttribute('aria-label', `${formatDate(eventDate)}: ${eventName}`);

      const dateBadge = document.createElement('span');
      dateBadge.className = 'agenda-date';
      dateBadge.innerHTML = `<b>${String(eventDay).padStart(2, '0')}</b><small>${eventDate.toLocaleDateString('ko-KR', { weekday: 'short' })}</small>`;

      const eventTitle = document.createElement('span');
      eventTitle.className = 'agenda-event-title';
      eventTitle.textContent = eventName;

      const arrow = document.createElement('span');
      arrow.className = 'agenda-event-arrow';
      arrow.textContent = '↗';

      eventItem.append(dateBadge, eventTitle, arrow);
      eventItem.addEventListener('click', () => {
        selectedCalendarDate = eventDate;
        showSelectedDayOnly = true;
        renderCalendar();
      });
      agendaEvents.append(eventItem);
    });
  });
}

function renderCalendar() {
  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarMonthLabel.textContent = `${year}년 ${month + 1}월`;
  calendarDays.replaceChildren();

  for (let blank = 0; blank < firstWeekday; blank += 1) {
    const emptyCell = document.createElement('span');
    emptyCell.className = 'calendar-empty-cell';
    emptyCell.setAttribute('aria-hidden', 'true');
    calendarDays.append(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const key = dateKey(date);
    const events = academicEvents[key] || [];
    const dayButton = document.createElement('button');
    dayButton.type = 'button';
    dayButton.className = 'calendar-day';
    dayButton.setAttribute('role', 'gridcell');
    dayButton.setAttribute('aria-pressed', String(dateKey(selectedCalendarDate) === key));
    dayButton.setAttribute('aria-label', `${formatDate(date)}${events.length ? `, ${events.join(', ')}` : ', 일정 없음'}`);

    if (dateKey(selectedCalendarDate) === key) dayButton.classList.add('is-selected');
    if (dateKey(today) === key) dayButton.classList.add('is-today');
    if (events.length) dayButton.classList.add('has-event');
    if (date.getDay() === 0) dayButton.classList.add('is-sunday');
    if (date.getDay() === 6) dayButton.classList.add('is-saturday');

    const number = document.createElement('span');
    number.className = 'calendar-day-number';
    number.textContent = String(day);
    dayButton.append(number);

    if (events.length) {
      const dot = document.createElement('span');
      dot.className = 'calendar-event-dot';
      dot.setAttribute('aria-hidden', 'true');
      dayButton.append(dot);
    }

    dayButton.addEventListener('click', () => {
      selectedCalendarDate = date;
      showSelectedDayOnly = true;
      renderCalendar();
    });
    calendarDays.append(dayButton);
  }

  renderAgenda();
}

document.querySelector('#calendar-prev').addEventListener('click', () => {
  calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1);
  selectedCalendarDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  showSelectedDayOnly = false;
  renderCalendar();
});

document.querySelector('#calendar-next').addEventListener('click', () => {
  calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1);
  selectedCalendarDate = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  showSelectedDayOnly = false;
  renderCalendar();
});

document.querySelector('#calendar-today').addEventListener('click', () => {
  calendarMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  selectedCalendarDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  showSelectedDayOnly = false;
  renderCalendar();
});

renderCalendar();
