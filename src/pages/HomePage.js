import { useSelector } from "react-redux";
export default function HomePage() {
  const user = useSelector((state) => state.utilities.user);
 

  return (
    <div className="homepage">
      <p>Namaste! Welcome to Dream-Create-Receive</p>
      <p>This is your perfect place to manifest dreams, create affirmation cards or simply get inspired</p>
   
      <div>
          there are 4 layouts to choose from 
        <div>Water || Eart || Air || Fire</div>
        {/* add little stickers to respresent elements for styling */}
        you can only create one board at a time associated with an element
      </div>
      _________________________________________________
      <br />
      (Click on any paragraph below to highlight features inside of the tool
      panel)
     
        {/* <p>Generate a quote or....</p>
        <p>add your own</p> */}
        <div>
        <p>Write your own affirmations</p>
        <p>Add images for visuapzation</p>
        <p>Add stickers </p>
        <p>you can Clear/ Save or Edit your Board to conitnue working on it in the future or...</p>
        <p>You can download your board as an image and share with someone special or have close to you all the time so you can visualize your dreams anytime anywhere</p>
        </div>
        __________________________________________________
        <p>Come back here for reference any time if you forgot something by clicking Home at the bottom of toolbar</p>
     
      {user? null : <h3> &#9754; Login or Signup to start</h3>}
    </div>
  );
}
