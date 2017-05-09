import moment from './../node_modules/moment-timezone';
moment.locale('es');

class Api {
  constructor(fake) {
    this.apiURL='http://127.0.0.1:3000/api/'
    this.dayOfWeekStr=[]

   if (fake===false) {
     this.endPoints={
     getDays:this.apiURL+"getdays"
   }
   }
   else{
     this.endPoints={
     getDays:"./fakedb/days.json",     getTurns:"./fakedb/turns.json"
     }
   }
}

updateDayOfTheWeekStr(){
  var width = window.innerWidth, height = window.innerHeight
  if(height>500){
    return    this.dayOfWeekStr=['domingo','lunes','martes','miércoles','jueves','viernes','sábado']; }
  else {
    return   this.dayOfWeekStr=['dom','lun','mar','mié','jue','vie','sáb']
  }
}

createCalendar(options,data,callback){
return new Promise((resolve,reject)=>{
  var perPage=data.perPage;
  var month=data.month
  var days=[]
  var prevDays=[]
  var nextDays=[]
// options time
  var fixStartWeek=1
  var monthGlobalIndex=data.monthGlobalIndex;
  var firstDayOfTheMonth=moment().add(monthGlobalIndex,'month').startOf('month')
  var lastDayOfTheMonth=moment().add(monthGlobalIndex,'month').endOf('month')
  var name=firstDayOfTheMonth.format('MMMM')
  var firstDayOfTheWeek=moment(firstDayOfTheMonth).startOf('isoWeek').subtract(fixStartWeek,'days');
  var lastDayOfTheWeek=moment(lastDayOfTheMonth).endOf('isoWeek').subtract(fixStartWeek,'days');


function addDays(str,diff){
var array=[];
class ChangeDay{
  constructor(str){
    if(str==='inMonth'){
    this.currentDay=firstDayOfTheMonth
    this.op=()=>moment(this.currentDay).add(1,'days')
    }
    else if(str==='prevMonth'){
      this.currentDay=moment(firstDayOfTheMonth).subtract(1,'days')
      this.op=()=>moment(this.currentDay).subtract(1,'days');
    }
    else if(str==='nextMonth'){
      console.log('next');
      this.currentDay=moment(lastDayOfTheMonth).add(1,'days')
      this.op=()=>moment(this.currentDay).add(1,'days');
}}}

var changeDay=new ChangeDay(str)
if(diff>0){
  var daysInMonth=diff
  console.log(true);
  }
  else if(diff===0){
    var daysInMonth=diff
  }
else{
var daysInMonth=moment().add(monthGlobalIndex,'month').daysInMonth();
}
console.log(diff,daysInMonth);

  for (var i = 1; i <= daysInMonth; i++) {
  let date=changeDay.currentDay._d;
  let day=moment(changeDay.currentDay).format('D');;
  let fullDay=moment(changeDay.currentDay).format('dddd D');
  array.push({day:day,fullDay:fullDay,date:date,schedule:'tarde'})
  changeDay.currentDay=changeDay.op();
  }
  return array;
}
days=addDays('inMonth');
//Fixed day of prev month and next month
function fixedDays(){
    var array=[]
    var diff=firstDayOfTheMonth.diff(firstDayOfTheWeek,'days');
    array[0]=addDays('prevMonth',diff)
    diff=lastDayOfTheWeek.diff(lastDayOfTheMonth,'days');
    //Fix bug on 31 day. (diff=-1)
    diff=diff===-1?6:diff;
    array[1]=addDays('nextMonth',diff)
    return array;
  }
  let extraDays=fixedDays();

  month={name:name,days:days,prevDays:extraDays[0],nextDays:extraDays[1]}
  resolve({month:month})
})}

getDays(options,data,callback){

fetch(this.endPoints.getDays).then((res)=>res.json()).then((res)=>{

//var globalCount=data.globalCount+res.length
if (false) {
// Construir updates
}
// Get last Days

if(false){
//days=days.concat(res)
}



})

}
getTurns(options,callback){
  fetch(this.endPoints.getTurns).then((res)=>res.json()).then((res)=>{
  //Datos requeridos en la api
    var finish=400;
    var interval=10;
    var lastTime=-1;
    var count=0;
  // duplica variable para poder procesar un vector ultilizando promises y map.
  for(var index=0;res.length>index;index++){
        if (lastTime+interval<=res[index].startTime && index!=0) {
            res.splice(index+count, 0, {startTime:'none',status:'disponible'});
            count+=1;
          }
   lastTime=res[index].endTime;
     if (res.length-1==index&&lastTime+interval<=finish) {
       res.push({startTime:'none',status:'disponible'});
     }

  }
  callback(res)
})
}


}

export default (new Api(true))


/*
fetch("http://127.0.0.1:3000/api/setday",{
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: "post",
    body: qs.stringify({
            date: t
          })
})
.then(function(res){ return res.json(); })
.then(function(data){
console.log(data);
} )

*/

/*
var url= 'http://127.0.0.1:3000/api/getdays'
    var queryEncoded ='?'+qs.stringify(
      {  page: 1, pagecount: 6, limit:1 },
      { encodeValuesOnly: true }
    )
fetch(url+queryEncoded).then((res)=>res.json()).then((res)=>{
var array=[];
for (var i in res){
 res[i].schedule=moment(res[i].date).format('a');
 res[i].day =moment(res[i].date).format('dddd d');
 res[i].month=moment(res[i].date).format('MMMM');
 res[i].year=moment(res[i].date).format('YYYY');
 array.push(res[i]);
}
this.setState({array:array});
})

*/
