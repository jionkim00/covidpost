'use strict';

const toRadians = (degrees) => {
    var pi = Math.PI;
  return degrees * (pi/180);
}
function toDegrees(radians1)
{
  var pi = Math.PI;
  return radians1 * (180/pi);
}

const calculateGeolocationData = (latitude, longitude) => {
    let dist = 0.003/6371;
    let degree = 0;
    let minLatitude = Number.MAX_VALUE;
    let maxLatitude = Number.MIN_VALUE;
    let minLongitude = Number.MAX_VALUE;
    let maxLongitude = Number.MIN_VALUE;
    for(let i =0; i<4; i++){
        const brng = toRadians(degree);
        const lat1 = toRadians(latitude);
        const lon1 = toRadians(longitude);
    
        const lat2 = Math.asin( Math.sin(lat1)*Math.cos(dist) + Math.cos(lat1)*Math.sin(dist)*Math.cos(brng) );
        const a = Math.atan2(Math.sin(brng)*Math.sin(dist)*Math.cos(lat1), Math.cos(dist)-Math.sin(lat1)*Math.sin(lat2));
        let lon2 = lon1 + a;
        lon2 = (lon2+ 3*Math.PI) % (2*Math.PI) - Math.PI;
        // console.log("Latitude = "+toDegrees(lat2)+"\nLongitude = "+toDegrees(lon2));
        degree+=90;
        maxLatitude = Math.max(maxLatitude, toDegrees(lat2));
        maxLongitude = Math.max(maxLongitude, toDegrees(lon2));
        minLatitude = Math.min(minLatitude, toDegrees(lat2));
        minLongitude = Math.min(minLongitude, toDegrees(lon2));
    }
    // console.log(minLatitude, minLongitude, maxLongitude, maxLatitude);
    return {
        minLatitude: minLatitude,
        maxLatitude: maxLatitude,
        minLongitude: minLongitude,
        maxLongitude: maxLongitude
    }
}

module.exports = {
    calculateGeolocationData
}





