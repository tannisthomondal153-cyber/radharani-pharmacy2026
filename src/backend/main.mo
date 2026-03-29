import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Doctor = {
    name : Text;
    specialty : Text;
    qualifications : Text;
    schedule : Text;
  };

  module Doctor {
    public func compareByName(doctor1 : Doctor, doctor2 : Doctor) : Order.Order {
      Text.compare(doctor1.name, doctor2.name);
    };
  };

  type Prescription = {
    name : Text;
    phone : Text;
    medicines : Text;
    submittedAt : Int;
  };

  let doctors = Map.fromIter<Nat, Doctor>([(1, {
    name = "Dr. Alimpan Basak";
    specialty = "General Physician, Diabetes & Heart";
    qualifications = "MBBS, CCCS, FCCS";
    schedule = "Mon, Wed, Sat";
  })].values().concat([(2, {
    name = "Dr. Gaurav Taparia";
    specialty = "Orthopedic & Spine Surgeon";
    qualifications = "MBBS, MS, FNB";
    schedule = "Mon, Thu";
  })].values()).concat([(3, {
    name = "Dr. Kaushik Roy";
    specialty = "Pediatrician";
    qualifications = "MBBS, DCH, MD";
    schedule = "Evening";
  })].values()).concat([(4, {
    name = "Dr. Tuhin Shubhra Sarkar";
    specialty = "Internal Medicine";
    qualifications = "MBBS, MD";
    schedule = "Thu 7 PM";
  })].values()).concat([(5, {
    name = "Dr. Tanima Garai";
    specialty = "Dermatologist";
    qualifications = "MBBS, MD";
    schedule = "Sun 6 PM";
  })].values()).concat([(6, {
    name = "Dr. Sandeeptha Ghosh";
    specialty = "Psychiatrist";
    qualifications = "MBBS, MD";
    schedule = "Daily 6 PM";
  })].values()).concat([(7, {
    name = "Dr. Krishnendu Das";
    specialty = "Gynecologist";
    qualifications = "MBBS, MS, DNB";
    schedule = "Mon, Wed, Fri 6 PM";
  })].values()).concat([(8, {
    name = "Dr. Rahul De";
    specialty = "ENT Specialist";
    qualifications = "MBBS, MS";
    schedule = "Daily Evening";
  })].values()).concat([(9, {
    name = "Dr. Jagannath Saha";
    specialty = "General Medicine";
    qualifications = "MBBS, MD";
    schedule = "Evening";
  })].values()));
  let prescriptions = Map.empty<Nat, Prescription>();

  var nextDoctorId = 10;
  var nextPrescriptionId = 1;
  var businessHours = "Mon-Sat: 8 AM – 10 PM | Sun: 9 AM – 8 PM";
  var phone1 = "+91 6289660967";
  var phone2 = "+91 9831279222";
  var upiId = "SBIBHIM.INSTANT92788270875563486@SBIPAY";

  public shared ({ caller }) func addDoctor(doctor : Doctor) : async Nat {
    let id = nextDoctorId;
    nextDoctorId += 1;
    doctors.add(id, doctor);
    id;
  };

  public shared ({ caller }) func updateDoctor(id : Nat, doctor : Doctor) : async () {
    if (not doctors.containsKey(id)) { Runtime.trap("Doctor does not exist") };
    doctors.add(id, doctor);
  };

  public shared ({ caller }) func removeDoctor(id : Nat) : async () {
    if (not doctors.containsKey(id)) { Runtime.trap("Doctor does not exist") };
    doctors.remove(id);
  };

  public query ({ caller }) func getDoctor(id : Nat) : async Doctor {
    switch (doctors.get(id)) {
      case (?doctor) { doctor };
      case (null) { Runtime.trap("Doctor does not exist") };
    };
  };

  public query ({ caller }) func getDoctors() : async [Doctor] {
    doctors.values().toArray().sort(Doctor.compareByName);
  };

  public shared ({ caller }) func addPrescription(prescription : Prescription) : async Nat {
    let id = nextPrescriptionId;
    nextPrescriptionId += 1;
    let newPrescription = { prescription with submittedAt = Time.now() };
    prescriptions.add(id, newPrescription);
    id;
  };

  public query ({ caller }) func getPrescriptions() : async [Prescription] {
    prescriptions.values().toArray();
  };

  public query ({ caller }) func getBusinessHours() : async Text {
    businessHours;
  };

  public query ({ caller }) func getPhone1() : async Text {
    phone1;
  };

  public query ({ caller }) func getPhone2() : async Text {
    phone2;
  };

  public query ({ caller }) func getUpiId() : async Text {
    upiId;
  };

  public shared ({ caller }) func setBusinessHours(newBusinessHours : Text) : async () {
    businessHours := newBusinessHours;
  };

  public shared ({ caller }) func setPhone1(newPhone1 : Text) : async () {
    phone1 := newPhone1;
  };

  public shared ({ caller }) func setPhone2(newPhone2 : Text) : async () {
    phone2 := newPhone2;
  };

  public shared ({ caller }) func setUpiId(newUpiId : Text) : async () {
    upiId := newUpiId;
  };
};
