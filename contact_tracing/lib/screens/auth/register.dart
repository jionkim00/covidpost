import 'package:contact_tracing/api_requests/api_calls.dart';
import 'package:contact_tracing/services/auth.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class register extends StatefulWidget {
  final Function showSignIn;
  register({this.showSignIn});
  @override
  _registerState createState() => _registerState();
}

class _registerState extends State<register> {

  final AuthService _auth = AuthService();

  final API api = API();

  String email = "";
  String password = "";
  String phoneNumber = "";
  String firstName = "";
  String lastName = "";
  String error = "";

  void registerWithEmail() async
  {
    dynamic result = await _auth.registerEmail(email, password);
    
    if (result == null)
    {
      setState(() => error = "error signing up");
    }
    else
    {
      api.addUser(result.uid, firstName, lastName, phoneNumber); 
    }
    
  }

  @override
  Widget build(BuildContext context) {
  return Scaffold(
      backgroundColor: Colors.brown[100],
      appBar: AppBar(
        backgroundColor: Colors.brown[400],
        elevation: 0.0,
        title: Text('Sign up'),
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 15, horizontal: 40),
        child: Form(
          child: Column(
            children: <Widget>[
              TextFormField(
                decoration: const InputDecoration(
                  icon: null,
                  hintText: "",
                  labelText: "email",
                ),
                onChanged: (val) {
                  setState(() => email = val);
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  icon: null,
                  hintText: "",
                  labelText: "password",
                ),
                obscureText: true,
                onChanged: (val) {
                  setState(() => password = val);
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  icon: null,
                  hintText: "",
                  labelText: "phone number",
                ),
                onChanged: (val) {
                  setState(() => phoneNumber = val);
                },
              ),

              TextFormField(
                decoration: const InputDecoration(
                  icon: null,
                  hintText: "",
                  labelText: "first name",
                ),
                onChanged: (val) {
                  setState(() => firstName = val);
                },
              ),

              TextFormField(
                decoration: const InputDecoration(
                  icon: null,
                  hintText: "",
                  labelText: "last name",
                ),
                onChanged: (val) {
                  setState(() => lastName = val);
                },
              ),

              RaisedButton(
                color: Colors.blue[400],
                child: Text(
                  "Register with email",
                  style: TextStyle(color: Colors.white),
                  ),
                onPressed: () async {
                  registerWithEmail();
                },
              ),
              RaisedButton(
                color: Colors.blue[400],
                child: Text(
                  "Already have an account? Sign in",
                  style: TextStyle(color: Colors.white),
                  ),
                onPressed: () async {
                  widget.showSignIn();
                },
              ),
            ],
          )
        ),
      ),
    );

  }
}