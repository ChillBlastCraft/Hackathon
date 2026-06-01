
const sessionRaw = localStorage.getItem('mh_session');

if (!sessionRaw) {
    window.location.href = 'login.html';
}

const session = JSON.parse(sessionRaw);

document.getElementById('avBtn').textContent = session.username.slice(0, 2).toUpperCase();

document.getElementById('hiName').textContent = 'Hello, ' + session.username + '!';

document.getElementById('topXp').textContent = session.xp || 0;

document.getElementById('sXP').textContent = session.xp || 0;

document.getElementById('sXP2').textContent = session.xp || 0;

document.getElementById('sLe').textContent = session.lessons || 0;

document.getElementById('sEx').textContent = session.exercises || 0;


const streak = session.streak || 0;

document.getElementById('streakNum').textContent =
    streak;

document.getElementById('streakBig').textContent =
    streak;


const today =
    (new Date().getDay() + 6) % 7;

for (let i = 1; i <= 7; i++) {

    const box =
        document.getElementById('d' + i);

    if (!box) continue;

    if (i - 1 < streak && i - 1 < today) {
        box.classList.add('active');
    }

    if (i - 1 === today) {
        box.classList.add('today');
    }
}

const progress =
    session.progress || {};

const courseMap = {
    matte1: {
        id: 'pb-m1',
        label: 'm1p',
        name: 'Mathematics 1'
    },
    matte2: {
        id: 'pb-m2',
        label: 'm2p',
        name: 'Mathematics 2'
    },
    matte3: {
        id: 'pb-m3',
        label: 'm3p',
        name: 'Mathematics 3'
    },
    matte4: {
        id: 'pb-m4',
        label: 'm4p',
        name: 'Mathematics 4'
    }
};

const legacyMap = {
    matte1: progress['1c'] || 0,
    matte2: progress['2c'] || 0,
    matte3: progress['3c'] || 0,
    matte4: progress['4c'] || 0
};

Object.keys(courseMap).forEach(course => {

    const value = legacyMap[course] || 0;

    const fill = document.getElementById(courseMap[course].id);

    const label = document.getElementById(courseMap[course].label);

    if (fill) {fill.style.width = value + '%';}

    if (label) {label.textContent = value + '%';}
});


let activeCourse = session.activeCourse || 'matte1';

if (activeCourse === '1c') activeCourse = 'matte1';
if (activeCourse === '2c') activeCourse = 'matte2';
if (activeCourse === '3c') activeCourse = 'matte3';

const activeProgress =
    legacyMap[activeCourse] || 0;

const activeName = courseMap[activeCourse]?.name ||'Mathematics 1';

document.getElementById('activeCourseName').textContent = activeName;

document.getElementById('activeCourseProgress').textContent = activeProgress + '% completed';


const ring = document.getElementById('ringProgress');

if (ring) {

    const circumference = 314;

    const offset = circumference - (activeProgress / 100) * circumference;

    ring.style.strokeDasharray = circumference;

    ring.style.strokeDashoffset = offset;
}

function setActiveCourse(course) {

    session.activeCourse = course;

    localStorage.setItem('mh_session',JSON.stringify(session));

    const accounts = JSON.parse(localStorage.getItem('mh_accounts') || '[]');

    const idx = accounts.findIndex(a => a.username === session.username);

    if (idx >= 0) {

        accounts[idx].activeCourse = course;

        localStorage.setItem('mh_accounts',JSON.stringify(accounts));
    }

    document
        .querySelectorAll('.course-card')
        .forEach(card => card.classList.remove('active-course' ));

    const selected = document.querySelector(`[data-course="${course}"]`);

    if (selected) {selected.classList.add('active-course');}

    location.reload();
}

document
    .getElementById('continueBtn')
    ?.addEventListener('click',() => {window.location.href ='../chapter.html';});

function logout() {

    localStorage.removeItem('mh_session');

    window.location.href ='login.html';
}