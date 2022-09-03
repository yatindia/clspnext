import { user } from "../core/Atoms";
import { useRecoilState } from "recoil";
export default function CheckLogin() {
  const [userData, setUserData] = useRecoilState(user);

  if (userData.status == "loading") {
    return { status: "LODG" };
  } else if (userData.status == "NOLG") {
    return { status: "NOLG" };
  } else {
    return { ...userData, status: "LGIN" };
  }
}
