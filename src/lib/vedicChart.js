import * as A from "astronomy-engine";
const signs=["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const nak=["Ashwini","Bharani","Krittika","Rohini","Mrigashira","Ardra","Punarvasu","Pushya","Ashlesha","Magha","Purva Phalguni","Uttara Phalguni","Hasta","Chitra","Swati","Vishakha","Anuradha","Jyeshtha","Mula","Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta","Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"];
const norm=x=>(x%360+360)%360;
const rad=x=>x*Math.PI/180;
function local(date,zone){const parts=new Intl.DateTimeFormat("en-GB",{timeZone:zone,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(date);const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return p.year+"-"+p.month+"-"+p.day+"T"+p.hour+":"+p.minute;}
function utc(day,time,zone){const target=day+"T"+time;let t=Date.parse(target+":00Z");if(!Number.isFinite(t))throw Error("Invalid date or time.");for(let i=0;i<6;i++){const d=Date.parse(target+":00Z")-Date.parse(local(new Date(t),zone)+":00Z");t+=d;if(!d)break;}if(local(new Date(t),zone)!==target)throw Error("Nonexistent local time due to daylight-saving transition.");if(local(new Date(t-3600000),zone)===target||local(new Date(t+3600000),zone)===target)throw Error("Ambiguous birth time during daylight-saving transition.");return new Date(t);}
export function calculateVedicChart(f){
 const lat=Number(f.latitude),lon=Number(f.longitude);if(f.latitude===""||f.longitude===""||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>66||Math.abs(lon)>180)throw Error("Enter valid birthplace latitude (-66 to 66) and longitude (-180 to 180).");
 if(!f.timeZone)throw Error("Enter an IANA timezone such as America/Toronto.");
 const date=utc(f.dateOfBirth,f.timeOfBirth,f.timeZone);
 const year=date.getUTCFullYear()+(date-Date.UTC(date.getUTCFullYear(),0,1))/31557600000;
 const aya=23.8530556+(year-2000)*50.29/3600;
 const sid=x=>norm(x-aya);
 const moon=sid(A.EclipticGeoMoon(date).lon);
 const planets=[{name:"Sun",longitude:sid(A.SunPosition(date).elon)},{name:"Moon",longitude:moon},...["Mercury","Venus","Mars","Jupiter","Saturn"].map(name=>({name,longitude:sid(A.Ecliptic(A.GeoVector(A.Body[name],date,true)).elon)}))];
 const theta=rad(norm(A.SiderealTime(date)*15+lon));const eps=rad(A.e_tilt(A.MakeTime(date)).tobl);
 const asc=sid(norm(Math.atan2(Math.cos(theta),-(Math.sin(theta)*Math.cos(eps)+Math.tan(rad(lat))*Math.sin(eps)))*180/Math.PI));
 const rising=Math.floor(asc/30);
 const houses=Array.from({length:12},(_,i)=>({sign:signs[(rising+i)%12],planets:[]}));
 for(const p of planets)houses[(Math.floor(p.longitude/30)-rising+12)%12].planets.push(p.name);
 return {lagna:signs[rising],rashi:signs[Math.floor(moon/30)],nakshatra:nak[Math.floor(moon/(360/27))],pada:Math.floor((moon%(360/27))/(360/108))+1,houses,ayanamsa:"Approximate Lahiri",houseSystem:"Whole sign",utc:date.toISOString()};
}