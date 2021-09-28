// export default function DropDown(){
//     return (
//         <div className="dropdown" style={{ float: "right" }}>
//         <div className="menu">&#9776;</div>
//         <div className="dropdown-content">
//           <NavLink activeclassname={classes.active} to="/how-to-play">
//             Game rules
//           </NavLink>
//           <NavLink activeclassname={classes.active} to="/cemetery">
//             Visit Cemetery
//           </NavLink>
//           <NavLink exact to="/" activeclassname={classes.active}>
//             Home
//           </NavLink>
//           {user ? (
//             <Link
//               activeclassname={classes.active}
//               exact
//               to="/login"
//               onClick={logoutHandler}
//             >
//               Logout
//             </Link>
//           ) : null}
//         </div>
//       </div>
//     )
// }