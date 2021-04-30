// import React from "react";

// class TimeList extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       time: [
//         { name: "Eden", time: "3pm", notes: "all good", completed: "7pm"},
//         { name: "Hugh", time: "6pm", notes: "fine", completed: "nope"},,
//       ],
//       name: String,
//       time: String,
//       notes: String,
//       completed: String 
//     };
//   }

//   handleChange = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//     // new state value
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     // Read title and genre state and put in a temp variable which is Obj literal
//     const newTime = { name: this.state.name, time: this.state.time, notes: this.state.notes, completed: this.state.completed };
//     // Create a new movies array variable which is a copy from movies state via ... operator
//     const newTime = [...this.state.time];
//     newTime.push(newTime);
//     // Set the state for movies and pass the new movies array.
//     this.setState({ time: newTime });
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             Name
//             <input
//               name="name"
//               value={this.state.name}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <label>
//             Time
//             <input
//               name="time"
//               value={this.state.time}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <label>
//             Notes
//             <input
//               name="notes"
//               value={this.state.notes}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <label>
//             Completed
//             <input
//               name="completed"
//               value={this.state.completed}
//               onChange={this.handleChange}
//             ></input>
//           </label>
//           <button type="submit">Submit</button>
//         </form>
//         <ul>
//           {this.state.time.map((el, index) => (
//             <li key={index}>
//               Name: {el.name} - Time: {el.time}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

// export default TimeList;
