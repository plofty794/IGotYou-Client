import Address from "./buttons/Address";
import FunFact from "./buttons/FunFact";
import EducationalAttainment from "./buttons/EducationalAttainment";
import Work from "./buttons/Work";

function ProfileButtonGroup() {
  return (
    <>
      <EducationalAttainment />
      <Work />
      <Address />
      <FunFact />
    </>
  );
}

export default ProfileButtonGroup;
