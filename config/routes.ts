import { IconType } from "react-icons/lib";
import { RiFileList2Line, RiHomeLine } from "react-icons/ri";

interface RouteConfig {
  name: string;
  icon: IconType;
}

export const routes: { [path: string]: RouteConfig } = {
  "/": {
    name: "Home",
    icon: RiHomeLine,
  },
  "/cv": {
    name: "CV",
    icon: RiFileList2Line,
  },
};
