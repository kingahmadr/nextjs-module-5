import CategoryTab from "./components/CategoryTab";
import Navbar from "./components/Navbar";
// import Loading from "./Loading";
// import { RotatingLoader } from "./components/Loader/NewLoader";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <Suspense fallback={<RotatingLoader />}> */}
      <CategoryTab />
      {/* </Suspense> */}
    </div>
  );
}
