
import axios from "axios";

const KEY = "AIzaSyAe5bTwMm0pp6qUsPf_rlZm3awC_yJ6L70";

 
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params:{
      part:"snippet",
      maxResults:5,
      key:KEY
  }
});