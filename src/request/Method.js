import Selector from "./Selector";
import JsonBinding from "../util/redux";

let binding = new JsonBinding("$.request.method");
const Method = binding.connect(Selector);

export default Method;
