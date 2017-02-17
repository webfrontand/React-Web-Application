export function storageSet(token){
  localStorage.setItem('token', token);
}

export function storageGet(){
  return localStorage.getItem('token');
}

export function clearStorage(){
  localStorage.setItem('token','');
}
