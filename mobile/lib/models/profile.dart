
import 'package:json_annotation/json_annotation.dart';

part 'profile.g.dart';

@JsonSerializable()
class Profile{
  String firstName;
  String lastName;
  String email;
  String phone;
  String gender;


  Profile({this.firstName, this.lastName, this.email, this.phone, this.gender});

  factory Profile.fromJson(Map<String, dynamic>json)=> _$ProfileFromJson(json);

  Map<String, dynamic> toJson() => _$ProfileToJson(this);


}