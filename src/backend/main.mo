import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Blob "mo:core/Blob";
import Nat64 "mo:core/Nat64";
import Nat "mo:core/Nat";

actor {
  // ── Types ────────────────────────────────────────────────────────────────

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

  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    createdAt : Int;
  };

  // ReviewEntry — shared public type for user-submitted reviews (cross-device)
  type ReviewEntry = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    createdAt : Int;
    isVerified : Bool;
  };

  type ReviewsPage = {
    reviews : [ReviewEntry];
    totalCount : Nat;
    hasMore : Bool;
  };

  // Appointment — for booking management
  type Appointment = {
    id : Nat;
    customerName : Text;
    phone : Text;
    doctorName : Text;
    preferredDate : Text;
    preferredTime : Text;
    reason : Text;
    status : Text; // "pending" | "confirmed" | "cancelled"
    createdAt : Int;
  };

  // BlogPost — for admin-managed blog content
  type BlogPost = {
    id : Nat;
    title : Text;
    content : Text;
    publishedAt : Int;
    isPublished : Bool;
  };

  // IC management canister HTTP outcall types
  type HttpHeader = { name : Text; value : Text };
  type HttpRequestResult = { status : Nat; headers : [HttpHeader]; body : Blob };
  type TransformArgs = { response : HttpRequestResult; context : Blob };

  // Public transform types (for candid interface)
  type TransformationInput = TransformArgs;
  type TransformationOutput = HttpRequestResult;

  // IC management canister actor reference
  let ic = actor "aaaaa-aa" : actor {
    http_request : ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [HttpHeader];
      body : ?Blob;
      transform : ?{
        function : shared query TransformArgs -> async HttpRequestResult;
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async HttpRequestResult;
  };

  // ── State ─────────────────────────────────────────────────────────────────

  let doctors = Map.fromIter<Nat, Doctor>(
    [
      (1, {
        name = "Dr. Alimpan Basak";
        specialty = "General Physician";
        qualifications = "MBBS (Cal), USLS-BLA-1, CCCS (London), CCEBDM, CIMT, F.C.C.S";
        schedule = "Monday, Wednesday & Saturday (Afternoon)";
      }),
      (2, {
        name = "Dr. Gaurav Taparia";
        specialty = "Orthopaedic & Spine Surgeon";
        qualifications = "MBBS, MS (Orthopaedics), FNB (Spine)";
        schedule = "Monday & Thursday";
      }),
      (3, {
        name = "Dr. Kaushik Ray";
        specialty = "Consultant Paediatrician";
        qualifications = "MBBS, DCH, MD";
        schedule = "By Appointment Only";
      }),
      (4, {
        name = "Dr. Tuhin Shubhra Sarkar";
        specialty = "General Physician";
        qualifications = "MBBS, MD (Medicine)";
        schedule = "Thursday (7:00 PM)";
      }),
      (5, {
        name = "Dr. Tanima Garai";
        specialty = "Consultant Dermatologist";
        qualifications = "MBBS (CMC), MD (Dermatology)";
        schedule = "Every Sunday (6:00 PM)";
      }),
      (6, {
        name = "Dr. Sandipta Ghosh";
        specialty = "Consultant Psychiatrist";
        qualifications = "MBBS, MD";
        schedule = "Daily (6:00 PM)";
      }),
      (7, {
        name = "Dr. Krishnendu Das";
        specialty = "Consultant Gynaecologist";
        qualifications = "MBBS, MS (G&O), DNB";
        schedule = "Monday, Wednesday & Friday (6:00 PM)";
      }),
      (8, {
        name = "Dr. Rahul Dey";
        specialty = "ENT Specialist (Otorhinolaryngologist)";
        qualifications = "MBBS (Cal), MS (ENT)";
        schedule = "Daily";
      }),
      (9, {
        name = "Dr. Jagnnath Saha";
        specialty = "Consultant - General Medicine";
        qualifications = "MBBS, MD (Radiotherapy)";
        schedule = "By Appointment Only";
      }),
    ].values()
  );

  let prescriptions = Map.empty<Nat, Prescription>();
  let reviews = Map.empty<Nat, Review>();

  // New stable collections for cross-device data
  let userReviews = List.empty<ReviewEntry>();
  let appointments = List.empty<Appointment>();
  let blogPosts = List.empty<BlogPost>();

  var nextDoctorId = 10;
  var nextPrescriptionId = 1;
  var nextReviewId = 1;
  var nextUserReviewId = 1;
  var nextAppointmentId = 1;
  var nextBlogPostId = 1;
  var businessHours = "Mon-Sat: 8 AM - 10 PM | Sun: 9 AM - 8 PM";
  var phone1 = "+91 6289660967";
  var phone2 = "+91 9831279222";
  var upiId = "SBIBHIM.INSTANT92788270875563486@SBIPAY";

  // ── Doctor Methods ────────────────────────────────────────────────────────

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

  // ── Prescription Methods ──────────────────────────────────────────────────

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

  // ── Review Methods (existing — unchanged) ────────────────────────────────

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async Nat {
    let id = nextReviewId;
    nextReviewId += 1;
    let review : Review = {
      id;
      name;
      rating;
      comment;
      createdAt = Time.now();
    };
    reviews.add(id, review);
    id;
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.values().toArray();
  };

  // ── Review Methods (paginated cross-device) ───────────────────────────────

  public shared func addUserReview(name : Text, rating : Nat, comment : Text) : async Nat {
    let id = nextUserReviewId;
    nextUserReviewId += 1;
    let entry : ReviewEntry = {
      id;
      name;
      rating;
      comment;
      createdAt = Time.now();
      isVerified = false;
    };
    userReviews.add(entry);
    id;
  };

  public query func getReviewsPaginated(page : Nat, pageSize : Nat) : async ReviewsPage {
    let total = userReviews.size();
    let offset = page * pageSize;
    let end = offset + pageSize;
    let reviews = userReviews.sliceToArray(offset, end);
    {
      reviews;
      totalCount = total;
      hasMore = end < total;
    };
  };

  // ── Appointment Methods ───────────────────────────────────────────────────

  public shared func addAppointment(
    customerName : Text,
    phone : Text,
    doctorName : Text,
    preferredDate : Text,
    preferredTime : Text,
    reason : Text,
  ) : async Nat {
    let id = nextAppointmentId;
    nextAppointmentId += 1;
    let appt : Appointment = {
      id;
      customerName;
      phone;
      doctorName;
      preferredDate;
      preferredTime;
      reason;
      status = "pending";
      createdAt = Time.now();
    };
    appointments.add(appt);
    id;
  };

  public query func getAppointments() : async [Appointment] {
    appointments.toArray();
  };

  public shared func updateAppointmentStatus(id : Nat, status : Text) : async Bool {
    var found = false;
    appointments.mapInPlace(
      func(appt) {
        if (appt.id == id) {
          found := true;
          { appt with status };
        } else {
          appt;
        };
      }
    );
    found;
  };

  // ── Blog Methods ──────────────────────────────────────────────────────────

  public shared func addBlogPost(title : Text, content : Text) : async Nat {
    let id = nextBlogPostId;
    nextBlogPostId += 1;
    let post : BlogPost = {
      id;
      title;
      content;
      publishedAt = Time.now();
      isPublished = true;
    };
    blogPosts.add(post);
    id;
  };

  public query func getBlogPosts() : async [BlogPost] {
    blogPosts.filter(func(p) { p.isPublished }).toArray();
  };

  public query func getAllBlogPostsAdmin() : async [BlogPost] {
    blogPosts.toArray();
  };

  public shared func updateBlogPost(id : Nat, title : Text, content : Text, isPublished : Bool) : async Bool {
    var found = false;
    blogPosts.mapInPlace(
      func(post) {
        if (post.id == id) {
          found := true;
          { post with title; content; isPublished };
        } else {
          post;
        };
      }
    );
    found;
  };

  public shared func deleteBlogPost(id : Nat) : async Bool {
    let sizeBefore = blogPosts.size();
    let filtered = blogPosts.filter(func(p) { p.id != id });
    blogPosts.clear();
    blogPosts.append(filtered);
    blogPosts.size() < sizeBefore;
  };

  // ── Settings Methods ──────────────────────────────────────────────────────

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

  // ── HTTP Outcall / Gemini ─────────────────────────────────────────────────

  public query func transform(input : TransformationInput) : async TransformationOutput {
    { input.response with headers = [] };
  };

  public func askGemini(prompt : Text) : async Text {
    let systemPrompt = "You are a knowledgeable, friendly, and always-helpful assistant for Radharani Pharmacy - Chemist and Druggist, located in New Barrackpore, West Bengal, India.\n\nCRITICAL LANGUAGE RULE: Detect the language of the user's message and ALWAYS reply in the SAME language:\n- If the user writes in Hindi (uses Devanagari script or Hindi words) -> respond ENTIRELY in Hindi using Devanagari script\n- If the user writes in Bengali (uses Bengali script or Bengali words) -> respond ENTIRELY in Bengali using Bengali script\n- If the user writes in English -> respond ENTIRELY in English\n- Never mix languages in a single response\n- Never refuse to answer due to language\n\nCRITICAL ANSWER RULE: You MUST answer EVERY question the user asks, no matter what the topic is. You are a knowledgeable assistant who can help with:\n- Pharmacy information, medicines, prescriptions, health queries\n- Doctor schedules and appointments at Radharani Pharmacy\n- General health questions, symptoms, wellness advice\n- Any general knowledge questions (science, history, math, cooking, etc.)\n- Any other topic the user brings up\nNEVER say you cannot help, never refuse, never redirect without answering first. Always give a complete, helpful answer.\n\nPharmacy Name: Radharani Pharmacy - Chemist and Druggist\nAddress: D/5 Shahid Bandhu Nagar Colony, 2no Gate, Near Nag Sweet, New Barrackpore, West Bengal\nPhone: 9831279222\nWhatsApp Order Link: https://wa.me/919831279222\nUPI ID: SBIBHIM.INSTANT92788270875563486@SBIPAY\nBusiness Hours: Morning 8:00 AM - 2:00 PM, Evening 5:00 PM - 10:00 PM (Mon-Sat); Sunday 9:00 AM - 8:00 PM\n\nOur Medical Team:\n1. Dr. Alimpan Basak - General Physician. Qualifications: MBBS (Cal), USLS-BLA-1, CCCS (London), CCEBDM, CIMT, F.C.C.S. Specialization: Diabetes Management, Cardiovascular Diseases, Stroke Care. Availability: Monday, Wednesday and Saturday (Afternoon).\n2. Dr. Gaurav Taparia - Orthopaedic and Spine Surgeon. Qualifications: MBBS, MS (Orthopaedics), FNB (Spine). Specialization: Bone, Joint and Spine Disorders. Availability: Monday and Thursday.\n3. Dr. Kaushik Ray - Consultant Paediatrician. Qualifications: MBBS, DCH, MD. Availability: By Appointment Only.\n4. Dr. Tuhin Shubhra Sarkar - General Physician. Qualifications: MBBS, MD (Medicine). Position: Assistant Professor, R.G. Kar Medical College and Hospital. Availability: Thursday 7:00 PM.\n5. Dr. Tanima Garai - Consultant Dermatologist. Qualifications: MBBS (CMC), MD (Dermatology). Specialization: Skin, Hair and Nail Disorders. Availability: Every Sunday 6:00 PM.\n6. Dr. Sandipta Ghosh - Consultant Psychiatrist. Qualifications: MBBS, MD. Specialization: Mental Health, Anxiety, Depression, Stress Disorders. Availability: Daily 6:00 PM.\n7. Dr. Krishnendu Das - Consultant Gynaecologist. Qualifications: MBBS, MS (G&O), DNB. Availability: Monday, Wednesday and Friday 6:00 PM.\n8. Dr. Rahul Dey - ENT Specialist. Qualifications: MBBS (Cal), MS (ENT). Specialization: Ear, Nose, Throat and Head-Neck Surgery. Availability: Daily.\n9. Dr. Jagnnath Saha - Consultant General Medicine. Qualifications: MBBS, MD (Radiotherapy). Availability: By Appointment Only.";

    let url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCh0FiEK_o-NSljphTg2EjSUlkyIa8p4Sg";

    let escapedSystem = systemPrompt.replace(#char '\"', "\\\"");
    let escapedSystem2 = escapedSystem.replace(#char '\n', "\\n");
    let escapedPrompt = prompt.replace(#char '\"', "\\\"");
    let escapedPrompt2 = escapedPrompt.replace(#char '\n', "\\n");

    let bodyText = "{\"contents\":[{\"role\":\"user\",\"parts\":[{\"text\":\"" # escapedSystem2 # "\\n\\nUser question: " # escapedPrompt2 # "\"}]}]}";
    let bodyBlob = bodyText.encodeUtf8();

    let headers : [HttpHeader] = [
      { name = "Content-Type"; value = "application/json" }
    ];

    try {
      let response = await (with cycles = 100_000_000_000) ic.http_request({
        url;
        max_response_bytes = ?20_000 : ?Nat64;
        method = #post;
        headers;
        body = ?bodyBlob;
        transform = ?{
          function = transform;
          context = "";
        };
        is_replicated = null;
      });

      let responseText = switch (response.body.decodeUtf8()) {
        case (?t) { t };
        case null { "" };
      };

      let textMarker = "\"text\":\"";
      // Split on textMarker: take first occurrence, get the part after it
      let parts = responseText.split(#text textMarker);
      // skip first segment (before marker), then parse rest
      ignore parts.next(); // discard prefix
      switch (parts.next()) {
        case (?rest) {
          var result = "";
          let chars = rest.chars();
          var done = false;
          var escaped = false;
          for (c in chars) {
            if (not done) {
              if (escaped) {
                if (c == 'n') { result := result # "\n" }
                else if (c == '\\') { result := result # "\\" }
                else if (c == '\"') { result := result # "\"" }
                else { result := result # "\\" # Text.fromChar(c) };
                escaped := false;
              } else if (c == '\\') {
                escaped := true;
              } else if (c == '\"') {
                done := true;
              } else {
                result := result # Text.fromChar(c);
              };
            };
          };
          if (result == "") {
            "I'm here to help! Please contact Radharani Pharmacy at 9831279222 or WhatsApp us for assistance.";
          } else {
            result;
          };
        };
        case null {
          "I'm here to help! Please contact Radharani Pharmacy at 9831279222 or WhatsApp us for any queries.";
        };
      };
    } catch (_) {
      "I'm sorry, I'm unable to respond right now. Please contact Radharani Pharmacy directly at 9831279222 or via WhatsApp for assistance.";
    };
  };
};
