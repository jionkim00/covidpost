import 'package:contact_tracing/services/auth.dart';
import "package:flutter/material.dart";


class Home extends StatelessWidget {

  AuthService _auth = AuthService();
  
  void signout() async
  {
    await _auth.signout();
  }
  @override
  Widget build(BuildContext context) {
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
    );
  }
}