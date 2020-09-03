let environment = process.env.NODE_ENV;
let path=""
if(environment==="development") {
    path="http://localhost:8888/";
} else if(environment==="production") {
    path=window.location.href.split("#")[0];
}
export default path;