import 'package:contact_tracing/models/user.dart';
import 'package:contact_tracing/screens/auth/auth.dart';
import 'package:contact_tracing/screens/home/home.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class Wrapper extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    User user = Provider.of<User>(context);
    return user == null ? Auth() : Home();
  }
}