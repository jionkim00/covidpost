import 'package:contact_tracing/models/user.dart';
import 'package:firebase_auth/firebase_auth.dart';

class AuthService{

  final FirebaseAuth _auth = FirebaseAuth.instance;


  User _convertfirebaseUser(FirebaseUser fbUser)
  {
    return fbUser != null ? User(uid: fbUser.uid) : null;
  }

  //auth change user stream
  Stream<User> get user
  {
    return _auth.onAuthStateChanged.map(_convertfirebaseUser);
  }



  //sign in anon, just for testing purposes
  Future signInAnon() async
  {
    try {
      AuthResult anon = await _auth.signInAnonymously();

      FirebaseUser currUser = anon.user;
      return _convertfirebaseUser(currUser);

    } catch (e) {
      print(e.toString());
      return null;
    }
    
  }

  //sign in with phone number
  //TODO

  //register with email and pasword
  
  Future registerEmail(String email, String password) async
  {
    try {
      AuthResult  result = await _auth.createUserWithEmailAndPassword(email: email, password: password);
      FirebaseUser user = result.user;
      return _convertfirebaseUser(user);
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  //signIn with email and password

  Future signInEmail(String email, String password) async
  {
    try {
      AuthResult result = await _auth.signInWithEmailAndPassword(email: email, password: password);

      FirebaseUser user = result.user;
      return _convertfirebaseUser(user);
    } catch (e) {
      print(e.toString());
      return null;
    }
  }

  //sign out
  Future signout() async
  {
    try {
      return await _auth.signOut();
    } catch (e) {
      print(e.toString());
      return null;
    }
  }
}