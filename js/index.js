$(function() {
  bmltClientInit('https://www.nerna.org/main_server');
  selectDay(getTodayDayOfWeek())
})

function selectDay(day) {
    $("[id^=Day]").css("font-weight", "")
    $("#Day" + day).css("font-weight", "bold")
  
    getMeetingsByServiceBodyIdAndWeekdayId('&services[]=9&services[]=10', day, function(data) {
        var results = ""
        for (var i = 0; i < data.length; i++) {
            results += "<div id='meeting_name'><b>" + data[i].meeting_name + "</b></div>"
            
            results += serviceBodies(data[0].id_bigint)
            
            results += "<div id='location_text'>" + data[i].location_text + "</div>"
            results += "<div id='location_street'>" + data[i].location_street + "</div>"
            results += "<div id='location_citystate'>" + data[i].location_municipality + ", " + data[i].location_province + "</div>"
            results += "<div id='day_and_time'>" + getDayOfWeek(data[i].weekday_tinyint - 1) + " " + militaryToStandard(data[i].start_time) + "</div>"
            results += "<div id='map'><a target='_blank' href='https://www.google.com/maps?q=" + data[i].latitude + "," + data[i].longitude + "'>Map</a></div>"
            results += "<p/>";
        }

        $("#results").html(results)
    })
}


function serviceBodies(serviceBodyId) {    
    getServiceBodies(function(data) {
    var servicebody = ""
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == serviceBodyId) {
            servicebody += data[i].name
        }
    }
       return servicebody;
    })
 }