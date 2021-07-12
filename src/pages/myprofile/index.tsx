import ProfilePageMobile from "./mobile";
import ProfilePageDesktop from "./desktop";

const ProfilePage = () => {
  return (
    <>
      {window.innerWidth < 899 ? <ProfilePageMobile /> : <ProfilePageDesktop />}
    </>
  );
};

export default ProfilePage;
