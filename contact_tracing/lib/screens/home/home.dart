import 'dart:async';

import 'package:contact_tracing/api_requests/api_calls.dart';
import 'package:contact_tracing/models/user.dart';
import 'package:contact_tracing/services/auth.dart';
import "package:flutter/material.dart";
import 'package:provider/provider.dart';

class Home extends StatelessWidget {
  Timer timer;
  API api= API();
  User user = User();

  Home(){
    timer = Timer.periodic(Duration(seconds: 15), (Timer t) => api.sendData(user.uid));
  }

  AuthService _auth = AuthService();
  
  int covidStatus = 0;

  
 
  
  void signout() async
  {
    await _auth.signout();
  }

  void updateCovidStatus() async
  {
    String covid = await api.getCurrentCovidStatus(user.uid);
    if(covid == 'true')
    {
      covid = 'false';
    }
    else
    {
      covid = 'true';
    }
    api.updateCovidStatus(user.uid, covid);
  }

  @override
  Widget build(BuildContext context) {
    user = Provider.of<User>(context);

    return Scaffold(
      backgroundColor: Colors.blueGrey[100],
      appBar: AppBar(
      title: Text("Contact Tracing"),
      backgroundColor: Colors.blueGrey[400],
      actions: [
        FlatButton.icon(
          icon: Icon(Icons.person),
          label: Text("Signout"),
          onPressed: signout,)
        ],
      ),

      body: Container(
        padding: EdgeInsets.symmetric(vertical: 15, horizontal: 40),
        child: Column(
          children: <Widget>[
            RaisedButton(
              color: Colors.blue[400],
              child: Text(
                "Update Covid Status",
                style: TextStyle(color: Colors.white),
                ),
              onPressed: updateCovidStatus
            )
          ],
        ),
      ),
    );
    
  }
}