declare module "*.svg" {
  const uri: string;
  export default uri;
}

declare module "lodash-es" {
  import lodash from "lodash";
  export = lodash;
}
