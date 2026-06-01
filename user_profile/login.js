function getAccounts(){ return JSON.parse(localStorage.getItem('mh_accounts')||'[]') }
function saveAccounts(a){ localStorage.setItem('mh_accounts',JSON.stringify(a)) }
function setSession(u){ localStorage.setItem('mh_session',JSON.stringify(u)) }

/* redirect */
if(localStorage.getItem('mh_session')) window.location.href='profile.html';

/* Tabs */
function switchTab(t){
  document.querySelectorAll('.tab').forEach((el,i)=>el.classList.toggle('active',i===(t==='login'?0:1)));
  document.getElementById('panel-login').classList.toggle('active',t==='login');
  document.getElementById('panel-register').classList.toggle('active',t==='register');
}

/* Toggle password visibility */
function tpw(inputId, iconId){
  const inp=document.getElementById(inputId);
  const showing=inp.type==='text';
  inp.type=showing?'password':'text';
  document.getElementById(iconId).className=showing?'fa-solid fa-eye':'fa-solid fa-eye-slash';
}

/* Username check */
function checkUname(){
  const v=document.getElementById('r-user').value.trim().toLowerCase();
  const inp=document.getElementById('r-user');
  const hint=document.getElementById('uname-hint');
  const errEl=document.getElementById('r-user-err');
  errEl.classList.remove('show');
  if(v.length<2){
    inp.classList.remove('ok-inp','err-inp');
    hint.classList.remove('show','free','taken');
    return;
  }
  const taken=getAccounts().some(a=>a.username.toLowerCase()===v);
  inp.classList.toggle('err-inp',taken);
  inp.classList.toggle('ok-inp',!taken);
  hint.textContent=taken?'Username istaken':'Username is available';
  hint.className='uname-hint show '+(taken?'taken':'free');
}

/* Login */
function handleLogin(e){
  e.preventDefault();
  const id=document.getElementById('l-id').value.trim();
  const pw=document.getElementById('l-pw').value;
  const gerrEl=document.getElementById('login-gerr');
  gerrEl.classList.remove('show');
  ['l-id-err','l-pw-err'].forEach(x=>document.getElementById(x).classList.remove('show'));

  let ok=true;
  if(!id){document.getElementById('l-id-err').classList.add('show');ok=false;}
  if(!pw){document.getElementById('l-pw-err').classList.add('show');ok=false;}
  if(!ok)return;

  const user=getAccounts().find(a=>
    a.email.toLowerCase()===id.toLowerCase()||
    a.username.toLowerCase()===id.toLowerCase()
  );
  if(!user||user.password!==pw){
    gerrEl.textContent='Wrong username or password.';
    gerrEl.classList.add('show');
    return;
  }

  document.getElementById('l-btxt').style.display='none';
  document.getElementById('l-spin').style.display='block';
  setSession({...user});
  setTimeout(()=>{ window.location.href='profile.html'; },900);
}

/* Register */
function handleRegister(e){
  e.preventDefault();
  const email=document.getElementById('r-email').value.trim();
  const uname=document.getElementById('r-user').value.trim();
  const pw=document.getElementById('r-pw').value;
  const pw2=document.getElementById('r-pw2').value;

  ['r-email-err','r-user-err','r-pw-err','r-pw2-err'].forEach(x=>document.getElementById(x).classList.remove('show'));
  document.getElementById('reg-gerr').classList.remove('show');
  document.getElementById('reg-ok').classList.remove('show');

  let ok=true;
  if(!email){
    document.getElementById('r-email-err').textContent='Enter an email address.';
    document.getElementById('r-email-err').classList.add('show');
    ok=false;
  }
  if(uname.length<2){
    document.getElementById('r-user-err').textContent='Choose a username (at least 2 characters).';
    document.getElementById('r-user-err').classList.add('show');
    ok=false;
  }
  if(pw.length<6){
    document.getElementById('r-pw-err').classList.add('show');
    ok=false;
  }
  if(pw!==pw2){
    document.getElementById('r-pw2-err').classList.add('show');
    ok=false;
}
  if(!ok)return;

  const accounts=getAccounts();
  if(accounts.some(a=>a.username.toLowerCase()===uname.toLowerCase())){
    document.getElementById('r-user-err').textContent='Username is already taken.';
    document.getElementById('r-user-err').classList.add('show');
    return;
  }
  if(accounts.some(a=>a.email.toLowerCase()===email.toLowerCase())){
    document.getElementById('r-email-err').textContent='Email address is already registered.';
    document.getElementById('r-email-err').classList.add('show');
    return;
  }

  const now=new Date();
  const newAcc={
    email,username:uname,password:pw,
    xp:0,lessons:0,exercises:0,streak:0,
    joined:now.toLocaleDateString('en-US',{month:'short',year:'numeric'}),
    progress:{},activeCourse:'1c'
  };
  accounts.push(newAcc);
  saveAccounts(accounts);

  document.getElementById('r-btxt').style.display='none';
  document.getElementById('r-spin').style.display='block';
  document.getElementById('reg-ok').textContent='Account created! Logging in…';
  document.getElementById('reg-ok').classList.add('show');

  setSession({...newAcc});
  setTimeout(()=>{ window.location.href='profile.html'; },1100);
}