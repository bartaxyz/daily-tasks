// import original module declarations
import "styled-components";
import { Theme } from "./theme/default/theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}

declare module "*.png" {
  const value: any;
  export default value;
}
