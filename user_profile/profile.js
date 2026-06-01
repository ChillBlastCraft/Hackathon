const session = JSON.parse(localStorage.getItem('mh_session') || '{}');

const progress = Number(session.progress?.['1c'] || 0);

console.log('Progress:', progress);

const ring = document.getElementById('ringProgress');

if (ring) {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;

    ring.style.strokeDasharray = circumference;

    const offset =
        circumference - (progress / 100) * circumference;

    ring.style.strokeDashoffset = offset;

    console.log('Circumference:', circumference);
    console.log('Offset:', offset);
}

function logout() {

    localStorage.removeItem('mh_session');

    window.location.href ='login.html';
}

console.log(session.progress);
console.log(session.activeCourse);
console.log(activeProgress);