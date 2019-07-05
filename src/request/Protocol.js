import Selector from "./Selector";
import JsonBinding from "../util/redux";

let binding = new JsonBinding("$.request.url.protocol");

const Protocol = binding.connect(Selector);

export default Protocol;
