import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import MyLib from "./utils/my-lib.js";

const testLib = new MyLib();

function App() {
  let [state, setState] = useState({
    test_01: `2
add,1,Sharilyn Gruber,-1
print`,
    test_02: `6
add,1,Sharilyn Gruber,-1
add,2,Denice Mattice,1
add,3,Lawana Futrell,1
add,4,Lissette Gorney,3
add,5,Lan Puls,-1
print`,
    test_03: `7
add,1,Sharilyn Gruber,-1
add,2,Denice Mattice,1
add,3,Lawana Futrell,1
add,4,Lissette Gorney,3
add,4,Meathands Brambleback,3
add,5,Lan Puls,-1
print`,
  });

  function formatInput(input) {
    return input.replace(/\r\n/g, "<br />").replace(/[\r\n]/g, "<br />");
  }

  function makeTest(testNumber, testInput) {
    return (e) => {
      e.preventDefault();
      console.log(`Input for test ${testNumber}:`);
      let testName = `test_0${testNumber}`;
      console.log(testInput);
      console.log('Output from test')
      testLib.readInput(testInput);
    }
  }

  return (
    <>
      <h1>Hi! Welcome to the demo.</h1>
      <h2>All inputs are structured the same way as they were for the HR test. All outputs are formatted as close as I can remember to the required outputs from the HR test.</h2>
      <h2>Pardon the grody styling on the page, this is just a tech demo. To use, pop open the inspector [F12] and nagivate to the console tab. All outputs are visible there. I attached both a copy of this entire react doc and the specific class I wrote all the underlying code in with the email I sent to my recruiter. Click any of the buttons below to fire off the test cases I've prepared.<br></br><br></br>Thanks again for your consideration, <br></br> Justin Vaughn</h2>
      <button onClick={makeTest(1, state.test_01)}> Run test 1 </button>
      <button onClick={makeTest(2, state.test_02)}> Run test 2 </button>
      <button onClick={makeTest(3, state.test_03)}> Run test 3 </button>
    </>
  );
}

export default App;
