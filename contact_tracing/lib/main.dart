import 'package:flutter/material.dart';
void main() {
  runApp(ContactTracing());
}

class ContactTracing extends StatelessWidget{
    Widget build(BuildContext context)
    {
      return MaterialApp(home: 
      Scaffold(
        appBar: AppBar(title: Text("Contact Tracing"),), 
        body: Text("We in baby"),)
        ,);
    }

}