import 'package:contact_tracing/screens/auth/register.dart';
import 'package:contact_tracing/screens/auth/sign_in.dart';
import 'package:flutter/material.dart';

class Auth extends StatefulWidget{
  AuthState createState() => AuthState();
}

class AuthState extends State<Auth>{
  bool showSignIn = true;
  void toggleView() 
  {
    setState(() => showSignIn = !showSignIn);
  }
  
  Widget build(BuildContext context)
  {
    
    return showSignIn ? signIn(showSignIn: toggleView) : register(showSignIn: toggleView); 
  }
}
