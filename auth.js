// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDedYX-OO5spvjCmXsvPkELvH1o71iCQDU",
  authDomain: "hospital-management-syst-f56ba.firebaseapp.com",
  projectId: "hospital-management-syst-f56ba",
  storageBucket: "hospital-management-syst-f56ba.appspot.com",
  messagingSenderId: "355940873114",
  appId: "1:355940873114:web:7c35cedd94d737c155c023",
  measurementId: "G-H8RDJ3ME1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//Initialize Firebase
initializeApp(firebaseConfig);
const auth=getAuth();
const db=getFirestore();

//Initialize the Reference Parent Collection
const collRef=collection(db,"Users");

//Check Authentication


//Sign Up
const signUpForm=document.getElementById("SignUp");
signUpForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const email=document.getElementById("SignupUsername").value;
    const password=document.getElementById("SignupPassword").value;
    const name=document.getElementById("name").value;
    try{
        const cred= await createUserWithEmailAndPassword(auth,email,password);
        console.log(cred);
        signUpForm.reset();
        const ref=doc(db,'Users',cred.user.uid);
        await setDoc(ref,{
            Name: name,
            Email: email
        })

    }catch(error){
        console.log(error);
    }

});

//Sign Out
const signOutBtn=document.getElementById("signOut");
signOutBtn.addEventListener("click",async event=>{
    sessionStorage.removeItem("user-cred");
    sessionStorage.removeItem("user-info");
    await signOut(auth);
    window.location.href='index.html';
})


//Sign In
const signInForm=document.getElementById("loginForm");
signInForm.addEventListener("submit", async event=>{
    event.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value
    const cred=await signInWithEmailAndPassword(auth,email,password);
    const ref=doc(db,'Users',cred.user.uid);
    const docSnap=await getDoc(ref);
    if(docSnap.exists()){
        console.log("Logged In");
        sessionStorage.setItem('user-info',JSON.stringify({
            name:docSnap.data().Name,
            email:docSnap.data().Email
        }))
    }
        sessionStorage.setItem('user-cred',JSON.stringify(cred.user));
        window.location.href="../homepage/index.html";
})