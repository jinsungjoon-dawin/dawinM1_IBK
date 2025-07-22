export function getOdate(dateStr){
let date = new Date(dateStr);
date.setDate(date.getDate() + 1);
let yyyy = date.getFullYear();
let mm = String(date.getMonth() + 1).padStart(2,'0');
let dd = String(date.getDate()).padStart(2,'0');
let nextDateStr = `${yyyy}-${mm}-${dd}`;
return nextDateStr;
}