import Address from "./buttons/Address";
import FunFact from "./buttons/FunFact";
import School from "./buttons/School";
import Work from "./buttons/Work";

function ProfileButtonGroup() {
  return (
    <>
      <School />
      <Work />
      <Address />
      <FunFact />
    </>
  );
}

export default ProfileButtonGroup;
