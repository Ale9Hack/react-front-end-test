import moment from './../node_modules/moment-timezone';
moment.locale('es');
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
  var months=Array.isArray(data.months)?data.months:[];
  var days=[]
  var prevDays=[]
  var nextDays=[]
// options time
  var fixStartWeek=1
  var isNext=months.length>0?months.length:0;
  var firstDayOfTheMonth=moment().add(isNext,'month').startOf('month')
  var lastDayOfTheMonth=moment().add(isNext,'month').endOf('month')
  var month=firstDayOfTheMonth.format('MMMM')
  var firstDayOfTheWeek=moment(firstDayOfTheMonth).startOf('isoWeek').subtract(fixStartWeek,'days');
  var lastDayOfTheWeek=moment(lastDayOfTheMonth).endOf('isoWeek').subtract(fixStartWeek,'days');
  var currentDay=firstDayOfTheMonth;
  var daysInMonth=moment().add(isNext,'month').daysInMonth();

//Fixed day of prev month and next month
function fixedDays(){
var diff=firstDayOfTheMonth.diff(firstDayOfTheWeek,'days');
for (var i = 0; i < diff; i++) {
prevDays.push({day:'none'})
}
diff=lastDayOfTheWeek.diff(lastDayOfTheMonth,'days');
//Fix bug on 31 day. (diff=-1)
diff=diff===-1?6:diff;
for (var i = 0; i < diff; i++) {
nextDays.push({day:'none'})
}
}
fixedDays()


  for (var i = 1; i <= daysInMonth; i++) {
  let date=currentDay;
  let day=moment(currentDay).format('D');;
  let fullDay=moment(currentDay).format('dddd D');
  days.push({day:day,fullDay:fullDay,date:currentDay._d,schedule:'tarde'})
  currentDay=moment(currentDay).add(1,'d');
  }

  console.log(days);
  months.push({name:month,days:days,prevDays:prevDays,nextDays:nextDays})
  resolve({months:months})
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
