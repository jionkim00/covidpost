import 'package:http/http.dart' as http;
import 'package:geolocator/geolocator.dart';

class API
{
  String server = "http://159.89.154.216:5000/";

  Future<http.Response> addUser(String uid, String firstName, String lastName, String phoneNumber) async
  {
    final String apiEndpoint = server + 'addUser?name=' + firstName + '%20' + lastName + '&phone=' + phoneNumber + '&id=' + uid;
    
    dynamic userResponse = await http.post(
      apiEndpoint,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
  }

  Future<http.Response> updateCovidStatus(String uid, String covid) async
  {
    final String apiEndpoint = server + 'updateCovidStatus?uid=' + uid + '&covid=' + covid;

    dynamic userResponse = await http.post(
      apiEndpoint,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
  }

  Future<String> getCurrentCovidStatus(String uid) async
  {
    final String apiEndpoint = server + 'getCovid?uid=' + uid;
    print(apiEndpoint);
    dynamic response = await http.get(apiEndpoint);
    print(response.body);
    return response.body;
  }

  void sendData(String uid) async
  {
    print('in');
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    print("hey");
    double lat = position.latitude;
    double lon = position.longitude;

    print(lat);

    final String apiEndpoint = server + 'updateDataTable?uid=' + uid + '&lat=' + lat.toString() + '&long=' + lon.toString();

    dynamic userResponse = await http.post(
      apiEndpoint,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    ); 
  }

  
}