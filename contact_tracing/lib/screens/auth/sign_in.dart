import 'package:contact_tracing/services/auth.dart';
import 'package:flutter/material.dart';

class signIn extends StatefulWidget {
  final Function showSignIn;
  signIn({this.showSignIn});

  @override
  _signInState createState() => _signInState();
}

class _signInState extends State<signIn> {

  final AuthService _auth = AuthService();
  String email = "";
  String password = "";
  String phoneNumber = "";
  String firstName = "";
  String lastName = "";

  void signInEmail() async
  {
    dynamic userResult = await _auth.signInEmail(email, password);
    if (userResult == null)
    {
      print("error signing in");
    }

  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.brown[100],
      appBar: AppBar(
        backgroundColor: Colors.brown[400],
        elevation: 0.0,
        title: Text('Sign in'),
      ),
      body: Container(
        padding: EdgeInsets.symmetric(vertical: 15, horizontal: 40),
        child: Form(
          child: Column(
            children: <Widget>[
              SizedBox(height: 20.0,),
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
              SizedBox(height: 20.0,),
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

              SizedBox(height: 20.0,),
              RaisedButton(
                color: Colors.blue[400],
                child: Text(
                  "Sign in with email",
                  style: TextStyle(color: Colors.white),
                  ),
                onPressed: () async {
                  signInEmail();
                },
              ),

              RaisedButton(
                color: Colors.blue[400],
                child: Text(
                  "Don't have an account? Register",
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